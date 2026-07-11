import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

interface Props {
  searchParams: {
    dppId?: string;
  };
}

export default function UnlinkedQrPage({ searchParams }: Props) {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-8 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-yellow-400" />
        </div>

        <h1 className="text-2xl font-semibold text-white mb-3">
          Product Not Linked
        </h1>

        <p className="text-zinc-400">
          This QR code has not yet been linked to any product.
        </p>

        {searchParams.dppId && (
          <div className="mt-6">
            <p className="text-xs text-zinc-500 mb-2">QR Identifier</p>

            <div className="font-mono text-emerald-400 bg-[#141414] border border-[#222] rounded-lg p-3 break-all">
              {searchParams.dppId}
            </div>
          </div>
        )}

        <p className="text-zinc-500 mt-6">
          Please contact the administrator or the seller to have this QR linked
          to its product.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-xl bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}