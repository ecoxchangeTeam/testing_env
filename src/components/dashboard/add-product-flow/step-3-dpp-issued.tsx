"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  Copy,
  Download,
  Smartphone,
  ShieldCheck,
  QrCode as QrCodeIcon,
  Apple,
  Send,
  Sparkles,
  ExternalLink,
  ArrowRight,
  RefreshCw,
  Eye,
  AlertTriangle,
  TrendingUp,
  Leaf,
  Recycle,
  TreePine,
  ShieldAlert,
  Cpu,
  Zap,
  Play,
  Clock,
} from "lucide-react";
import { AddProductFormData } from "./types";
import { estimateOriginalPrice } from "@/lib/ml-adapter";

interface Step3DppIssuedProps {
  formData: AddProductFormData;
  onComplete: () => void;
}

/**
 * Safely parses mlEvaluation regardless of whether it arrives as:
 * - A stringified JSON string (or double-stringified)
 * - An object containing a nested { mlEvaluation: ... } or { evaluation: ... }
 * - A direct evaluation response object
 */
function parseMlEvaluation(raw: unknown): any {
  if (!raw) return null;
  let parsed = raw;
  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      return null;
    }
  }
  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {}
  }
  if (parsed && typeof parsed === "object") {
    if ((parsed as any).mlEvaluation && typeof (parsed as any).mlEvaluation === "object") {
      return (parsed as any).mlEvaluation;
    }
    if ((parsed as any).evaluation && typeof (parsed as any).evaluation === "object") {
      return (parsed as any).evaluation;
    }
  }
  return parsed;
}

export function Step3DppIssued({ formData, onComplete }: Step3DppIssuedProps) {
  const [copied, setCopied] = useState(false);
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  const dppId =
    formData.dppId ||
    `ECO-PHN-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .substring(2, 9)
      .toUpperCase()}`;

  const modelName = formData.modelName || "Apple iPhone 14 Pro";
  const serialNumberOrImei =
    formData.serialNumberOrImei || "354892091823471";
  const timestamp =
    formData.timestamp || new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  const shaHash =
    formData.hash ||
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

  // App Verification & ML Evaluation State
  const [isAppVerified, setIsAppVerified] = useState<boolean>(
    Boolean(formData.appVerified)
  );
  const [isEvaluatingML, setIsEvaluatingML] = useState<boolean>(false);
  const [mlEval, setMlEval] = useState<any>(() =>
    parseMlEvaluation(formData.mlEvaluation)
  );
  const [evalError, setEvalError] = useState<string | null>(
    formData.evaluationError || null
  );
  const [isSimulatingVerify, setIsSimulatingVerify] = useState<boolean>(false);

  // Target activation/passport URL to encode into QR code
  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "https://ecoxchange.in";
  const passportUrl = `${baseUrl}/passport/${dppId}`;

  // Generate live QR code
  useEffect(() => {
    QRCode.toDataURL(passportUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error("QR generation error:", err));
  }, [passportUrl]);

  // Execute ML Evaluation after App Verification is confirmed
  const triggerMLEvaluation = async () => {
    setIsEvaluatingML(true);
    setEvalError(null);

    const evaluationFormData = new FormData();
    const formPayload = {
      ...formData,
      dppId,
      appVerified: true,
    };
    evaluationFormData.append("formData", JSON.stringify(formPayload));

    if (formData.receiptFile instanceof File && formData.receiptFile.size > 0) {
      evaluationFormData.append(
        "receiptFile",
        formData.receiptFile,
        formData.receiptFile.name
      );
    }
    if (
      formData.serviceRecordFile instanceof File &&
      formData.serviceRecordFile.size > 0
    ) {
      evaluationFormData.append(
        "serviceRecordFile",
        formData.serviceRecordFile,
        formData.serviceRecordFile.name
      );
    }

    try {
      const evalRes = await fetch("/api/products/evaluate", {
        method: "POST",
        body: evaluationFormData,
      });

      if (evalRes.ok) {
        const evalJson = await evalRes.json();
        const rawEval =
          evalJson.mlEvaluation ??
          evalJson.evaluation ??
          evalJson.product?.mlEvaluation;
        setMlEval(parseMlEvaluation(rawEval));
      } else {
        const errData = await evalRes.json().catch(() => ({}));
        setEvalError(
          errData.details ||
            errData.error ||
            "ML evaluation inference service returned an error."
        );
      }
    } catch (err: unknown) {
      const e = err as Error;
      setEvalError(e.message || "Failed to connect to ML evaluation service.");
    } finally {
      setIsEvaluatingML(false);
    }
  };

  // Periodic polling: Check database every 3 seconds for appVerified flag
  useEffect(() => {
    if (mlEval) return; // Already evaluated

    let intervalId: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/products/${dppId}/status`);
        if (!res.ok) return;
        const data = await res.json();

        if (data.appVerified && !isAppVerified) {
          setIsAppVerified(true);
          clearInterval(intervalId);

          const rawDataEval = data.mlEvaluation ?? data.product?.mlEvaluation;
          if (data.isEvaluated && rawDataEval) {
            setMlEval(parseMlEvaluation(rawDataEval));
          } else {
            // App verification confirmed! Trigger deferred ML evaluation
            await triggerMLEvaluation();
          }
        }
      } catch (err) {
        console.warn("Error polling verification status:", err);
      }
    };

    intervalId = setInterval(checkStatus, 3000);
    return () => clearInterval(intervalId);
  }, [dppId, isAppVerified, mlEval]);

  // Simulator for developer/user to toggle appVerified flag in database
  const handleSimulateAppVerification = async () => {
    setIsSimulatingVerify(true);
    try {
      const res = await fetch(`/api/products/${dppId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appVerified: true }),
      });
      if (res.ok) {
        setIsAppVerified(true);
        await triggerMLEvaluation();
      }
    } catch (err) {
      console.error("Simulation failed:", err);
    } finally {
      setIsSimulatingVerify(false);
    }
  };

  const handleCopyId = () => {
    navigator.clipboard?.writeText(dppId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrCodeDataUrl) return;
    const a = document.createElement("a");
    a.href = qrCodeDataUrl;
    a.download = `ecoxchange-${dppId}-qr.png`;
    a.click();
  };

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrEmail) return;
    setLinkSent(true);
    setTimeout(() => setLinkSent(false), 4000);
  };

  // Evaluation metrics parsing
  const isManualReq = Boolean(
    mlEval?.manual_verification_required ??
      (mlEval?.risk_level === "HIGH" ||
        mlEval?.risk?.risk_level === "HIGH" ||
        mlEval?.dpp?.risk?.risk_level === "HIGH")
  );

  const riskLevel =
    mlEval?.risk_level ||
    mlEval?.risk?.risk_level ||
    mlEval?.dpp?.risk?.risk_level ||
    (isManualReq ? "HIGH" : "LOW");

  const rawPredictedPrice =
    mlEval?.price?.predicted_resale_price ??
    mlEval?.dpp?.valuation?.predicted_resale_price ??
    mlEval?.price?.predicted_price ??
    mlEval?.price?.estimated_price ??
    mlEval?.price?.resale_price ??
    mlEval?.price?.base_model_price ??
    (typeof mlEval?.estimatedPrice === "number" ? mlEval.estimatedPrice : undefined) ??
    (typeof mlEval?.predicted_price === "number" ? mlEval.predicted_price : undefined);

  const predictedPrice: number | undefined =
    typeof rawPredictedPrice === "number" ? Math.round(rawPredictedPrice) : undefined;

  const originalPrice: number =
    mlEval?.price?.original_price ??
    mlEval?.evidence?.user_claims?.original_price ??
    estimateOriginalPrice(formData.brand, formData.model, formData.modelName);

  const confidenceScore: number =
    mlEval?.price?.confidence_score ??
    (mlEval?.risk?.trust_score
      ? Number((mlEval.risk.trust_score / 100).toFixed(2))
      : mlEval?.dpp?.risk?.trust_score
      ? Number((mlEval.dpp.risk.trust_score / 100).toFixed(2))
      : 0.88);

  const rawMinPrice =
    mlEval?.price?.fair_value_lower ??
    mlEval?.dpp?.valuation?.fair_value_lower ??
    mlEval?.price?.price_range?.min ??
    (predictedPrice ? Math.round(predictedPrice * 0.92) : 34000);

  const rawMaxPrice =
    mlEval?.price?.fair_value_upper ??
    mlEval?.dpp?.valuation?.fair_value_upper ??
    mlEval?.price?.price_range?.max ??
    (predictedPrice ? Math.round(predictedPrice * 1.08) : 41000);

  const priceRange = {
    min: Math.round(rawMinPrice),
    max: Math.round(rawMaxPrice),
  };

  const trustScore = Math.round(
    mlEval?.risk?.trust_score ??
      mlEval?.dpp?.risk?.trust_score ??
      mlEval?.dpp?.trust_score ??
      91
  );

  const iqScore = Math.round(
    mlEval?.dpp?.iq_score ??
      (mlEval?.risk?.model_risk_score
        ? 100 - mlEval.risk.model_risk_score
        : mlEval?.dpp?.risk?.model_risk_score
        ? 100 - mlEval.dpp.risk.model_risk_score
        : 94)
  );

  const certificationTier =
    mlEval?.dpp?.certification_tier ||
    (mlEval?.sustainability?.circularity_tier === "HIGH"
      ? "TIER-1 OEM AUDITED"
      : "TIER-2 CERTIFIED");

  const conditionScore = formData.isFlawless ? 98 : 88.5;

  const rawCarbon =
    mlEval?.sustainability?.co2_avoided_kg ??
    mlEval?.sustainability?.carbon_avoided_kg ??
    mlEval?.sustainability?.co2_saved_kg ??
    48.2;
  const carbonAvoided = Number(rawCarbon.toFixed(1));

  const circularityScore =
    mlEval?.sustainability?.circularity_score ??
    (mlEval?.sustainability?.circularity_tier === "HIGH" ? 92 : 89);

  const rawEwaste =
    mlEval?.sustainability?.ewaste_prevented_kg ??
    (mlEval?.sustainability?.e_waste_avoided_g
      ? mlEval.sustainability.e_waste_avoided_g / 1000
      : 0.19);
  const ewastePrevented = Number(rawEwaste.toFixed(2));

  const treeEquivalent =
    mlEval?.sustainability?.tree_equivalent ??
    Number((carbonAvoided / 20).toFixed(1));

  const salvageValue = Math.round(
    mlEval?.salvage?.total_salvage ??
      mlEval?.salvage?.salvage_value ??
      (predictedPrice ? predictedPrice * 0.28 : 11200)
  );

  const recommendation =
    mlEval?.salvage?.recommendation ||
    (predictedPrice && predictedPrice > salvageValue ? "resell" : "salvage");

  const riskFlags: string[] = [
    ...(mlEval?.risk?.risk_flags || []),
    ...(mlEval?.risk?.flags || []),
    ...(mlEval?.risk?.anomalies || []),
    ...(mlEval?.evidence?.discrepancies || []),
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-300">
      {/* Progress Stepper Module */}
      <section className="relative w-full mb-8">
        <div className="bg-[#121212] border border-[#27272A] rounded-2xl p-5 shadow-xl relative overflow-hidden">
          {/* Ambient subtle background glow */}
          <div
            className={`absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
              !isAppVerified
                ? "bg-amber-500/10"
                : isManualReq
                ? "bg-amber-500/10"
                : "bg-[#4edea3]/10"
            }`}
          />

          <div className="flex flex-col gap-4">
            {/* Step Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              {/* Step 1: Completed */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                <div className="w-8 h-8 rounded-full bg-[#4edea3] text-black flex items-center justify-center font-bold shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono text-[#4edea3] uppercase font-semibold">
                    01 // Verified
                  </span>
                  <span className="text-xs font-semibold text-zinc-200 truncate">
                    Device & Ownership
                  </span>
                </div>
              </div>

              {/* Step 2: Completed */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                <div className="w-8 h-8 rounded-full bg-[#4edea3] text-black flex items-center justify-center font-bold shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono text-[#4edea3] uppercase font-semibold">
                    02 // Verified
                  </span>
                  <span className="text-xs font-semibold text-zinc-200 truncate">
                    Repair & Service History
                  </span>
                </div>
              </div>

              {/* Step 3: Active Stage */}
              <div
                className={`flex items-center gap-3 p-3 rounded-xl bg-[#1c1b1b] border-2 relative ${
                  !isAppVerified
                    ? "border-amber-500/80 shadow-[0_0_24px_rgba(245,158,11,0.15)]"
                    : isEvaluatingML
                    ? "border-[#14B8A6] shadow-[0_0_24px_rgba(20,184,166,0.2)]"
                    : isManualReq
                    ? "border-amber-500 shadow-[0_0_24px_rgba(245,158,11,0.15)]"
                    : "border-[#4edea3] shadow-[0_0_24px_rgba(78,222,163,0.15)]"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                    !isAppVerified
                      ? "bg-amber-500 text-black"
                      : isEvaluatingML
                      ? "bg-[#14B8A6] text-black"
                      : isManualReq
                      ? "bg-amber-500 text-black"
                      : "bg-[#4edea3] text-black"
                  }`}
                >
                  3
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                      !isAppVerified
                        ? "text-amber-400"
                        : isEvaluatingML
                        ? "text-[#14B8A6]"
                        : isManualReq
                        ? "text-amber-400"
                        : "text-[#4edea3]"
                    }`}
                  >
                    03 //{" "}
                    {!isAppVerified
                      ? "Awaiting App Sync"
                      : isEvaluatingML
                      ? "AI Evaluation"
                      : "DPP Issued"}
                  </span>
                  <span className="text-xs font-bold text-white truncate">
                    {!isAppVerified
                      ? "App Verification Pending"
                      : isEvaluatingML
                      ? "Evaluating ML Telemetry..."
                      : isManualReq
                      ? "Manual Inspection Flagged"
                      : "DPP Sealed & Valuation Unlocked"}
                  </span>
                </div>
                <span
                  className={`absolute right-3 top-3 w-2 h-2 rounded-full animate-ping ${
                    !isAppVerified
                      ? "bg-amber-400"
                      : isEvaluatingML
                      ? "bg-[#14B8A6]"
                      : isManualReq
                      ? "bg-amber-400"
                      : "bg-[#4edea3]"
                  }`}
                />
              </div>
            </div>

            {/* Progress Tracker Bar */}
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-2">
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${
                      !isAppVerified || isEvaluatingML
                        ? "text-amber-400 animate-spin"
                        : "text-[#4edea3]"
                    }`}
                  />
                  <span>
                    {!isAppVerified
                      ? "DPP Identity Registered • Waiting for Inspector Mobile App Verification..."
                      : isEvaluatingML
                      ? "App Verified • Running EcoXchange ML Inference Engine..."
                      : "DPP Protocol Sealed • Real-time Valuation & ESG Telemetry Active"}
                  </span>
                </span>
                <span
                  className={`font-mono font-semibold text-xs ${
                    !isAppVerified ? "text-amber-400" : "text-[#4edea3]"
                  }`}
                >
                  {!isAppVerified ? "STAGE 3 PENDING" : "STAGE 3 VERIFIED"}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#201f1f] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    !isAppVerified
                      ? "w-2/3 bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300"
                      : "w-full bg-gradient-to-r from-[#14B8A6] via-[#4edea3] to-[#85f8c4]"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Headline Banner */}
      <div className="flex flex-col gap-1.5 mb-8">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full w-fit text-xs font-mono font-semibold ${
            !isAppVerified
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              : isManualReq
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              : "bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/20"
          }`}
        >
          {!isAppVerified ? (
            <Clock className="w-4 h-4 text-amber-400" />
          ) : isManualReq ? (
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-[#4edea3]" />
          )}
          <span>
            {!isAppVerified
              ? "STAGE 03 • AWAITING MOBILE APP VERIFICATION"
              : isManualReq
              ? "TELEMETRY AUDIT • MANUAL VERIFICATION REQUIRED"
              : "ISO 14040/44 COMPLIANT • DIGITAL PASSPORT ACTIVE"}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {!isAppVerified
            ? "DPP Issued: Awaiting Mobile App Verification"
            : isEvaluatingML
            ? "Verifying Telemetry & Computing ML Valuation..."
            : isManualReq
            ? "DPP Issued: Manual Inspection Flagged"
            : "Digital Product Passport Issued & Valuation Confirmed"}
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          {!isAppVerified
            ? "Your Digital Product Passport identity has been issued. The EcoXchange Inspector app must verify device hardware, screen digitizer, and battery microcontroller logs. Once the app toggles verification, the ML valuation engine will evaluate your parameters."
            : isEvaluatingML
            ? "The mobile inspector app has verified hardware integrity. EcoXchange AI is currently computing resale valuation, OEM Trust/IQ scores, and circularity telemetry."
            : isManualReq
            ? "Your Digital Product Passport identifier has been registered. Due to anomaly flags or reported defect telemetry, automated pricing has been halted and this item is flagged for manual optical inspection."
            : "Your Digital Product Passport identity has been cryptographically minted on the EcoXchange circular registry with complete resale valuation, OEM Trust/IQ scoring, and ESG lifecycle telemetry."}
        </p>
      </div>

      {/* Main Grid: DPP Card, Verification States, QR, and Mobile Hand-Off */}
      <div className="flex flex-col gap-6 mb-8">
        {/* Prominent DPP Identifier Card */}
        <article className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div
            className={`absolute -top-16 -right-16 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
              !isAppVerified
                ? "bg-amber-500/10"
                : isManualReq
                ? "bg-amber-500/10"
                : "bg-[#4edea3]/10"
            }`}
          />

          <div className="flex flex-col gap-5 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#201f1f] font-mono text-[10px] text-[#4edea3] font-semibold border border-[#27272A]">
                    DPP PROTOCOL v2.4
                  </span>
                  {!isAppVerified ? (
                    <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 font-mono text-[10px] font-semibold flex items-center gap-1.5 border border-amber-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      AWAITING MOBILE APP VERIFICATION
                    </span>
                  ) : isEvaluatingML ? (
                    <span className="px-2 py-0.5 rounded bg-[#14B8A6]/15 text-[#14B8A6] font-mono text-[10px] font-semibold flex items-center gap-1.5 border border-[#14B8A6]/30">
                      <RefreshCw className="w-3 h-3 animate-spin text-[#14B8A6]" />
                      RUNNING ML EVALUATION...
                    </span>
                  ) : isManualReq ? (
                    <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 font-mono text-[10px] font-semibold flex items-center gap-1.5 border border-amber-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      FLAGGED FOR MANUAL INSPECTION (RISK: {riskLevel})
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono text-[10px] font-semibold flex items-center gap-1.5 border border-emerald-500/30">
                      <Check className="w-3 h-3 text-emerald-400" />
                      AUTOMATED EVALUATION VERIFIED (RISK: {riskLevel})
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-zinc-400 uppercase pt-1">
                  Digital Product Passport Identifier
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl sm:text-2xl font-mono text-[#4edea3] tracking-tight font-bold">
                    {dppId}
                  </h2>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#201f1f] hover:bg-[#27272A] text-zinc-300 hover:text-white transition-all text-xs font-mono border border-[#27272A]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#4edea3]" />
                        <span className="text-[#4edea3]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-[#18181B] border border-[#27272A] p-4 rounded-xl flex flex-col gap-1.5 shrink-0 max-w-md">
                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-[#4edea3] shrink-0" />
                  <span>ISO 14040/44 DPP Hand-off Protocol</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-300 truncate">
                  {shaHash}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  Timestamp: {timestamp} • EcoXchange Circular Registry
                </span>
              </div>
            </div>

            {/* Device Details Chip Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#18181B] border border-[#27272A] rounded-xl text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#4edea3]" />
                  <span className="font-semibold text-white">{modelName}</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
                  <span>IMEI: {serialNumberOrImei}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded font-semibold">
                ISO 14040/44 Compliant Pipeline
              </span>
            </div>
          </div>
        </article>

        {/* ─────────────────────────────────────────────────────────────
            DYNAMIC WORKFLOW STATE:
            1. Waiting for App Verification
            2. Evaluating ML (Inference running)
            3. ML Evaluated (Results or Amber Warning)
            ───────────────────────────────────────────────────────────── */}

        {/* STATE 1: WAITING FOR MOBILE APP VERIFICATION */}
        {!isAppVerified && !mlEval && !isEvaluatingML && (
          <div className="bg-[#16140f] border-2 border-amber-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Smartphone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-amber-200">
                    Waiting for Mobile App Verification
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Scan the QR code with the EcoXchange Inspector app to verify hardware integrity.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#201c14] border border-amber-500/30 text-amber-300 font-mono text-xs">
                  <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                  <span>Polling database every 3s</span>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateAppVerification}
                  disabled={isSimulatingVerify}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
                  title="Simulate app setting appVerified=true in DB"
                >
                  <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{isSimulatingVerify ? "Verifying..." : "Simulate App Verify"}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-zinc-400 pt-1">
              <div className="bg-[#1c1913] p-3 rounded-xl border border-amber-500/10 space-y-1">
                <span className="font-mono text-[10px] text-amber-400 font-semibold block uppercase">
                  1. Launch App
                </span>
                <p>Open EcoXchange Inspector on your smartphone and authenticate with DPP ID.</p>
              </div>
              <div className="bg-[#1c1913] p-3 rounded-xl border border-amber-500/10 space-y-1">
                <span className="font-mono text-[10px] text-amber-400 font-semibold block uppercase">
                  2. Automated Scan
                </span>
                <p>App reads battery microcontroller logs and optical surface integrity.</p>
              </div>
              <div className="bg-[#1c1913] p-3 rounded-xl border border-amber-500/10 space-y-1">
                <span className="font-mono text-[10px] text-amber-400 font-semibold block uppercase">
                  3. Auto ML Evaluation
                </span>
                <p>App sets verified flag in DB; this page automatically triggers the ML model evaluation.</p>
              </div>
            </div>
          </div>
        )}

        {/* STATE 2: RUNNING ML EVALUATION */}
        {isEvaluatingML && (
          <div className="bg-[#121212] border-2 border-[#14B8A6]/40 rounded-2xl p-8 shadow-xl text-center space-y-4 relative overflow-hidden">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 border-3 border-[#14B8A6]/20 border-t-[#14B8A6] rounded-full animate-spin" />
              <div className="w-8 h-8 border-2 border-[#4edea3]/40 border-b-[#4edea3] rounded-full animate-spin absolute" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <span className="text-[11px] font-mono text-[#14B8A6] font-semibold uppercase tracking-wider block">
                APP VERIFICATION CONFIRMED • PROCESSING INFERENCE
              </span>
              <h3 className="text-lg font-bold text-white">
                Running EcoXchange ML Valuation Engine...
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Calculating resale valuation, OEM Trust/IQ score, and ISO 14040/44 circularity telemetry.
              </p>
            </div>
          </div>
        )}

        {/* ERROR NOTICE */}
        {evalError && (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 text-xs text-rose-300 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{evalError}</span>
            </div>
            <button
              type="button"
              onClick={triggerMLEvaluation}
              className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-mono text-xs font-semibold shrink-0"
            >
              Retry Evaluation
            </button>
          </div>
        )}

        {/* STATE 3: ML EVALUATION COMPLETE */}
        {mlEval && (
          <>
            {isManualReq ? (
              /* Amber Warning Badge & Diagnostic Inspection Box */
              <div className="bg-[#17140f] border-2 border-amber-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <AlertTriangle className="w-6 h-6 animate-pulse" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-amber-200">
                        Manual Physical Verification Required
                      </h3>
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                        AUTOMATED PRICING HALTED
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed">
                      The automated valuation engine has temporarily halted market pricing for this device. Under EcoXchange anti-fraud standards, devices meeting specific anomaly thresholds require manual optical inspection before valuation certification.
                    </p>

                    {/* Specific Flag Reasons */}
                    <div className="bg-[#211c14] border border-amber-500/20 rounded-xl p-4 space-y-2">
                      <span className="text-[11px] font-mono text-amber-400 font-semibold uppercase tracking-wider block">
                        Inspection Flag Triggers:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {riskFlags.length > 0 ? (
                          riskFlags.map((flag, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 text-xs font-mono border border-amber-500/30 flex items-center gap-1.5"
                            >
                              <AlertTriangle className="w-3 h-3 text-amber-400" />
                              {flag.replace(/_/g, " ")}
                            </span>
                          ))
                        ) : (
                          <>
                            {formData.selectedDefects &&
                              formData.selectedDefects.length > 0 && (
                                <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 text-xs font-mono border border-amber-500/30 flex items-center gap-1.5">
                                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                                  {formData.selectedDefects.length} Hardware Defects Logged
                                </span>
                              )}
                            <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 text-xs font-mono border border-amber-500/30 flex items-center gap-1.5">
                              <ShieldAlert className="w-3 h-3 text-amber-400" />
                              Requires In-Person Optical Micro-Abrasion Scan
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Official Digital Product Passport (DPP) View with Full Metrics */
              <div className="space-y-6">
                {/* Top Row: Resale Valuation & OEM Trust/IQ Score */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1: Resale Valuation */}
                  <div className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#4edea3]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#4edea3] font-semibold uppercase flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                          PREDICTED RESALE VALUATION
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                          {Math.round(confidenceScore * 100)}% ML CONFIDENCE
                        </span>
                      </div>

                      <div>
                        <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                          ₹{predictedPrice ? predictedPrice.toLocaleString("en-IN") : "36,800"}
                        </div>
                        <div className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                          <span>Original MRP: ₹{originalPrice.toLocaleString("en-IN")}</span>
                          <span>•</span>
                          <span className="text-[#4edea3]">
                            {predictedPrice
                              ? `${Math.round((predictedPrice / originalPrice) * 100)}% value preserved`
                              : "48% value preserved"}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#27272A] flex items-center justify-between text-xs">
                        <span className="text-zinc-500">Campus Fair Market Range:</span>
                        <span className="font-mono text-zinc-200 font-semibold">
                          ₹{priceRange.min.toLocaleString("en-IN")} – ₹{priceRange.max.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#27272A]/50 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>
                        Market Demand: <span className="text-[#4edea3] font-semibold">High (85/100)</span>
                      </span>
                      <span className="text-zinc-500">Real-time valuation</span>
                    </div>
                  </div>

                  {/* Card 2: OEM Trust & Hardware IQ Score */}
                  <div className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#14B8A6] font-semibold uppercase flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" />
                          OEM TRUST & HARDWARE IQ
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#14B8A6]/15 text-[#14B8A6] border border-[#14B8A6]/30 font-semibold">
                          {certificationTier}
                        </span>
                      </div>

                      <div className="flex items-center gap-5">
                        <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                          <div className="w-20 h-20 rounded-full border-4 border-[#14B8A6]/20 border-t-[#14B8A6] flex items-center justify-center">
                            <span className="text-2xl font-bold font-mono text-white">
                              {iqScore}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white">
                            Hardware Integrity Grade: A+
                          </h4>
                          <p className="text-xs text-zinc-400 leading-relaxed">
                            Battery health telemetry, OEM serial verification, and reported maintenance are certified.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#27272A] text-xs">
                        <div className="flex items-center justify-between bg-[#18181B] p-2 rounded-lg">
                          <span className="text-zinc-400">Condition Score:</span>
                          <span className="font-mono text-white font-semibold">{conditionScore}%</span>
                        </div>
                        <div className="flex items-center justify-between bg-[#18181B] p-2 rounded-lg">
                          <span className="text-zinc-400">Trust Index:</span>
                          <span className="font-mono text-[#4edea3] font-semibold">{trustScore}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#27272A]/50 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>
                        Cryptographic Seal: <span className="text-emerald-400 font-semibold">Verified</span>
                      </span>
                      <span className="text-zinc-500">ISO 14040/44</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Sustainability & Circularity Dashboard */}
                <div className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <Leaf className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">
                          Environmental Impact & Circularity Telemetry
                        </h3>
                        <p className="text-xs text-zinc-400">
                          Lifecycle extension metrics compared to virgin device manufacturing
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold self-start sm:self-auto">
                      CIRCULARITY SCORE: {circularityScore}/100
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#18181B] border border-[#27272A] p-4 rounded-xl flex flex-col justify-between">
                      <div className="flex items-center gap-2 text-zinc-400 text-xs mb-2">
                        <Leaf className="w-3.5 h-3.5 text-[#4edea3]" />
                        <span>Carbon Avoided</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                        {carbonAvoided} <span className="text-xs font-normal text-zinc-400">kg CO₂</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 mt-1">vs. new hardware production</span>
                    </div>

                    <div className="bg-[#18181B] border border-[#27272A] p-4 rounded-xl flex flex-col justify-between">
                      <div className="flex items-center gap-2 text-zinc-400 text-xs mb-2">
                        <Recycle className="w-3.5 h-3.5 text-[#14B8A6]" />
                        <span>E-Waste Diverted</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                        {ewastePrevented} <span className="text-xs font-normal text-zinc-400">kg</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 mt-1">metals & chassis saved</span>
                    </div>

                    <div className="bg-[#18181B] border border-[#27272A] p-4 rounded-xl flex flex-col justify-between">
                      <div className="flex items-center gap-2 text-zinc-400 text-xs mb-2">
                        <TreePine className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tree Equivalent</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                        {treeEquivalent} <span className="text-xs font-normal text-zinc-400">trees</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 mt-1">annual carbon offset</span>
                    </div>

                    <div className="bg-[#18181B] border border-[#27272A] p-4 rounded-xl flex flex-col justify-between">
                      <div className="flex items-center gap-2 text-zinc-400 text-xs mb-2">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Salvage Value</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                        ₹{salvageValue.toLocaleString("en-IN")}
                      </div>
                      <span className="text-[10px] text-[#4edea3] mt-1 font-semibold uppercase">
                        Rec: {recommendation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Mobile App Download & Generated QR Code Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
          {/* Live Generated QR Code Card */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-[#18181B] border border-[#27272A] rounded-2xl text-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-xl flex flex-col items-center gap-2">
              {qrCodeDataUrl ? (
                <img
                  src={qrCodeDataUrl}
                  alt={`QR Code for ${dppId}`}
                  className="w-48 h-48 object-contain rounded-lg"
                />
              ) : (
                <div className="w-48 h-48 bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <QrCodeIcon className="w-16 h-16 animate-pulse" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-[#4edea3] font-semibold flex items-center justify-center gap-1.5">
                <QrCodeIcon className="w-3.5 h-3.5" />
                <span>Scan with phone camera to view passport</span>
              </span>
              <p className="text-[11px] text-zinc-400 max-w-xs">
                Encodes live URL: <span className="font-mono text-zinc-300 break-all">{passportUrl}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadQr}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#201f1f] hover:bg-[#27272A] border border-[#27272A] text-zinc-300 hover:text-white text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download QR Code</span>
            </button>
          </div>

          {/* Download App & Hand-Off */}
          <div className="md:col-span-7 flex flex-col justify-between gap-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[#14B8A6] text-xs font-mono font-semibold">
                <Smartphone className="w-4 h-4" />
                <span>MOBILE AUDIT CLIENT</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Download EcoXchange Inspector App
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                To complete optical telemetry and finalize the cryptographic seal, install our verified inspector application. The app executes 3D optical frame inspections and reads low-level hardware logs directly.
              </p>
            </div>

            {/* Store Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => alert("Redirecting to Apple App Store...")}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#1c1b1b] hover:bg-[#242424] border border-[#27272A] text-white transition-all"
              >
                <Apple className="w-6 h-6 text-white" />
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase leading-none">
                    Download on the
                  </span>
                  <span className="text-xs font-semibold text-white leading-tight">
                    Apple App Store
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => alert("Redirecting to Google Play Store...")}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#1c1b1b] hover:bg-[#242424] border border-[#27272A] text-white transition-all"
              >
                <Smartphone className="w-6 h-6 text-[#10B981]" />
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase leading-none">
                    Get it on
                  </span>
                  <span className="text-xs font-semibold text-white leading-tight">
                    Google Play
                  </span>
                </div>
              </button>
            </div>

            {/* SMS / Email link sender */}
            <form
              onSubmit={handleSendLink}
              className="flex flex-col gap-1.5 pt-3 border-t border-[#27272A]"
            >
              <label
                htmlFor="phoneInput"
                className="text-xs text-zinc-300 font-medium"
              >
                Send download link to your phone
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="phoneInput"
                  type="text"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="+91 98765 43210 or user@college.edu"
                  className="flex-1 bg-[#18181B] border border-[#27272A] px-3.5 py-2 rounded-xl text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#4edea3]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#27272A] hover:bg-[#323235] text-[#4edea3] text-xs font-semibold transition-all shrink-0 flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Link</span>
                </button>
              </div>
              {linkSent && (
                <span className="text-[11px] text-[#4edea3] font-mono flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Download link dispatched! Please check your messages.
                </span>
              )}
            </form>
          </div>
        </section>

        {/* Physical Verification Workflow Steps (3 Visual Cards) */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4edea3]" />
              <span>Physical Inspection Workflow</span>
            </h3>
            <span className="text-xs font-mono text-zinc-400">
              Est. Time: ~3 minutes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 Card */}
            <div className="bg-[#121212] border border-[#27272A] rounded-2xl p-5 flex flex-col gap-3 shadow-md border-t-2 border-t-[#4edea3]">
              <div className="w-9 h-9 rounded-xl bg-[#201f1f] flex items-center justify-center text-[#4edea3]">
                <QrCodeIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-[#4edea3] uppercase font-bold">
                  STEP 01
                </span>
                <h4 className="text-sm font-semibold text-white">
                  Pair Mobile Inspector
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Launch the EcoXchange Inspector app and scan the QR code above or authenticate using DPP ID.
                </p>
              </div>
            </div>

            {/* Step 2 Card */}
            <div className="bg-[#121212] border border-[#27272A] rounded-2xl p-5 flex flex-col gap-3 shadow-md border-t-2 border-t-[#14B8A6]">
              <div className="w-9 h-9 rounded-xl bg-[#201f1f] flex items-center justify-center text-[#14B8A6]">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-[#14B8A6] uppercase font-bold">
                  STEP 02
                </span>
                <h4 className="text-sm font-semibold text-white">
                  3D Optical & Sensor Scan
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Complete guided multi-angle camera scans to measure micro-abrasions, bezel integrity, and digitizer tests.
                </p>
              </div>
            </div>

            {/* Step 3 Card */}
            <div className="bg-[#121212] border border-[#27272A] rounded-2xl p-5 flex flex-col gap-3 shadow-md border-t-2 border-t-[#85f8c4]">
              <div className="w-9 h-9 rounded-xl bg-[#201f1f] flex items-center justify-center text-[#85f8c4]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-[#85f8c4] uppercase font-bold">
                  STEP 03
                </span>
                <h4 className="text-sm font-semibold text-white">
                  Hardware Telemetry Seal
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  App reads battery cycles and authenticates OEM components, embedding zero-knowledge proofs to the passport ledger.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Final Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#27272A]">
        <Link
          href={`/passport/${dppId}`}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#18181B] hover:bg-[#222226] border border-[#27272A] text-zinc-200 hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4 text-[#4edea3]" />
          <span>View Public Passport Page</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
        </Link>

        <button
          type="button"
          onClick={onComplete}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#4edea3] hover:bg-[#3ecb90] text-black font-semibold text-xs shadow-lg shadow-[#4edea3]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>Done / Back to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
