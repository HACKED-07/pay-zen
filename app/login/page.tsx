"use client";

import Link from "next/link";
import { useActionState } from "react";
import { authenticate } from "@/app/actions/authenticate";
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
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Login</p>
          <h2 className="text-3xl font-black text-black mb-2 tracking-tight">Open your sketchbook</h2>
          <p className="text-gray-600 font-medium mb-8">
            Use your email and password to get back into PayZen.
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

          <p className="mt-8 text-center text-sm font-bold text-gray-500">
            Need an account? <Link href="/register" className="text-black hover:underline hover:text-[#D4F670] underline-offset-4 transition-colors">Create one</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
