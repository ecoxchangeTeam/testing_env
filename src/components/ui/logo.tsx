"use client";

import React from "react";

interface LogoProps {
  className?: string;
  height?: number | string;
  variant?: "color" | "white" | "dark";
  animated?: boolean;
}

export function Logo({
  className,
  height = 32,
  variant = "color",
  animated = true,
}: LogoProps) {
  const isColor = variant === "color";
  const isDark = variant === "dark";

  // Base colors depending on variant
  const logoFill = isDark ? "#080808" : "#ffffff";
  const qrColor = isColor ? "#0b7a48" : logoFill;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 80"
      height={height}
      className={className}
      style={{ height: height, width: "auto" }}
    >
      <defs>
        {isColor && (
          <>
            {/* Sphere Grad */}
            <radialGradient id="sphereGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="60%" stopColor="#059669" />
              <stop offset="100%" stopColor="#022c16" />
            </radialGradient>
            
            {/* 3D Sphere Shading Overlay */}
            <radialGradient id="sphereShading" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
            </radialGradient>

            {/* Glossy overlay */}
            <linearGradient id="glossGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Dense High-Fidelity Vector QR Code Pattern */}
            <pattern id="qrDensePattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <rect width="24" height="24" fill="#ffffff" />
              <path d="
                M0,0 h2 v2 h-2 z M4,0 h2 v2 h-2 z M8,0 h2 v2 h-2 z M14,0 h2 v2 h-2 z M18,0 h2 v2 h-2 z
                M2,2 h2 v2 h-2 z M6,2 h2 v2 h-2 z M10,2 h2 v2 h-2 z M12,2 h2 v2 h-2 z M16,2 h2 v2 h-2 z M20,2 h2 v2 h-2 z
                M0,4 h2 v2 h-2 z M8,4 h2 v2 h-2 z M14,4 h2 v2 h-2 z M18,4 h2 v2 h-2 z M22,4 h2 v2 h-2 z
                M4,6 h2 v2 h-2 z M6,6 h2 v2 h-2 z M10,6 h2 v2 h-2 z M16,6 h2 v2 h-2 z M20,6 h2 v2 h-2 z
                M0,8 h2 v2 h-2 z M2,8 h2 v2 h-2 z M8,8 h2 v2 h-2 z M12,8 h2 v2 h-2 z M14,8 h2 v2 h-2 z M18,8 h2 v2 h-2 z
                M6,10 h2 v2 h-2 z M10,10 h2 v2 h-2 z M16,10 h2 v2 h-2 z M22,10 h2 v2 h-2 z
                M0,12 h2 v2 h-2 z M4,12 h2 v2 h-2 z M8,12 h2 v2 h-2 z M12,12 h2 v2 h-2 z M18,12 h2 v2 h-2 z M20,12 h2 v2 h-2 z
                M2,14 h2 v2 h-2 z M6,14 h2 v2 h-2 z M10,14 h2 v2 h-2 z M14,14 h2 v2 h-2 z M16,14 h2 v2 h-2 z M22,14 h2 v2 h-2 z
                M0,16 h2 v2 h-2 z M8,16 h2 v2 h-2 z M12,16 h2 v2 h-2 z M18,16 h2 v2 h-2 z
                M4,18 h2 v2 h-2 z M6,18 h2 v2 h-2 z M10,18 h2 v2 h-2 z M14,18 h2 v2 h-2 z M16,18 h2 v2 h-2 z M20,18 h2 v2 h-2 z
                M0,20 h2 v2 h-2 z M2,20 h2 v2 h-2 z M8,20 h2 v2 h-2 z M12,20 h2 v2 h-2 z M18,20 h2 v2 h-2 z M22,20 h2 v2 h-2 z
                M6,22 h2 v2 h-2 z M14,22 h2 v2 h-2 z M16,22 h2 v2 h-2 z M20,22 h2 v2 h-2 z
              " fill="#0b7a48" />
            </pattern>
          </>
        )}
      </defs>

      {/* Styled inline animations if animated is true */}
      {animated && isColor && (
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes flow-waves {
            0% { transform: translate(0, 0); }
            50% { transform: translate(-2px, 1px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes pulse-energy {
            0%, 100% { filter: drop-shadow(0 0 2px rgba(16,185,129,0.25)); }
            50% { filter: drop-shadow(0 0 7px rgba(16,185,129,0.55)); }
          }
          .animate-waves {
            animation: flow-waves 6s infinite ease-in-out;
          }
          .animate-x {
            animation: pulse-energy 4s infinite ease-in-out;
            transition: transform 0.3s ease;
          }
          .logo-group:hover .animate-x {
            transform: scale(1.02);
            filter: drop-shadow(0 0 8px rgba(16,185,129,0.6));
          }
          .logo-group:hover .logo-sphere {
            transform: scale(1.05);
          }
          .logo-sphere {
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            transform-origin: 110px 40px;
          }
        `}} />
      )}

      <g className="logo-group" style={{ cursor: "pointer" }}>
        
        {/* Background angled slashes (Teal/Slate Slashes behind CHANGE) */}
        {isColor && (
          <g opacity="0.85">
            {/* Dark Slate-teal slash */}
            <path d="M 278 20 L 358 20 L 318 70 L 238 70 Z" fill="#0b2020" />
            {/* Medium Cyan-teal slash */}
            <path d="M 293 20 L 313 20 L 273 70 L 253 70 Z" fill="#0d3434" />
            {/* Bright Cyan accent stripe */}
            <path d="M 323 20 L 328 20 L 288 70 L 283 70 Z" fill="#0a5454" opacity="0.75" />
          </g>
        )}

        {/* EC Text - Hand-drawn Vector Slab Serif paths for 100% layout and font consistency */}
        <g fill={logoFill}>
          {/* Letter E (x: 12 - 46) */}
          <path d="M 12 20 h 32 v 10 h -6 v -4 h -14 v 11 h 14 v 6 h -14 v 11 h 16 v -4 h 6 v 10 h -34 Z" />
          {/* Letter C (x: 52 - 82) */}
          <path d="M 82 20 H 52 V 60 H 82 V 50 H 76 V 54 H 64 V 26 H 76 V 30 H 82 Z" />
        </g>

        {/* Sphere O (Glossy 3D Planet - Centered at cx: 110. No group transforms to prevent clipping bugs) */}
        <g className="logo-sphere">
          <clipPath id="sphereClip">
            <circle cx="110" cy="40" r="18" />
          </clipPath>
          
          <circle
            cx="110"
            cy="40"
            r="18"
            fill={isColor ? "url(#sphereGrad)" : logoFill}
          />
          
          {isColor && (
            <g clipPath="url(#sphereClip)">
              {/* Waves inside sphere flowing diagonally (Shift-aligned at cx=110) */}
              <g className="animate-waves">
                {/* Wave 3 (Base Green) */}
                <path
                  d="M 92 54 Q 110 34 128 44 L 128 58 L 92 58 Z"
                  fill="#047857"
                  opacity="0.9"
                />
                {/* Wave 1 (Mid Sea-Green) */}
                <path
                  d="M 92 48 Q 110 28 128 38 L 128 58 L 92 58 Z"
                  fill="#34d399"
                  opacity="0.75"
                />
                {/* Wave 2 (Light Mint-Green) */}
                <path
                  d="M 92 36 Q 110 16 128 26 L 128 58 L 92 58 Z"
                  fill="#6ee7b7"
                  opacity="0.5"
                />
              </g>

              {/* 3D Sphere Shading Overlay */}
              <circle
                cx="110"
                cy="40"
                r="18"
                fill="url(#sphereShading)"
              />

              {/* Shiny Gloss Reflection highlights */}
              <circle
                cx="110"
                cy="40"
                r="18"
                fill="url(#glossGrad)"
              />
              <ellipse
                cx="104"
                cy="32"
                rx="6"
                ry="3"
                transform="rotate(-30 104 32)"
                fill="#ffffff"
                opacity="0.45"
              />
            </g>
          )}
        </g>

        {/* QR Code X (Shifted by 12px to center at cx: 162 for perfect spacing) */}
        <g className="animate-x">
          <clipPath id="xPathClip">
            <path
              d="M138,10 H153 L162,30 L171,10 H186 L168,40 L186,70 H171 L162,50 L153,70 H138 L156,40 Z"
            />
          </clipPath>

          {/* Background / Body of X */}
          <path
            d="M138,10 H153 L162,30 L171,10 H186 L168,40 L186,70 H171 L162,50 L153,70 H138 L156,40 Z"
            fill={isColor ? "url(#qrDensePattern)" : logoFill}
          />

          {isColor && (
            <g clipPath="url(#xPathClip)">
              {/* QR Finder Top-Left */}
              <rect x="138" y="9" width="12" height="12" fill={qrColor} />
              <rect x="140" y="11" width="8" height="8" fill="#ffffff" />
              <rect x="142" y="13" width="4" height="4" fill={qrColor} />

              {/* QR Finder Top-Right */}
              <rect x="174" y="9" width="12" height="12" fill={qrColor} />
              <rect x="176" y="11" width="8" height="8" fill="#ffffff" />
              <rect x="178" y="13" width="4" height="4" fill={qrColor} />

              {/* QR Finder Bottom-Left */}
              <rect x="138" y="59" width="12" height="12" fill={qrColor} />
              <rect x="140" y="61" width="8" height="8" fill="#ffffff" />
              <rect x="142" y="63" width="4" height="4" fill={qrColor} />

              {/* QR Finder Bottom-Right */}
              <rect x="174" y="59" width="12" height="12" fill={qrColor} />
              <rect x="176" y="61" width="8" height="8" fill="#ffffff" />
              <rect x="178" y="63" width="4" height="4" fill={qrColor} />
            </g>
          )}

          {/* Bold White outline around the X */}
          <path
            d="M138,10 H153 L162,30 L171,10 H186 L168,40 L186,70 H171 L162,50 L153,70 H138 L156,40 Z"
            fill="none"
            stroke={isDark ? "#080808" : "#ffffff"}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </g>

        {/* CHANGE Text - Hand-drawn Vector wide sans-serif paths (Shifted by 8px for ideal spacing) */}
        <g fill={logoFill}>
          {/* C (x: 196 - 218) */}
          <path d="M 218 26 H 196 V 54 H 218 V 48 H 202 V 32 H 218 Z" />
          {/* H (x: 224 - 246) */}
          <path d="M 224 26 H 230 V 37 H 240 V 26 H 246 V 54 H 240 V 43 H 230 V 54 H 224 Z" />
          {/* A (x: 252 - 274) */}
          <path d="M 252 54 L 260 26 H 266 L 274 54 H 267 L 265 43 H 261 L 259 54 Z M 261.5 37 L 264.5 37 L 263 40 Z" />
          {/* N (x: 280 - 302) */}
          <path d="M 280 26 H 286 L 296 46 V 26 H 302 V 54 H 296 L 286 34 V 54 H 280 Z" />
          {/* G (x: 308 - 330) */}
          <path d="M 330 26 H 308 V 54 H 330 V 38 H 318 V 44 H 324 V 48 H 314 V 32 H 330 Z" />
          {/* E (x: 336 - 356) */}
          <path d="M 356 26 H 336 V 54 H 356 V 48 H 342 V 43 H 350 V 37 H 342 V 32 H 356 Z" />
        </g>
      </g>
    </svg>
  );
}
