"use client";

import React, { useState, useMemo, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  X,
  Smartphone,
  Laptop,
  Headphones,
  Server,
  QrCode,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  Building2,
  User,
  ArrowRight,
  Zap,
  AlertCircle,
} from "lucide-react";
import { AddProductFormData, HardwareClass, IntakeChannel, CatalogModel } from "./types";
import { CATALOG_MODELS } from "./constants";

export function isValidIMEI(imei: string): boolean {
  // Must be exactly 15 numeric digits
  if (!/^\d{15}$/.test(imei)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let digit = parseInt(imei.charAt(i), 10);

    // Double every second digit starting from the second digit (1-indexed)
    if (i % 2 !== 0) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9; // Equivalent to adding the two digits of numbers like 14 (1 + 4 = 5)
      }
    }
    sum += digit;
  }

  // A valid IMEI must sum to a multiple of 10
  return sum % 10 === 0;
}

export function generateValidIMEI(tacPrefix = "35489209"): string {
  const digits: number[] = tacPrefix.slice(0, 8).split("").map(Number);
  while (digits.length < 14) {
    digits.push(Math.floor(Math.random() * 10));
  }
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    let digit = digits[i];
    if (i % 2 !== 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  digits.push(checkDigit);
  return digits.join("");
}

function mapHardwareClassToCategory(hw: HardwareClass): string {
  switch (hw) {
    case "SMARTPHONES":
      return "PHONE";
    case "LAPTOPS_TABLETS":
      return "LAPTOP";
    case "AUDIO_WEARABLES":
      return "AUDIO";
    case "ENTERPRISE_GEAR":
      return "ENTERPRISE";
    default:
      return "PHONE";
  }
}

interface AddProductModalProps {
  form: UseFormReturn<AddProductFormData>;
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export function AddProductModal({
  form,
  isOpen,
  onClose,
  onProceed,
}: AddProductModalProps) {
  const { watch, setValue } = form;
  const channel = watch("channel");
  const hardwareClass = watch("hardwareClass");
  const modelName = watch("modelName");
  const modelSpec = watch("spec");
  const serialNumberOrImei = watch("serialNumberOrImei");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("ALL");
  const [autoIdentifiedModel, setAutoIdentifiedModel] = useState<string | null>(null);
  const [imeiError, setImeiError] = useState<string | null>(null);

  const activeCategory = useMemo(() => {
    return mapHardwareClassToCategory(hardwareClass);
  }, [hardwareClass]);

  // 1. Models matching active category
  const categoryModels = useMemo(() => {
    return CATALOG_MODELS.filter((m) => m.category === activeCategory);
  }, [activeCategory]);

  // 2. Available brands in this category (Cashify pattern)
  const availableBrands = useMemo(() => {
    const brands = Array.from(new Set(categoryModels.map((m) => m.brand)));
    return ["ALL", ...brands];
  }, [categoryModels]);

  // 3. Filter by brand & search query
  const filteredModels = useMemo(() => {
    let list = categoryModels;
    if (selectedBrand !== "ALL") {
      list = list.filter((m) => m.brand.toLowerCase() === selectedBrand.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.brand.toLowerCase().includes(q) ||
          m.model.toLowerCase().includes(q) ||
          m.spec.toLowerCase().includes(q)
      );
    }
    return list;
  }, [categoryModels, selectedBrand, searchQuery]);

  const selectedModelObj = useMemo(() => {
    if (!modelName) return null;
    return CATALOG_MODELS.find((m) => m.name === modelName) || null;
  }, [modelName]);

  const handleSelectModel = (model: CatalogModel, resetImei = true) => {
    setValue("modelName", model.name);
    setValue("brand", model.brand);
    setValue("model", model.model);
    setValue("spec", model.spec);
    setIsDropdownOpen(false);
    if (resetImei) {
      setValue("serialNumberOrImei", "");
      setAutoIdentifiedModel(null);
    }
    if (imeiError) setImeiError(null);
  };

  // If active category changes and current selected model belongs to a different category, reset selection
  useEffect(() => {
    if (selectedModelObj && selectedModelObj.category !== activeCategory) {
      setValue("modelName", "");
      setValue("brand", "");
      setValue("model", "");
      setValue("spec", "");
      setValue("serialNumberOrImei", "");
      setAutoIdentifiedModel(null);
      setSelectedBrand("ALL");
      setSearchQuery("");
    }
  }, [activeCategory, selectedModelObj, setValue]);

  // IMEI TAC prefix auto-detection (Smartphones only)
  useEffect(() => {
    if (hardwareClass !== "SMARTPHONES") {
      setAutoIdentifiedModel(null);
      return;
    }
    if (!serialNumberOrImei || serialNumberOrImei.length < 8) {
      setAutoIdentifiedModel(null);
      return;
    }
    const cleanImei = serialNumberOrImei.replace(/\D/g, "");

    // Specific requested IMEIs for OnePlus 9R
    if (
      cleanImei === "869388050788552" ||
      cleanImei === "869388050788545" ||
      cleanImei.startsWith("86938805")
    ) {
      const oneplus9r = CATALOG_MODELS.find(
        (m) =>
          m.name.toLowerCase().includes("oneplus 9r") ||
          m.model.toLowerCase() === "oneplus 9r"
      );
      if (oneplus9r) {
        setAutoIdentifiedModel(oneplus9r.name);
        if (oneplus9r.name !== modelName) {
          setValue("modelName", oneplus9r.name);
          setValue("brand", oneplus9r.brand);
          setValue("model", oneplus9r.model);
          setValue("spec", oneplus9r.spec);
        }
        return;
      }
    }

    const tac = cleanImei.slice(0, 8);
    const matched = CATALOG_MODELS.find((m) => m.tacPrefixes?.includes(tac));
    if (matched) {
      setAutoIdentifiedModel(matched.name);
      if (matched.name !== modelName) {
        setValue("modelName", matched.name);
        setValue("brand", matched.brand);
        setValue("model", matched.model);
        setValue("spec", matched.spec);
      }
    } else {
      setAutoIdentifiedModel(null);
    }
  }, [serialNumberOrImei, modelName, hardwareClass, setValue]);

  const imeiValue = serialNumberOrImei ? serialNumberOrImei.trim() : "";
  const isImeiValid = imeiValue ? isValidIMEI(imeiValue) : false;

  const handleScanSimulation = () => {
    if (hardwareClass === "SMARTPHONES") {
      const modelsWithTac = categoryModels.filter(
        (m) => m.tacPrefixes && m.tacPrefixes.length > 0
      );
      const targetModel =
        modelsWithTac.length > 0
          ? modelsWithTac[Math.floor(Math.random() * modelsWithTac.length)]
          : CATALOG_MODELS[0];

      const tac =
        targetModel.tacPrefixes && targetModel.tacPrefixes.length > 0
          ? targetModel.tacPrefixes[0]
          : "35489209";

      const validImei = generateValidIMEI(tac);
      setValue("serialNumberOrImei", validImei);
      setImeiError(null);
      handleSelectModel(targetModel, false);
      setAutoIdentifiedModel(targetModel.name);
    } else {
      // Realistic serial number for non-smartphones (laptops, audio, enterprise)
      const prefix =
        hardwareClass === "LAPTOPS_TABLETS"
          ? "C02"
          : hardwareClass === "AUDIO_WEARABLES"
          ? "H9"
          : "SN-";
      const randomSerial = `${prefix}${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setValue("serialNumberOrImei", randomSerial);
      setImeiError(null);
    }
  };

  const handleProceed = () => {
    if (!modelName) {
      setImeiError("Please select a device model from the catalog.");
      setIsDropdownOpen(true);
      return;
    }
    if (hardwareClass === "SMARTPHONES") {
      if (!imeiValue) {
        setImeiError("IMEI number is required for smartphones.");
        return;
      }
      if (!isValidIMEI(imeiValue)) {
        setImeiError("Invalid IMEI. Must be exactly 15 numeric digits satisfying Luhn's algorithm.");
        return;
      }
    }
    setImeiError(null);
    onProceed();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-[620px] bg-[#18181B] border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden relative z-50 flex flex-col my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Decorative Accent Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#4edea3] via-[#14B8A6] to-[#68dba9]" />

        {/* Modal Header Section */}
        <div className="p-6 pb-4 flex items-start justify-between gap-4 border-b border-[#27272A]/50">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#201f1f] border border-[#27272A] flex items-center justify-center text-[#4edea3] flex-shrink-0">
              <Smartphone className="w-5 h-5 text-[#4edea3]" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4edea3]/15 text-[#4edea3] font-semibold tracking-wider uppercase">
                  DPP INTAKE ENGINE
                </span>
              </div>
              <h2 className="text-xl font-bold text-white leading-tight">
                Register New Product
              </h2>
              <p className="text-xs text-zinc-400">
                Choose your device model to start passport verification.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-lg bg-[#201f1f] text-zinc-400 hover:text-white hover:bg-[#27272A] transition-colors flex items-center justify-center flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="px-6 py-5 space-y-5">
          {/* Intake Channel Segmented Selector */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-zinc-200">
                Intake Channel & Allocation
              </label>
            </div>
            <div className="grid grid-cols-2 p-1 bg-[#121212] border border-[#27272A] rounded-xl gap-1">
              <button
                type="button"
                onClick={() => setValue("channel", "consumer")}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                  channel === "consumer"
                    ? "bg-[#27272A] text-[#4edea3] shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Consumer Device</span>
              </button>
              <button
                type="button"
                onClick={() => setValue("channel", "fleet")}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                  channel === "fleet"
                    ? "bg-[#27272A] text-[#4edea3] shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>B2B Commercial Fleet</span>
              </button>
            </div>
          </div>

          {/* Product Category Quick Selector Chips */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-200">
              Hardware Class
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "SMARTPHONES", label: "Smartphones", icon: Smartphone },
                { id: "LAPTOPS_TABLETS", label: "Laptops & Tablets", icon: Laptop },
                { id: "AUDIO_WEARABLES", label: "Audio & Wearables", icon: Headphones },
                { id: "ENTERPRISE_GEAR", label: "Enterprise Gear", icon: Server },
              ].map((cat) => {
                const isSelected = hardwareClass === cat.id;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setValue("hardwareClass", cat.id as HardwareClass)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? "bg-[#4edea3] text-black font-semibold shadow-sm"
                        : "bg-[#201f1f] text-zinc-400 hover:text-zinc-100 hover:bg-[#27272A] border border-[#27272A]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Dropdown & Catalog Search */}
          <div className="space-y-1.5 relative">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-zinc-200 flex items-center gap-1">
                <span>Catalog Model & Spec Variant</span>
                <span className="text-[#4edea3]">*</span>
              </label>
              <span className="text-[11px] font-mono text-[#4edea3] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                {categoryModels.length} Models Synced
              </span>
            </div>

            {/* Active Interactive Dropdown Box */}
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-[#121212] border border-[#27272A] hover:border-[#3a3a3e] p-3 rounded-xl cursor-pointer flex items-center justify-between shadow-sm transition-all text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    selectedModelObj ? "bg-[#201f1f] text-[#4edea3]" : "bg-[#1f1f22] text-zinc-500"
                  }`}>
                    {hardwareClass === "LAPTOPS_TABLETS" ? (
                      <Laptop className="w-4 h-4" />
                    ) : hardwareClass === "AUDIO_WEARABLES" ? (
                      <Headphones className="w-4 h-4" />
                    ) : hardwareClass === "ENTERPRISE_GEAR" ? (
                      <Server className="w-4 h-4" />
                    ) : (
                      <Smartphone className="w-4 h-4" />
                    )}
                  </div>
                  <div className="truncate">
                    {selectedModelObj ? (
                      <>
                        <div className="text-sm font-semibold text-zinc-100 truncate">
                          {selectedModelObj.name}
                        </div>
                        <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2 pt-0.5">
                          <span>{selectedModelObj.spec.split("//")[0]?.trim() || "Master Spec"}</span>
                          <span>•</span>
                          <span className="text-[#68dba9]">
                            {selectedModelObj.iqScore} Circular IQ
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm text-zinc-400 font-normal">
                          Select model &amp; spec variant...
                        </div>
                        <div className="text-[11px] font-mono text-zinc-500 pt-0.5">
                          Click to browse {categoryModels.length} models or search
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 text-zinc-400">
                  {isDropdownOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Opened Dropdown Tray Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#141414] border border-[#27272A] rounded-xl shadow-2xl z-50 p-2.5 space-y-2.5">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={`Search ${hardwareClass === "SMARTPHONES" ? "phone model (e.g. S24, iPhone 15, OnePlus)..." : "model or spec..."}`}
                      className="w-full bg-[#1e1e1e] text-zinc-100 text-xs pl-9 pr-3 py-2 rounded-lg border border-[#2e2e2e] focus:outline-none focus:border-[#4edea3] placeholder:text-zinc-500"
                      autoFocus
                    />
                  </div>

                  {/* Cashify-style Brand Quick Filter Pills */}
                  {availableBrands.length > 1 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {availableBrands.map((b) => {
                        const count =
                          b === "ALL"
                            ? categoryModels.length
                            : categoryModels.filter((m) => m.brand === b).length;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => {
                              setSelectedBrand(b);
                              setSearchQuery("");
                            }}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all ${
                              selectedBrand === b
                                ? "bg-[#4edea3] text-black font-semibold shadow-xs"
                                : "bg-[#201f1f] text-zinc-400 hover:text-zinc-200 hover:bg-[#282828] border border-[#2c2c2e]"
                            }`}
                          >
                            {b === "ALL" ? `All (${count})` : `${b} (${count})`}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Filter header showing exact count */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-1 pt-0.5 border-t border-[#222]">
                    <span>
                      {selectedBrand === "ALL" ? "All models" : `${selectedBrand} models`} ({filteredModels.length})
                    </span>
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="text-[#4edea3] hover:underline"
                      >
                        Reset search
                      </button>
                    )}
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                    {filteredModels.length === 0 ? (
                      <div className="py-6 text-center text-xs text-zinc-500">
                        No models found matching &quot;{searchQuery}&quot;
                      </div>
                    ) : (
                      filteredModels.map((item) => {
                        const isSelected = selectedModelObj ? item.name === selectedModelObj.name : false;
                        return (
                          <div
                            key={item.name}
                            onClick={() => handleSelectModel(item)}
                            className={`p-2.5 rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-[#27272A]/80 border border-[#4edea3]/40"
                                : "hover:bg-[#202020]"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              {isSelected ? (
                                <CheckCircle2 className="w-4 h-4 text-[#4edea3] shrink-0" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-zinc-600 shrink-0" />
                              )}
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-zinc-100 truncate">
                                  {item.name}
                                </div>
                                <div className="text-[10px] font-mono text-zinc-500 truncate">
                                  {item.spec}
                                </div>
                              </div>
                            </div>
                            {item.highlightTag && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] whitespace-nowrap">
                                {item.highlightTag}
                              </span>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Auto-identified TAC Banner (Smartphones only) */}
          {hardwareClass === "SMARTPHONES" && autoIdentifiedModel && (
            <div className="p-2.5 rounded-xl bg-[#4edea3]/10 border border-[#4edea3]/30 flex items-center gap-2 text-xs text-[#4edea3] animate-in fade-in duration-200">
              <Sparkles className="w-3.5 h-3.5 text-[#4edea3] shrink-0" />
              <span className="truncate">
                TAC Matched: Auto-identified as <strong className="font-semibold">{autoIdentifiedModel}</strong>
              </span>
            </div>
          )}

          {/* Secondary Telemetry / Serial Number Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="device-identifier"
                className="text-xs font-semibold text-zinc-200 flex items-center gap-2"
              >
                {hardwareClass === "SMARTPHONES" ? (
                  <>
                    <span>IMEI Number</span>
                    <span className="text-[#4edea3]">*</span>
                    {imeiValue && (
                      isImeiValid ? (
                        <span className="text-[10px] font-mono text-[#4edea3] flex items-center gap-1 bg-[#4edea3]/10 px-1.5 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 text-[#4edea3]" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-rose-400 flex items-center gap-1 bg-rose-500/10 px-1.5 py-0.5 rounded">
                          <AlertCircle className="w-3 h-3 text-rose-400" />
                          Invalid Checksum
                        </span>
                      )
                    )}
                  </>
                ) : (
                  <>
                    <span>Serial Number</span>
                    <span className="text-[10px] font-mono text-zinc-500 bg-[#222] px-1.5 py-0.5 rounded">
                      Optional
                    </span>
                  </>
                )}
              </label>
              {hardwareClass === "SMARTPHONES" && (
                <span className="text-[11px] font-mono text-zinc-500">
                  {imeiValue.length}/15 digits
                </span>
              )}
            </div>
            <div className="relative">
              <QrCode
                className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                  hardwareClass === "SMARTPHONES" && imeiValue
                    ? isImeiValid
                      ? "text-[#4edea3]"
                      : "text-rose-400"
                    : "text-zinc-400"
                }`}
              />
              <input
                id="device-identifier"
                type="text"
                maxLength={hardwareClass === "SMARTPHONES" ? 15 : 40}
                value={serialNumberOrImei || ""}
                onChange={(e) => {
                  const cleaned =
                    hardwareClass === "SMARTPHONES"
                      ? e.target.value.replace(/\D/g, "").slice(0, 15)
                      : e.target.value;
                  setValue("serialNumberOrImei", cleaned);
                  if (imeiError) setImeiError(null);
                }}
                placeholder={
                  hardwareClass === "SMARTPHONES"
                    ? "Enter 15-digit IMEI number..."
                    : "e.g. C02G40XMD6R7 or SN-89240 (Optional)"
                }
                className={`w-full h-11 bg-[#121212] border pl-10 pr-24 py-2 rounded-xl text-zinc-100 font-mono text-xs focus:outline-none placeholder:text-zinc-600 transition-all ${
                  hardwareClass === "SMARTPHONES" && imeiValue
                    ? isImeiValid
                      ? "border-[#4edea3]/60 focus:border-[#4edea3] ring-1 ring-[#4edea3]/20"
                      : "border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/20"
                    : "border-[#27272A] focus:border-[#4edea3]"
                }`}
              />
              <button
                type="button"
                onClick={handleScanSimulation}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#27272A] text-[#14B8A6] hover:text-white font-mono text-[11px] flex items-center gap-1 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>Auto-fill</span>
              </button>
            </div>
            {hardwareClass === "SMARTPHONES" ? (
              imeiError ? (
                <p className="text-[11px] text-rose-400 flex items-center gap-1.5 mt-1 font-mono">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                  <span>{imeiError}</span>
                </p>
              ) : imeiValue && !isImeiValid ? (
                <p className="text-[11px] text-rose-400 flex items-center gap-1.5 mt-1 font-mono">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                  <span>Must be exactly 15 digits satisfying Luhn&apos;s algorithm checksum.</span>
                </p>
              ) : (
                <p className="text-[11px] text-zinc-500">
                  15-digit International Mobile Equipment Identity verified using Luhn&apos;s algorithm.
                </p>
              )
            ) : (
              <p className="text-[11px] text-zinc-500">
                Device serial number or hardware identifier (optional for non-smartphones).
              </p>
            )}
          </div>

          {/* High-Craft Trust Callout Banner */}
          <div className="p-3.5 rounded-xl bg-[#1c1b1b] border border-[#27272A] flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg bg-[#4edea3]/10 text-[#4edea3] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Zap className="w-3.5 h-3.5 text-[#4edea3]" />
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-[#4edea3]">
                Instant Baseline Auto-Calibration
              </div>
              <div className="text-[11px] text-zinc-400 leading-relaxed">
                Selecting a model automatically loads standard specs, repairability scores, and baseline lifecycle data.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Action Bar */}
        <div className="p-6 pt-4 bg-[#121212] border-t border-[#27272A] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white font-medium text-xs transition-colors"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleProceed}
              className="px-6 py-2.5 rounded-xl bg-[#4edea3] hover:bg-[#3ecb90] text-black font-semibold text-xs flex items-center gap-2 shadow-lg shadow-[#4edea3]/20 hover:brightness-105 active:scale-[0.99] transition-all"
            >
              <span>Proceed to Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
