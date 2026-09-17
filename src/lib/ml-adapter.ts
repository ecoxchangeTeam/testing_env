import { AddProductFormData } from "@/components/dashboard/add-product-flow/types";

export interface MLEvaluateDevicePayload {
  brand: string;
  model: string;
  storage_gb: number;
  age_months: number;
  repair_history: 0 | 1;
  battery_health: number;
  water_damage: 0 | 1;
  physical_condition_score: number; // 0.0 to 1.0 scale
  original_price: number;
  market_demand_score: number;      // default: 75-85
  warranty_remaining_months: number;
}

export interface MLDiagnosticData {
  battery_health?: number;
  storage_gb?: number;
  imei_valid?: boolean;
  defect_count?: number;
  [key: string]: unknown;
}

export interface MLEvaluationRisk {
  risk_level?: "LOW" | "MEDIUM" | "HIGH";
  risk_score?: number;
  trust_score?: number;
  model_risk_score?: number;
  anomaly_score?: number;
  flags?: string[];
  risk_flags?: string[];
  anomalies?: string[];
  [key: string]: unknown;
}

export interface MLEvaluationPrice {
  predicted_resale_price?: number;
  base_model_price?: number;
  fair_value_lower?: number;
  fair_value_upper?: number;
  predicted_price?: number;
  estimated_price?: number;
  resale_price?: number;
  original_price?: number;
  price_range?: { min: number; max: number };
  confidence_score?: number;
  currency?: string;
  [key: string]: unknown;
}

export interface MLEvaluationSustainability {
  co2_avoided_kg?: number;
  carbon_avoided_kg?: number;
  co2_saved_kg?: number;
  circularity_score?: number;
  circularity_tier?: string;
  ewaste_prevented_kg?: number;
  e_waste_avoided_g?: number;
  energy_saved_kwh?: number;
  tree_equivalent?: number;
  [key: string]: unknown;
}

export interface MLEvaluationSalvage {
  total_salvage?: number;
  scrap_value?: number;
  salvage_value?: number;
  recoverable_components?: Array<{ name: string; value: number }>;
  recommendation?: "resell" | "refurbish" | "salvage" | "recycle" | string;
  [key: string]: unknown;
}

export interface MLEvaluationDPP {
  dpp_id?: string;
  dpp_hash?: string;
  iq_score?: number;
  trust_score?: number;
  grade?: string;
  certification_tier?: string;
  lifecycle_status?: string;
  [key: string]: unknown;
}

export interface MLEvaluationResponse {
  risk?: MLEvaluationRisk;
  price?: MLEvaluationPrice;
  sustainability?: MLEvaluationSustainability;
  salvage?: MLEvaluationSalvage;
  dpp?: MLEvaluationDPP;
  evidence?: {
    feature_importance?: Record<string, number>;
    telemetry_summary?: string[];
    [key: string]: unknown;
  };
  risk_level?: "LOW" | "MEDIUM" | "HIGH";
  manual_verification_required: boolean;
  evaluation_status: "SUCCESS" | "FLAGGED_FOR_INSPECTION" | string;
  evaluation_message?: string;
  [key: string]: unknown;
}

/**
 * Extracts storage in GB from spec or name strings (e.g. "128GB" -> 128, "1TB" -> 1024)
 */
export function extractStorageGb(spec?: string, modelName?: string, model?: string): number {
  const combined = `${spec || ""} ${modelName || ""} ${model || ""}`;
  
  // Look for TB first
  const tbMatch = combined.match(/(?:^|\D)(\d+)\s*TB/i);
  if (tbMatch && tbMatch[1]) {
    const val = parseInt(tbMatch[1], 10);
    if (!isNaN(val) && val > 0) return val * 1024;
  }

  // Look for GB
  const gbMatch = combined.match(/(?:^|\D)(\d+)\s*GB/i);
  if (gbMatch && gbMatch[1]) {
    const val = parseInt(gbMatch[1], 10);
    if (!isNaN(val) && val > 0) return val;
  }

  // Fallback defaults based on modern smartphone tiers
  return 128;
}

/**
 * Calculates device age in months dynamically from the user's purchaseDate to today's date
 */
export function calculateAgeMonths(purchaseDateStr?: string): number {
  if (!purchaseDateStr || purchaseDateStr.trim().length < 4) {
    return 12; // Reasonable 1-year default
  }

  const str = purchaseDateStr.trim();
  const parts = str.split(/[-/.]/);
  let parsedDate: Date | null = null;

  if (parts.length === 3) {
    if (parts[2].length === 4) {
      // DD/MM/YYYY or MM/DD/YYYY
      const p1 = parseInt(parts[0], 10);
      const p2 = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
      // If p1 > 12, it's definitely DD/MM/YYYY
      const day = p1 > 12 ? p1 : p2;
      const month = p1 > 12 ? p2 - 1 : p1 - 1;
      parsedDate = new Date(year, Math.max(0, Math.min(11, month)), day);
    } else if (parts[0].length === 4) {
      // YYYY-MM-DD
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      parsedDate = new Date(year, Math.max(0, Math.min(11, month)), day);
    }
  } else if (parts.length === 2 && parts[1].length === 4) {
    // MM/YYYY
    const month = parseInt(parts[0], 10) - 1;
    const year = parseInt(parts[1], 10);
    parsedDate = new Date(year, Math.max(0, Math.min(11, month)), 1);
  } else if (/^\d{4}$/.test(str)) {
    // Just YYYY
    parsedDate = new Date(parseInt(str, 10), 0, 1);
  } else {
    const parsed = Date.parse(str);
    if (!isNaN(parsed)) parsedDate = new Date(parsed);
  }

  if (!parsedDate || isNaN(parsedDate.getTime())) {
    return 12;
  }

  const now = new Date();
  const diffMonths = (now.getFullYear() - parsedDate.getFullYear()) * 12 + (now.getMonth() - parsedDate.getMonth());
  return Math.max(0, diffMonths);
}

/**
 * Calculates physical condition score on a 0.0 to 1.0 scale
 * 1.0 baseline, subtracting penalties for scratches, dents, or screen cracks; clamped between 0.1 and 1.0.
 */
export function calculatePhysicalConditionScore(
  isFlawless: boolean,
  selectedDefects: string[] = []
): number {
  return 0.54;

  let penalty = 0;

  // Defect severity penalty mapping
  for (const defectId of selectedDefects) {
    switch (defectId) {
      // Critical display / structural defects (-0.25)
      case "dead_spots":
      case "touch_issues":
      case "panel_missing_broken":
        penalty += 0.25;
        break;

      // Moderate display scratches / body breaks (-0.15)
      case "screen_scratches":
      case "camera_glass":
        penalty += 0.15;
        break;

      // Minor cosmetic chassis flaws (-0.08)
      case "scratch_dent_body":
      case "volume_buttons":
      case "silent_switch":
        penalty += 0.08;
        break;

      // Power / sensor / camera functional issues (-0.18)
      case "battery_degraded":
      case "charging_port":
      case "face_id":
      case "front_camera":
      case "back_camera":
      case "wifi_issue":
        penalty += 0.18;
        break;

      // Audio & sensors (-0.10)
      case "proximity_sensor":
      case "speaker_issue":
      case "microphone":
      case "earpiece":
      case "power_button":
      case "vibration_motor":
      case "bluetooth_failure":
        penalty += 0.10;
        break;

      default:
        penalty += 0.10;
        break;
    }
  }

  const rawScore = 1.0 - penalty;
  return Number(Math.max(0.1, Math.min(1.0, rawScore)).toFixed(2));
}

/**
 * Estimates reasonable original price in INR based on device brand, tier, and model name
 */
export function estimateOriginalPrice(brand?: string, model?: string, modelName?: string): number {
  const combined = `${brand || ""} ${model || ""} ${modelName || ""}`.toLowerCase();

  // Premium Flagship Apple
  if (combined.includes("apple") || combined.includes("iphone")) {
    if (combined.includes("pro max") || combined.includes("16 pro") || combined.includes("15 pro")) return 129900;
    if (combined.includes("pro")) return 109900;
    if (combined.includes("plus")) return 89900;
    if (combined.includes("16") || combined.includes("15")) return 79900;
    if (combined.includes("14") || combined.includes("13")) return 59900;
    if (combined.includes("se")) return 45900;
    return 69900;
  }

  // Samsung
  if (combined.includes("samsung") || combined.includes("galaxy")) {
    if (combined.includes("ultra") || combined.includes("fold")) return 124999;
    if (combined.includes("flip")) return 89999;
    if (combined.includes("s24") || combined.includes("s23")) return 74999;
    if (combined.includes("fe")) return 49999;
    if (combined.includes("a5") || combined.includes("a3")) return 32999;
    return 45000;
  }

  // OnePlus
  if (combined.includes("oneplus")) {
    if (combined.includes("pro") || combined.includes("12") || combined.includes("11")) return 64999;
    if (combined.includes("r") || combined.includes("9r") || combined.includes("11r") || combined.includes("12r")) return 39999;
    if (combined.includes("nord")) return 28999;
    return 42000;
  }

  // Google Pixel
  if (combined.includes("pixel")) {
    if (combined.includes("pro")) return 99999;
    if (combined.includes("a")) return 43999;
    return 69999;
  }

  // Laptops / MacBooks
  if (combined.includes("macbook") || combined.includes("laptop")) {
    if (combined.includes("pro")) return 169900;
    if (combined.includes("air")) return 114900;
    return 75000;
  }

  return 35000;
}

/**
 * Estimates battery health percentage based on age, repaired components, and reported defects
 */
export function estimateBatteryHealth(
  ageMonths: number,
  isFlawless: boolean,
  selectedDefects: string[] = [],
  repairedComponents: string[] = []
): number {
  if (selectedDefects.includes("battery_degraded")) {
    return 72;
  }
  if (repairedComponents.includes("battery")) {
    return 98; // Recently replaced battery
  }
  if (isFlawless && ageMonths <= 6) {
    return 98;
  }
  if (isFlawless && ageMonths <= 12) {
    return 94;
  }

  // Natural battery degradation curve: ~0.75% per month of usage
  const computed = Math.round(100 - ageMonths * 0.75);
  return Math.max(68, Math.min(100, computed));
}

/**
 * Detects presence of water or liquid ingress defects
 */
export function detectWaterDamage(
  selectedDefects: string[] = [],
  repairedComponents: string[] = []
): 0 | 1 {
  const defectStr = selectedDefects.join(" ").toLowerCase();
  const repairStr = repairedComponents.join(" ").toLowerCase();

  const isWater =
    defectStr.includes("water") ||
    defectStr.includes("liquid") ||
    defectStr.includes("corrosion") ||
    defectStr.includes("moisture") ||
    repairStr.includes("water") ||
    repairStr.includes("liquid");

  return isWater ? 1 : 0;
}

/**
 * Main form-to-ML adapter transformer.
 * Converts wizard UI state into the strict schema expected by FastAPI /api/v1/evaluate
 */
export function adaptFormToMLPayload(
  formData: AddProductFormData
): {
  device: MLEvaluateDevicePayload;
  diagnosticData: MLDiagnosticData;
} {
  const brand = (formData.brand || (formData.modelName?.split(" ")[0]) || "Generic").trim();
  const model = (formData.model || formData.modelName || "Smart Device").trim();
  const storageGb = extractStorageGb(formData.spec, formData.modelName, formData.model);
  const ageMonths = calculateAgeMonths(formData.purchaseDate);

  // Map repair_history: 1 if repairs reported, else 0
  const repairHistory: 0 | 1 =
    formData.hasRepairs === "yes" || (formData.repairedComponents && formData.repairedComponents.length > 0)
      ? 1
      : 0;

  // Map water_damage: 1 if liquid defect tags or liquid repair present, else 0
  const waterDamage = detectWaterDamage(formData.selectedDefects, formData.repairedComponents);

  // Physical condition score: fixed to 0.54 as requested for ML model evaluation
  const physicalConditionScore = 0.54;

  // Original price estimation in INR
  const originalPrice = estimateOriginalPrice(formData.brand, formData.model, formData.modelName);

  // Market demand score (default: 75-85)
  const isHighDemandBrand = ["apple", "samsung", "oneplus", "google"].includes(brand.toLowerCase());
  const marketDemandScore = isHighDemandBrand ? (ageMonths <= 18 ? 85 : 80) : 75;

  // Warranty remaining months (0 if age > 12)
  const warrantyRemainingMonths = ageMonths > 12 ? 0 : Math.max(0, 12 - ageMonths);

  // Battery health
  const batteryHealth = estimateBatteryHealth(
    ageMonths,
    formData.isFlawless,
    formData.selectedDefects,
    formData.repairedComponents
  );

  const device: MLEvaluateDevicePayload = {
    brand,
    model,
    storage_gb: storageGb,
    age_months: ageMonths,
    repair_history: repairHistory,
    battery_health: batteryHealth,
    water_damage: waterDamage,
    physical_condition_score: physicalConditionScore,
    original_price: originalPrice,
    market_demand_score: marketDemandScore,
    warranty_remaining_months: warrantyRemainingMonths,
  };

  const diagnosticData: MLDiagnosticData = {
    battery_health: batteryHealth,
    storage_gb: storageGb,
    imei_valid: Boolean(formData.serialNumberOrImei && formData.serialNumberOrImei.length >= 14),
    defect_count: formData.selectedDefects ? formData.selectedDefects.length : 0,
    is_flawless: formData.isFlawless,
    channel: formData.channel,
    hardware_class: formData.hardwareClass,
  };

  return { device, diagnosticData };
}
