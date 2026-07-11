import { NextResponse } from "next/server";
import { auth } from "@/lib/server-auth";
import { prisma } from "@/lib/prisma";
import { qrPrisma } from "@/lib/qr-prisma";
import crypto from "crypto";
import {
    generateQrPng,
    generateQrSvg,
    generateQrSticker,
} from "@/lib/qr";

export async function POST(request: Request) {
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
        dppId,
        name,
        category,
        brand,
        model,
        serialNumber,
    } = body;

    if (!dppId || !name || !category) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    // QR must exist in backup database
    const qrInventory = await qrPrisma.qRInventory.findUnique({
        where: { dppId },
    });

    if (!qrInventory) {
        return NextResponse.json(
            { error: "QR not found" },
            { status: 404 }
        );
    }

    // Product should not already exist
    const existing = await prisma.product.findUnique({
        where: { dppId },
    });

    if (existing) {
        return NextResponse.json(
            { error: "Product already linked" },
            { status: 409 }
        );
    }

    const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ??
        "http://localhost:3000";

    const qrPng = await generateQrPng(
        dppId,
        baseUrl
    );

    const qrSvg = await generateQrSvg(
        dppId,
        baseUrl
    );

    // if you use sticker elsewhere
    const qrSticker = await generateQrSticker(
        dppId,
        baseUrl
    );

    // Create product in main database
    const product = await prisma.product.create({
        data: {
            dppId,
            qrCodeUrl: qrPng,
            qrCodeSvg: qrSticker, // or qrSvg depending on your convention
            name,
            category,
            brand,
            model,
            serialNumber,
            status: "UNCLAIMED",
            trustScore: 0,
        },
    });

    // const baseUrl =
    //     process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const activationUrl = `${baseUrl}/activate/${dppId}`;

    // Update QR inventory with actual product details
    await qrPrisma.qRInventory.update({
        where: { dppId },
        data: {
            name,
            category,
            brand,
            model,
            status: "UNCLAIMED",
        },
    });

    console.log("Before Main QRInventory upsert");

    const inventory = await prisma.qRInventory.upsert({
        where: {
            dppId,
        },
        update: {
            status: "UNCLAIMED",
            category,
            name,
            brand,
            model,
        },
        create: {
            dppId,
            status: "UNCLAIMED",
            category,
            name,
            brand,
            model,
        },
    });

    console.log("After Main QRInventory upsert");
    console.log(inventory);

    await qrPrisma.qRRecord.update({
        where: {
            dppId,
        },
        data: {
            productId: product.id,
            status: "UNCLAIMED",
            generatedBy: session.user.id,
            activationUrl,
            qrHash: crypto
                .createHash("sha256")
                .update(dppId)
                .digest("hex"),
        },
    });

    await qrPrisma.productSnapshot.create({
        data: {
            dppId,
            productId: product.id,
            productName: product.name,
            category: product.category,
            brand: product.brand,
            model: product.model,
            serialNumber: product.serialNumber,
            status: "UNCLAIMED",
        },
    });

    await prisma.adminAction.create({
        data: {
            adminId: session.user.id,
            productId: product.id,
            actionType: "QR_ISSUED",
            notes: `Blank QR linked to ${product.name}`,
        },
    });

    return NextResponse.json({
        success: true,
        product,
    });
}