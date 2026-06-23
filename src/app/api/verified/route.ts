import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductCategory } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category    = searchParams.get("category");
    const nameFilter  = searchParams.get("name");   // subcategory keyword filter
    const page        = parseInt(searchParams.get("page") ?? "1", 10);
    const limit       = 12;

    const where: any = {
      isVerified: true,
      ...(category && category !== "ALL"
        ? { category: category as ProductCategory }
        : {}),
      ...(nameFilter
        ? { name: { contains: nameFilter, mode: "insensitive" } }
        : {}),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          currentOwner: {
            select: { name: true, college: true, trustScore: true },
          },
          ownershipHistory: { select: { id: true } },
          repairLogs:       { select: { id: true } },
        },
        orderBy: { trustScore: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: { page, pages: Math.ceil(total / limit), total },
    });
  } catch (error) {
    console.error("[/api/verified] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch verified products" },
      { status: 500 }
    );
  }
}
