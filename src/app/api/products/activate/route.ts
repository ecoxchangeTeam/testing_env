import { NextResponse } from "next/server";
import { auth } from "@/lib/server-auth";
import { prisma } from "@/lib/prisma";
import {
  generateQrPng,
  generateQrSvg,
  generateQrSticker,
  generateDppId,
  generateQrPayload,
} from "@/lib/qr";
import crypto from "crypto";
import { qrPrisma } from "@/lib/qr-prisma";
import { calculateProductTrustScore } from "@/lib/trust-score";
import { ProductCategory } from "@prisma/client";

// GET /api/products/activate?dppId=... — Get product for activation page
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dppId = searchParams.get("dppId");

  if (!dppId) {
    return NextResponse.json({ error: "DPP ID required" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { dppId },
    include: {
      currentOwner: {
        select: {
          name: true,
        },
      },
    },
  });

  // Product exists normally
  if (product) {
    return NextResponse.json({
      type: "PRODUCT",
      product,
    });
  }

  // Check QR inventory backup database
  const blankQR = await qrPrisma.qRInventory.findUnique({
    where: {
      dppId,
    },
  });

  if (!blankQR) {
    return NextResponse.json(
      {
        error: "QR not found",
      },
      {
        status: 404,
      }
    );
  }

  const session = await auth();


console.log("SESSION USER:", session?.user);
console.log("IS ADMIN:", (session?.user as any)?.isAdmin);

  return NextResponse.json({
    type: "BLANK",
    qr: blankQR,
    canLink:
      blankQR.status === "UNUSED" &&
      !!session?.user &&
      (session.user as { isAdmin?: boolean }).isAdmin,
  });
}

// POST /api/products/activate — Activate a product
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { dppId, purchaseDate, invoiceUrl } = body;

  if (!dppId) {
    return NextResponse.json({ error: "DPP ID required" }, { status: 400 });
  }

  let product = await prisma.product.findUnique({
    where: { dppId },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }
  if (product.status !== "UNCLAIMED") {
    return NextResponse.json(
      { error: "This product has already been activated" },
      { status: 409 }
    );
  }

  // ── Calculate initial trust score ─────────────────────────
  // At activation: 1 owner, no repair logs, invoice optional
  const initialTrustScore = calculateProductTrustScore({
    isVerified: false,
    isFlagged: false,
    // Invoice present but not yet admin-verified
    documents: invoiceUrl
      ? [{ documentType: "INVOICE", isVerified: false }]
      : [],
    // One ownership entry is being created right now
    ownershipHistory: [{}],
    repairLogs: [],
    yearOfPurchase: purchaseDate
      ? new Date(purchaseDate).getFullYear()
      : product.yearOfPurchase,
    serialNumber: product.serialNumber,
    brand: product.brand,
    model: product.model,
  });

  // ── Activate product and create ownership record atomically ─
  const [updatedProduct] = await prisma.$transaction([
    prisma.product.update({
      where: { dppId },
      data: {
        status: "ACTIVE",
        currentOwnerId: session.user.id,
        activatedAt: new Date(),
        yearOfPurchase: purchaseDate
          ? new Date(purchaseDate).getFullYear()
          : undefined,
        trustScore: initialTrustScore,
      },
    }),
    prisma.ownershipHistory.create({
      data: {
        productId: product.id,
        previousOwnerId: null,
        newOwnerId: session.user.id,
        transferType: "ACTIVATION",
        notes: "Initial product activation",
      },
    }),
  ]);

  // ── Activation logging ─────────────────────────────────────
  await qrPrisma.activationRecord.create({
    data: {
      dppId,
      productId: product.id,
      activatedBy: session.user.id,
      status: "SUCCESS",
      ipAddress: request.headers.get("x-forwarded-for"),
      deviceInfo: request.headers.get("user-agent"),
    },
  });

  await qrPrisma.productSnapshot.update({
    where: { dppId },
    data: { status: "ACTIVE", owner: session.user.id },
  });

  await qrPrisma.qRInventory.update({
    where: { dppId },
    data: {
      status: "ACTIVE",
    },
  });

  await prisma.qRInventory.update({
    where: { dppId },
    data: {
      status: "ACTIVE",
    },
  });

  await qrPrisma.qRRecord.update({
    where: { dppId },
    data: {
      status: "ACTIVE",
    },
  });

  // ── Upload invoice document if provided ───────────────────
  if (invoiceUrl) {
    await prisma.productDocument.create({
      data: {
        productId: product.id,
        documentType: "INVOICE",
        documentUrl: invoiceUrl,
        isVerified: false,
      },
    });
  }

  return NextResponse.json({
    success: true,
    product: updatedProduct,
    trustScore: initialTrustScore,
    message: "Product activated successfully",
  });
}

// PUT /api/products/activate — Admin: generate new DPP + QR
export async function PUT(request: Request) {
  const session = await auth();
  if (
    !session?.user ||
    !(session.user as { isAdmin?: boolean }).isAdmin
  ) {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 }
    );
  }

  const body = await request.json();
  const {
    category,
    brand,
    model,
    serialNumber,
    color,
    author,
    edition,
    isbn,
    warranty,
    frameNumber,
  } = body;

  let { name } = body;

  if (!name || typeof name !== "string") {
    return NextResponse.json(
      { error: "Product Name is required" },
      { status: 400 }
    );
  }
  name = name.trim();
  if (name.length < 3) {
    return NextResponse.json(
      { error: "Product Name must be at least 3 characters long" },
      { status: 400 }
    );
  }
  if (name.length > 100) {
    return NextResponse.json(
      { error: "Product Name must be under 100 characters long" },
      { status: 400 }
    );
  }
  if (!category) {
    return NextResponse.json(
      { error: "Category required" },
      { status: 400 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const dppId = generateDppId(category);
  const qrPayload = generateQrPayload(dppId, baseUrl);

  const [qrPng, qrSvg, qrSticker] = await Promise.all([
    generateQrPng(dppId, baseUrl),
    generateQrSvg(dppId, baseUrl),
    generateQrSticker(dppId, baseUrl),
  ]);

  const activationUrl = `${baseUrl}/activate/${dppId}`;
  const qrHash = crypto
    .createHash("sha256")
    .update(qrPayload)
    .digest("hex");

  console.log("START PRODUCT GENERATION");
  const product = await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        dppId,
        qrCodeUrl: qrPng,
        qrCodeSvg: qrSticker,
        category,
        name,
        brand,
        model,
        serialNumber,
        color,
        author,
        edition,
        isbn,
        warranty,
        frameNumber,
        status: "UNCLAIMED",
        trustScore: 0,
      },
    });

    //     console.log(process.env.QR_DATABASE_URL);
    //     const result = await tx.$queryRawUnsafe(`
    // SELECT current_database() AS db,
    //        current_schema() AS schema;
    // `);

    //     console.log(result);
    console.log("Creating QRInventory in MAIN DB...");
    await tx.qRInventory.create({
      data: {
        dppId: product.dppId,
        status: "UNCLAIMED",
        category: product.category,
        name: product.name,
        brand: product.brand,
        model: product.model,
      },
    });
    console.log("Created QRInventory in MAIN DB");

    return product;
  });

  await qrPrisma.qRInventory.create({
    data: {
      dppId: product.dppId,
      status: "UNCLAIMED",

      category: product.category,
      name: product.name,
      brand: product.brand,
      model: product.model,
    },
  });
  // await prisma.qRInventory.create({
  //   data: {
  //     dppId: product.dppId,
  //     status: "UNCLAIMED",
  //     category: product.category,
  //     name: product.name,
  //     brand: product.brand,
  //     model: product.model,
  //   },
  // });
  console.log("WRITING TO QR DATABASE");
  await qrPrisma.qRRecord.create({
    data: {
      dppId,
      productId: product.id,
      activationUrl,
      generatedBy: session.user.id,
      status: "UNCLAIMED",
      qrHash,
    },
  });

  await qrPrisma.productSnapshot.create({
    data: {
      dppId,
      productId: product.id,
      productName: product.name,
      category,
      brand,
      model,
      serialNumber,
      status: "UNCLAIMED",
    },
  });

  await prisma.adminAction.create({
    data: {
      adminId: session.user.id,
      productId: product.id,
      actionType: "QR_ISSUED",
      notes: `QR generated for ${product.name} (${category})`,
    },
  });

  return NextResponse.json({
    success: true,
    product,
    qrPng,
    qrSvg,
    qrSticker,
  });
}