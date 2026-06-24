import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/server-auth";
import { sendLostProductFoundEmail } from "@/lib/mail";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const record = await prisma.lostProduct.findUnique({
    where: { id },
    include: {
      product: true,
      owner: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!record) {
    return NextResponse.json(
      { error: "Record not found" },
      { status: 404 }
    );
  }

  // =========================
  // FOUND FLOW
  // =========================
  if (body.action === "FOUND") {
    if (
      !body.finderName ||
      !body.finderEmail ||
      !body.finderPhone
    ) {
      return NextResponse.json(
        {
          error: "Name, email and phone are required",
        },
        { status: 400 }
      );
    }

    if (record.status !== "LOST") {
      return NextResponse.json(
        {
          error: "Product is not currently marked as lost",
        },
        { status: 400 }
      );
    }

    const updated = await prisma.lostProduct.update({
    where: { id },
    data: {
      status: "FOUND",
      foundAt: new Date(),
      finderName: body.finderName,
      finderEmail: body.finderEmail,
      finderPhone: body.finderPhone,
    },
  });

  try {
    if (record.owner?.email) {
      await sendLostProductFoundEmail({
        ownerEmail: record.owner.email,
        ownerName: record.owner.name,
        productName:
          record.product.name ||
          `${record.product.brand ?? ""} ${record.product.model ?? ""}`,
        dppId: record.product.dppId,
        finderName: body.finderName,
        finderEmail: body.finderEmail,
        finderPhone: body.finderPhone,
      });
    }
  } catch (error) {
    console.error("Email failed:", error);
  }

  return NextResponse.json(updated);
}

  // =========================
  // RECOVERED FLOW
  // =========================
  if (body.action === "RECOVERED") {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (
      session.user.id !== record.ownerId &&
      !session.user.isAdmin
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    if (record.status === "RECOVERED") {
      return NextResponse.json(
        {
          error: "Already recovered",
        },
        { status: 400 }
      );
    }

    const updated = await prisma.lostProduct.update({
      where: { id },
      data: {
        status: "RECOVERED",
        recoveredAt: new Date(),
      },
    });

    return NextResponse.json(updated);
  }

  return NextResponse.json(
    { error: "Invalid action" },
    { status: 400 }
  );
}