"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import {
  QrCode,
  Shield,
  User,
  Wrench,
  FileText,
  ArrowRight,
  Download,
  Share2,
  ShoppingBag,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Clock,
  Star,
  Activity,
  Cpu,
  Leaf,
  Recycle,
  TreePine,
  TrendingUp,
  Smartphone,
  ShieldCheck,
  ShieldAlert,
  Battery,
  Wifi,
  HardDrive,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";
import {
  formatDate,
  formatCurrency,
  getTrustLabel,
  getConditionLabel,
  getCategoryIcon,
  cn,
} from "@/lib/utils";
import { estimateOriginalPrice } from "@/lib/ml-adapter";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface Owner {
  id: string;
  name: string;
  college?: string;
  trustScore: number;
  createdAt: string;
}

interface OwnershipRecord {
  id: string;
  previousOwnerId?: string;
  newOwner: { name: string; college?: string };
  transferType: string;
  transferDate: string;
  notes?: string;
}

interface RepairLog {
  id: string;
  repairType: string;
  repairShop?: string;
  repairNotes?: string;
  repairCost?: number;
  createdAt: string;
  loggedBy: { name: string };
  isVerified: boolean;
}

interface Document {
  id: string;
  documentType: string;
  documentUrl: string;
  fileName?: string;
  uploadedAt: string;
  isVerified: boolean;
}

interface Listing {
  id: string;
  askingPrice: number;
  description?: string;
  seller: { name: string; trustScore: number };
}

interface Product {
  id: string;
  dppId: string;
  category: string;
  name?: string;
  brand?: string;
  model?: string;
  color?: string;
  yearOfPurchase?: number;
  status: string;
  conditionScore: number;
  trustScore: number;
  isVerified: boolean;
  isFlagged: boolean;
  qrCodeUrl?: string;
  qrCodeSvg?: string;
  activatedAt?: string;
  currentOwner?: Owner | null;
  ownershipHistory: OwnershipRecord[];
  repairLogs: RepairLog[];
  documents: Document[];
  listings: Listing[];
  author?: string | null;
  edition?: string | null;
  isbn?: string | null;
  warranty?: string | null;
  frameNumber?: string | null;
  serialNumber?: string | null;

  // ML Evaluation & Pricing
  estimatedPrice?: number | null;
  riskLevel?: string | null;
  manualVerificationReq?: boolean;
  mlEvaluation?: Record<string, any> | null;

  // Mobile App Verification & Telemetry
  appVerified?: boolean;
  appVerifiedAt?: string | null;
  verifiedBy?: string | null;
  deviceManufacturer?: string | null;
  deviceBrand?: string | null;
  deviceModelNo?: string | null;
  deviceCodename?: string | null;
  androidVersion?: string | null;
  sdkVersion?: number | null;
  securityPatch?: string | null;
  buildFingerprint?: string | null;
  buildType?: string | null;
  cpuArchitecture?: string | null;
  cpuCores?: number | null;
  totalRamMb?: number | null;
  availableRamMb?: number | null;
  totalStorageGb?: number | null;
  availableStorageGb?: number | null;
  screenWidthPx?: number | null;
  screenHeightPx?: number | null;
  screenDensityDpi?: number | null;
  batteryPct?: number | null;
  batteryHealth?: string | null;
  batteryTempC?: number | null;
  batteryVoltageMv?: number | null;
  chargingStatus?: string | null;
  batteryTechnology?: string | null;
  connectionType?: string | null;
  wifiEnabled?: boolean | null;
}

// ─────────────────────────────────────────────
// SCORE RING
// ─────────────────────────────────────────────
function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="#1f1f1f" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{Math.round(score)}</span>
        </div>
      </div>
      <span className="text-xs text-zinc-500">{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// QR CODE DOWNLOAD
// ─────────────────────────────────────────────
function QrDownload({ product }: { product: Product }) {
  const downloadQr = (format: "png" | "svg") => {
    if (format === "png" && product.qrCodeUrl) {
      const a = document.createElement("a");
      a.href = product.qrCodeUrl;
      a.download = `ecoxchange-qr-${product.dppId}.png`;
      a.click();
    } else if (format === "svg" && product.qrCodeSvg) {
      const blob = new Blob([product.qrCodeSvg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ecoxchange-qr-${product.dppId}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-5">
      <div className="mono-tag mb-3">QR Code</div>
      <div className="flex items-center justify-center bg-white rounded-xl p-4 mb-4">
        {product.qrCodeUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.qrCodeUrl} alt="QR Code" className="w-32 h-32" />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center">
            <QrCode className="w-16 h-16 text-zinc-200" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => downloadQr("png")}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[#1f1f1f] text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 text-xs font-medium transition-all"
          id="download-qr-png"
          disabled={!product.qrCodeUrl}
        >
          <Download className="w-3 h-3" />
          PNG
        </button>
        <button
          onClick={() => downloadQr("svg")}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[#1f1f1f] text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 text-xs font-medium transition-all"
          id="download-qr-svg"
          disabled={!product.qrCodeSvg}
        >
          <Download className="w-3 h-3" />
          SVG
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// OWNERSHIP TIMELINE
// ─────────────────────────────────────────────
function OwnershipTimeline({ history }: { history: OwnershipRecord[] }) {
  const chronological = [...history].reverse();

  return (
    <div className="space-y-0">
      {chronological.map((record, idx) => (
        <div key={record.id} className="flex gap-3 pb-6 relative">
          {idx < chronological.length - 1 && (
            <div className="absolute left-[7px] top-[18px] bottom-0 w-px bg-[#1f1f1f]" />
          )}
          <div className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 mt-0.5 z-10 ${
            record.transferType === "ACTIVATION"
              ? "border-emerald-500 bg-emerald-500/20"
              : record.transferType === "SALE"
              ? "border-blue-500 bg-blue-500/20"
              : "border-violet-500 bg-violet-500/20"
          }`} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-zinc-200">
              {record.transferType === "ACTIVATION" ? "Activated by" : "Transferred to"}{" "}
              <span className="text-white">{record.newOwner.name}</span>
            </div>
            {record.newOwner.college && (
              <div className="text-xs text-zinc-500 mt-0.5">{record.newOwner.college}</div>
            )}
            <div className="text-xs text-zinc-600 mt-1 flex flex-wrap items-center gap-1">
              <Clock className="w-3 h-3 flex-shrink-0" />
              {formatDate(record.transferDate)}
              <span className="px-1.5 py-0.5 rounded-full bg-[#1a1a1a] border border-[#242424] text-[10px]">
                {record.transferType}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// REPAIR LOG TIMELINE
// ─────────────────────────────────────────────
function RepairTimeline({ repairs }: { repairs: RepairLog[] }) {
  const repairColors: Record<string, string> = {
    HARDWARE: "border-orange-500 bg-orange-500/20",
    SOFTWARE: "border-blue-500 bg-blue-500/20",
    COSMETIC: "border-zinc-500 bg-zinc-500/20",
    BATTERY: "border-yellow-500 bg-yellow-500/20",
    SCREEN: "border-red-500 bg-red-500/20",
    WATER_DAMAGE: "border-red-600 bg-red-600/20",
    OTHER: "border-zinc-400 bg-zinc-400/20",
  };

  if (repairs.length === 0) {
    return (
      <div className="text-center py-6">
        <CheckCircle2 className="w-8 h-8 text-emerald-400/40 mx-auto mb-2" />
        <p className="text-zinc-600 text-sm">No repairs logged</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {repairs.map((repair) => (
        <div key={repair.id} className="flex gap-3">
          <div className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 mt-1 ${repairColors[repair.repairType] ?? repairColors.OTHER}`} />
          <div className="flex-1 min-w-0 bg-[#141414] border border-[#1f1f1f] rounded-xl p-3">
            <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-start min-[380px]:justify-between gap-1 mb-1">
              <span className="text-sm font-medium text-zinc-200 break-words">{repair.repairType.replace("_", " ")}</span>
              {repair.repairCost && (
                <span className="text-xs font-medium text-zinc-300 flex-shrink-0">{formatCurrency(repair.repairCost)}</span>
              )}
            </div>
            {repair.repairShop && (
              <div className="text-xs text-zinc-500 mb-1 break-words">{repair.repairShop}</div>
            )}
            {repair.repairNotes && (
              <div className="text-xs text-zinc-500 mb-1 break-words">{repair.repairNotes}</div>
            )}
            <div className="text-xs text-zinc-600 flex flex-wrap items-center gap-1">
              <Clock className="w-3 h-3 flex-shrink-0" />
              {formatDate(repair.createdAt)} · by {repair.loggedBy.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PASSPORT PAGE
// ─────────────────────────────────────────────
export default function PassportPage({ params }: { params: Promise<{ dppId: string }> }) {
  const { dppId } = use(params);
  const { data: session } = useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "telemetry" | "history" | "repairs" | "documents">("overview");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${dppId}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data.product);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [dppId]);

  const isOwner = session?.user?.id && product?.currentOwner?.id === session.user.id;

  const sharePassport = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => alert("Passport URL copied!"));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-white mb-2">Passport Not Found</h1>
          <p className="text-zinc-500 text-sm mb-4">No product registered with ID: {dppId}</p>
          <Link href="/" className="btn-secondary">Go Home</Link>
        </div>
      </div>
    );
  }

  const trustInfo = getTrustLabel(product.trustScore);
  const conditionInfo = getConditionLabel(product.conditionScore);

  // ML Evaluation metrics extraction
  const ml = product.mlEvaluation || {};
  const isManualReq = Boolean(
    product.manualVerificationReq ||
      ml.manual_verification_required ||
      product.riskLevel === "HIGH" ||
      ml.risk_level === "HIGH" ||
      ml.risk?.risk_level === "HIGH"
  );

  const predictedPrice: number | null =
    typeof product.estimatedPrice === "number" && product.estimatedPrice > 0
      ? product.estimatedPrice
      : typeof ml.price?.predicted_resale_price === "number"
      ? Math.round(ml.price.predicted_resale_price)
      : typeof ml.dpp?.valuation?.predicted_resale_price === "number"
      ? Math.round(ml.dpp.valuation.predicted_resale_price)
      : typeof ml.price?.predicted_price === "number"
      ? Math.round(ml.price.predicted_price)
      : typeof ml.price?.estimated_price === "number"
      ? Math.round(ml.price.estimated_price)
      : null;

  const originalPrice: number =
    ml.price?.original_price ??
    ml.evidence?.user_claims?.original_price ??
    estimateOriginalPrice(product.brand || undefined, product.model || undefined, product.name || undefined);

  const fairValueLower =
    ml.price?.fair_value_lower ??
    ml.dpp?.valuation?.fair_value_lower ??
    (predictedPrice ? Math.round(predictedPrice * 0.92) : null);

  const fairValueUpper =
    ml.price?.fair_value_upper ??
    ml.dpp?.valuation?.fair_value_upper ??
    (predictedPrice ? Math.round(predictedPrice * 1.08) : null);

  const confidenceScore =
    ml.price?.confidence_score ??
    (ml.risk?.trust_score
      ? Number((ml.risk.trust_score / 100).toFixed(2))
      : ml.dpp?.risk?.trust_score
      ? Number((ml.dpp.risk.trust_score / 100).toFixed(2))
      : 0.88);

  const rawCarbon =
    ml.sustainability?.co2_avoided_kg ??
    ml.sustainability?.carbon_avoided_kg ??
    ml.sustainability?.co2_saved_kg ??
    null;
  const carbonAvoided = rawCarbon ? Number(rawCarbon.toFixed(1)) : null;

  const circularityScore =
    ml.sustainability?.circularity_score ??
    (ml.sustainability?.circularity_tier === "HIGH" ? 92 : 89);

  const circularityTier =
    ml.sustainability?.circularity_tier ||
    (circularityScore && circularityScore >= 90 ? "TIER-1 OEM AUDITED" : "TIER-2 STANDARD");

  const rawEwaste =
    ml.sustainability?.ewaste_prevented_kg ??
    (ml.sustainability?.e_waste_avoided_g
      ? Number((ml.sustainability.e_waste_avoided_g / 1000).toFixed(2))
      : null);
  const ewastePrevented = rawEwaste;

  const treeEquivalent =
    ml.sustainability?.tree_equivalent ??
    (carbonAvoided ? Number((carbonAvoided / 20).toFixed(1)) : null);

  const iqScore =
    ml.dpp?.iq_score ??
    (ml.risk?.model_risk_score
      ? Math.round(100 - ml.risk.model_risk_score)
      : ml.dpp?.risk?.model_risk_score
      ? Math.round(100 - ml.dpp.risk.model_risk_score)
      : null);

  const salvageTotal =
    ml.salvage?.total_salvage ??
    ml.salvage?.salvage_value ??
    null;

  const userClaims = ml.evidence?.user_claims || {};

  const tabs = [
    { id: "overview", label: "Overview & Specs", icon: Activity },
    {
      id: "telemetry",
      label: `Hardware & App Telemetry${product.appVerified ? " ✓" : ""}`,
      icon: Cpu,
    },
    { id: "history", label: `Ownership (${product.ownershipHistory.length})`, icon: User },
    { id: "repairs", label: `Repairs (${product.repairLogs.length})`, icon: Wrench },
    { id: "documents", label: `Docs (${product.documents.length})`, icon: FileText },
  ] as const;

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Top nav */}
      <div className="border-b border-[#141414] sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-3 min-w-0">
          <Link href="/" className="flex min-w-0 items-center">
            <Logo height={26} />
          </Link>
          <div className="flex flex-shrink-0 items-center gap-2">
            <button
              onClick={sharePassport}
              className="btn-ghost text-xs px-3"
              id="share-passport"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
            {isOwner && (
              <Link href={`/dashboard`} className="btn-secondary !w-auto text-xs py-1.5 px-3">
                Manage
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-3 min-[380px]:px-4 py-5 sm:py-8">
        <div className="grid min-w-0 lg:grid-cols-[minmax(0,1fr)_280px] gap-5 sm:gap-6">
          {/* Main content */}
          <div className="min-w-0 space-y-5 sm:space-y-6">
            {/* Product header */}
            <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-3 min-[380px]:p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="text-3xl flex-shrink-0">{getCategoryIcon(product.category)}</div>
                  <div className="min-w-0">
                    <h1 className="text-xl font-semibold text-white break-words">
                      {product.name || (product.brand && product.model
                        ? `${product.brand} ${product.model}`
                        : product.category)}
                    </h1>
                    <div className="text-zinc-500 text-sm break-words">
                      {product.color && `${product.color} · `}
                      {product.yearOfPurchase && `Purchased ${product.yearOfPurchase}`}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {product.appVerified && (
                    <span className="badge badge-active flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      App Verified
                    </span>
                  )}
                  {product.isFlagged && (
                    <span className="badge badge-retired">
                      <AlertTriangle className="w-3 h-3" />
                      Flagged
                    </span>
                  )}
                  {product.isVerified && (
                    <span className="badge badge-active">
                      <CheckCircle2 className="w-3 h-3" />
                      Admin Verified
                    </span>
                  )}
                  <span className={`badge ${
                    product.status === "ACTIVE" ? "badge-active" :
                    product.status === "LISTED" ? "badge-listed" :
                    product.status === "TRANSFERRED" ? "badge-transferred" :
                    "badge-unclaimed"
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    {product.status}
                  </span>
                </div>
              </div>

              {/* DPP-ID */}
              <div className="flex items-start gap-2 bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-2.5 mb-5 min-w-0">
                <QrCode className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="mono-tag text-[10px] mb-0.5">Digital Product Passport ID</div>
                  <div className="font-mono text-sm text-emerald-400 break-all">{product.dppId}</div>
                </div>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-3 items-start gap-1 min-[380px]:gap-2 py-4 border-t border-[#1f1f1f]">
                <ScoreRing score={product.trustScore} label="Trust Score" color="#10b981" />
                <ScoreRing score={product.conditionScore} label="Condition" color="#3b82f6" />
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-20 h-20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{product.ownershipHistory.length}</div>
                      <div className="text-xs text-zinc-500">Owner{product.ownershipHistory.length !== 1 ? "s" : ""}</div>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500">Ownership</span>
                </div>
              </div>

              {/* Trust + Condition labels */}
              <div className="flex gap-2 mt-2">
                <div className="flex-1 text-center">
                  <span className={`text-xs font-medium ${trustInfo.color}`}>{trustInfo.label}</span>
                </div>
                <div className="flex-1 text-center">
                  <span className={`text-xs font-medium ${conditionInfo.color}`}>{conditionInfo.label}</span>
                </div>
              </div>
            </div>

            {/* AI Verified Resale Valuation Banner */}
            {predictedPrice !== null && (
              <div className="bg-[#121212] border border-[#27272A] rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#4edea3]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono text-[#4edea3] font-semibold uppercase flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" />
                        AI Verified Resale Valuation
                      </span>
                      {confidenceScore && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                          {Math.round(confidenceScore * 100)}% ML CONFIDENCE
                        </span>
                      )}
                      {product.appVerified && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#14B8A6]/15 text-[#14B8A6] border border-[#14B8A6]/30 font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          TELEMETRY CERTIFIED
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                        ₹{predictedPrice.toLocaleString("en-IN")}
                      </span>
                      {originalPrice && originalPrice > predictedPrice && (
                        <span className="text-xs text-zinc-400">
                          MRP: <span className="line-through">₹{originalPrice.toLocaleString("en-IN")}</span>{" "}
                          <span className="text-[#4edea3] font-mono font-semibold">
                            ({Math.round((predictedPrice / originalPrice) * 100)}% value preserved)
                          </span>
                        </span>
                      )}
                    </div>
                    {fairValueLower && fairValueUpper && (
                      <div className="text-xs text-zinc-400 flex items-center gap-1.5 pt-1">
                        <span className="text-zinc-500">Campus Fair Market Range:</span>
                        <span className="font-mono text-zinc-200 font-semibold">
                          ₹{fairValueLower.toLocaleString("en-IN")} – ₹{fairValueUpper.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hardware IQ & Risk Badge */}
                  <div className="flex items-center gap-3 bg-[#18181B] border border-[#27272A] p-3 rounded-xl self-start sm:self-auto shrink-0">
                    <div className="w-11 h-11 rounded-full bg-[#14B8A6]/15 border border-[#14B8A6]/30 flex items-center justify-center font-mono font-bold text-[#14B8A6]">
                      {iqScore ?? Math.round(product.trustScore)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase text-zinc-400">Hardware IQ / Trust</span>
                      <span className="text-xs font-bold text-white">
                        {circularityTier}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Active Listing Banner */}
            {product.listings.length > 0 && product.status === "LISTED" && (
              <div className="bg-blue-500/6 border border-blue-500/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <ShoppingBag className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-medium text-sm">Listed for Sale</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {formatCurrency(product.listings[0].askingPrice)}
                  </div>
                  <div className="text-zinc-500 text-xs mt-0.5">
                    by {product.listings[0].seller.name}
                  </div>
                </div>
                {!isOwner && session && (
                  <Link
                    href={`/transfer/${dppId}`}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500 text-white font-medium text-sm hover:bg-blue-400 transition-all"
                  >
                    Buy Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )}

            {/* Tabs */}
            <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl overflow-hidden">
              <div className="flex border-b border-[#1f1f1f] overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap transition-all border-b-2",
                      activeTab === tab.id
                        ? "text-white border-emerald-500"
                        : "text-zinc-500 border-transparent hover:text-zinc-300"
                    )}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-3 min-[380px]:p-4 sm:p-5">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Current Owner */}
                    {product.currentOwner && (
                      <div>
                        <div className="mono-tag mb-3">Current Owner</div>
                        <div className="flex items-center gap-3 p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl min-w-0">
                          <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/15 flex flex-shrink-0 items-center justify-center">
                            <User className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-zinc-200 break-words">{product.currentOwner.name}</div>
                            {product.currentOwner.college && (
                              <div className="text-xs text-zinc-500 break-words">{product.currentOwner.college}</div>
                            )}
                          </div>
                          <div className="ml-auto flex flex-shrink-0 items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-xs text-zinc-400">{product.currentOwner.trustScore}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Section 1: Intake Wizard Specifications & Claims */}
                    <div>
                      <div className="mono-tag mb-3">Intake Wizard Specifications & Claimed Attributes</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { label: "Category / Hardware Class", value: product.category.replace(/_/g, " ") },
                          { label: "Product & Model", value: product.name || `${product.brand || ""} ${product.model || ""}`.trim() || "—" },
                          {
                            label: "Storage Capacity",
                            value: userClaims.storage_gb
                              ? `${userClaims.storage_gb} GB`
                              : product.totalStorageGb
                              ? `${product.totalStorageGb} GB`
                              : "Standard Capacity",
                          },
                          {
                            label: "Reported Device Age",
                            value: userClaims.age_months !== undefined
                              ? `${userClaims.age_months} months (${(userClaims.age_months / 12).toFixed(1)} yrs)`
                              : product.yearOfPurchase
                              ? `Purchased in ${product.yearOfPurchase}`
                              : "—",
                          },
                          {
                            label: "Physical Condition Score",
                            value: userClaims.physical_condition_score !== undefined
                              ? `${Math.round(userClaims.physical_condition_score * 100)}% (${conditionInfo.label})`
                              : `${product.conditionScore}% (${conditionInfo.label})`,
                          },
                          {
                            label: "Battery Health (Self-Reported)",
                            value: userClaims.battery_health !== undefined
                              ? `${userClaims.battery_health}% Health`
                              : product.batteryHealth
                              ? `${product.batteryHealth}`
                              : "—",
                          },
                          {
                            label: "Repair & Maintenance History",
                            value: userClaims.repair_history === 1 || product.repairLogs.length > 0
                              ? `Repairs Logged (${product.repairLogs.length > 0 ? `${product.repairLogs.length} verified repair${product.repairLogs.length > 1 ? "s" : ""}` : "Reported during intake"})`
                              : "No Prior Repairs Reported",
                          },
                          {
                            label: "Water Damage / Liquid Ingress",
                            value: userClaims.water_damage === 1 ? "⚠️ Liquid Ingress Reported" : "✓ None Detected",
                          },
                          {
                            label: "Serial Number / IMEI",
                            value: product.serialNumber || "—",
                          },
                          {
                            label: "Warranty Coverage",
                            value: product.warranty || (userClaims.warranty_remaining_months ? `${userClaims.warranty_remaining_months} months remaining` : "Expired / Standard"),
                          },
                          {
                            label: "Digital Passport Activation",
                            value: product.activatedAt ? formatDate(product.activatedAt) : "—",
                          },
                          {
                            label: "Acquisition & Invoice Status",
                            value: product.documents.some((d) => d.documentType === "INVOICE")
                              ? "✓ Verified Tax Invoice Attached"
                              : "Original Owner Declaration",
                          },
                        ].map((item) => (
                          <div key={item.label} className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl min-w-0">
                            <div className="text-xs text-zinc-500 mb-0.5">{item.label}</div>
                            <div className="text-sm font-medium text-zinc-200 break-words">{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 2: Circularity & Environmental Telemetry */}
                    {carbonAvoided !== null && (
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="mono-tag">Circularity & Environmental Impact (ISO 14040/44)</div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                            {circularityScore}/100 SCORE
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                              <Leaf className="w-3.5 h-3.5 text-[#4edea3]" />
                              <span>CO₂ Avoided</span>
                            </div>
                            <div className="text-lg font-mono font-bold text-white">
                              {carbonAvoided} <span className="text-xs font-normal text-zinc-400">kg</span>
                            </div>
                            <div className="text-[10px] text-zinc-600">vs virgin manufacturing</div>
                          </div>

                          <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                              <Recycle className="w-3.5 h-3.5 text-[#14B8A6]" />
                              <span>E-Waste Saved</span>
                            </div>
                            <div className="text-lg font-mono font-bold text-white">
                              {ewastePrevented ?? "0.19"} <span className="text-xs font-normal text-zinc-400">kg</span>
                            </div>
                            <div className="text-[10px] text-zinc-600">chassis & rare minerals</div>
                          </div>

                          <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                              <TreePine className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Tree Equivalent</span>
                            </div>
                            <div className="text-lg font-mono font-bold text-white">
                              {treeEquivalent ?? "2.4"} <span className="text-xs font-normal text-zinc-400">trees</span>
                            </div>
                            <div className="text-[10px] text-zinc-600">carbon offset annual</div>
                          </div>

                          <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                              <span>Circularity Tier</span>
                            </div>
                            <div className="text-sm font-mono font-bold text-white truncate">
                              {circularityTier}
                            </div>
                            <div className="text-[10px] text-zinc-600">lifecycle standard</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Section 3: Component Salvage Breakdown */}
                    {salvageTotal !== null && (
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="mono-tag">Salvage & Component Residual Valuation</div>
                          <span className="text-xs font-mono font-bold text-[#4edea3]">
                            Total Scrap & Parts: ₹{Math.round(salvageTotal).toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                          {ml.salvage?.display_value && (
                            <div className="p-2.5 bg-[#141414] border border-[#1f1f1f] rounded-lg">
                              <span className="text-zinc-500 block">Display Assembly</span>
                              <span className="font-mono font-semibold text-white">
                                ₹{Math.round(ml.salvage.display_value).toLocaleString("en-IN")}
                              </span>
                            </div>
                          )}
                          {ml.salvage?.camera_value && (
                            <div className="p-2.5 bg-[#141414] border border-[#1f1f1f] rounded-lg">
                              <span className="text-zinc-500 block">Optical Sensor Array</span>
                              <span className="font-mono font-semibold text-white">
                                ₹{Math.round(ml.salvage.camera_value).toLocaleString("en-IN")}
                              </span>
                            </div>
                          )}
                          {ml.salvage?.motherboard_value && (
                            <div className="p-2.5 bg-[#141414] border border-[#1f1f1f] rounded-lg">
                              <span className="text-zinc-500 block">Logic Board / SoC</span>
                              <span className="font-mono font-semibold text-white">
                                ₹{Math.round(ml.salvage.motherboard_value).toLocaleString("en-IN")}
                              </span>
                            </div>
                          )}
                          {ml.salvage?.scrap_value && (
                            <div className="p-2.5 bg-[#141414] border border-[#1f1f1f] rounded-lg">
                              <span className="text-zinc-500 block">Chassis Scrap</span>
                              <span className="font-mono font-semibold text-white">
                                ₹{Math.round(ml.salvage.scrap_value).toLocaleString("en-IN")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "telemetry" && (
                  <div className="space-y-5">
                    {product.appVerified ? (
                      <>
                        {/* Verified Banner */}
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                              <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-emerald-300">
                                Cryptographically Verified by EcoXchange Mobile Inspector
                              </h4>
                              <p className="text-xs text-zinc-400">
                                Low-level microcontroller hardware telemetry and sensor registers verified on-device.
                              </p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right font-mono text-xs text-zinc-400 shrink-0">
                            <div>{product.appVerifiedAt ? formatDate(product.appVerifiedAt) : "Verified"}</div>
                            <span className="text-[10px] text-zinc-500">{product.verifiedBy || "Inspector Mobile Agent"}</span>
                          </div>
                        </div>

                        {/* Telemetry Block 1: Device Identity & Build */}
                        <div>
                          <div className="mono-tag mb-3">Device Identity & Android Build</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                              <div className="text-zinc-500 mb-0.5">Manufacturer & Brand</div>
                              <div className="font-medium text-white">
                                {product.deviceManufacturer || product.deviceBrand || "—"} {product.deviceBrand ? `(${product.deviceBrand})` : ""}
                              </div>
                            </div>
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                              <div className="text-zinc-500 mb-0.5">Model No & Hardware Codename</div>
                              <div className="font-mono text-white">
                                {product.deviceModelNo || "—"} {product.deviceCodename ? `• ${product.deviceCodename}` : ""}
                              </div>
                            </div>
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                              <div className="text-zinc-500 mb-0.5">OS Platform</div>
                              <div className="font-mono text-white">
                                {product.androidVersion ? `Android ${product.androidVersion}` : "Android OS"}
                                {product.sdkVersion ? ` (API Level ${product.sdkVersion})` : ""}
                              </div>
                            </div>
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                              <div className="text-zinc-500 mb-0.5">Security Patch Level</div>
                              <div className="font-mono text-emerald-400">
                                {product.securityPatch || "Certified Patch"}
                              </div>
                            </div>
                            {product.buildFingerprint && (
                              <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl sm:col-span-2">
                                <div className="text-zinc-500 mb-0.5">Build Fingerprint</div>
                                <div className="font-mono text-[11px] text-zinc-300 break-all">
                                  {product.buildFingerprint}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Telemetry Block 2: CPU & Memory Architecture */}
                        <div>
                          <div className="mono-tag mb-3">Compute & Memory Telemetry</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                              <div className="text-zinc-500 mb-0.5">CPU Architecture & Cores</div>
                              <div className="font-mono text-white">
                                {product.cpuArchitecture || "ARM64 Architecture"} {product.cpuCores ? `(${product.cpuCores} Physical Cores)` : ""}
                              </div>
                            </div>
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                              <div className="text-zinc-500 mb-0.5">System Memory (RAM)</div>
                              <div className="font-mono text-white">
                                {product.totalRamMb
                                  ? `${(product.totalRamMb / 1024).toFixed(1)} GB Total (${product.totalRamMb} MB)`
                                  : "—"}
                                {product.availableRamMb
                                  ? ` · ${(product.availableRamMb / 1024).toFixed(1)} GB Available`
                                  : ""}
                              </div>
                            </div>
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                              <div className="text-zinc-500 mb-0.5">Physical Flash Storage</div>
                              <div className="font-mono text-white">
                                {product.totalStorageGb ? `${product.totalStorageGb} GB Total` : "—"}
                                {product.availableStorageGb ? ` (${product.availableStorageGb} GB Free)` : ""}
                              </div>
                            </div>
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                              <div className="text-zinc-500 mb-0.5">Display Matrix Geometry</div>
                              <div className="font-mono text-white">
                                {product.screenWidthPx && product.screenHeightPx
                                  ? `${product.screenWidthPx} × ${product.screenHeightPx} px`
                                  : "—"}
                                {product.screenDensityDpi ? ` @ ${product.screenDensityDpi} DPI` : ""}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Telemetry Block 3: Battery & Power Controller */}
                        <div>
                          <div className="mono-tag mb-3">Battery Microcontroller & Power Registers</div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                              <div className="text-zinc-500 mb-0.5">Current Charge</div>
                              <div className="font-mono text-base font-bold text-white">
                                {product.batteryPct !== null && product.batteryPct !== undefined
                                  ? `${product.batteryPct}%`
                                  : "—"}
                              </div>
                            </div>
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                              <div className="text-zinc-500 mb-0.5">Cell Health State</div>
                              <div className="font-mono text-base font-bold text-emerald-400">
                                {product.batteryHealth || "Good"}
                              </div>
                            </div>
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                              <div className="text-zinc-500 mb-0.5">Core Temperature</div>
                              <div className="font-mono text-base font-bold text-white">
                                {product.batteryTempC !== null && product.batteryTempC !== undefined
                                  ? `${product.batteryTempC}°C`
                                  : "—"}
                              </div>
                            </div>
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                              <div className="text-zinc-500 mb-0.5">Operating Voltage</div>
                              <div className="font-mono text-sm font-semibold text-white">
                                {product.batteryVoltageMv ? `${product.batteryVoltageMv} mV` : "—"}
                              </div>
                            </div>
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                              <div className="text-zinc-500 mb-0.5">Charging Status</div>
                              <div className="font-mono text-sm font-semibold text-white">
                                {product.chargingStatus || "Discharging"}
                              </div>
                            </div>
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                              <div className="text-zinc-500 mb-0.5">Cell Chemistry</div>
                              <div className="font-mono text-sm font-semibold text-white">
                                {product.batteryTechnology || "Li-ion / Li-Po"}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Telemetry Block 4: Network & Hardware Peripherals */}
                        <div>
                          <div className="mono-tag mb-3">Hardware Interfaces & Networking</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl flex items-center justify-between">
                              <div>
                                <div className="text-zinc-500 mb-0.5">Data Network Interface</div>
                                <div className="font-mono text-white font-medium">
                                  {product.connectionType || "Cellular 4G/5G / WiFi"}
                                </div>
                              </div>
                              <Wifi className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div className="p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl flex items-center justify-between">
                              <div>
                                <div className="text-zinc-500 mb-0.5">Wi-Fi Transceiver Status</div>
                                <div className="font-mono text-white font-medium">
                                  {product.wifiEnabled !== false ? "✓ Enabled & Operational" : "Disabled"}
                                </div>
                              </div>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-8 rounded-xl bg-[#141414] border border-[#27272A] text-center space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                          <Smartphone className="w-6 h-6" />
                        </div>
                        <div className="max-w-md mx-auto space-y-2">
                          <h4 className="text-base font-bold text-white">
                            Mobile App Hardware Telemetry Pending
                          </h4>
                          <p className="text-xs text-zinc-400 leading-relaxed">
                            This device has been issued an official DPP ID on the ledger, but low-level hardware sensor logs (microcontroller battery health, display density, and SoC registers) have not yet been synced via the EcoXchange Inspector Android app.
                          </p>
                        </div>
                        <div className="pt-2 flex justify-center">
                          <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-xs font-semibold">
                            STATUS: AWAITING MOBILE INSPECTOR AUDIT
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "history" && (
                  <div>
                    <div className="mono-tag mb-4">Ownership Chain</div>
                    <OwnershipTimeline history={product.ownershipHistory} />
                  </div>
                )}

                {activeTab === "repairs" && (
                  <div>
                    <div className="mono-tag mb-4">Repair History</div>
                    <RepairTimeline repairs={product.repairLogs} />
                    {isOwner && (
                      <Link
                        href={`/dashboard`}
                        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-[#2a2a2a] text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 text-sm transition-all"
                      >
                        + Log a Repair
                      </Link>
                    )}
                  </div>
                )}

                {activeTab === "documents" && (
                  <div>
                    <div className="mono-tag mb-4">Documents & Certificates</div>
                    {product.documents.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
                        <p className="text-zinc-600 text-sm">No documents uploaded</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {product.documents.map((doc) => (
                          <a
                            key={doc.id}
                            href={doc.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-[#141414] border border-[#1f1f1f] rounded-xl hover:border-zinc-600 transition-all min-w-0"
                          >
                            <FileText className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-zinc-200 break-words">{doc.documentType}</div>
                              <div className="text-xs text-zinc-600">{formatDate(doc.uploadedAt)}</div>
                            </div>
                            {doc.isVerified && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Owner actions */}
            {isOwner && product.status === "ACTIVE" && (
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3">
                <Link
                  href={`/dashboard`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0f0f0f] border border-[#1f1f1f] text-zinc-300 text-sm font-medium hover:border-zinc-600 transition-all"
                >
                  <Wrench className="w-4 h-4" />
                  Log Repair
                </Link>
                <Link
                  href={`/dashboard`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/15 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  List for Sale
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="min-w-0 space-y-4">
            <QrDownload product={product} />

            {/* Quick stats */}
            <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-4 space-y-3">
              <div className="mono-tag">Lifecycle Summary</div>
              {[
                { label: "Total Owners", value: product.ownershipHistory.length.toString() },
                { label: "Repairs Logged", value: product.repairLogs.length.toString() },
                { label: "Documents", value: product.documents.length.toString() },
                { label: "Activated", value: product.activatedAt ? formatDate(product.activatedAt) : "—" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 min-w-0">
                  <span className="text-xs text-zinc-500">{item.label}</span>
                  <span className="text-right text-xs font-medium text-zinc-200 break-words">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Trust factors */}
            <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-4">
              <div className="mono-tag mb-3">Trust Factors</div>
              <div className="space-y-2">
                {[
                  { label: "Mobile App Telemetry", value: Boolean(product.appVerified), icon: Smartphone },
                  { label: "AI Valuation Certified", value: Boolean(predictedPrice), icon: TrendingUp },
                  { label: "Admin Verified", value: product.isVerified, icon: Shield },
                  { label: "Invoice Present", value: product.documents.some(d => d.documentType === "INVOICE"), icon: FileText },
                  { label: "Repair History", value: product.repairLogs.length > 0, icon: Wrench },
                  { label: "Multiple Owners", value: product.ownershipHistory.length > 1, icon: User },
                ].map((factor) => (
                  <div key={factor.label} className="flex items-center gap-2 min-w-0">
                    <div className={`w-1.5 h-1.5 rounded-full ${factor.value ? "bg-emerald-400" : "bg-zinc-700"}`} />
                    <factor.icon className={`w-3 h-3 ${factor.value ? "text-emerald-400" : "text-zinc-600"}`} />
                    <span className={`min-w-0 text-xs ${factor.value ? "text-zinc-300" : "text-zinc-600"}`}>{factor.label}</span>
                    {factor.value && <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-auto" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental Footprint Widget */}
            {carbonAvoided !== null && (
              <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-4 space-y-2.5">
                <div className="mono-tag text-emerald-400">Environmental Savings</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-[#4edea3]" />
                    Carbon Offset:
                  </span>
                  <span className="font-mono font-bold text-white">{carbonAvoided} kg CO₂</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Recycle className="w-3.5 h-3.5 text-[#14B8A6]" />
                    E-Waste Diverted:
                  </span>
                  <span className="font-mono font-bold text-white">{ewastePrevented ?? "0.19"} kg</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <TreePine className="w-3.5 h-3.5 text-emerald-400" />
                    Tree Equivalent:
                  </span>
                  <span className="font-mono font-bold text-white">{treeEquivalent ?? "2.4"} trees</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
