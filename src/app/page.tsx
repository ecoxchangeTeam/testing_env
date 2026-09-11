import Link from "next/link";
import {
  QrCode,
  ArrowRight,
  Shield,
  Activity,
  Clock,
  Zap,
  ChevronRight,
  Database,
  GitBranch,
  Layers,
  Lock,
  BarChart3,
  Globe,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Logo } from "@/components/ui/logo";

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden dot-grid">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/4 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/4 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow tag */}
          <div className="inline-flex max-w-full items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/15 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="mono-tag text-emerald-400/80">
              Digital Product Passport Infrastructure
            </span>
          </div>

          {/* Headline */}
          <h1 className="heading-xl text-white mb-6">
            Every product deserves
            <br />
            <span className="text-gradient-emerald">a permanent identity.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-[18px] text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
            EcoXchange assigns every physical product a persistent digital
            passport — tracking its lifecycle, ownership, repairs, and resale
            history forever.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link
              href="/sign-up"
              className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black font-semibold text-[15px] hover:bg-emerald-400 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
            >
              Activate Your Product
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/marketplace"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#1f1f1f] text-zinc-300 font-medium text-[15px] hover:border-zinc-600 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              Browse Marketplace
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 sm:mt-20 grid grid-cols-1 min-[420px]:grid-cols-3 gap-5 sm:gap-8 max-w-2xl mx-auto">
            {[
              { value: "100%", label: "Verified Ownership" },
              { value: "∞", label: "Lifetime Tracking" },
              { value: "0", label: "Trust Gaps" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual — QR + passport card */}
        <div className="mt-16 sm:mt-24 flex justify-center">
          <div className="relative w-full max-w-[420px]">
            {/* Passport card */}
            <div className="glass border border-[#1f1f1f] rounded-2xl p-4 sm:p-6 w-full">
              <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <div className="mono-tag mb-1">Digital Product Passport</div>
                  <div className="text-white font-semibold text-lg">
                    MacBook Pro 14&quot;
                  </div>
                  <div className="text-zinc-500 text-sm">Apple · 2023</div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/8 border border-emerald-500/15">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400 font-medium">
                    Active
                  </span>
                </div>
              </div>

              {/* DPP ID */}
              <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg p-3 mb-4 min-w-0">
                <div className="mono-tag mb-1">DPP-ID</div>
                <div className="font-mono text-xs sm:text-sm text-emerald-400 break-all">
                  ECO-LPT-2024-A8X3K9PQ
                </div>
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                {[
                  { label: "Trust Score", value: "94", unit: "/100" },
                  { label: "Condition", value: "87", unit: "/100" },
                  { label: "Owners", value: "2", unit: "total" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg p-2 sm:p-2.5 text-center min-w-0"
                  >
                    <div className="text-xs text-zinc-500 mb-1">{m.label}</div>
                    <div className="font-semibold text-white text-sm">
                      {m.value}
                      <span className="text-zinc-600 text-xs font-normal">
                        {m.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline preview */}
              <div className="space-y-2">
                {[
                  {
                    label: "Activated by Rahul K.",
                    date: "Mar 2023",
                    color: "bg-emerald-400",
                  },
                  {
                    label: "Battery replaced · ₹2,400",
                    date: "Aug 2023",
                    color: "bg-blue-400",
                  },
                  {
                    label: "Transferred to Priya S.",
                    date: "Jan 2024",
                    color: "bg-violet-400",
                  },
                ].map((event) => (
                  <div
                    key={event.label}
                    className="flex items-center gap-2.5"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${event.color} flex-shrink-0`}
                    />
                    <div className="text-xs text-zinc-400 flex-1">
                      {event.label}
                    </div>
                    <div className="text-xs text-zinc-600">{event.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating QR badge */}
            <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 glass border border-[#1f1f1f] rounded-xl p-3 animate-float">
              <QrCode className="w-8 h-8 text-emerald-400" />
            </div>

            {/* Floating verified badge */}
            <div className="absolute -bottom-3 -left-2 sm:-left-4 glass border border-[#1f1f1f] rounded-xl px-3 py-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PROBLEM SECTION
// ─────────────────────────────────────────────
function ProblemSection() {
  const problems = [
    {
      icon: "❓",
      title: "No product history",
      desc: "You buy a used laptop from a stranger. You know nothing about its past.",
    },
    {
      icon: "🔒",
      title: "Zero trust in resale",
      desc: "Sellers can hide damage, previous owners, or price history with ease.",
    },
    {
      icon: "📂",
      title: "Lost documents",
      desc: "Invoices, warranties, and repair receipts get lost. The product history dies.",
    },
    {
      icon: "♻️",
      title: "Lifecycle invisibility",
      desc: "Valuable products get discarded or exploited because their history is unknown.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-16">
          <div className="mono-tag text-blue-400 mb-3">The Problem</div>
          <h2 className="heading-lg text-white mb-4">
            Physical products are
            <br />
            digitally invisible.
          </h2>
          <p className="text-zinc-400 text-[16px] leading-relaxed">
            Every year, billions of reusable products change hands with zero
            verified history. Trust is impossible. Informed decisions are
            impossible. Circular economies collapse.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-5 card-hover"
            >
              <div className="text-2xl mb-3">{p.icon}</div>
              <h3 className="text-white font-semibold text-[14px] mb-2">
                {p.title}
              </h3>
              <p className="text-zinc-500 text-[13px] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// DPP SECTION
// ─────────────────────────────────────────────
function DppSection() {
  const features = [
    {
      icon: QrCode,
      title: "Persistent QR Identity",
      desc: "One QR sticker follows the product forever. Scan from anywhere, anytime.",
    },
    {
      icon: Shield,
      title: "Verified Ownership Chain",
      desc: "Every owner, every transfer — cryptographically logged and publicly verifiable.",
    },
    {
      icon: Activity,
      title: "Repair Intelligence",
      desc: "Complete repair history with costs, technicians, and verified receipts.",
    },
    {
      icon: Lock,
      title: "Document Vault",
      desc: "Invoices, warranties, and certifications stored permanently on the passport.",
    },
    {
      icon: BarChart3,
      title: "Trust & Condition Scoring",
      desc: "Dynamic scores computed from ownership, repairs, and verification status.",
    },
    {
      icon: Clock,
      title: "Immutable Lifecycle Log",
      desc: "Every event, append-only. Nothing can be deleted or falsified.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="mono-tag text-emerald-400 mb-3">
            Digital Product Passport
          </div>
          <h2 className="heading-lg text-white mb-4">
            LinkedIn + Carfax
            <br />
            for physical assets.
          </h2>
          <p className="text-zinc-400 text-[16px] leading-relaxed">
            A persistent, verifiable digital identity for every product — from
            activation to retirement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-5 card-hover"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/8 border border-emerald-500/15 flex items-center justify-center mb-4 group-hover:border-emerald-500/25 transition-colors">
                <feature.icon className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold text-[14px] mb-2">
                {feature.title}
              </h3>
              <p className="text-zinc-500 text-[13px] leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// QR ACTIVATION FLOW
// ─────────────────────────────────────────────
function ActivationFlowSection() {
  const steps = [
    {
      num: "01",
      title: "QR Sticker Applied",
      desc: "EcoXchange pre-generates a unique DPP-ID and attaches a QR sticker to the product.",
      color: "emerald",
    },
    {
      num: "02",
      title: "Owner Scans QR",
      desc: "When the product is purchased, the owner scans the QR to open the activation page.",
      color: "blue",
    },
    {
      num: "03",
      title: "Identity Registered",
      desc: "Upload invoice, set purchase date, verify your identity. The product is now Active.",
      color: "violet",
    },
    {
      num: "04",
      title: "Passport Goes Live",
      desc: "The DPP is now public. Anyone scanning the QR sees the verified product passport.",
      color: "emerald",
    },
  ];

  const colorMap: Record<string, string> = {
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/6",
    blue: "text-blue-400 border-blue-500/20 bg-blue-500/6",
    violet: "text-violet-400 border-violet-500/20 bg-violet-500/6",
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-24 border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="mono-tag text-blue-400 mb-3">QR Activation Flow</div>
            <h2 className="heading-lg text-white mb-4">
              Scan once.
              <br />
              Trusted forever.
            </h2>
            <p className="text-zinc-400 text-[16px] leading-relaxed mb-8">
              One QR code follows a product for its entire life. Every scan
              reveals the complete verified history — no login required to view.
            </p>
          </div>

          <div className="space-y-3">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`flex gap-4 p-4 rounded-xl border ${colorMap[step.color].split(" ").slice(1).join(" ")} bg-opacity-10`}
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              >
                <div
                  className={`mono-tag font-bold text-base ${colorMap[step.color].split(" ")[0]} flex-shrink-0 mt-0.5`}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-[14px] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-[13px] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// MARKETPLACE TRUST SECTION
// ─────────────────────────────────────────────
function MarketplaceTrustSection() {
  return (
    <section className="py-16 sm:py-24 border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="mono-tag text-violet-400 mb-3">Marketplace Trust Layer</div>
          <h2 className="heading-lg text-white mb-4">
            Every listing comes with
            <br />a verified passport.
          </h2>
          <p className="text-zinc-400 text-[16px] leading-relaxed">
            No more guessing. Every product on EcoXchange marketplace carries
            its complete verified history — trust built into the transaction.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {[
            {
              title: "Verified by History",
              desc: "Buyers see every previous owner, repair, and condition update before purchasing.",
              icon: Shield,
              accent: "emerald",
            },
            {
              title: "Transfer on Scan",
              desc: "Ownership transfers when buyer scans the QR during meetup. Instant, verified, permanent.",
              icon: QrCode,
              accent: "blue",
            },
            {
              title: "Trust Score Visible",
              desc: "Every seller and product has a computed trust score based on their platform history.",
              icon: BarChart3,
              accent: "violet",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-6 card-hover"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${
                  item.accent === "emerald"
                    ? "bg-emerald-500/8 border border-emerald-500/15"
                    : item.accent === "blue"
                    ? "bg-blue-500/8 border border-blue-500/15"
                    : "bg-violet-500/8 border border-violet-500/15"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    item.accent === "emerald"
                      ? "text-emerald-400"
                      : item.accent === "blue"
                      ? "text-blue-400"
                      : "text-violet-400"
                  }`}
                />
              </div>
              <h3 className="text-white font-semibold text-[15px] mb-2">
                {item.title}
              </h3>
              <p className="text-zinc-500 text-[13px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// INFRASTRUCTURE VISION
// ─────────────────────────────────────────────
function InfrastructureSection() {
  const pillars = [
    { icon: Database, label: "Persistent Identity Layer" },
    { icon: GitBranch, label: "Ownership Graph" },
    { icon: Layers, label: "Lifecycle Intelligence" },
    { icon: Globe, label: "Campus Ecosystem Network" },
    { icon: Zap, label: "Real-time Trust Scoring" },
    { icon: Lock, label: "Immutable Audit Log" },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="mono-tag text-zinc-500 mb-3">
              Infrastructure Vision
            </div>
            <h2 className="heading-lg text-white mb-4">
              The operating system for
              <br />
              <span className="text-gradient-emerald">trusted assets.</span>
            </h2>
            <p className="text-zinc-400 text-[16px] leading-relaxed mb-8">
              EcoXchange is not a marketplace. It&apos;s the trust infrastructure
              layer that makes any marketplace possible. We start with campuses,
              we scale to cities.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 text-emerald-400 text-[14px] font-medium hover:gap-3 transition-all"
            >
              Start with your product
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.label}
                className="flex items-center gap-3 p-3.5 bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl card-hover"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/8 border border-emerald-500/12 flex items-center justify-center flex-shrink-0">
                  <pillar.icon className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-zinc-300 text-[12px] font-medium leading-tight">
                  {pillar.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CTA SECTION
// ─────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="py-16 sm:py-24 border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#0f0f0f] p-5 sm:p-8 lg:p-12 text-center">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px]" />
          </div>

          <div className="relative">
            <div className="mono-tag mb-4">Get Started Today</div>
            <h2 className="heading-lg text-white mb-4">
              Give your product
              <br />a digital identity.
            </h2>
            <p className="text-zinc-400 text-[16px] max-w-lg mx-auto mb-8">
              Activate your first product in under 2 minutes. Your QR sticker
              is waiting.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link
                href="/sign-up"
                className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 text-black font-semibold text-[15px] hover:bg-emerald-400 transition-all hover:shadow-[0_4px_24px_rgba(16,185,129,0.35)] hover:-translate-y-0.5"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/marketplace"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#2a2a2a] text-zinc-300 font-medium text-[15px] hover:border-zinc-600 hover:text-white transition-all"
              >
                View Marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SOCIAL ICONS (lucide-react 1.0 removed brand icons)
// ─────────────────────────────────────────────
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  const columns = [
    {
      title: "About",
      links: [
        { label: "Our Story", href: "/#how-it-works" },
        { label: "How It Works", href: "/#how-it-works" },
        { label: "Trust Score", href: "/verified" },
        { label: "Careers", href: "mailto:hello@ecoxchange.app" },
      ],
    },
    {
      title: "Campus Network",
      links: [
        { label: "DTU", href: "/marketplace" },
        { label: "NSUT", href: "/marketplace" },
        { label: "CampusKartt", href: "https://www.campuskartt.in" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Marketplace", href: "/marketplace" },
        { label: "Repairs", href: "/repairs" },
        { label: "Lost Products", href: "/lost-products" },
        { label: "FAQ", href: "/#how-it-works" },
      ],
    },
    {
      title: "Policy",
      links: [
        { label: "EcoX Verified", href: "/verified" },
        { label: "Terms Of Use", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
        { label: "Passport Lookup", href: "/passport" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[#141414] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mono-tag text-zinc-600 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2">
            <h4 className="mono-tag text-zinc-600 mb-4">Mail Us</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              EcoXchange,
              <br />
              New Delhi, India
            </p>
            <a
              href="mailto:ecoxchangeTeam@gmail.com"
              className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors mt-2 inline-block"
            >
              founder@ecoxchange.co.in
            </a>
          </div>

          <div className="col-span-2">
            <h4 className="mono-tag text-zinc-600 mb-4">Connect</h4>
            <div className="flex items-center gap-3">
              {[
                { Icon: InstagramIcon, href: "https://www.instagram.com/ecoxchange.pvt.ltd/" },
                { Icon: LinkedinIcon, href: "https://www.linkedin.com/company/ecoxchange-%E2%80%93-dpp-infrastructure/" },
                { Icon: Globe, href: "https://www.campuskartt.in" },
               
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <Logo height={20} />
          </Link>
          <div className="text-zinc-600 text-xs text-center">
            © 2024 EcoXchange.
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// MAIN LANDING PAGE
// ─────────────────────────────────────────────
export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <DppSection />
      <ActivationFlowSection />
      <MarketplaceTrustSection />
      <InfrastructureSection />
      <CtaSection />
      <Footer />
    </main>
  );
}