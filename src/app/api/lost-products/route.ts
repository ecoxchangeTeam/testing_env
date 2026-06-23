import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/server-auth";

export async function GET() {
  const lostProducts = await prisma.lostProduct.findMany({
    where: {
      status: {
        in: ["LOST", "FOUND"],
      },
    },
    include: {
      product: true,
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      lostAt: "desc",
    },
  });

  return NextResponse.json(lostProducts);
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { productId } = await request.json();

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  const isOwner =
    product.currentOwnerId === session.user.id;

  if (!isOwner && !session.user.isAdmin) {
    return NextResponse.json(
      { error: "Not allowed" },
      { status: 403 }
    );
  }

  const existingRecord = await prisma.lostProduct.findFirst({
  where: {
    productId,
    status: {
      in: ["LOST", "FOUND"],
    },
  },
});

if (existingRecord) {
  return NextResponse.json(
    {
      error: "Product is already marked as lost",
    },
    { status: 400 }
  );
}

  const lostRecord = await prisma.lostProduct.create({
    data: {
      productId,
      ownerId: session.user.id,
      status: "LOST",
    },
  });

  return NextResponse.json(lostRecord);
}