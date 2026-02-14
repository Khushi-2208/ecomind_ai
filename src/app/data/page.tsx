"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, ArrowRight, Sparkles, Github, Twitter, 
  Droplets, Globe, ScrollText, Play
} from 'lucide-react';
import { Button } from "@/components/ui/button"; 
import Link from 'next/link'; // Added Link for navigation

// --- Refined Minimal Gauge ---
const MinimalGauge = ({ percentage, color, label }: any) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center group py-4">
      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 opacity-80">
          <circle cx="88" cy="88" r={radius} fill="transparent" stroke="#2a2a2a" strokeWidth="2" />
          <motion.circle 
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeInOut" }}
            cx="88" cy="88" r={radius} fill="transparent" stroke={color} strokeWidth="3" 
            strokeDasharray={circumference} strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
           <span className="text-4xl font-light text-stone-100 tracking-tight">{percentage}%</span>
        </div>
      </div>
      <span className="mt-4 text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500 group-hover:text-emerald-400 transition-colors">
        {label}
      </span>
    </div>
  );
};

// --- Elegant Editorial Bar ---
const EditorialBar = ({ label, misuse, optimized, unit }: any) => (
  <div className="space-y-3 py-4 border-b border-stone-800/50">
    <div className="flex justify-between items-baseline">
      <span className="text-sm font-medium text-stone-300 tracking-wide">{label}</span>
      <span className="text-[10px] font-serif italic text-emerald-500/80">Reduction Target: {misuse - optimized}{unit}</span>
    </div>
    <div className="relative h-[2px] w-full bg-stone-800 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${optimized}%` }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="absolute top-0 left-0 h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
      />
      <div className="absolute top-0 left-0 h-full bg-stone-700/50" style={{ width: `${misuse}%`, zIndex: -1 }} />
    </div>
    <div className="flex justify-between text-[9px] uppercase tracking-widest text-stone-500">
      <span>Baseline Intensity: {misuse}{unit}</span>
      <span className="text-stone-300">Optimized State: {optimized}{unit}</span>
    </div>
  </div>
);

const EcoMindHome = () => {
  return (
    <div className="relative min-h-screen bg-[#0f0f0f] overflow-x-hidden text-stone-200 selection:bg-emerald-900/30 font-sans">
      
      {/* 1. NAV — Brand now links to Root */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-8 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3 group transition-opacity hover:opacity-80">
          <Leaf size={20} className="text-emerald-500" />
          <span className="font-serif text-2xl tracking-tight text-white italic">
            EcoMind<span className="font-sans font-bold not-italic ml-1 text-emerald-500">AI</span>
          </span>
        </Link>

        <Button variant="outline" className="rounded-full border-stone-800 bg-transparent hover:bg-stone-100 hover:text-black text-white px-8 h-10 text-[10px] font-bold uppercase tracking-widest transition-all">
          Login
        </Button>
      </nav>

      {/* 2. SOPHISTICATED HERO */}
      <section className="relative h-[85vh] w-full flex flex-col items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#2e2e2e_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center space-y-10 relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 text-emerald-500/60 text-[9px] font-bold tracking-[0.5em] uppercase">
            <Sparkles size={12} />
            <span>The 2026 Planetary Report</span>
          </div>

          <h1 className="text-7xl md:text-8xl font-serif text-white leading-[1.1] tracking-tight italic">
            Architecting a <br /> 
            <span className="font-sans not-italic font-black text-emerald-500 underline decoration-stone-800 underline-offset-[12px]">Resilient Future.</span>
          </h1>

          <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed italic border-l border-stone-800 pl-8 text-left md:text-center">
            Translating environmental signals into high-fidelity narratives that heal our shared communities and habitats.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-10 h-14 font-bold text-xs uppercase tracking-[0.2em] shadow-xl transition-all">
              Explore the Impact <ArrowRight className="ml-2" size={16} />
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-10 h-14 font-bold text-xs uppercase tracking-[0.2em] shadow-xl transition-all">
              Try Now <Play className="ml-2 fill-white" size={14} />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* 3. DATA SECTION */}
      <section id="metrics" className="max-w-7xl mx-auto px-8 py-40 border-t border-stone-900/50">
        <div className="grid lg:grid-cols-12 gap-24 items-start">
          
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-6">
              <h2 className="text-stone-100 text-4xl md:text-6xl font-serif italic tracking-tight leading-none">
                The Cost of <br/> <span className="text-emerald-500 not-italic font-sans font-black uppercase tracking-tighter">Inattention.</span>
              </h2>
              <p className="text-stone-500 text-lg leading-relaxed italic">
                Habitual negligence stems from a lack of context. We quantify the distance between entropy and restoration.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <MinimalGauge percentage={78} color="#10b981" label="Thermal Loss" />
              <MinimalGauge percentage={64} color="#f43f5e" label="Water Hemorrhage" />
            </div>
            
            <div className="flex items-start gap-4 text-stone-500 border-t border-stone-900 pt-10">
              <ScrollText size={20} className="text-emerald-500/50 shrink-0" />
              <p className="text-xs leading-relaxed uppercase tracking-widest font-medium">
                Core Insight: <span className="text-stone-300">68% of infrastructure signals remain untranslated for public action.</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#141414] p-12 md:p-16 rounded-[2rem] border border-stone-900 shadow-2xl">
            <div className="mb-16 space-y-2 flex justify-between items-end">
              <div>
                <h3 className="text-white font-medium text-xl tracking-tight">Synthesis Performance</h3>
                <p className="text-stone-500 text-xs italic">Recovery metrics post-deployment.</p>
              </div>
              <Globe size={20} className="text-emerald-500/20" />
            </div>

            <div className="space-y-8">
              <EditorialBar label="Atmospheric Carbon Offset" misuse={85} optimized={24} unit="MT" />
              <EditorialBar label="Community Water Security" misuse={92} optimized={38} unit="L" />
              <EditorialBar label="Energy Lifecycle Efficiency" misuse={70} optimized={12} unit="%" />
            </div>

            <div className="mt-20 pt-10 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
               <div className="space-y-1">
                  <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.4em]">Index Improvement</p>
                  <p className="text-6xl font-light text-white tracking-tighter italic">+42.8%</p>
               </div>
               <div className="px-8 py-3 bg-stone-800/50 rounded-full border border-stone-700 text-[9px] font-bold uppercase tracking-[0.3em] text-stone-400">
                  Verified Planetary Data
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer id="footer" className="bg-[#0a0a0a] pt-32 pb-20 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-32">
          <div className="space-y-10 text-left">
            <Link href="/" className="flex items-center gap-3 group transition-opacity hover:opacity-80">
              <Leaf size={28} className="text-emerald-600 opacity-80" />
              <span className="text-3xl font-serif italic text-white leading-none tracking-tight">EcoMind<span className="font-sans font-bold not-italic ml-1">AI</span></span>
            </Link>
            <p className="text-stone-500 text-lg font-light leading-relaxed max-w-sm italic pr-10">
              Engineering the gap between environmental monitoring and collective human transformation. 
            </p>
            <div className="flex gap-10">
              <Github size={20} className="text-stone-700 hover:text-emerald-400 transition-colors cursor-pointer" />
              <Twitter size={20} className="text-stone-700 hover:text-emerald-400 transition-colors cursor-pointer" />
            </div>
          </div>

          <div className="space-y-12">
            <div className="grid grid-cols-2 gap-10">
               <div className="space-y-4">
                  <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500/60">Foundation</h5>
                  <ul className="space-y-3 text-[11px] font-medium text-stone-500">
                    <li className="hover:text-white transition-colors cursor-pointer italic underline decoration-stone-800 underline-offset-4">Methodology</li>
                    <li className="hover:text-white transition-colors cursor-pointer italic underline decoration-stone-800 underline-offset-4">Data Policy</li>
                  </ul>
               </div>
               <div className="space-y-4">
                  <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500/60">System Status</h5>
                  <div className="flex items-center gap-2">
                     <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                     <span className="text-[10px] font-bold text-stone-300">Synchronized</span>
                  </div>
               </div>
            </div>
            <p className="text-[10px] font-medium text-stone-700 uppercase tracking-[0.5em] border-t border-stone-900 pt-10">
                © 2026 // NITP_ZEROHOUR // LITTI CHOKERS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcoMindHome;