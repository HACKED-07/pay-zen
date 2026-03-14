"use client";

import { motion } from "framer-motion";
import { StaggerContainer, SlideUp, FadeIn, ScaleIn } from "@/components/motion-wrapper";
import Link from "next/link";

export function LandingHero() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--bg-primary)] px-6 py-12 sm:px-12">
      {/* Artistic background orbs using framer-motion */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="absolute left-[-10%] top-[-5%] h-[500px] w-[500px] rounded-full"
           style={{
             background: "radial-gradient(circle, rgba(0,230,184,0.15), transparent 65%)",
             animation: "orbFloat 12s ease-in-out infinite",
           }}
        />
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
           className="absolute right-[-5%] top-[20%] h-[400px] w-[400px] rounded-full"
           style={{
             background: "radial-gradient(circle, rgba(255,184,77,0.12), transparent 65%)",
             animation: "orbFloat 14s ease-in-out infinite reverse",
           }}
        />
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
           className="absolute bottom-[10%] left-[30%] h-[350px] w-[350px] rounded-full"
           style={{
             background: "radial-gradient(circle, rgba(0,212,170,0.1), transparent 65%)",
             animation: "orbFloat 10s ease-in-out infinite 3s",
           }}
        />
      </div>

      <StaggerContainer delayChildren={0.2} staggerChildren={0.15} className="relative z-10 w-full max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-center lg:gap-8">
          <div className="flex flex-col items-start pt-10">
            <SlideUp>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--surface-strong)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[var(--shadow-glow)]"></span>
                Premium Fintech Experience
              </div>
            </SlideUp>

            <SlideUp>
              <h1 className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
                Split trips, settle dues, and fund your wallet through Stripe.{" "}
                <span className="text-[var(--accent)] drop-shadow-[0_0_20px_rgba(0,230,184,0.3)]">Zero awkward texts.</span>
              </h1>
            </SlideUp>

            <SlideUp>
              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
                PayZen is the operating system for shared money: structured
                groups, real-time balances, smart reporting, and a wallet that
                settles debts without the awkward conversations.
              </p>
            </SlideUp>

            <SlideUp className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Link href="/register" className="primary-button group">
                Launch your workspace
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link href="/login" className="secondary-button">
                Enter dashboard
              </Link>
            </SlideUp>

            <FadeIn delay={0.8} className="mt-16 grid w-full grid-cols-1 gap-6 sm:grid-cols-3 border-t border-[var(--glass-border)] pt-10">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-[var(--text-strong)]">Live</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Real-time balances with optimized settlement algorithms.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-[var(--text-strong)]">Stripe</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Secure wallet top-ups via Stripe Checkout directly in app.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-[var(--text-strong)]">Clear</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Expenses, transfers, and history — one clean timeline.
                </p>
              </div>
            </FadeIn>
          </div>

          <ScaleIn delay={0.4} className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="glass-panel overflow-hidden rounded-2xl relative">
              {/* Decorative glow inside card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] opacity-10 blur-3xl rounded-full"></div>
              
              <div className="border-b border-[var(--glass-border)] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Theme</p>
                  <div className="flex items-center gap-2 rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs font-semibold text-[var(--text)] border border-[var(--glass-border)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"></span>
                    Wallet synced
                  </div>
                </div>
                <h2 className="text-2xl font-bold leading-tight text-[var(--text-strong)]">
                  Editorial finance, not template UI
                </h2>
              </div>

              <div className="p-6">
                <div className="hero-ledger">
                  <div className="hero-ledger__row">
                    <span>Goa retreat</span>
                    <strong>₹18,400</strong>
                  </div>
                  <div className="hero-ledger__row">
                    <span>Pending settlement</span>
                    <strong>₹3,200</strong>
                  </div>
                  <div className="hero-ledger__row">
                    <span>Wallet top-up</span>
                    <strong>₹5,000</strong>
                  </div>
                </div>

                <div className="hero-metrics mt-6">
                  <div>
                    <p>Team confidence</p>
                    <h4>98%</h4>
                  </div>
                  <div>
                    <p>Avg settlement</p>
                    <h4>under 1 min</h4>
                  </div>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </StaggerContainer>
    </main>
  );
}
