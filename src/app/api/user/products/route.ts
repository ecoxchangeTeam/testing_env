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
    // Safely resolve valid user owner to avoid foreign key constraint violations
    let validUserId: string | null = null;
    if (session.user.id) {
      const userById = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { id: true },
      });
      if (userById) validUserId = userById.id;
    }

    if (!validUserId && session.user.email) {
      const userByEmail = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      if (userByEmail) {
        validUserId = userByEmail.id;
      } else {
        try {
          const createdUser = await prisma.user.create({
            data: {
              id: session.user.id || undefined,
              email: session.user.email,
              name: session.user.name || "EcoXchange Member",
            },
            select: { id: true },
          });
          validUserId = createdUser.id;
        } catch {
          const retryUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true },
          });
          if (retryUser) validUserId = retryUser.id;
        }
      }
    }

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
          currentOwnerId: validUserId,
          activatedAt: new Date(),
          qrCodeUrl: qrPng || null,
        },
      });

      if (validUserId) {
        await tx.ownershipHistory.create({
          data: {
            productId: created.id,
            newOwnerId: validUserId,
            transferType: "ACTIVATION",
            notes: "Digital Product Passport issued via EcoXchange Intake Engine",
          },
        });
      }

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

