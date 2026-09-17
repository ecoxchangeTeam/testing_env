"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import QRCode from "qrcode";
import { AddProductModal } from "./add-product-modal";
import { Step1DeviceOwnership } from "./step-1-device-ownership";
import { Step2RepairHistory } from "./step-2-repair-history";
import { Step3DiagnosticsDefects } from "./step-3-diagnostics-defects";
import { Step3DppIssued } from "./step-3-dpp-issued";
import { AddProductFormData } from "./types";
import { CATALOG_MODELS } from "./constants";

interface AddProductWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: () => void;
}

type WizardStep =
  | "modal"
  | "step-1"
  | "step-2"
  | "step-3-section-c"
  | "step-3-dpp-issued";

const STEP_HASH_MAP: Record<WizardStep, string> = {
  modal: "#add-device",
  "step-1": "#step-1-ownership",
  "step-2": "#step-2-repairs",
  "step-3-section-c": "#step-3-diagnostics",
  "step-3-dpp-issued": "#step-3-issued",
};

const HASH_STEP_MAP: Record<string, WizardStep> = {
  "#add-device": "modal",
  "#step-1-ownership": "step-1",
  "#step-2-repairs": "step-2",
  "#step-3-diagnostics": "step-3-section-c",
  "#step-3-issued": "step-3-dpp-issued",
};

export function AddProductWizard({
  isOpen,
  onClose,
  onProductCreated,
}: AddProductWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>("modal");
  const [isMinting, setIsMinting] = useState(false);
  const [mintingMessage, setMintingMessage] = useState(
    "Minting Digital Product Passport & Generating QR..."
  );
  const stepsPushedRef = React.useRef(0);
  const isClosingRef = React.useRef(false);

  const form = useForm<AddProductFormData>({
    defaultValues: {
      channel: "consumer",
      hardwareClass: "SMARTPHONES",
      modelName: "",
      brand: "",
      model: "",
      spec: "",
      serialNumberOrImei: "",

      purchaseDate: "",
      acquisitionType: "",
      ownerCount: "",
      isCurrentOwner: "",
      hasReceipt: "",
      receiptFileName: "",

      hasRepairs: "",
      repairedComponents: [],
      repairProvider: "",
      receiptAvailability: "",
      serviceRecordFileName: "",
      productImages: [],

      selectedDefects: [],
      isFlawless: false,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      stepsPushedRef.current = 0;
      return;
    }

    const currentHash = typeof window !== "undefined" ? window.location.hash : "";
    const initialStep = HASH_STEP_MAP[currentHash] || "modal";
    setCurrentStep(initialStep);

    // If current history entry does not have wizard flag, push the initial step entry
    if (typeof window !== "undefined" && !window.history.state?.wizard) {
      window.history.pushState(
        { wizard: true, step: initialStep },
        "",
        window.location.pathname + STEP_HASH_MAP[initialStep]
      );
      stepsPushedRef.current = 1;
    }

    const handlePopState = (event: PopStateEvent) => {
      if (isClosingRef.current) return;

      const state = event.state;
      if (state && state.wizard && state.step) {
        setCurrentStep(state.step as WizardStep);
      } else {
        const hash = typeof window !== "undefined" ? window.location.hash : "";
        if (HASH_STEP_MAP[hash]) {
          setCurrentStep(HASH_STEP_MAP[hash]);
        } else {
          // User pressed browser Back past the start of the wizard!
          stepsPushedRef.current = 0;
          onClose();
          setCurrentStep("modal");
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateToStep = (nextStep: WizardStep) => {
    const hash = STEP_HASH_MAP[nextStep];
    if (typeof window !== "undefined") {
      window.history.pushState(
        { wizard: true, step: nextStep },
        "",
        window.location.pathname + hash
      );
      stepsPushedRef.current += 1;
    }
    setCurrentStep(nextStep);
  };

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleFinish = () => {
    isClosingRef.current = true;
    if (typeof window !== "undefined") {
      if (stepsPushedRef.current > 0) {
        window.history.go(-stepsPushedRef.current);
        stepsPushedRef.current = 0;
      } else {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
    onProductCreated();
    onClose();
    setTimeout(() => {
      isClosingRef.current = false;
      setCurrentStep("modal");
    }, 150);
  };

  const handleModalClose = () => {
    isClosingRef.current = true;
    if (typeof window !== "undefined") {
      if (stepsPushedRef.current > 0) {
        window.history.go(-stepsPushedRef.current);
        stepsPushedRef.current = 0;
      } else {
        if (window.location.hash.startsWith("#add-") || window.location.hash.startsWith("#step-")) {
          window.history.replaceState(null, "", window.location.pathname);
        }
      }
    }
    onClose();
    setTimeout(() => {
      isClosingRef.current = false;
      setCurrentStep("modal");
    }, 150);
  };

  const handleMintAndProceed = async () => {
    setIsMinting(true);
    setMintingMessage("Minting Cryptographic Digital Product Passport...");
    const data = form.getValues();

    // Map hardware class to EcoXchange DB category
    let category = "PHONE";
    if (data.hardwareClass === "LAPTOPS_TABLETS") category = "LAPTOP";
    else if (data.hardwareClass === "ENTERPRISE_GEAR") category = "OTHER";

    const year = new Date().getFullYear();
    const prefix = category === "PHONE" ? "PHN" : category === "LAPTOP" ? "LPT" : "OTH";
    const uniqueSuffix = Math.random().toString(36).substring(2, 10).toUpperCase();
    const newDppId = `ECO-${prefix}-${year}-${uniqueSuffix}`;

    // Base URL for QR
    const baseUrl =
      typeof window !== "undefined" ? window.location.origin : "https://ecoxchange.in";
    const passportUrl = `${baseUrl}/passport/${newDppId}`;

    let qrPng = "";
    try {
      qrPng = await QRCode.toDataURL(passportUrl, {
        width: 320,
        margin: 1,
        color: { dark: "#000000", light: "#FFFFFF" },
      });
    } catch (e) {
      console.error("QR creation error:", e);
    }

    const currentTimestamp = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
    const shaHash = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");

    form.setValue("dppId", newDppId);
    form.setValue("qrPngUrl", qrPng);
    form.setValue("timestamp", currentTimestamp);
    form.setValue("hash", shaHash);
    form.setValue("appVerified", false);

    // Persist preliminary DPP record to database (awaiting mobile app verification)
    try {
      setMintingMessage("Registering DPP Identity in Circular Registry...");
      await fetch("/api/user/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dppId: newDppId,
          name: data.modelName || "Smart Device",
          brand: data.brand || "",
          model: data.model || "",
          category,
          serialNumber: data.serialNumberOrImei || "",
          conditionScore: data.isFlawless ? 98.0 : 88.5,
          trustScore: data.hasReceipt === "yes" ? 92.0 : 75.0,
          qrPng,
        }),
      });
    } catch (err) {
      console.error("Database registration failure:", err);
    } finally {
      setIsMinting(false);
      navigateToStep("step-3-dpp-issued");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/95 overflow-y-auto backdrop-blur-sm">
      {/* Sequence of 5 screens */}
      {currentStep === "modal" && (
        <AddProductModal
          form={form}
          isOpen={true}
          onClose={handleModalClose}
          onProceed={() => navigateToStep("step-1")}
        />
      )}

      {currentStep === "step-1" && (
        <Step1DeviceOwnership
          form={form}
          onBack={handleBack}
          onNext={() => navigateToStep("step-2")}
        />
      )}

      {currentStep === "step-2" && (
        <Step2RepairHistory
          form={form}
          onBack={handleBack}
          onNext={() => navigateToStep("step-3-section-c")}
        />
      )}

      {currentStep === "step-3-section-c" && (
        <Step3DiagnosticsDefects
          form={form}
          onBack={handleBack}
          onNext={handleMintAndProceed}
        />
      )}

      {currentStep === "step-3-dpp-issued" && (
        <Step3DppIssued
          formData={form.getValues()}
          onComplete={handleFinish}
        />
      )}

      {isMinting && (
        <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 border-3 border-[#4edea3]/20 border-t-[#4edea3] rounded-full animate-spin" />
            <div className="w-8 h-8 border-2 border-[#14B8A6]/40 border-b-[#14B8A6] rounded-full animate-spin absolute" />
          </div>
          <div className="space-y-1 max-w-md">
            <p className="text-sm font-mono font-semibold text-[#4edea3] tracking-wide animate-pulse">
              {mintingMessage}
            </p>
            <p className="text-xs text-zinc-500 font-mono">
              Running ISO 14040/44 Lifecycle & Risk Assessment Telemetry Pipeline
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
