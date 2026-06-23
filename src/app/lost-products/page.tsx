"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import LostCard from "@/components/lost-product-card";

interface LostProduct {
  id: string;
  status: string;

  product: {
    name: string;
    brand?: string;
    model?: string;
    category: string;
    dppId: string;
  };

  owner: {
    id: string;
    name: string;
    email: string;
    };

  finderName?: string;
  finderEmail?: string;
  finderPhone?: string;
}

export default function LostProductsPage() {
  const [products, setProducts] = useState<LostProduct[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
        fetch("/api/lost-products").then((r) => r.json()),
        fetch("/api/user/profile")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ]).then(([productsData, profileData]) => {
        setProducts(productsData);

        if (profileData?.user) {
        setCurrentUser(profileData.user);
        }

        setLoading(false);
    });
    }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808]">
        <Navbar />
        <div className="pt-32 text-center text-white">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">
        <h1 className="text-3xl font-bold text-white mb-8">
          Lost Products
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((item) => (
            <LostCard
              key={item.id}
              item={item}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
}