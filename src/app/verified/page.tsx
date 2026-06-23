"use client";
import { useState, useEffect } from "react";
import { Search, BadgeCheck, Shield, Wrench, Clock, Loader2, Package, BookOpen, Calculator, Ruler, FileText, SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { getConditionLabel, getCategoryIcon } from "@/lib/utils";

interface VerifiedProduct {
  id: string;
  dppId: string;
  category: string;
  name: string;
  brand?: string;
  model?: string;
  conditionScore: number;
  trustScore: number;
  isVerified: boolean;
  createdAt: string;
  currentOwner?: { name: string; college?: string; trustScore: number };
  ownershipHistory: { id: string }[];
  repairLogs: { id: string }[];
}

const CATEGORIES = ["ALL", "LAPTOP", "PHONE", "GAMING_CONSOLE", "CYCLE", "APPLIANCE", "ACADEMIC_EQUIPMENT"];

const CATEGORY_LABELS: Record<string, string> = {
  ALL: "All",
  LAPTOP: "Laptops",
  PHONE: "Phones",
  GAMING_CONSOLE: "Gaming",
  CYCLE: "Cycles",
  APPLIANCE: "Appliances",
  ACADEMIC_EQUIPMENT: "Academic",
};

const ACADEMIC_SUBCATEGORIES = [
  { label: "All Academic",  keyword: null,           icon: BookOpen },
  { label: "Textbooks",     keyword: "book",          icon: BookOpen },
  { label: "Calculator",    keyword: "calculator",    icon: Calculator },
  { label: "Drafter",       keyword: "drafter",       icon: Ruler },
  { label: "Sheet Holder",  keyword: "sheet holder",  icon: FileText },
  { label: "Rolling Scale", keyword: "rolling scale", icon: SlidersHorizontal },
];

export default function VerifiedPage() {
  const [products, setProducts] = useState<VerifiedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setSelectedSubcategory(null);
    setPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    let cancelled = false;
    async function fetchVerified() {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page) });
        if (selectedCategory !== "ALL") params.set("category", selectedCategory);
        if (selectedSubcategory) params.set("name", selectedSubcategory);
        const res = await fetch("/api/verified?" + params.toString());
        if (res.ok && !cancelled) {
          const data = await res.json();
          setProducts(data.products);
          setTotalPages(data.pagination.pages);
          setTotal(data.pagination.total);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchVerified();
    return () => { cancelled = true; };
  }, [selectedCategory, selectedSubcategory, page]);

  const filtered = search
    ? products.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.brand?.toLowerCase().includes(search.toLowerCase()) ||
        p.model?.toLowerCase().includes(search.toLowerCase()) ||
        p.dppId.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        <div className="mb-8 max-w-3xl">
          <div className="mono-tag text-emerald-400 mb-2 flex items-center gap-1.5">
            <BadgeCheck className="w-3.5 h-3.5" />
            EcoXchange Verified
          </div>
          <h1 className="text-2xl font-semibold text-white mb-1">
            Products with a verified digital identity.
          </h1>
          <p className="text-zinc-500 text-sm">
            Every product here has been independently verified — confirmed authentic, sustainably sourced, and traceable through its entire lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg">
          {[
            { label: "Verified Products", value: total },
            { label: "Authenticity", value: "100%" },
            { label: "Trust Gaps", value: 0 },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#0f0f0f] border border-emerald-500/15 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-emerald-400">{stat.value}</div>
              <div className="text-[10px] text-zinc-600 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by brand, model, or DPP-ID..."
            className="input-base pl-9 w-full"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setPage(1); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                  : "bg-[#0f0f0f] border border-[#1f1f1f] text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
              }`}
            >
              {cat !== "ALL" && getCategoryIcon(cat)}
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {selectedCategory === "ACADEMIC_EQUIPMENT" && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
            {ACADEMIC_SUBCATEGORIES.map((sub) => {
              const Icon = sub.icon;
              return (
                <button
                  key={sub.label}
                  onClick={() => { setSelectedSubcategory(sub.keyword); setPage(1); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    selectedSubcategory === sub.keyword
                      ? "bg-blue-500/15 border border-blue-500/30 text-blue-400"
                      : "bg-[#0f0f0f] border border-[#1f1f1f] text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {sub.label}
                </button>
              );
            })}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-zinc-500 mb-2">No verified products yet</h2>
            <p className="text-zinc-600 text-sm">
              {selectedCategory !== "ALL" ? "Try a different category or subcategory" : "Verified products will appear here once approved"}
            </p>
          </div>
        ) : (
          <>
            <div className="mono-tag mb-4">{total} verified products</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((product) => {
                const conditionInfo = getConditionLabel(product.conditionScore);
                const trustScore = Math.round(product.trustScore);
                return (
                  <a
                    key={product.id}
                    href={"/passport/" + product.dppId}
                    className="group block bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 card-hover hover:border-emerald-500/20 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="text-2xl">{getCategoryIcon(product.category)}</span>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/8 border border-emerald-500/15">
                        <Shield className="w-2.5 h-2.5 text-emerald-400" />
                        <span className="text-[9px] text-emerald-400 font-medium">Verified</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <h3 className="text-[14px] font-semibold text-white leading-tight mb-0.5 break-words">
                        {product.name || ((product.brand ?? "") + " " + (product.model ?? "")).trim()}
                      </h3>
                      <div className="font-mono text-[10px] text-zinc-600 break-all">{product.dppId}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                      <div className="bg-[#141414] rounded-lg p-2 text-center">
                        <div className="text-xs font-semibold text-white">{trustScore}</div>
                        <div className="text-[9px] text-zinc-600">Trust</div>
                      </div>
                      <div className="bg-[#141414] rounded-lg p-2 text-center">
                        <div className={"text-[10px] font-semibold " + conditionInfo.color}>{conditionInfo.label}</div>
                        <div className="text-[9px] text-zinc-600">Condition</div>
                      </div>
                      <div className="bg-[#141414] rounded-lg p-2 text-center">
                        <div className="text-xs font-semibold text-white">{product.ownershipHistory.length}</div>
                        <div className="text-[9px] text-zinc-600">Owners</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1 text-[10px] text-zinc-600">
                        <Wrench className="w-2.5 h-2.5" />
                        {product.repairLogs.length} repairs
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-zinc-600">
                        <Clock className="w-2.5 h-2.5" />
                        {new Date(product.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#1f1f1f]">
                      <div className="text-[10px] text-zinc-600 break-words">
                        {product.currentOwner
                          ? product.currentOwner.name + (product.currentOwner.college ? " · " + product.currentOwner.college.split("(")[0].trim() : "")
                          : "Unowned"}
                      </div>
                      <div className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium group-hover:bg-emerald-500/15 transition-all">
                        View DPP →
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg border border-[#1f1f1f] text-zinc-400 text-sm disabled:opacity-40 hover:border-zinc-600 transition-all">Previous</button>
                <span className="text-zinc-600 text-sm px-2">{page} / {totalPages}</span>
                <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg border border-[#1f1f1f] text-zinc-400 text-sm disabled:opacity-40 hover:border-zinc-600 transition-all">Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
