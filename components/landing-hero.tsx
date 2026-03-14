"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, SlideUp, StaggerContainer } from "@/components/motion-wrapper";

export function LandingHero() {
  return (
    <main className="relative min-h-screen w-full bg-[#fdfdf9] text-black overflow-hidden flex flex-col items-center pt-24 pb-12">
      {/* Giant Lime Green Circle Background */}
      <div className="absolute top-[-20vh] left-1/2 transform -translate-x-1/2 w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] bg-[#D4F670] rounded-full -z-10 shadow-[inset_0_-10px_30px_rgba(0,0,0,0.02)]" />

      {/* Header / Nav */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-8 md:px-16">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="w-4 h-4 rounded-full bg-black"></div>
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-black"></div>
          <span className="ml-2">PayZen</span>
        </div>
        <div className="flex flex-col gap-[6px] w-8 cursor-pointer">
          <div className="w-full h-[2px] bg-black"></div>
          <div className="w-2/3 h-[2px] bg-black"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <StaggerContainer
        className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center mt-20 px-6 relative"
        delayChildren={0.1}
        staggerChildren={0.15}
      >
        <SlideUp>
          <div className="text-sm font-semibold tracking-wide uppercase mb-6 relative inline-block">
            <span className="absolute -left-12 -top-6 text-xs rotate-[-15deg] font-bold">DRAW! <br/>↓</span>
            Shared money, drawn clearly
          </div>
        </SlideUp>

        <SlideUp>
          <h1 className="text-6xl md:text-[5.5rem] font-bold tracking-tighter leading-[0.9] max-w-4xl relative">
            Become a part
            <br />
            of the board
            <span className="absolute -right-8 top-1/2 text-2xl">✦</span>
          </h1>
          {/* Hand drawn squiggle imitation */}
          <div className="w-full flex justify-center mt-4">
            <svg width="180" height="20" viewBox="0 0 180 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12C30 -4 60 22 90 12C120 2 150 22 178 12" stroke="black" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
        </SlideUp>

        <div className="w-full flex flex-col md:flex-row justify-between items-end mt-24 md:mt-32 relative">
          <SlideUp className="text-left max-w-[280px]">
            <p className="text-sm font-medium leading-relaxed">
              PayZen turns group finance into a warm workspace: expenses, settlements, and notes all on one board.
            </p>
          </SlideUp>

          <SlideUp className="mt-12 md:mt-0">
            <Link href="/register" className="inline-flex items-center justify-center w-32 h-32 rounded-full border border-black hover:bg-black hover:text-[#D4F670] transition-colors relative group">
              <span className="text-sm font-medium">Start a board<br/><span className="group-hover:translate-y-1 block transition-transform mt-2">↓</span></span>
            </Link>
          </SlideUp>
        </div>
      </StaggerContainer>
    </main>
  );
}
