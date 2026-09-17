"use client";

import React, { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Wrench,
  ShieldCheck,
  HelpCircle,
  Smartphone,
  Battery,
  Camera,
  Cable,
  Volume2,
  Square,
  Power,
  Cpu,
  MoreHorizontal,
  CheckCircle2,
  UploadCloud,
  FileText,
  Trash2,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  Check,
  TrendingUp,
  Building,
  Store,
  Hammer,
  UserCheck,
  Lock,
  Image as ImageIcon,
  Plus,
  X,
} from "lucide-react";
import {
  AddProductFormData,
  ReceiptAvailability,
  RepairProvider,
  RepairStatus,
} from "./types";

interface Step2RepairHistoryProps {
  form: UseFormReturn<AddProductFormData>;
  onBack: () => void;
  onNext: () => void;
}

export function Step2RepairHistory({
  form,
  onBack,
  onNext,
}: Step2RepairHistoryProps) {
  const { watch, setValue, getValues } = form;

  const modelName = watch("modelName") || "";
  const serialNumberOrImei = watch("serialNumberOrImei") || "";
  const hasRepairs = watch("hasRepairs") || "";
  const repairedComponents = watch("repairedComponents") || [];
  const repairProvider = watch("repairProvider") || "";
  const receiptAvailability = watch("receiptAvailability") || "";
  const serviceRecordFileName = watch("serviceRecordFileName") || "";
  const serviceRecordFile = watch("serviceRecordFile");
  const productImages = (watch("productImages") as File[] | undefined) || [];

  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isDraggingImages, setIsDraggingImages] = React.useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!productImages || productImages.length === 0) {
      setImagePreviews([]);
      return;
    }
    const urls = productImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [productImages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length > 0) {
      setValue("productImages", [...productImages, ...files]);
    }
    if (e.target) {
      e.target.value = "";
    }
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingImages(false);
    const files = Array.from(e.dataTransfer.files || []).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length > 0) {
      setValue("productImages", [...productImages, ...files]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setValue(
      "productImages",
      productImages.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const clearAllImages = () => {
    setValue("productImages", []);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const toggleComponent = (comp: string) => {
    if (repairedComponents.includes(comp)) {
      setValue(
        "repairedComponents",
        repairedComponents.filter((c) => c !== comp)
      );
    } else {
      setValue("repairedComponents", [...repairedComponents, comp]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("serviceRecordFile", file);
      setValue("serviceRecordFileName", file.name);
      setValue("receiptAvailability", "yes");
    }
  };

  const clearServiceRecord = () => {
    setValue("serviceRecordFile", null);
    setValue("serviceRecordFileName", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setValue("serviceRecordFile", file);
      setValue("serviceRecordFileName", file.name);
      setValue("receiptAvailability", "yes");
    }
  };

  const handlePreviewRecord = () => {
    const file = getValues("serviceRecordFile");
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      window.open(url, "_blank");
    } else if (serviceRecordFileName) {
      alert(`Document Preview: ${serviceRecordFileName}`);
    }
  };

  const formatFileSize = (file?: File | null) => {
    if (!file || !file.size) return "";
    if (file.size < 1024 * 1024) return `(${(file.size / 1024).toFixed(1)} KB)`;
    return `(${(file.size / (1024 * 1024)).toFixed(1)} MB)`;
  };

  const componentOptions = [
    { id: "screen", label: "Screen / Display", icon: Smartphone },
    { id: "battery", label: "Battery", icon: Battery },
    { id: "camera", label: "Camera", icon: Camera },
    { id: "charging", label: "Charging Port", icon: Cable },
    { id: "speaker", label: "Speaker / Mic", icon: Volume2 },
    { id: "back_panel", label: "Back Panel", icon: Square },
    { id: "buttons", label: "Buttons", icon: Power },
    { id: "motherboard", label: "Motherboard", icon: Cpu },
    { id: "other", label: "Other Part", icon: MoreHorizontal },
    { id: "unknown", label: "Don't know", icon: HelpCircle },
  ];

  const providerOptions: Array<{
    id: RepairProvider;
    title: string;
    sub: string;
    tag: string;
    tagColor: string;
    icon: React.ElementType;
  }> = [
    {
      id: "oem",
      title: "Manufacturer Service Centre",
      sub: "e.g., Apple Genius Bar, Samsung Service Centre",
      tag: "OEM Genuine Part Verified",
      tagColor: "text-[#4edea3]",
      icon: ShieldCheck,
    },
    {
      id: "authorized",
      title: "Authorized Service Centre",
      sub: "e.g., Best Buy Geek Squad, Official AASP partner",
      tag: "Tier-1 Qualified Partner",
      tagColor: "text-[#14B8A6]",
      icon: Store,
    },
    {
      id: "independent",
      title: "Independent Repair Shop",
      sub: "Local electronics technician or third-party shop",
      tag: "Quality Audit Required",
      tagColor: "text-amber-400",
      icon: Hammer,
    },
    {
      id: "self",
      title: "Self-repaired",
      sub: "DIY replacement via self-service repair kit or guides",
      tag: "Self-Service Manifest",
      tagColor: "text-zinc-400",
      icon: UserCheck,
    },
    {
      id: "unknown",
      title: "Don't know",
      sub: "Service provenance details are unavailable",
      tag: "Uncertified Provenance",
      tagColor: "text-zinc-500",
      icon: HelpCircle,
    },
    {
      id: "na",
      title: "Not applicable",
      sub: "Exempted component intervention",
      tag: "Nullified",
      tagColor: "text-zinc-600",
      icon: Building,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-200">
      {/* Top Stepper Ribbon */}
      <div className="w-full bg-[#121212] border border-[#27272A] rounded-2xl p-5 shadow-xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Step 1: Completed */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4edea3]/20 text-[#4edea3] font-mono text-sm flex items-center justify-center font-bold border border-[#4edea3]/30 shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-mono text-[#4edea3] uppercase tracking-wider font-semibold">
                Completed
              </span>
              <span className="text-sm font-medium text-zinc-300 truncate">
                1. Device & Ownership
              </span>
            </div>
          </div>

          {/* Step 2: Active */}
          <div className="flex items-center gap-3 relative">
            <div className="w-9 h-9 rounded-xl bg-[#4edea3] text-black font-mono text-sm flex items-center justify-center font-bold shadow-[0_0_15px_rgba(78,222,163,0.35)] shrink-0">
              02
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-mono text-[#4edea3] uppercase tracking-wider font-semibold">
                Active Stage
              </span>
              <span className="text-sm font-semibold text-zinc-100 truncate">
                2. Repair & Service History
              </span>
            </div>
            <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border-t-2 border-r-2 border-[#4edea3]/40" />
          </div>

          {/* Step 3: Upcoming */}
          <div className="flex items-center gap-3 opacity-50">
            <div className="w-9 h-9 rounded-xl bg-[#201f1f] text-zinc-400 font-mono text-sm flex items-center justify-center font-semibold shrink-0">
              03
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                Next Step
              </span>
              <span className="text-sm font-medium text-zinc-400 truncate">
                3. Diagnostics & Review
              </span>
            </div>
          </div>
        </div>

        {/* Linear Gauge Track */}
        <div className="mt-4 pt-3 border-t border-[#27272A]/50 flex flex-col gap-1.5">
          <div className="w-full bg-[#201f1f] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#4edea3] h-full w-2/3 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(78,222,163,0.6)]" />
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-400 mt-1">
            <span className="text-[#4edea3] font-medium">
              Passport Progression: 66% Completed
            </span>
            <span className="font-mono text-[11px] text-zinc-500">
              Stage 2 of 3
            </span>
          </div>
        </div>
      </div>

      {/* Assessing Device Strip */}
      <div className="bg-[#121212] border border-[#27272A] rounded-xl p-3 px-4 flex flex-wrap items-center justify-between gap-3 shadow-md mb-6">
        <div className="flex items-center gap-2.5">
          <Smartphone className="w-4 h-4 text-[#14B8A6]" />
          <span className="text-xs text-zinc-400 uppercase font-mono">
            Assessing:
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

      {/* Header Section */}
      <div className="flex flex-col gap-1.5 mb-6">
        <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-[#201f1f] border border-[#27272A] text-[#14B8A6] text-xs font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
          <span>SECTION B • CIRCULAR MAINTENANCE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Repair & Service History
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl">
          Document maintenance, part replacements, and service provenance to calculate device health score and circular residual value.
        </p>
      </div>

      {/* Questions Stack */}
      <div className="space-y-6">
        {/* QUERY 2.1 */}
        <section className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#4edea3] uppercase tracking-wider mb-1">
                <span>Query 2.1</span>
                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                <span className="text-zinc-400">Primary Gatekeeper</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Has this device ever been repaired or had any component replaced?
              </h3>
            </div>
            <HelpCircle className="w-5 h-5 text-zinc-500 shrink-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Yes Option */}
            <div
              onClick={() => setValue("hasRepairs", "yes")}
              className={`group relative flex flex-col p-4 rounded-2xl cursor-pointer transition-all border ${
                hasRepairs === "yes"
                  ? "border-[#4edea3] bg-[#1c1b1b] shadow-[0_0_20px_rgba(78,222,163,0.12)]"
                  : "border-[#27272A] bg-[#18181B] hover:border-[#38383a]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    hasRepairs === "yes"
                      ? "bg-[#4edea3]/20 text-[#4edea3]"
                      : "bg-[#201f1f] text-zinc-400"
                  }`}
                >
                  <Wrench className="w-4 h-4" />
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all ${
                    hasRepairs === "yes"
                      ? "bg-[#4edea3] text-black"
                      : "border border-zinc-600 text-transparent"
                  }`}
                >
                  {hasRepairs === "yes" && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
              <p className="text-sm font-semibold text-white mb-1">Yes</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Device has undergone part replacement or professional service.
              </p>
              <div className="mt-3 pt-3 border-t border-[#27272A] flex items-center gap-1.5 text-[11px] font-mono text-[#4edea3]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
                <span>Triggers Provenance Flow</span>
              </div>
            </div>

            {/* No Option */}
            <div
              onClick={() => {
                setValue("hasRepairs", "no");
                setValue("repairedComponents", []);
                setValue("repairProvider", "");
                setValue("receiptAvailability", "");
                clearServiceRecord();
              }}
              className={`group relative flex flex-col p-4 rounded-2xl cursor-pointer transition-all border ${
                hasRepairs === "no"
                  ? "border-[#4edea3] bg-[#1c1b1b] shadow-[0_0_20px_rgba(78,222,163,0.12)]"
                  : "border-[#27272A] bg-[#18181B] hover:border-[#38383a]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    hasRepairs === "no"
                      ? "bg-[#4edea3]/20 text-[#4edea3]"
                      : "bg-[#201f1f] text-zinc-400"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all ${
                    hasRepairs === "no"
                      ? "bg-[#4edea3] text-black"
                      : "border border-zinc-600 text-transparent"
                  }`}
                >
                  {hasRepairs === "no" && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
              <p className="text-sm font-semibold text-white mb-1">No</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Device remains in 100% factory original condition with zero interventions.
              </p>
              <div className="mt-3 pt-3 border-t border-[#27272A] flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                <span>Preserves Original Score</span>
              </div>
            </div>

            {/* Don't Know Option */}
            <div
              onClick={() => {
                setValue("hasRepairs", "unknown");
                setValue("repairedComponents", []);
                setValue("repairProvider", "");
                setValue("receiptAvailability", "");
                clearServiceRecord();
              }}
              className={`group relative flex flex-col p-4 rounded-2xl cursor-pointer transition-all border ${
                hasRepairs === "unknown"
                  ? "border-[#4edea3] bg-[#1c1b1b] shadow-[0_0_20px_rgba(78,222,163,0.12)]"
                  : "border-[#27272A] bg-[#18181B] hover:border-[#38383a]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    hasRepairs === "unknown"
                      ? "bg-[#4edea3]/20 text-[#4edea3]"
                      : "bg-[#201f1f] text-zinc-400"
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all ${
                    hasRepairs === "unknown"
                      ? "bg-[#4edea3] text-black"
                      : "border border-zinc-600 text-transparent"
                  }`}
                >
                  {hasRepairs === "unknown" && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
              <p className="text-sm font-semibold text-white mb-1">Don't know</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Unsure of previous refurbishment or third-party service history.
              </p>
              <div className="mt-3 pt-3 border-t border-[#27272A] flex items-center gap-1.5 text-[11px] font-mono text-amber-400">
                <span>Requires Automated Audit</span>
              </div>
            </div>
          </div>

          {hasRepairs === "no" && (
            <div className="mt-4 bg-[#18181B] border border-[#27272A] rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-[#4edea3] shrink-0" />
              <span>Device declared with 100% factory original condition and no repair interventions. You can proceed directly to the next stage.</span>
            </div>
          )}

          {hasRepairs === "unknown" && (
            <div className="mt-4 bg-[#18181B] border border-[#27272A] rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-zinc-300">
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Repair history unconfirmed. Hardware sensors and components will be benchmarked during the diagnostics step.</span>
            </div>
          )}
        </section>

        {/* QUERY 2.2: COMPONENTS REPAIRED / REPLACED (SHOW IF YES) */}
        {hasRepairs === "yes" && (
          <section className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#4edea3] uppercase tracking-wider mb-1">
                  <span>Query 2.2</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  <span className="text-zinc-400">Component Decomposition</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Which components were repaired or replaced?
                </h3>
                <p className="text-xs text-zinc-400">
                  Select all that apply to calibrate residual lifecycle telemetry.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto bg-[#1c1b1b] border border-[#27272A] px-3 py-1.5 rounded-lg text-xs font-mono">
                <span className={`${repairedComponents.length > 0 ? "text-[#4edea3] font-bold" : "text-zinc-500"}`}>
                  {repairedComponents.length} items
                </span>
                <span className="text-zinc-400">selected</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {componentOptions.map((c) => {
                const isSelected = repairedComponents.includes(c.id);
                const Icon = c.icon;
                return (
                  <div
                    key={c.id}
                    onClick={() => toggleComponent(c.id)}
                    className={`group relative flex flex-col p-3 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? "border-[#4edea3] bg-[#4edea3]/10 shadow-[0_0_12px_rgba(78,222,163,0.1)]"
                        : "border-[#27272A] bg-[#18181B] hover:border-[#38383a]"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <Icon
                        className={`w-6 h-6 ${
                          isSelected ? "text-[#4edea3]" : "text-zinc-400"
                        }`}
                      />
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                          isSelected
                            ? "bg-[#4edea3] text-black"
                            : "border border-zinc-600 text-transparent"
                        }`}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-white mt-2.5">
                      {c.label}
                    </p>
                    <span
                      className={`mt-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold self-start ${
                        isSelected
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                          : "text-zinc-500"
                      }`}
                    >
                      {isSelected ? "Replaced ✓" : "Original OEM"}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* QUERY 2.3: WHO PERFORMED REPAIR */}
        {hasRepairs === "yes" && (
          <section className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#4edea3] uppercase tracking-wider mb-1">
                <span>Query 2.3</span>
                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                <span className="text-zinc-400">Service Entity Level</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Who performed the repair?
              </h3>
              <p className="text-xs text-zinc-400">
                Authorisation credentials dictate the confidence index of replacement components.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {providerOptions.map((p) => {
                const isSelected = repairProvider === p.id;
                const Icon = p.icon;
                return (
                  <div
                    key={p.id}
                    onClick={() => setValue("repairProvider", p.id)}
                    className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? "border-[#4edea3] bg-[#4edea3]/10 shadow-[0_0_15px_rgba(78,222,163,0.1)]"
                        : "border-[#27272A] bg-[#18181B] hover:border-[#38383a]"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? "bg-[#4edea3]/20 text-[#4edea3]"
                            : "bg-[#201f1f] text-zinc-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-[#4edea3] text-black"
                            : "border border-zinc-600 text-transparent"
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-xs font-bold text-white mb-0.5">{p.title}</p>
                    <p className="text-[11px] text-zinc-400 leading-snug mb-3">
                      {p.sub}
                    </p>
                    <div className="mt-auto pt-2 border-t border-[#27272A] flex items-center gap-1.5">
                      <span className={`text-[10px] font-mono font-semibold ${p.tagColor}`}>
                        {p.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* QUERY 2.4: REPAIR RECEIPT & RECORD UPLOAD */}
        {hasRepairs === "yes" && (
          <section className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#4edea3] uppercase tracking-wider mb-1">
                <span>Query 2.4</span>
                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                <span className="text-zinc-400">Cryptographic Proof</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Do you have a repair receipt or service record?
              </h3>
            </div>

            {/* Radio Selector Strip */}
            <div className="flex flex-wrap items-center gap-2.5">
              {[
                { id: "yes", label: "Yes (Receipt available)" },
                { id: "no", label: "No" },
                { id: "unknown", label: "Don't know" },
                { id: "na", label: "Not applicable" },
              ].map((opt) => {
                const isSelected = receiptAvailability === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      const val = opt.id as ReceiptAvailability;
                      setValue("receiptAvailability", val);
                      if (val !== "yes") {
                        clearServiceRecord();
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-[#4edea3] text-black font-semibold shadow-md shadow-[#4edea3]/20"
                        : "bg-[#18181B] border border-[#27272A] text-zinc-300 hover:text-white hover:bg-[#202020]"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {receiptAvailability && receiptAvailability !== "yes" && (
              <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-zinc-400">
                <HelpCircle className="w-4 h-4 text-zinc-500 shrink-0" />
                <span>No service documentation attached. You can continue to the next step.</span>
              </div>
            )}

            {receiptAvailability === "yes" && (
              <div className="space-y-3 pt-2">
                {serviceRecordFileName ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-[#4edea3]/40 bg-[#18181B] gap-4 shadow-md">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#4edea3] shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white truncate max-w-xs md:max-w-md">
                            {serviceRecordFileName}
                          </span>
                          {formatFileSize(serviceRecordFile) && (
                            <span className="text-[11px] text-zinc-500 shrink-0 font-mono">
                              {formatFileSize(serviceRecordFile)}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Document Attached
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                          Ready for ledger verification & audit
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={handlePreviewRecord}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-[#27272A] border border-[#38383a] flex items-center gap-1.5 transition-colors"
                        title="Preview document"
                      >
                        <FileText className="w-3 h-3" />
                        <span>View</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-[#27272A] border border-[#38383a] flex items-center gap-1.5 transition-colors"
                        title="Swap document"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Swap</span>
                      </button>
                      <button
                        type="button"
                        onClick={clearServiceRecord}
                        className="p-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/20 border border-red-500/30 flex items-center justify-center transition-colors"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                      isDragging
                        ? "border-[#4edea3] bg-[#4edea3]/5"
                        : "border-[#27272A] hover:border-[#4edea3]/60 bg-[#18181B]/40 hover:bg-[#18181B]"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                    />
                    <div className="w-12 h-12 rounded-full bg-[#201f1f] mx-auto mb-2 flex items-center justify-center text-[#14B8A6]">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-medium text-white mb-1">
                      Drag and drop service documentation here, or{" "}
                      <span className="text-[#4edea3] underline font-semibold">
                        Browse Files
                      </span>
                    </p>
                    <p className="text-[11px] text-zinc-500 font-mono">
                      Supports PDF, JPG, PNG (up to 25MB). Encrypted with zero-knowledge circular ledger proofs.
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* QUERY 2.5: PRODUCT PHOTOS / DEVICE IMAGES */}
        <section className="bg-[#121212] border border-[#27272A] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#4edea3] uppercase tracking-wider mb-1">
                <span>Query 2.5</span>
                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                <span className="text-zinc-400">Physical Verification</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Upload Product Photos
              </h3>
              <p className="text-xs text-zinc-400">
                Upload images of your device (front, back, sides, and display) to document visual condition.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto bg-[#1c1b1b] border border-[#27272A] px-3 py-1.5 rounded-lg text-xs font-mono">
              <span className={`${productImages.length > 0 ? "text-[#4edea3] font-bold" : "text-zinc-500"}`}>
                {productImages.length} {productImages.length === 1 ? "photo" : "photos"}
              </span>
              <span className="text-zinc-400">uploaded</span>
            </div>
          </div>

          <input
            ref={imageInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />

          {productImages.length === 0 ? (
            <div
              onClick={() => imageInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingImages(true);
              }}
              onDragLeave={() => setIsDraggingImages(false)}
              onDrop={handleImageDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                isDraggingImages
                  ? "border-[#4edea3] bg-[#4edea3]/5"
                  : "border-[#27272A] hover:border-[#4edea3]/60 bg-[#18181B]/40 hover:bg-[#18181B]"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#201f1f] mx-auto mb-3 flex items-center justify-center text-[#4edea3] border border-[#27272A]">
                <ImageIcon className="w-7 h-7" />
              </div>
              <p className="text-sm font-medium text-white mb-1">
                Drag and drop product photos here, or{" "}
                <span className="text-[#4edea3] underline font-semibold">
                  Browse Files
                </span>
              </p>
              <p className="text-xs text-zinc-500 font-mono">
                Supports JPG, PNG, WEBP (multiple images accepted). Recommended: Front display, back panel, and side edges.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {productImages.map((file, idx) => {
                  const previewUrl = imagePreviews[idx];
                  return (
                    <div
                      key={idx}
                      className="group relative rounded-xl overflow-hidden border border-[#27272A] bg-[#18181B] aspect-square flex flex-col"
                    >
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt={file.name || `Device Photo ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#201f1f] text-zinc-500">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}

                      {/* Top Action Overlay */}
                      <div className="absolute top-2 right-2 z-10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(idx);
                          }}
                          className="w-7 h-7 rounded-lg bg-black/70 hover:bg-red-500 text-white flex items-center justify-center backdrop-blur-sm transition-colors shadow-md"
                          title="Remove image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Bottom Info Bar */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2 text-left pointer-events-none">
                        <p className="text-[11px] font-medium text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-[10px] font-mono text-zinc-400">
                          {formatFileSize(file)}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Add More Slot */}
                <div
                  onClick={() => imageInputRef.current?.click()}
                  className="rounded-xl border-2 border-dashed border-[#27272A] hover:border-[#4edea3]/60 bg-[#18181B]/40 hover:bg-[#18181B] aspect-square flex flex-col items-center justify-center cursor-pointer transition-all p-3 text-center group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#201f1f] group-hover:bg-[#4edea3]/10 text-zinc-400 group-hover:text-[#4edea3] flex items-center justify-center transition-colors mb-1.5">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-zinc-300 group-hover:text-white">
                    Add More
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    JPG, PNG, WEBP
                  </span>
                </div>
              </div>

              {/* Status footer for image upload */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#27272A] text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <CheckCircle2 className="w-4 h-4 text-[#4edea3]" />
                  <span>
                    {productImages.length} {productImages.length === 1 ? "photo" : "photos"} staged for visual documentation.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={clearAllImages}
                  className="text-[11px] font-mono text-zinc-500 hover:text-red-400 transition-colors self-start sm:self-auto"
                >
                  Clear all photos
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Circularity Impact Summary Capsule */}
        <div className="bg-[#18181B] border border-[#4edea3]/20 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/15 text-[#14B8A6] flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-[#14B8A6]" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-[#14B8A6] uppercase font-semibold">
                Live Passport Health Projection
              </p>
              <p className="text-xs text-zinc-300">
                {hasRepairs === "no"
                  ? "Device in factory original state with 100% component authenticity score."
                  : hasRepairs === "yes" && repairProvider === "oem"
                  ? "OEM genuine part service preserves 94.5% of Circular Residual Value."
                  : hasRepairs === "yes" && repairProvider === "authorized"
                  ? "Authorized center service preserves 91.0% of Circular Residual Value."
                  : hasRepairs === "yes" && (repairProvider === "independent" || repairProvider === "self")
                  ? "Service documented. Diagnostics will evaluate replacement component health."
                  : hasRepairs === "unknown"
                  ? "Service history unverified. Hardware diagnostics will assess operational integrity."
                  : "Declare repair and maintenance history above to calculate Circularity Index."}
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-zinc-400 flex items-center gap-2 bg-[#121212] px-3 py-1.5 rounded-lg border border-[#27272A] shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
            <span>
              Circularity Index:{" "}
              <span className="text-white font-bold">
                {hasRepairs === "no"
                  ? "Grade A+ (Factory Original)"
                  : hasRepairs === "yes" && repairProvider === "oem"
                  ? "Grade A (OEM Restored)"
                  : hasRepairs === "yes" && repairProvider === "authorized"
                  ? "Grade A- (Authorized)"
                  : hasRepairs === "yes"
                  ? "Grade B+ (Documented)"
                  : hasRepairs === "unknown"
                  ? "Grade Pending (Audit)"
                  : "Awaiting Input"}
              </span>
            </span>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#27272A]">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#27272A] hover:bg-[#202020] text-zinc-300 hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Device & Ownership</span>
          </button>

          <p className="text-[11px] font-mono text-zinc-500 text-center hidden md:flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#4edea3]" />
            <span>All repair data directly affects Circularity Index and DPP rating.</span>
          </p>

          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#4edea3] hover:bg-[#3ecb90] text-black font-semibold text-xs shadow-lg shadow-[#4edea3]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Next: Device Diagnostics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
