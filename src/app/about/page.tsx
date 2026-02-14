"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Sparkles,
  Globe,
  ShieldCheck,
  Activity,
  Eye,
  Rocket,
  Waves,
  ArrowRight,
  Github,
  Twitter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ValueCard = ({ icon, title, desc }: any) => (
  <motion.div whileHover={{ y: -6 }}>
    <Card className="h-full border border-emerald-100/10 bg-white/40 backdrop-blur-md shadow-xl shadow-emerald-900/5 p-6 group hover:bg-white/60 transition-all">
      <CardContent className="p-0">
        <div className="mb-4 p-3 bg-emerald-600 text-white w-fit rounded-xl shadow-lg group-hover:rotate-6 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-emerald-700 transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          {desc}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

const EcoMindAbout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Sync Navbar state with localStorage
  useEffect(() => {
    const user = localStorage.getItem("userToken");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="relative min-h-screen bg-[#fcfdfc] text-slate-900 overflow-x-hidden selection:bg-emerald-200">

      {/* --- CORRECTED MATCHING NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 max-w-7xl mx-auto mt-4 rounded-full border border-white/20 backdrop-blur-md bg-black/10 shadow-lg">
        {/* Brand connected to Root */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-105">
          <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
            <Leaf size={18} />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase italic text-white">
            EcoMind<span className="text-emerald-400">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/80 leading-none">
          <a href="/#footer" className="hover:text-emerald-400 transition-colors">Contact</a>
          <Link href="/data" className="hover:text-emerald-400 transition-colors">Data</Link> 
          <a href="/#features" className="hover:text-emerald-400 transition-colors">Ecosystem</a>
        </div>
        
        {/* Dynamic Auth Toggle */}
        {isLoggedIn ? (
          <Button 
            onClick={handleLogout}
            className="rounded-full bg-rose-600 hover:bg-rose-500 text-white font-black px-6 h-9 text-xs shadow-lg transition-all"
          >
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button className="rounded-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black px-6 h-9 text-xs shadow-lg transition-all">
              Login
            </Button>
          </Link>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-[70vh] flex items-center justify-center bg-slate-950 text-white text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-400 text-[10px] font-black mb-8 tracking-[0.2em] uppercase">
            <Sparkles size={14} />
            Our Mission
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-6">
            Engineering <br />
            <span className="text-emerald-400 italic font-serif font-light">
              Planetary Intelligence
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-lg font-medium leading-relaxed italic">
            EcoMindAI exists to transform raw environmental signals into
            collective climate action — empowering communities with clarity and foresight.
          </p>
        </motion.div>
      </section>

      {/* STORY */}
      <section className="max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
          <h2 className="text-5xl font-black tracking-tighter mb-8 leading-[0.9]">
            Why We <span className="text-emerald-600 italic">Exist.</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Cities are drowning in data but starving for direction. Sensors
            collect information — but insight remains fragmented and inaccessible.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed font-medium italic border-l-4 border-emerald-500 pl-6">
            EcoMindAI bridges this gap using generative intelligence,
            synthesizing infrastructure data into emotionally-resonant action blueprints.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative bg-white/50 backdrop-blur-md p-10 rounded-[3rem] border border-emerald-100 shadow-2xl"
          >
            <Waves className="text-emerald-600 mb-4" size={42} />
            <h4 className="font-bold text-2xl mb-4 tracking-tight">
              From Signal → Story → Systemic Change
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              We convert technical infrastructure signals into narrative roadmaps that
              mobilize communities and decision-makers for a shared ecological future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-slate-950 py-32 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black tracking-tighter mb-20 uppercase italic">
            Core <span className="text-emerald-500 not-italic">Principles</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard
              icon={<Eye />}
              title="Clarity"
              desc="Complex environmental systems translated into intuitive, high-fidelity insights."
            />
            <ValueCard
              icon={<ShieldCheck />}
              title="Trust"
              desc="Privacy-first architecture ensuring community data remains localized and encrypted."
            />
            <ValueCard
              icon={<Globe />}
              title="Impact"
              desc="Designed specifically for community scaling, prioritizing the habitat over the corporation."
            />
            <ValueCard
              icon={<Rocket />}
              title="Acceleration"
              desc="Rapid simulation cycles that forecast ecological shifts 6+ months ahead."
            />
          </div>
        </div>
      </section>

      {/* BUILD INFO */}
      <section className="max-w-6xl mx-auto px-6 py-32 text-center">
        <Activity className="mx-auto text-emerald-600 mb-6 animate-pulse" size={48} />
        <h2 className="text-5xl font-black tracking-tighter mb-6">
          Built for <span className="text-emerald-600 italic">NIT Patna</span>
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
          EcoMindAI was engineered during <span className="text-emerald-600 font-bold">TechSprint '25</span> as a
          next-generation resilience intelligence engine for real-world urban clusters.
        </p>

        <div className="flex justify-center gap-6">
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white py-16 text-center border-t border-white/5">
        <div className="flex justify-center gap-8 mb-8">
          <Github size={24} className="text-slate-500 hover:text-emerald-400 cursor-pointer transition-colors" />
          <Twitter size={24} className="text-slate-500 hover:text-emerald-400 cursor-pointer transition-colors" />
        </div>
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.6em] italic">
          © 2026 // DEPLOYED BY LITTI CHOKERS // NITP_ZEROHOUR
        </p>
      </footer>
    </div>
  );
};

export default EcoMindAbout;