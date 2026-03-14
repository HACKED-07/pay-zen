"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn } from "next-auth/react";
import { authenticate } from "@/app/actions/authenticate";
import { BrandLogo } from "@/components/brand-logo";
import { FadeIn, SlideUp } from "@/components/motion-wrapper";

const initialState = { error: "" };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    authenticate,
    initialState,
  );

  return (
    <main className="min-h-screen bg-[#fdfdf9] flex flex-col md:flex-row overflow-hidden font-sans">
      <section className="hidden md:flex flex-col justify-center w-[45%] bg-[#D4F670] border-r-4 border-black p-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full border-4 border-black bg-white opacity-20" />
        <div className="absolute bottom-[10%] left-[-5%] w-32 h-32 border-4 border-black bg-[#fdfdf9] translate-x-10 translate-y-10" />
        
        <SlideUp className="relative z-10 max-w-lg">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-bold uppercase tracking-widest bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black">
            Return to your board
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-black leading-[1.1] mb-6 tracking-tight">
            Pick up the same paper trail where you left it.
          </h1>
          <p className="text-lg text-black font-medium leading-relaxed mb-10">
            Log in to manage groups, clear balances, post notes, and move from
            a rough estimate to a clean settlement plan.
          </p>
        </SlideUp>

        <FadeIn delay={0.25} className="relative z-10 grid gap-4 max-w-lg">
          <article className="p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
            <strong className="block text-black font-bold mb-1">One board</strong>
            <span className="text-gray-600 text-sm">Wallet activity, expenses, and follow-up notes stay in the same place.</span>
          </article>
          <article className="p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
            <strong className="block text-black font-bold mb-1">Fast actions</strong>
            <span className="text-gray-600 text-sm">Create groups, add members, and settle dues without digging through layers.</span>
          </article>
        </FadeIn>
      </section>

      <section className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-md bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 relative z-10">
          <BrandLogo className="mb-6" imageClassName="w-[60px]" priority />
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Login</p>
          <h2 className="text-3xl font-black text-black mb-2 tracking-tight">Open your sketchbook</h2>
          <p className="text-gray-600 font-medium mb-8">
            Use your email and password to get back into Pay Zen.
          </p>

          <form action={formAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold text-black text-sm">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-[#fdfdf9] border-2 border-black rounded-lg text-black focus:outline-none focus:ring-4 focus:ring-[#D4F670]/50 transition-shadow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-bold text-black text-sm">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-[#fdfdf9] border-2 border-black rounded-lg text-black focus:outline-none focus:ring-4 focus:ring-[#D4F670]/50 transition-shadow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            {state.error ? <p className="text-red-600 font-bold bg-red-100 border-2 border-red-600 p-3 rounded-lg text-sm">{state.error}</p> : null}

            <button
              className="w-full mt-4 bg-black text-white font-black text-lg py-4 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#D4F670] hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              disabled={pending}
              type="submit"
            >
              <span className="relative z-10">{pending ? "Opening…" : "Open board"}</span>
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 w-full">
              <div className="h-[2px] bg-black flex-1" />
              <span className="text-xs font-bold text-black uppercase tracking-widest">Or</span>
              <div className="h-[2px] bg-black flex-1" />
            </div>
            
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-3 bg-white text-black font-black text-lg py-4 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#f6f6f6] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </div>

          <p className="mt-8 text-center text-sm font-bold text-gray-500">
            Need an account? <Link href="/register" className="text-black hover:underline hover:text-[#D4F670] underline-offset-4 transition-colors">Create one</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
