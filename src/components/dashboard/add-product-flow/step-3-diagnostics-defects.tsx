"use client";

import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Check,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { AddProductFormData } from "./types";
import { DEFECTS_LIST } from "./constants";

interface Step3DiagnosticsDefectsProps {
  form: UseFormReturn<AddProductFormData>;
  onBack: () => void;
  onNext: () => void;
}

export function Step3DiagnosticsDefects({
  form,
  onBack,
  onNext,
}: Step3DiagnosticsDefectsProps) {
  const { watch, setValue } = form;

  const modelName = watch("modelName") || "";
  const serialNumberOrImei = watch("serialNumberOrImei") || "";
  const selectedDefects = watch("selectedDefects") || [];
  const isFlawless = watch("isFlawless") || false;

  const [activeFilter, setActiveFilter] = useState<
    "all" | "display" | "sensors" | "audio" | "body" | "power"
  >("all");

  const toggleDefect = (defectId: string) => {
    if (isFlawless) {
      setValue("isFlawless", false);
    }
    if (selectedDefects.includes(defectId)) {
      setValue(
        "selectedDefects",
        selectedDefects.filter((id) => id !== defectId)
      );
    } else {
      setValue("selectedDefects", [...selectedDefects, defectId]);
    }
  };

  const handleMarkFlawless = () => {
    if (isFlawless) {
      setValue("isFlawless", false);
    } else {
      setValue("isFlawless", true);
      setValue("selectedDefects", []);
    }
  };

  const filteredDefects =
    activeFilter === "all"
      ? DEFECTS_LIST
      : DEFECTS_LIST.filter((d) => d.category === activeFilter);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-200">
      {/* Top Stepper Workflow */}
      <div className="w-full bg-[#121212] border border-[#27272A] rounded-2xl p-5 shadow-xl mb-8 relative overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          {/* Step 01: Completed */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#4edea3] text-black font-mono text-xs flex items-center justify-center font-bold shadow-sm shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-mono text-[#4edea3] uppercase">
                01 // Verified
              </span>
              <span className="text-xs font-semibold text-zinc-200 truncate">
                Device & Owner
              </span>
            </div>
          </div>

          {/* Step 02: Completed */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#4edea3] text-black font-mono text-xs flex items-center justify-center font-bold shadow-sm shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-mono text-[#4edea3] uppercase">
                02 // Logged
              </span>
              <span className="text-xs font-semibold text-zinc-200 truncate">
                Repair History
              </span>
            </div>
          </div>

          {/* Step 03: Active */}
          <div className="flex items-center gap-2.5 bg-[#18181B] p-2 rounded-xl border border-[#4edea3]/40">
            <div className="w-8 h-8 rounded-full bg-[#201f1f] text-[#4edea3] font-mono text-xs flex items-center justify-center font-bold relative shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-mono text-[#4edea3] font-semibold uppercase">
                03 // Active Stage
              </span>
              <span className="text-xs font-bold text-white truncate">
                Hardware Defects
              </span>
            </div>
          </div>

          {/* Step 04: Pending */}
          <div className="flex items-center gap-2.5 opacity-50">
            <div className="w-8 h-8 rounded-full bg-[#201f1f] text-zinc-500 font-mono text-xs flex items-center justify-center font-semibold shrink-0">
              04
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                04 // Next Phase
              </span>
              <span className="text-xs font-medium text-zinc-400 truncate">
                DPP Minting
              </span>
            </div>
          </div>
        </div>

        {/* Progress Meter Bar */}
        <div className="w-full bg-[#201f1f] h-1.5 rounded-full mt-4 overflow-hidden flex">
          <div
            className="bg-[#4edea3] h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(78,222,163,0.6)]"
            style={{ width: "75%" }}
          />
        </div>

        {/* Active Hardware Spec Ribbon */}
        <div className="mt-4 pt-2 border-t border-[#27272A]/50 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="inline-block w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-[#4edea3] font-semibold">ASSESSING TELEMETRY •</span>
            <span className="text-zinc-100">
              {modelName || <span className="text-zinc-500 italic font-normal">No model selected</span>}
            </span>
          </div>
          <div className="font-mono text-[11px] bg-[#1c1b1b] border border-[#27272A] px-2.5 py-1 rounded-md text-[#4edea3] tracking-wider font-semibold">
            IMEI / SN: {serialNumberOrImei || <span className="text-zinc-500 italic font-sans font-normal">Not entered</span>}
          </div>
        </div>
      </div>

      {/* Page Header & Diagnostic Meta */}
      <div className="flex flex-col gap-1.5 mb-6">
        <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-[#4edea3]/10 text-[#4edea3] text-xs font-mono font-semibold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          <span>SECTION C • HARDWARE INTEGRITY & DEFECT MAPPING</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Device Diagnostics & Defects
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
              Select any physical damage, hardware faults, or functional issues with this device.
            </p>
          </div>
          <div className="flex items-center gap-2.5 bg-[#121212] border border-[#27272A] px-4 py-2 rounded-xl self-start md:self-auto shadow-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">
                Active Flaws
              </span>
              <span className="text-xs font-bold text-white">
                {isFlawless ? "0 Defects (Flawless)" : `${selectedDefects.length} Defects Logged`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Category Controller */}
      <div className="bg-[#121212] border border-[#27272A] p-2.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sm mb-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "all", label: `All Issues (${DEFECTS_LIST.length})` },
            { id: "display", label: "Display" },
            { id: "sensors", label: "Sensors" },
            { id: "audio", label: "Audio" },
            { id: "body", label: "Body & Buttons" },
            { id: "power", label: "Battery & Power" },
          ].map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id as typeof activeFilter)}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#4edea3] text-black font-semibold shadow-sm"
                    : "bg-[#18181B] text-zinc-400 hover:text-zinc-200 hover:bg-[#202020]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleMarkFlawless}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
            isFlawless
              ? "bg-[#14B8A6] text-black font-semibold shadow-sm shadow-[#14B8A6]/20"
              : "bg-[#18181B] border border-[#27272A] text-[#14B8A6] hover:bg-[#202020]"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Mark as Flawless</span>
        </button>
      </div>

      {/* Interactive 21-Defect Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredDefects.map((defect) => {
          const isSelected = selectedDefects.includes(defect.id);
          return (
            <article
              key={defect.id}
              onClick={() => toggleDefect(defect.id)}
              className={`cursor-pointer rounded-2xl p-4 transition-all flex flex-col justify-between shadow-sm relative group border-2 ${
                isSelected
                  ? "bg-[#18181B] border-[#4edea3] shadow-[0_0_15px_rgba(78,222,163,0.15)]"
                  : "bg-[#121212] border-[#27272A] hover:border-[#38383a]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-14 h-14 rounded-xl bg-[#f0f0f0] p-1 flex items-center justify-center flex-shrink-0 overflow-hidden border border-[#27272A]">
                  <img
                    src={defect.image}
                    alt={defect.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      defect.severity === "CRITICAL"
                        ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                        : defect.severity === "MODERATE"
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {defect.severity}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-[#4edea3] text-black shadow-sm"
                        : "bg-[#1c1b1b] border border-zinc-700 text-transparent"
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <h2 className="text-sm font-semibold text-zinc-100 group-hover:text-[#4edea3] transition-colors">
                  {defect.title}
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                  {defect.description}
                </p>
              </div>

              <div className="mt-3 pt-2 flex items-center justify-end text-[10px] font-mono border-t border-[#27272A]/50">
                {isSelected ? (
                  <span className="text-[#4edea3] font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    SELECTED
                  </span>
                ) : (
                  <span className="text-zinc-600">CLEAR</span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#27272A]">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#27272A] hover:bg-[#202020] text-zinc-300 hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Repair History</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#4edea3] hover:bg-[#3ecb90] text-black font-semibold text-xs shadow-lg shadow-[#4edea3]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <span>Next: Generate DPP Passport</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
