"use client";

import Link from "next/link";
import { useActionState } from "react";
import { authenticate } from "@/app/actions/authenticate";

const initialState = { error: "" };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    authenticate,
    initialState,
  );

  return (
    <main className="auth-shell">
      {/* Decorative side panel */}
      <aside className="auth-side">
        <div className="auth-side__orb auth-side__orb--1" />
        <div className="auth-side__orb auth-side__orb--2" />
        <div className="auth-side__orb auth-side__orb--3" />
        <div className="auth-side__content">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--accent)]">
              PayZen
            </p>
            <h2
              className="mt-6 text-4xl font-extrabold leading-tight tracking-[-0.04em]"
              style={{
                background:
                  "linear-gradient(135deg, var(--text-strong) 20%, var(--accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Your shared finances, simplified.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--muted)]">
              Track group expenses, settle balances instantly, and fund your
              wallet through Stripe — all from one clean dashboard.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "rgba(0, 212, 170, 0.12)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-sm text-[var(--muted)]">
                Split expenses in real-time
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "rgba(0, 212, 170, 0.12)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-sm text-[var(--muted)]">
                Minimum-transaction settlements
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "rgba(0, 212, 170, 0.12)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-sm text-[var(--muted)]">
                Stripe-powered wallet
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Auth form */}
      <div className="auth-main">
        <section className="auth-card">
          <div style={{ animation: "fadeInUp 0.5s ease-out" }}>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--accent)]">
              Welcome back
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[var(--text-strong)]">
              Log in to your workspace
            </h1>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Enter your credentials to manage balances, add expenses, and launch
              Stripe-powered wallet top-ups.
            </p>
          </div>

          <form
            action={formAction}
            className="mt-8 space-y-5"
            style={{ animation: "fadeInUp 0.5s ease-out 0.15s both" }}
          >
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>
            {state.error ? <p className="form-error">{state.error}</p> : null}
            <button
              className="primary-button w-full justify-center"
              disabled={pending}
              type="submit"
            >
              {pending ? (
                <>
                  <span className="spinner" />
                  Signing in…
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          <p
            className="mt-6 text-center text-sm text-[var(--muted)]"
            style={{ animation: "fadeIn 0.5s ease-out 0.3s both" }}
          >
            Need an account?{" "}
            <Link
              className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4 transition-colors hover:text-[var(--accent)]"
              href="/register"
            >
              Create one
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
