import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/server-auth";
import { prisma } from "@/lib/prisma";
import {
  adaptFormToMLPayload,
  MLEvaluationResponse,
} from "@/lib/ml-adapter";
import { AddProductFormData } from "@/components/dashboard/add-product-flow/types";

export const maxDuration = 30; // Extend serverless function timeout if deployed

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const contentType = req.headers.get("content-type") || "";

    let rawFormData: Partial<AddProductFormData> = {};
    const attachedImages: File[] = [];

    // Parse incoming request (multipart/form-data or application/json)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      // Check if wizard form JSON was serialized into a field
      const formPayloadStr = formData.get("formData");
      if (typeof formPayloadStr === "string") {
        try {
          rawFormData = JSON.parse(formPayloadStr);
        } catch {
          rawFormData = {};
        }
      } else {
        // Parse individually from form fields
        for (const [key, value] of formData.entries()) {
          if (value instanceof File) {
            // Collect binary files
            if (value.size > 0 && value.name) {
              attachedImages.push(value);
            }
          } else if (typeof value === "string") {
            try {
              // Parse JSON strings (e.g. selectedDefects, repairedComponents)
              (rawFormData as Record<string, unknown>)[key] = JSON.parse(value);
            } catch {
              (rawFormData as Record<string, unknown>)[key] = value;
            }
          }
        }
      }

      // Check for specifically named files in formData
      const filesToCheck = ["receiptFile", "serviceRecordFile", "image", "file"];
      for (const name of filesToCheck) {
        const file = formData.get(name);
        if (file instanceof File && file.size > 0 && file.name && !attachedImages.includes(file)) {
          attachedImages.push(file);
        }
      }

      // Check for multi-file "images"
      const multiImages = formData.getAll("images");
      for (const item of multiImages) {
        if (item instanceof File && item.size > 0 && item.name && !attachedImages.includes(item)) {
          attachedImages.push(item);
        }
      }
    } else {
      // JSON body
      rawFormData = await req.json();
    }

    // Adapt wizard state into strict FastAPI schema
    const { device, diagnosticData } = adaptFormToMLPayload(
      rawFormData as AddProductFormData
    );

    // Build outgoing multipart/form-data for EcoXchange ML FastAPI backend
    const mlApiUrl = (process.env.ML_API_URL || "http://localhost:8000").replace(/\/+$/, "");
    const targetEndpoint = `${mlApiUrl}/api/v1/evaluate`;

    const outgoingFormData = new FormData();
    outgoingFormData.append("device", JSON.stringify(device));
    outgoingFormData.append("diagnostic_data", JSON.stringify(diagnosticData));

    // Append up to 6 image files with MIME types preserved
    const imagesToUpload = attachedImages.slice(0, 6);
    for (const img of imagesToUpload) {
      if (img && img.size > 0) {
        outgoingFormData.append("images", img, img.name);
      }
    }

    let mlResponse: MLEvaluationResponse | null = null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch(targetEndpoint, {
        method: "POST",
        body: outgoingFormData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        console.error(`ML API responded with HTTP ${response.status}:`, errorText);
        return NextResponse.json(
          {
            error: "ML Inference Engine Error",
            details: `The ML backend responded with status code ${response.status}: ${errorText}`,
            code: "ML_INFERENCE_ERROR",
          },
          { status: response.status >= 500 ? 503 : response.status }
        );
      }

      const rawJson = await response.json();
      let parsed = rawJson;
      if (typeof parsed === "string") {
        try {
          parsed = JSON.parse(parsed);
        } catch {
          // keep as is
        }
      }
      if (parsed && typeof parsed === "object") {
        if ((parsed as any).mlEvaluation) {
          parsed = (parsed as any).mlEvaluation;
        } else if ((parsed as any).evaluation && typeof (parsed as any).evaluation === "object") {
          parsed = (parsed as any).evaluation;
        }
      }
      mlResponse = parsed as MLEvaluationResponse;
    } catch (fetchError: unknown) {
      const err = fetchError as Error;
      console.error("Failed to connect to ML FastAPI backend:", err);

      return NextResponse.json(
        {
          error: "ML Evaluation Service Unavailable",
          details: `The EcoXchange ML FastAPI inference engine is currently offline or unreachable at ${targetEndpoint}. Please verify that the engine is running. (Error: ${err.message})`,
          code: "ML_SERVICE_OFFLINE",
        },
        { status: 503 }
      );
    }

    // Determine normalized evaluation metrics
    const riskLevel =
      mlResponse.risk_level ||
      mlResponse.risk?.risk_level ||
      (mlResponse.manual_verification_required ? "HIGH" : "LOW");

    const manualVerificationReq = Boolean(
      mlResponse.manual_verification_required ?? (riskLevel === "HIGH")
    );

    const estimatedPrice =
      typeof mlResponse.price?.predicted_resale_price === "number"
        ? Math.round(mlResponse.price.predicted_resale_price)
        : typeof (mlResponse as any)?.dpp?.valuation?.predicted_resale_price === "number"
        ? Math.round((mlResponse as any).dpp.valuation.predicted_resale_price)
        : typeof mlResponse.price?.predicted_price === "number"
        ? Math.round(mlResponse.price.predicted_price)
        : typeof mlResponse.price?.estimated_price === "number"
        ? Math.round(mlResponse.price.estimated_price)
        : typeof (mlResponse as Record<string, unknown>).estimatedPrice === "number"
        ? Math.round((mlResponse as Record<string, unknown>).estimatedPrice as number)
        : null;

    // Determine product identity attributes
    const dppId =
      rawFormData.dppId ||
      `ECO-${
        rawFormData.hardwareClass === "LAPTOPS_TABLETS"
          ? "LPT"
          : rawFormData.hardwareClass === "SMARTPHONES"
          ? "PHN"
          : "OTH"
      }-${new Date().getFullYear()}-${Math.random()
        .toString(36)
        .substring(2, 9)
        .toUpperCase()}`;

    let category = "PHONE";
    if (rawFormData.hardwareClass === "LAPTOPS_TABLETS") category = "LAPTOP";
    else if (rawFormData.hardwareClass === "ENTERPRISE_GEAR" || rawFormData.hardwareClass === "OTHER")
      category = "OTHER";

    const conditionScore = rawFormData.isFlawless
      ? 98.0
      : Number((device.physical_condition_score * 100).toFixed(1));

    const trustScore =
      rawFormData.hasReceipt === "yes"
        ? 92.0
        : rawFormData.acquisitionType === "new"
        ? 85.0
        : 75.0;

    // Safely resolve valid user owner to avoid foreign key constraint violations
    let validUserId: string | null = null;
    if (session?.user) {
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
          // Auto-heal session: create the missing user record
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
    }

    // Upsert or update product record in Prisma
    const product = await prisma.$transaction(async (tx) => {
      const record = await tx.product.upsert({
        where: { dppId },
        update: {
          riskLevel,
          estimatedPrice,
          manualVerificationReq,
          mlEvaluation: mlResponse as any,
          conditionScore,
          trustScore,
          qrCodeUrl: rawFormData.qrPngUrl || undefined,
          ...(validUserId ? { currentOwnerId: validUserId } : {}),
        },
        create: {
          dppId,
          name: rawFormData.modelName || `${device.brand} ${device.model}`,
          brand: device.brand || null,
          model: device.model || null,
          category: category as any,
          serialNumber: rawFormData.serialNumberOrImei || null,
          status: "ACTIVE",
          conditionScore,
          trustScore,
          riskLevel,
          estimatedPrice,
          manualVerificationReq,
          mlEvaluation: mlResponse as any,
          currentOwnerId: validUserId,
          activatedAt: new Date(),
          qrCodeUrl: rawFormData.qrPngUrl || null,
        },
      });

      if (validUserId) {
        const existingHistory = await tx.ownershipHistory.findFirst({
          where: { productId: record.id },
        });
        if (!existingHistory) {
          await tx.ownershipHistory.create({
            data: {
              productId: record.id,
              newOwnerId: validUserId,
              transferType: "ACTIVATION",
              notes: "Digital Product Passport issued via EcoXchange ML Intake Engine",
            },
          });
        }
      }

      return record;
    });

    return NextResponse.json({
      success: true,
      mlEvaluation: mlResponse,
      evaluation: mlResponse,
      product,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Unhandled error in /api/products/evaluate:", err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
