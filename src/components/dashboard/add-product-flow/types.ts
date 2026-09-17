export type IntakeChannel = "consumer" | "fleet";

export type HardwareClass =
  | "SMARTPHONES"
  | "LAPTOPS_TABLETS"
  | "AUDIO_WEARABLES"
  | "ENTERPRISE_GEAR"
  | "ACADEMIC_EQUIPMENT"
  | "OTHER";

export type AcquisitionType =
  | "new"
  | "used"
  | "refurbished"
  | "gift"
  | "other"
  | "dont_know";

export type OwnerCount = "0" | "1" | "2" | "3plus" | "unknown";

export type RepairStatus = "yes" | "no" | "unknown";

export type RepairProvider =
  | "oem"
  | "authorized"
  | "independent"
  | "self"
  | "unknown"
  | "na";

export type ReceiptAvailability = "yes" | "no" | "unknown" | "na";

export type { CatalogModel, CatalogCategory } from "@/types/catalog";

export interface DefectItem {
  id: string;
  title: string;
  description: string;
  category: "display" | "sensors" | "audio" | "body" | "power";
  severity: "MINOR" | "MODERATE" | "CRITICAL";
  image: string;
}

export interface AddProductFormData {
  // Step 0: Add Product Modal
  channel: IntakeChannel;
  hardwareClass: HardwareClass;
  modelName: string;
  brand: string;
  model: string;
  spec: string;
  serialNumberOrImei: string;

  // Step 1: Device & Ownership
  purchaseDate: string;
  acquisitionType: AcquisitionType | "";
  ownerCount: OwnerCount | "";
  isCurrentOwner: "yes" | "no" | "";
  hasReceipt: "yes" | "no" | "";
  receiptFile?: File | null;
  receiptFileName?: string;

  // Step 2: Repair & Service History
  hasRepairs: RepairStatus | "";
  repairedComponents: string[];
  repairProvider: RepairProvider | "";
  receiptAvailability: ReceiptAvailability | "";
  serviceRecordFile?: File | null;
  serviceRecordFileName?: string;
  productImages?: File[];

  // Step 3 Section C: Device Diagnostics & Defects
  selectedDefects: string[];
  isFlawless: boolean;

  // Step 3 DPP Issued
  dppId?: string;
  qrPngUrl?: string;
  qrSvgContent?: string;
  timestamp?: string;
  hash?: string;

  // ML Evaluation Intelligence
  appVerified?: boolean;
  riskLevel?: "LOW" | "MEDIUM" | "HIGH" | string;
  estimatedPrice?: number;
  manualVerificationReq?: boolean;
  mlEvaluation?: Record<string, any> | null;
  evaluationError?: string | null;
}
