"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, SlideUp, StaggerContainer } from "@/components/motion-wrapper";
import { BrandLogo } from "@/components/brand-logo";

export function LandingHero() {
  return (
    <main className="relative min-h-screen w-full bg-[#fdfdf9] text-black overflow-hidden flex flex-col items-center pt-24 pb-12 selection:bg-[#D4F670] selection:text-black">
      
      {/* Brutalist Background Elements */}
      <div className="absolute top-20 -left-10 md:left-10 w-48 h-48 bg-[#D4F670] border-4 border-black rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -z-10 opacity-60 animate-[float_6s_ease-in-out_infinite]" />
      
      <div className="absolute top-60 -right-20 md:right-20 w-32 h-32 bg-[#FF5A6E] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -z-10 opacity-80 animate-[float_5s_ease-in-out_infinite_reverse]" style={{ animationDelay: '1s' }} />

      <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#0096FF] border-4 border-black rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -z-10 opacity-70 animate-[spin_10s_linear_infinite]" />

      <div className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05] -z-20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Floating Mock Cards */}
      <motion.div 
        initial={{ opacity: 0, x: -50, y: 50, rotate: -10 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: -6 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="hidden lg:flex absolute top-40 left-[10%] bg-white border-2 border-black p-4 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex-col gap-3 min-w-[200px] hover:translate-y-[-5px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default -z-10"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-black bg-[#D4F670] flex items-center justify-center font-bold text-xs">AJ</div>
          <div className="font-bold text-sm">Dinner Split</div>
        </div>
        <div className="font-black text-xl">₹2,400</div>
        <div className="flex -space-x-2">
           <div className="w-6 h-6 rounded-full border border-black bg-purple-300"></div>
           <div className="w-6 h-6 rounded-full border border-black bg-pink-300"></div>
           <div className="w-6 h-6 rounded-full border border-black bg-yellow-300"></div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50, y: -50, rotate: 10 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 8 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden lg:flex absolute top-[40%] right-[10%] bg-[#D4F670] border-2 border-black p-4 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex-col gap-2 min-w-[220px] hover:translate-y-[-5px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default -z-10"
      >
        <div className="text-xs font-bold uppercase tracking-wider">You Owe</div>
        <div className="flex justify-between items-end">
          <div className="font-black text-2xl tracking-tighter">₹850</div>
          <div className="w-8 h-8 rounded-full border-2 border-black bg-black flex items-center justify-center font-bold text-xs text-white">→</div>
        </div>
      </motion.div>

      {/* Header / Nav */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 md:px-12 z-10">
        <BrandLogo className="text-xl" imageClassName="w-[48px]" priority />
      </header>

      {/* Main Content Area */}
      <StaggerContainer
        className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center mt-32 px-6 relative z-10"
        delayChildren={0.1}
        staggerChildren={0.15}
      >
        <SlideUp>
          <div className="inline-flex items-center gap-2 border-2 border-black bg-white rounded-full px-4 py-1.5 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default relative">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4F670] animate-pulse border border-black"></span>
            <span className="text-xs font-bold uppercase tracking-wider">Shared money, drawn clearly</span>
          </div>
        </SlideUp>

        <SlideUp>
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[0.85] max-w-4xl relative uppercase">
            Become a part
            <br />
            of the board
            <span className="absolute -right-4 md:-right-8 top-1/2 text-3xl md:text-5xl text-[#00d4aa]" style={{ textShadow: "2px 2px 0 #000" }}>✦</span>
            <span className="absolute -left-2 md:-left-6 top-0 text-3xl md:text-4xl text-[#FF5A6E] rotate-12" style={{ textShadow: "2px 2px 0 #000" }}>★</span>
          </h1>
          {/* Hand drawn squiggle imitation */}
          <div className="w-full flex justify-center mt-6">
            <svg width="220" height="24" viewBox="0 0 180 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <path d="M2 12C30 -4 60 22 90 12C120 2 150 22 178 12" stroke="#D4F670" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>
        </SlideUp>

        <div className="w-full flex flex-col items-center mt-16 md:mt-20 relative gap-8">
          <SlideUp className="max-w-[400px]">
            <p className="text-base md:text-lg font-medium leading-relaxed bg-[#fdfdf9]/80 backdrop-blur-sm p-4 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase tracking-tight text-center">
              Ditch the spreadsheets. Split bills, track debts, and settle up on one shared board.
            </p>
          </SlideUp>

          <SlideUp>
            <Link 
              href="/register" 
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D4F670] text-black font-bold text-lg rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all uppercase tracking-wide"
            >
              <span>Start a board</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </SlideUp>
        </div>
      </StaggerContainer>
    </main>
  );
}
