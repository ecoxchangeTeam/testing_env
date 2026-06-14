"use client";
import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  height?: number | string;
  variant?: "color" | "white" | "dark";
  animated?: boolean;
}

export function Logo({
  className,
  height = 32,
}: LogoProps) {
  const h = typeof height === "number" ? height : parseInt(height as string, 10);

  return (
    <Image
      src="/logo.png"
      alt="EcoXchange"
      height={h}
      width={h * 5}
      className={className}
      style={{ height: h, width: "auto", objectFit: "contain" }}
      priority
    />
  );
}
