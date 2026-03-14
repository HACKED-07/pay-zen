"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/register";
import { StaggerContainer, SlideUp, FadeIn } from "@/components/motion-wrapper";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    setSuccess(null);

    const result = await registerUser(formData);

    if (result.error) {
      setError(result.error);
      setPending(false);
      return;
    }

    if (result.success) {
      setSuccess(result.success);
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    }
  }

  return (
    <main className="auth-shell">
      {/* Decorative side panel */}
      <aside className="auth-side relative overflow-hidden">
        {/* Artistic ambient backdrop instead of static dots */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <FadeIn delay={0.2} className="absolute inset-0">
          <div className="absolute -left-[20%] -top-[10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,230,184,0.08),transparent_70%)] blur-3xl"></div>
          <div className="absolute -right-[20%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,184,77,0.06),transparent_70%)] blur-3xl"></div>
        </FadeIn>
        
        <StaggerContainer delayChildren={0.1} staggerChildren={0.15} className="auth-side__content relative z-10 w-full max-w-lg">
          <SlideUp>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--accent)]">
              PayZen
            </p>
            <h2
              className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-[-0.02em]"
              style={{
                background:
                  "linear-gradient(135deg, var(--text-strong) 20%, var(--accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Start your shared finance workspace.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--muted)]">
              Create groups, add expenses, and see exactly who owes whom — with
              wallet-based settlements powered by Stripe. No more chasing payments.
            </p>
          </SlideUp>

          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "rgba(0, 212, 170, 0.12)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-sm text-[var(--muted)]">
                Wallet + group dashboard ready instantly
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "rgba(0, 212, 170, 0.12)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="text-sm text-[var(--muted)]">
                Invite friends by code or email
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "rgba(0, 212, 170, 0.12)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <span className="text-sm text-[var(--muted)]">
                Category-wise analytics from day one
              </span>
            </div>
          </div>
        </StaggerContainer>
      </aside>

      {/* Auth form */}
      <div className="auth-main flex items-center justify-center p-6 lg:p-12">
        <SlideUp delay={0.4} className="w-full max-w-md">
          <section className="auth-card glass-panel rounded-2xl p-8 sm:p-10 relative overflow-hidden">
            {/* Subtle glow behind form */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] opacity-5 blur-2xl rounded-full"></div>
            
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--accent)]">
                Create Account
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-strong)]">
                Register for PayZen
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              We&#39;ll prepare your wallet and a default group so you can start
              splitting expenses immediately.
            </p>
          </div>

          <form
            action={handleSubmit}
            className="mt-8 space-y-5 relative z-10"
          >
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Aarav Mehta"
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="aarav@example.com"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            {error ? <p className="form-error">{error}</p> : null}
            {success ? <p className="form-success">{success}</p> : null}
            <button
              className="primary-button w-full justify-center"
              disabled={pending}
              type="submit"
            >
              {pending ? (
                <>
                  <span className="spinner" />
                  Creating…
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p
            className="mt-6 text-center text-sm text-[var(--muted)] relative z-10"
          >
            Already registered?{" "}
            <Link
              className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4 transition-colors hover:text-[var(--accent)]"
              href="/login"
            >
              Log in
            </Link>
          </p>
          </section>
        </SlideUp>
      </div>
    </main>
  );
}
