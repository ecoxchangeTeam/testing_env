import { NextResponse } from "next/server";
import { auth } from "@/lib/server-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const products = await prisma.product.findMany({
  where: { currentOwnerId: session.user.id },
  include: {
    _count: {
      select: {
        ownershipHistory: true,
        repairLogs: true,
      },
    },

    listings: {
      where: {
        listingStatus: "ACTIVE",
      },
      select: {
        askingPrice: true,
      },
    },

    lostRecords: {
      where: {
        status: {
          in: ["LOST", "FOUND"],
        },
      },
      select: {
        id: true,
        status: true,
      },
    },
  },
  orderBy: {
    activatedAt: "desc",
  },
});

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      name,
      brand,
      model,
      category,
      serialNumber,
      conditionScore,
      trustScore,
      dppId,
      qrPng,
    } = body;

    let targetCategory = "PHONE";
    if (category && ["LAPTOP", "PHONE", "GAMING_CONSOLE", "CYCLE", "APPLIANCE", "ACADEMIC_EQUIPMENT", "OTHER"].includes(category)) {
      targetCategory = category;
    }

    const finalDppId =
      dppId ||
      `ECO-${targetCategory === "PHONE" ? "PHN" : targetCategory === "LAPTOP" ? "LPT" : "OTH"}-${new Date().getFullYear()}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;

    const product = await prisma.$transaction(async (tx) => {
      const created = await tx.product.create({
        data: {
          dppId: finalDppId,
          name: name || "Smart Device",
          brand: brand || null,
          model: model || null,
          category: targetCategory as any,
          serialNumber: serialNumber || null,
          status: "ACTIVE",
          conditionScore: typeof conditionScore === "number" ? conditionScore : 92.4,
          trustScore: typeof trustScore === "number" ? trustScore : 88.0,
          currentOwnerId: session.user.id,
          activatedAt: new Date(),
          qrCodeUrl: qrPng || null,
        },
      });

      await tx.ownershipHistory.create({
        data: {
          productId: created.id,
          newOwnerId: session.user.id,
          transferType: "ACTIVATION",
          notes: "Digital Product Passport issued via EcoXchange Intake Engine",
        },
      });

      return created;
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Failed to register intake product:", error);
    return NextResponse.json(
      { error: "Failed to create product passport" },
      { status: 500 }
    );
  }
}

