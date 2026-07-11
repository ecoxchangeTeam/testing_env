import { NextResponse } from "next/server";
import { auth } from "@/lib/server-auth";
import { qrPrisma } from "@/lib/qr-prisma";
import {
    generateDppId,
    generateQrPng,
    generateQrSvg,
    generateQrSticker,
    generateQrPayload,
} from "@/lib/qr";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

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

    const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ??
        "http://localhost:3000";

    const dppId = generateDppId("BLANK");

    const qrPayload = generateQrPayload(
        dppId,
        baseUrl
    );

    const activationUrl = `${baseUrl}/activate/${dppId}`;

    const qrHash = crypto
        .createHash("sha256")
        .update(qrPayload)
        .digest("hex");

    const [qrPng, qrSvg, qrSticker] =
        await Promise.all([
            generateQrPng(dppId, baseUrl),
            generateQrSvg(dppId, baseUrl),
            generateQrSticker(dppId, baseUrl),
        ]);

    await qrPrisma.qRInventory.create({
        data: {
            dppId,
            status: "UNUSED",
        },
    });
    await prisma.qRInventory.create({
        data: {
            dppId,
            status: "UNUSED",
        },
    });

    await qrPrisma.qRRecord.create({
        data: {
            dppId,
            productId: "BLANK",
            activationUrl,
            generatedBy: session.user.id,
            status: "UNUSED",
            qrHash,
        },
    });

    return NextResponse.json({
        success: true,
        dppId,
        qrPng,
        qrSvg,
        qrSticker,
    });
}