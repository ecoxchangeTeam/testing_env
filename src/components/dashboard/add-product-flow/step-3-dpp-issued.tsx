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
} from "lucide-react";
import { AddProductFormData } from "./types";

interface Step3DppIssuedProps {
  formData: AddProductFormData;
  onComplete: () => void;
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

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-300">
      {/* Progress Stepper Module */}
      <section className="relative w-full mb-8">
        <div className="bg-[#121212] border border-[#27272A] rounded-2xl p-5 shadow-xl relative overflow-hidden">
          {/* Ambient subtle emerald glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#4edea3]/10 rounded-full blur-3xl pointer-events-none" />

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

              {/* Step 3: Active Focus */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1c1b1b] border-2 border-[#4edea3] shadow-[0_0_24px_rgba(78,222,163,0.15)] relative">
                <div className="w-8 h-8 rounded-full bg-[#4edea3] text-black flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  3
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono text-[#4edea3] uppercase tracking-wider font-semibold">
                    03 // Active Stage
                  </span>
                  <span className="text-xs font-bold text-white truncate">
                    Physical Verification & App Sync
                  </span>
                </div>
                <span className="absolute right-3 top-3 w-2 h-2 rounded-full bg-[#4edea3] animate-ping" />
              </div>
            </div>

            {/* Progress Tracker Bar */}
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-[#4edea3] animate-spin" />
                  <span>Preliminary DPP Minted • Awaiting Field Telemetry Sync</span>
                </span>
                <span className="text-[#4edea3] font-mono font-semibold text-xs">
                  STAGE 3 OF 3 ACTIVE
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#201f1f] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#14B8A6] via-[#4edea3] to-[#85f8c4] rounded-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Headline Banner */}
      <div className="flex flex-col gap-1.5 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4edea3]/10 text-[#4edea3] w-fit text-xs font-mono font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#4edea3]" />
          <span>STAGE 03 • PHYSICAL AUDIT & HARDWARE TELEMETRY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          DPP Issued: Physical Verification Required
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          Your Digital Product Passport identity has been minted on EcoXchange. The final step under ISO 14040/44 DPP compliance is physical optical telemetry and hardware verification via the EcoXchange Inspector mobile app.
        </p>
      </div>

      {/* Main Grid: DPP Card, QR, and Mobile Hand-Off */}
      <div className="flex flex-col gap-6 mb-8">
        {/* Prominent DPP Identifier Card */}
        <article className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#4edea3]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-5 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#201f1f] font-mono text-[10px] text-[#4edea3] font-semibold border border-[#27272A]">
                    DPP PROTOCOL v2.4
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 font-mono text-[10px] font-semibold flex items-center gap-1.5 border border-amber-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    PENDING PHYSICAL TELEMETRY AUDIT
                  </span>
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
                To generate the cryptographic hardware seal, install our verified inspector application. The app executes optical frame inspections and reads low-level battery microcontroller logs directly.
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

        {/* Live Waiting Indicator Card */}
        <div className="bg-[#121212] border border-[#27272A] rounded-2xl p-4 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#4edea3]/10">
              <span className="w-3 h-3 rounded-full bg-[#4edea3] animate-ping absolute" />
              <span className="w-2 h-2 rounded-full bg-[#4edea3] relative" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">
                Waiting for mobile app connection...
              </span>
              <span className="text-[11px] text-zinc-400">
                Keep this browser window open. Session sync is active.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#14B8A6] bg-[#18181B] px-3 py-1.5 rounded-lg border border-[#27272A]">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>Live Polling active (Session Key: {dppId.slice(-6)})</span>
          </div>
        </div>
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
