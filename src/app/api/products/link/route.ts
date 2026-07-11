import { NextResponse } from "next/server";
import { auth } from "@/lib/server-auth";
import { prisma } from "@/lib/prisma";
import { qrPrisma } from "@/lib/qr-prisma";
import {
    generateQrPayload,
    generateQrPng,
    generateQrSvg,
    generateQrSticker,
} from "@/lib/qr";
import crypto from "crypto";

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
    } = body;
    if (!dppId) {
        return NextResponse.json(
            { error: "DPP ID required" },
            { status: 400 }
        );
    }

    const qrInventory = await qrPrisma.qRInventory.findUnique({
        where: { dppId },
    });

    if (!qrInventory) {
        return NextResponse.json(
            { error: "QR not found" },
            { status: 404 }
        );
    }

    if (qrInventory.status !== "BLANK") {
        return NextResponse.json(
            { error: "QR has already been linked" },
            { status: 409 }
        );
    }

    const existingProduct = await prisma.product.findUnique({
        where: { dppId },
    });

    if (existingProduct) {
        return NextResponse.json(
            { error: "Product already exists" },
            { status: 409 }
        );
    }
    const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

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

        await tx.qRInventory.update({
            where: {
                dppId,
            },
            data: {
                status: "UNCLAIMED",

                category,
                name,
                brand,
                model,
            },
        });

        return product;
    });
    await qrPrisma.qRInventory.update({
        where: {
            dppId,
        },
        data: {
            status: "UNCLAIMED",

            category,
            name,
            brand,
            model,
        },
    });

    await qrPrisma.qRRecord.create({
        data: {
            dppId,
            productId: product.id,
            activationUrl,
            generatedBy: session.user.id,
            status: "ACTIVE",
            qrHash,
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
            notes: `Blank QR linked to ${product.name} (${category})`,
        },
    });

    return NextResponse.json({
        success: true,
        product,
        message: "Blank QR linked successfully",
    });
}