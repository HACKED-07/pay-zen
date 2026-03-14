"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/register";
import { FadeIn, SlideUp } from "@/components/motion-wrapper";

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
    <main className="min-h-screen bg-[#fdfdf9] flex flex-col md:flex-row overflow-hidden font-sans">
      <section className="hidden md:flex flex-col justify-center w-[45%] bg-[#D4F670] border-r-4 border-black p-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full border-4 border-black bg-white opacity-20" />
        <div className="absolute bottom-[10%] left-[-5%] w-32 h-32 border-4 border-black bg-[#fdfdf9] translate-x-10 translate-y-10" />
        
        <SlideUp className="relative z-10 max-w-lg">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-bold uppercase tracking-widest bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black">
            Build a fresh board
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-black leading-[1.1] mb-6 tracking-tight">
            Start a shared money board your group can actually read.
          </h1>
          <p className="text-lg text-black font-medium leading-relaxed mb-10">
            Registration creates your wallet and a starter ledger so you can
            move straight into splitting bills, inviting people, and planning
            budgets.
          </p>
        </SlideUp>

        <FadeIn delay={0.25} className="relative z-10 grid gap-4 max-w-lg">
          <article className="p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
            <strong className="block text-black font-bold mb-1">Starter ledger</strong>
            <span className="text-gray-600 text-sm">A default group appears immediately, ready for the first expense.</span>
          </article>
          <article className="p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
            <strong className="block text-black font-bold mb-1">Wallet included</strong>
            <span className="text-gray-600 text-sm">Funding, settlements, and the personal money trail are ready from day one.</span>
          </article>
          <article className="p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
            <strong className="block text-black font-bold mb-1">Expandable workspace</strong>
            <span className="text-gray-600 text-sm">Add more circles, notes, invites, and templates as your routine grows.</span>
          </article>
        </FadeIn>
      </section>

      <section className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 relative z-10">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Create account</p>
          <h2 className="text-3xl font-black text-black mb-2 tracking-tight">Set up your desk</h2>
          <p className="text-gray-600 font-medium mb-8">
            We&apos;ll create your wallet and starter workspace automatically.
          </p>

          <form action={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-bold text-black text-sm">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Aarav Mehta"
                required
                className="w-full px-4 py-3 bg-[#fdfdf9] border-2 border-black rounded-lg text-black focus:outline-none focus:ring-4 focus:ring-[#D4F670]/50 transition-shadow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold text-black text-sm">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="aarav@example.com"
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

            {error ? <p className="text-red-600 font-bold bg-red-100 border-2 border-red-600 p-3 rounded-lg text-sm">{error}</p> : null}
            {success ? <p className="text-green-700 font-bold bg-[#D4F670] border-2 border-black p-3 rounded-lg text-sm">{success}</p> : null}

            <button
              className="w-full mt-4 bg-black text-white font-black text-lg py-4 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#D4F670] hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              disabled={pending}
              type="submit"
            >
              <span className="relative z-10">{pending ? "Sketching…" : "Create board"}</span>
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-bold text-gray-500">
            Already registered? <Link href="/login" className="text-black hover:underline hover:text-[#D4F670] underline-offset-4 transition-colors">Log in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
