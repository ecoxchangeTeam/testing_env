import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ dppId: string }> }
) {
  try {
    const { dppId } = await params;
    const product = await prisma.product.findUnique({
      where: { dppId },
      select: {
        id: true,
        dppId: true,
        appVerified: true,
        conditionScore: true,
        trustScore: true,
        riskLevel: true,
        estimatedPrice: true,
        manualVerificationReq: true,
        mlEvaluation: true,
        status: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let parsedMlEvaluation = product.mlEvaluation;
    if (typeof parsedMlEvaluation === "string") {
      try {
        parsedMlEvaluation = JSON.parse(parsedMlEvaluation);
      } catch {
        // keep as is
      }
    }
    if (
      parsedMlEvaluation &&
      typeof parsedMlEvaluation === "object" &&
      (parsedMlEvaluation as any).mlEvaluation
    ) {
      parsedMlEvaluation = (parsedMlEvaluation as any).mlEvaluation;
    }

    return NextResponse.json({
      success: true,
      dppId: product.dppId,
      appVerified: Boolean(product.appVerified),
      isEvaluated: Boolean(parsedMlEvaluation),
      mlEvaluation: parsedMlEvaluation,
      product: {
        ...product,
        mlEvaluation: parsedMlEvaluation,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: "Failed to fetch product verification status", details: err.message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ dppId: string }> }
) {
  try {
    const { dppId } = await params;
    const body = await request.json().catch(() => ({}));
    const appVerified = body.appVerified !== undefined ? Boolean(body.appVerified) : true;

    const updated = await prisma.product.update({
      where: { dppId },
      data: {
        appVerified,
        ...(typeof body.conditionScore === "number" ? { conditionScore: body.conditionScore } : {}),
        ...(typeof body.trustScore === "number" ? { trustScore: body.trustScore } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      appVerified: updated.appVerified,
      product: updated,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: "Failed to update verification status", details: err.message },
      { status: 500 }
    );
  }
}
