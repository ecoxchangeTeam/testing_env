"use client";

import { useState } from "react";

export default function LostCard({
  item,
  currentUser,
}: any) {
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const submitFound = async () => {
    const res = await fetch(
      `/api/lost-products/${item.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "FOUND",
          finderName: name,
          finderEmail: email,
          finderPhone: phone,
        }),
      }
    );


    if (res.ok) {
      location.reload();
    } else {
      alert("Failed");
    }
  };

  const markRecovered = async () => {
  const res = await fetch(
    `/api/lost-products/${item.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "RECOVERED",
      }),
    }
  );

  if (res.ok) {
    location.reload();
  } else {
    const data = await res.json();
    alert(data.error || "Failed");
  }
};

  return (
    <div
      className="
        bg-[#0f0f0f]
        border border-[#1f1f1f]
        rounded-2xl
        p-5
        card-hover
      "
    >
      <h2 className="text-white font-semibold">
        {item.product.name}
      </h2>

      <p className="text-zinc-400 text-sm mt-2">
        {item.product.brand} {item.product.model}
      </p>

      <p className="text-zinc-500 text-xs mt-2">
        {item.product.dppId}
      </p>

      <div
        className={`mt-4 text-center py-2 rounded-lg text-xs font-medium ${
          item.status === "LOST"
            ? "bg-red-500/10 text-red-400 border border-red-500/20"
            : item.status === "FOUND"
            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
        }`}
      >
        {item.status}
      </div>

      {item.status === "LOST" && (
        <>
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="
                mt-4 w-full
                flex items-center justify-center gap-1
                py-2 px-3
                rounded-lg
                bg-emerald-500/10
                border border-emerald-500/20
                text-sm text-emerald-400
                hover:bg-emerald-500/20
                transition-all
              "
            >
              Mark Found
            </button>
          ) : (
            <div className="space-y-2 mt-4">
              <input
                placeholder="Your Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full p-2 bg-black border border-zinc-700 rounded"
              />

              <input
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full p-2 bg-black border border-zinc-700 rounded"
              />

              <input
                placeholder="Phone"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="w-full p-2 bg-black border border-zinc-700 rounded"
              />

              <button
                onClick={submitFound}
                className="
                  w-full
                  py-2 px-3
                  rounded-lg
                  bg-emerald-500/10
                  border border-emerald-500/20
                  text-emerald-400
                  hover:bg-emerald-500/20
                  transition-all
                "
              >
                Submit
              </button>
            </div>
          )}
        </>
      )}

      {item.status === "FOUND" && (
  <div className="mt-4 space-y-3">
    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
      <div className="text-yellow-400 text-xs font-medium mb-2">
        FINDER DETAILS
      </div>

      <div className="text-zinc-300 text-sm space-y-1">
        <div>
          <span className="text-zinc-500">Name:</span>{" "}
          {item.finderName}
        </div>

        <div>
          <span className="text-zinc-500">Email:</span>{" "}
          {item.finderEmail}
        </div>

        <div>
          <span className="text-zinc-500">Phone:</span>{" "}
          {item.finderPhone}
        </div>
      </div>
    </div>

    {(currentUser?.isAdmin ||
      currentUser?.id === item.owner?.id) && (
      <button
        onClick={markRecovered}
        className="
          w-full
          py-2 px-3
          rounded-lg
          bg-blue-500/10
          border border-blue-500/20
          text-blue-400
          hover:bg-blue-500/20
          transition-all
        "
      >
        Mark Recovered
      </button>
    )}
  </div>
)}
    </div>
  );
}