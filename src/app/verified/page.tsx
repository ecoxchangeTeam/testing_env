import { BadgeCheck } from "lucide-react";

type VerifiedProduct = {
  id: string;
  name: string;
  category: string;
  imageUrl?: string | null;
};

// Replace this with your actual DB/API call
async function getVerifiedProducts(): Promise<VerifiedProduct[]> {
  // Example: return await prisma.product.findMany({ where: { verified: true } });
  return [];
}

export default async function VerifiedPage() {
  const products = await getVerifiedProducts();

  return (
    <main className="min-h-screen bg-[#080808] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <BadgeCheck className="w-6 h-6 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium tracking-wide uppercase">
              EcoXchange Verified
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Verified Products
          </h1>
          <p className="text-zinc-400 max-w-xl text-[15px] leading-relaxed">
            Every product here has been independently verified by EcoXchange —
            confirmed authentic, sustainably sourced, and traceable through its
            entire lifecycle.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { label: "Authenticity Verified", desc: "Every product confirmed genuine" },
            { label: "Lifecycle Tracked", desc: "Full ownership & repair history" },
            { label: "Zero Trust Gaps", desc: "Tamper-proof digital passport" },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/15 bg-emerald-500/5"
            >
              <BadgeCheck className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-white text-[13px] font-medium">{badge.label}</p>
                <p className="text-zinc-500 text-[12px] mt-0.5">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] hover:border-emerald-500/30 transition-all overflow-hidden"
              >
                {/* Product image */}
                {product.imageUrl && (
                  <div className="aspect-square overflow-hidden bg-[#141414]">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px] font-medium">Verified</span>
                  </div>
                  <h3 className="text-white text-[14px] font-medium mb-1">{product.name}</h3>
                  <p className="text-zinc-500 text-[12px]">{product.category}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
              <BadgeCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">
              Verified products coming soon
            </h3>
            <p className="text-zinc-500 text-[14px] max-w-sm">
              We&apos;re currently verifying products. Check back soon — only the
              best make it here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
