"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

export default function LinkProductPage({
  params,
}: {
  params: Promise<{ dppId: string }>;
}) {
  const { dppId } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("OTHER");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/products/link-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dppId,
        name,
        category,
        brand,
        model,
        serialNumber,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Unable to link product");
      return;
    }

    router.push(`/activate/${dppId}`);
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">
        Link Blank QR
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="input-base w-full"
          placeholder="Product Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <select
          className="input-base w-full"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        >
          <option value="PHONE">Phone</option>
          <option value="LAPTOP">Laptop</option>
          <option value="APPLIANCE">Appliance</option>
          <option value="CYCLE">Cycle</option>
          <option value="ACADEMIC_EQUIPMENT">Academic Equipment</option>
          <option value="OTHER">Other</option>
        </select>

        <input
          className="input-base w-full"
          placeholder="Brand"
          value={brand}
          onChange={(e)=>setBrand(e.target.value)}
        />

        <input
          className="input-base w-full"
          placeholder="Model"
          value={model}
          onChange={(e)=>setModel(e.target.value)}
        />

        <input
          className="input-base w-full"
          placeholder="Serial Number"
          value={serialNumber}
          onChange={(e)=>setSerialNumber(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? "Saving..." : "Link Product"}
        </button>

      </form>
    </div>
  );
}