"use client";

import React, { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Calendar,
  ShoppingBag,
  Repeat,
  Wrench,
  Gift,
  Building,
  HelpCircle,
  ShieldCheck,
  UploadCloud,
  FileText,
  CheckCircle2,
  Trash2,
  Eye,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Check,
  Clock,
  FileCheck,
} from "lucide-react";
import { AcquisitionType, AddProductFormData, OwnerCount } from "./types";

interface Step1DeviceOwnershipProps {
  form: UseFormReturn<AddProductFormData>;
  onBack: () => void;
  onNext: () => void;
}

export function Step1DeviceOwnership({
  form,
  onBack,
  onNext,
}: Step1DeviceOwnershipProps) {
  const { watch, setValue, getValues } = form;

  const modelName = watch("modelName") || "";
  const serialNumberOrImei = watch("serialNumberOrImei") || "";
  const purchaseDate = watch("purchaseDate") || "";
  const acquisitionType = watch("acquisitionType") || "";
  const ownerCount = watch("ownerCount") || "";
  const isCurrentOwner = watch("isCurrentOwner") || "";
  const hasReceipt = watch("hasReceipt") || "";
  const receiptFileName = watch("receiptFileName") || "";
  const receiptFile = watch("receiptFile");

  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("receiptFile", file);
      setValue("receiptFileName", file.name);
      setValue("hasReceipt", "yes");
    }
  };

  const clearReceipt = () => {
    setValue("receiptFile", null);
    setValue("receiptFileName", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setValue("receiptFile", file);
      setValue("receiptFileName", file.name);
      setValue("hasReceipt", "yes");
    }
  };

  const handlePreviewReceipt = () => {
    const file = getValues("receiptFile");
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      window.open(url, "_blank");
    } else if (receiptFileName) {
      alert(`Document Preview: ${receiptFileName}`);
    }
  };

  const formatFileSize = (file?: File | null) => {
    if (!file || !file.size) return "";
    if (file.size < 1024 * 1024) return `(${(file.size / 1024).toFixed(1)} KB)`;
    return `(${(file.size / (1024 * 1024)).toFixed(1)} MB)`;
  };

  const getUsageInfo = (dateStr: string) => {
    if (!dateStr || dateStr.trim().length < 4) return null;
    const parts = dateStr.trim().split(/[-/.]/);
    let d: Date | null = null;
    if (parts.length === 3) {
      if (parts[2].length === 4) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        d = new Date(year, month, day);
      } else if (parts[0].length === 4) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        d = new Date(year, month, day);
      }
    } else if (parts.length === 2 && parts[1].length === 4) {
      d = new Date(parseInt(parts[1], 10), parseInt(parts[0], 10) - 1, 1);
    } else {
      const parsed = Date.parse(dateStr);
      if (!isNaN(parsed)) d = new Date(parsed);
    }

    if (!d || isNaN(d.getTime())) return null;
    const now = new Date();
    const diffMonths = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
    const months = Math.max(0, diffMonths);
    const quarter = Math.floor(d.getMonth() / 3) + 1;
    const year = d.getFullYear();

    return {
      months,
      estimatedQuarter: `Estimated: Q${quarter} ${year}`,
    };
  };

  const usageInfo = getUsageInfo(purchaseDate);

  const acquisitionOptions: Array<{
    id: AcquisitionType;
    title: string;
    description: string;
    icon: React.ElementType;
    badge?: string;
  }> = [
    {
      id: "new",
      title: "Brand New",
      description: "Direct retail purchase",
      icon: ShoppingBag,
    },
    {
      id: "used",
      title: "Pre-owned",
      description: "Bought second-hand",
      icon: Repeat,
    },
    {
      id: "refurbished",
      title: "Refurbished",
      description: "Restored & tested",
      icon: Wrench,
      badge: "CERTIFIED",
    },
    {
      id: "gift",
      title: "Gift",
      description: "Received as gift",
      icon: Gift,
    },
    {
      id: "other",
      title: "Company Device",
      description: "Work lease or plan",
      icon: Building,
    },
    {
      id: "dont_know",
      title: "Not Sure",
      description: "Uncertain origin",
      icon: HelpCircle,
    },
  ];

  const ownerOptions: Array<{ id: OwnerCount; label: string; sub?: string }> = [
    { id: "0", label: "0", sub: "(I am the original buyer)" },
    { id: "1", label: "1" },
    { id: "2", label: "2" },
    { id: "3plus", label: "3+" },
    { id: "unknown", label: "Don't know" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-200">
      {/* Progress Stepper & Metadata Hub */}
      <div className="w-full flex flex-col gap-4 mb-8">
        {/* Stepper Ribbon */}
        <div className="w-full bg-[#121212] border border-[#27272A] rounded-2xl p-5 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Step 1: Active */}
            <div className="flex items-center gap-3 relative">
              <div className="w-9 h-9 rounded-xl bg-[#4edea3] text-black font-mono text-sm flex items-center justify-center font-bold shadow-[0_0_15px_rgba(78,222,163,0.35)] shrink-0">
                01
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-mono text-[#4edea3] uppercase tracking-wider font-semibold">
                  Active Stage
                </span>
                <span className="text-sm font-semibold text-zinc-100 truncate">
                  Device & Ownership
                </span>
              </div>
              <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border-t-2 border-r-2 border-[#4edea3]/40" />
            </div>

            {/* Step 2: Upcoming */}
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-9 h-9 rounded-xl bg-[#201f1f] text-zinc-400 font-mono text-sm flex items-center justify-center font-semibold shrink-0">
                02
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Next Step
                </span>
                <span className="text-sm font-medium text-zinc-400 truncate">
                  Repair & Service History
                </span>
              </div>
            </div>

            {/* Step 3: Upcoming */}
            <div className="flex items-center gap-3 opacity-40">
              <div className="w-9 h-9 rounded-xl bg-[#201f1f] text-zinc-400 font-mono text-sm flex items-center justify-center font-semibold shrink-0">
                03
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Final Step
                </span>
                <span className="text-sm font-medium text-zinc-400 truncate">
                  Diagnostics & Minting
                </span>
              </div>
            </div>
          </div>

          {/* Linear Gauge Track */}
          <div className="mt-4 pt-3 border-t border-[#27272A]/50 flex flex-col gap-1.5">
            <div className="w-full bg-[#201f1f] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#4edea3] h-full w-1/3 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(78,222,163,0.6)]" />
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400 mt-1">
              <span className="text-[#4edea3] font-medium">
                Passport Progression: 33% Completed
              </span>
              <span className="font-mono text-[11px] text-zinc-500">
                Stage 1 of 3
              </span>
            </div>
          </div>
        </div>

        {/* Active Hardware Passport Strip */}
        <div className="bg-[#121212] border border-[#27272A] rounded-xl p-3 px-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-[#4edea3]" />
            <span className="text-xs text-zinc-400 uppercase font-mono">
              Assessing Device:
            </span>
            <span className="text-xs text-zinc-100 font-semibold">
              {modelName || <span className="text-zinc-500 italic font-normal">No model selected</span>}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#1c1b1b] border border-[#27272A] px-3 py-1 rounded-lg">
            <span className="text-xs text-zinc-400">IMEI / SN:</span>
            <span className="text-xs text-[#4edea3] font-mono tracking-wider font-semibold">
              {serialNumberOrImei || <span className="text-zinc-500 italic font-sans font-normal">Not entered</span>}
            </span>
            {serialNumberOrImei ? (
              <ShieldCheck className="w-3.5 h-3.5 text-[#4edea3]" />
            ) : null}
          </div>
        </div>
      </div>

      {/* Wizard Header Section */}
      <div className="flex flex-col gap-1.5 mb-6">
        <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-[#201f1f] border border-[#27272A] text-[#4edea3] text-xs font-mono font-medium">
          <FileCheck className="w-3.5 h-3.5" />
          <span>STEP 1 • DEVICE INFO</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Device & Ownership
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl">
          Basic details about your device and its provenance history.
        </p>
      </div>

      {/* Main Interactive Form Stack */}
      <div className="flex flex-col gap-6">
        {/* Question 1: Purchase / First-Use Date */}
        <section className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <label
                htmlFor="purchase-date-input"
                className="text-base font-semibold text-white block"
              >
                1. When did you get this device?
              </label>
              <p className="text-xs text-zinc-400 mt-0.5">
                Approximate date is completely fine.
              </p>
            </div>
            {usageInfo ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#201f1f] text-[#14B8A6] text-xs font-mono self-start md:self-auto shrink-0 border border-[#27272A]">
                <Clock className="w-3.5 h-3.5" />
                <span>{usageInfo.months} mos circular usage</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#18181B] text-zinc-500 text-xs font-mono self-start md:self-auto shrink-0 border border-[#27272A]/50">
                <Clock className="w-3.5 h-3.5" />
                <span>Usage calculated on date entry</span>
              </div>
            )}
          </div>
          <div className="max-w-md flex flex-col gap-1.5">
            <div className="relative flex items-center">
              <Calendar className="w-4 h-4 absolute left-3.5 text-zinc-400 pointer-events-none" />
              <input
                id="purchase-date-input"
                type="date"
                value={purchaseDate}
                onChange={(e) => setValue("purchaseDate", e.target.value)}
                className="w-full h-11 bg-[#18181B] border border-[#27272A] text-zinc-100 pl-11 pr-10 rounded-xl font-mono text-xs focus:outline-none focus:border-[#4edea3] transition-all"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1">
              <span>Standardized Format: DD/MM/YYYY</span>
              {usageInfo ? (
                <span className="text-[#4edea3] font-mono">{usageInfo.estimatedQuarter}</span>
              ) : (
                <span className="text-zinc-600 font-mono">Awaiting date input</span>
              )}
            </div>
          </div>
        </section>

        {/* Question 2: Acquisition Type */}
        <section className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              2. How did you get it?
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {acquisitionOptions.map((opt) => {
              const isSelected = acquisitionType === opt.id;
              const Icon = opt.icon;
              return (
                <div
                  key={opt.id}
                  onClick={() => setValue("acquisitionType", opt.id)}
                  className={`cursor-pointer rounded-2xl p-4 flex flex-col justify-between transition-all border ${
                    isSelected
                      ? "bg-[#1c1b1b] border-[#4edea3] shadow-[0_0_15px_rgba(78,222,163,0.15)]"
                      : "bg-[#18181B] border-[#27272A] hover:border-[#38383a]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <Icon
                        className={`w-5 h-5 ${
                          isSelected ? "text-[#4edea3]" : "text-zinc-400"
                        }`}
                      />
                      {opt.badge && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#14B8A6]/20 text-[#14B8A6] font-semibold">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all ${
                        isSelected
                          ? "bg-[#4edea3] text-black"
                          : "border border-zinc-600 text-transparent"
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">
                      {opt.title}
                    </span>
                    <span className="text-xs text-zinc-400 mt-0.5 block">
                      {opt.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Question 3: Number of Previous Owners */}
        <section className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              3. How many previous owners?
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {ownerOptions.map((item) => {
              const isSelected = ownerCount === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setValue("ownerCount", item.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? "bg-[#4edea3] text-black font-semibold shadow-md shadow-[#4edea3]/20"
                      : "bg-[#18181B] border border-[#27272A] text-zinc-300 hover:text-white hover:bg-[#202020]"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.sub && (
                    <span className="opacity-80 text-[11px] font-normal">
                      {item.sub}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Question 4: Current Ownership */}
        <section className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              4. Are you currently the owner?
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setValue("isCurrentOwner", "yes")}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-medium transition-all ${
                isCurrentOwner === "yes"
                  ? "bg-[#1c1b1b] border-2 border-[#4edea3] text-white shadow-[0_0_12px_rgba(78,222,163,0.15)]"
                  : "bg-[#18181B] border border-[#27272A] text-zinc-400 hover:text-zinc-200 hover:border-[#38383a]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                  isCurrentOwner === "yes"
                    ? "bg-[#4edea3] text-black"
                    : "border border-zinc-600 text-transparent"
                }`}
              >
                {isCurrentOwner === "yes" && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span>Yes, I am the rightful owner</span>
            </button>

            <button
              type="button"
              onClick={() => setValue("isCurrentOwner", "no")}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-medium transition-all ${
                isCurrentOwner === "no"
                  ? "bg-[#1c1b1b] border-2 border-[#4edea3] text-white shadow-[0_0_12px_rgba(78,222,163,0.15)]"
                  : "bg-[#18181B] border border-[#27272A] text-zinc-400 hover:text-zinc-200 hover:border-[#38383a]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                  isCurrentOwner === "no"
                    ? "bg-[#4edea3] text-black"
                    : "border border-zinc-600 text-transparent"
                }`}
              >
                {isCurrentOwner === "no" && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span>No, acting on behalf of owner</span>
            </button>
          </div>

          <div className="bg-[#1c1b1b] border border-[#27272A] rounded-xl p-3 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#4edea3] shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-400 leading-relaxed">
              Please confirm you hold the legal right to register and verify this device on the EcoXchange circular passport ledger.
            </p>
          </div>
        </section>

        {/* Question 5: Receipt / Invoice & File Upload */}
        <section className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              5. Do you have the purchase receipt?
            </h2>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="radio"
                name="has_receipt"
                checked={hasReceipt === "yes"}
                onChange={() => setValue("hasReceipt", "yes")}
                className="accent-[#4edea3]"
              />
              <span className={`text-xs font-medium ${hasReceipt === "yes" ? "text-zinc-100" : "text-zinc-400"}`}>
                Yes, upload copy
              </span>
            </label>
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="radio"
                name="has_receipt"
                checked={hasReceipt === "no"}
                onChange={() => {
                  setValue("hasReceipt", "no");
                  clearReceipt();
                }}
                className="accent-[#4edea3]"
              />
              <span className={`text-xs font-medium ${hasReceipt === "no" ? "text-zinc-100" : "text-zinc-400"}`}>
                No, receipt unavailable
              </span>
            </label>
          </div>

          {hasReceipt === "no" && (
            <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-zinc-400">
              <HelpCircle className="w-4 h-4 text-zinc-500 shrink-0" />
              <span>No receipt attached. You can continue to the next step without an invoice.</span>
            </div>
          )}

          {hasReceipt === "yes" && (
            <div className="space-y-3">
              {receiptFileName ? (
                /* Demonstrated Uploaded File State with Real Name & Size */
                <div className="bg-[#18181B] border border-[#4edea3]/30 rounded-xl p-4 flex items-center justify-between gap-4 shadow-md">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-[#4edea3]/10 border border-[#4edea3]/20 flex items-center justify-center text-[#4edea3] shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-xs font-semibold text-zinc-100 truncate">
                          {receiptFileName}
                        </span>
                        {formatFileSize(receiptFile) && (
                          <span className="text-[11px] text-zinc-500 shrink-0 font-mono">
                            {formatFileSize(receiptFile)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                        <span className="text-[11px] text-[#4edea3] font-medium font-mono">
                          Receipt Attached • Ready for verification
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={handlePreviewReceipt}
                      className="w-8 h-8 rounded-lg bg-[#27272A] hover:bg-[#38383a] text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                      title="Preview document"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={clearReceipt}
                      className="w-8 h-8 rounded-lg bg-[#27272A] hover:bg-red-500/20 text-zinc-300 hover:text-red-400 flex items-center justify-center transition-colors"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Drag and Drop Dropzone */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`rounded-2xl border-2 border-dashed p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group ${
                    isDragging
                      ? "border-[#4edea3] bg-[#4edea3]/5"
                      : "border-[#27272A] hover:border-[#4edea3]/50 bg-[#18181B]/50 hover:bg-[#18181B]"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                  <div className="w-12 h-12 rounded-full bg-[#201f1f] group-hover:bg-[#27272A] flex items-center justify-center text-[#4edea3] group-hover:scale-110 transition-transform mb-3">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-200">
                    Drop receipt here or browse
                  </span>
                  <span className="text-[11px] text-zinc-500 mt-1">
                    Accepted formats: PDF, JPG, PNG • Max size: 25MB
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-[#27272A] hover:bg-[#38383a] text-zinc-200 text-xs font-medium transition-colors"
                  >
                    Browse Files
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Footer Action Bar & Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#27272A]">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono order-2 sm:order-1">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
            <span>All changes saved</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end order-1 sm:order-2">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-[#27272A] hover:bg-[#202020] text-zinc-300 hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={onNext}
              className="flex-1 sm:flex-none px-7 py-3 rounded-xl bg-[#4edea3] hover:bg-[#3ecb90] text-black font-semibold text-xs shadow-lg shadow-[#4edea3]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Next: Repair History</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
