"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Sparkles,
  Globe,
  Cpu,
  Users,
  ShieldCheck,
  Activity,
  Target,
  Eye,
  Rocket,
  Waves,
  ArrowRight,
  Github,
  Twitter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <div className="relative min-h-screen bg-[#fcfdfc] text-slate-900 overflow-x-hidden selection:bg-emerald-200">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 max-w-7xl mx-auto mt-4 rounded-full border border-white/20 backdrop-blur-md bg-black/10 shadow-lg">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
            <Leaf size={18} />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase italic text-white">
            EcoMind<span className="text-emerald-400">AI</span>
          </span>
        </div>
        <Button className="rounded-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black px-6 h-9 text-xs shadow-lg">
          Launch App
        </Button>
      </nav>

      {/* HERO */}
      <section className="relative h-[70vh] flex items-center justify-center bg-slate-950 text-white text-center px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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

          <p className="max-w-2xl mx-auto text-slate-400 text-lg font-medium leading-relaxed">
            EcoMindAI exists to transform raw environmental signals into
            collective climate action — empowering communities with clarity,
            foresight, and precision.
          </p>
        </motion.div>
      </section>

      {/* STORY */}
      <section className="max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-5xl font-black tracking-tighter mb-8 leading-[0.9]">
            Why We <span className="text-emerald-600 italic">Exist.</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Cities are drowning in data but starving for direction. Sensors
            collect information — but insight remains fragmented.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed">
            EcoMindAI bridges this gap using generative intelligence,
            synthesizing infrastructure data into human-readable,
            emotionally-resonant action blueprints.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />
          <div className="relative bg-white/50 backdrop-blur-md p-10 rounded-[3rem] border border-emerald-100 shadow-2xl">
            <Waves className="text-emerald-600 mb-4" size={42} />
            <h4 className="font-bold text-2xl mb-4 tracking-tight">
              From Signal → Story → Systemic Change
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              We convert infrastructure signals into narrative roadmaps that
              mobilize communities and decision-makers alike.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-slate-950 py-32 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black tracking-tighter mb-20">
            Core <span className="text-emerald-500 italic">Principles</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard
              icon={<Eye />}
              title="Clarity"
              desc="Complex environmental systems translated into intuitive insights."
            />
            <ValueCard
              icon={<ShieldCheck />}
              title="Trust"
              desc="Privacy-first architecture with encrypted local-first data models."
            />
            <ValueCard
              icon={<Globe />}
              title="Collective Impact"
              desc="Designed for communities, not corporations."
            />
            <ValueCard
              icon={<Rocket />}
              title="Acceleration"
              desc="Rapid simulation cycles that forecast 6+ months ahead."
            />
          </div>
        </div>
      </section>

      {/* TEAM / BUILD INFO */}
      <section className="max-w-6xl mx-auto px-6 py-32 text-center">
        <Activity className="mx-auto text-emerald-600 mb-6" size={48} />
        <h2 className="text-5xl font-black tracking-tighter mb-6">
          Built for <span className="text-emerald-600 italic">Impact</span>
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
          EcoMindAI was engineered during NIT Patna TechSprint '25 as a
          next-generation resilience intelligence engine for real communities.
        </p>

        <div className="flex justify-center gap-6">
          <Button className="bg-emerald-600 hover:bg-emerald-500 h-14 px-8 rounded-xl font-black">
            Read Technical Paper <ArrowRight className="ml-2" />
          </Button>
          <Button variant="outline" className="h-14 px-8 rounded-xl font-black">
            View Source
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white py-12 text-center border-t border-white/5">
        <div className="flex justify-center gap-6 mb-6">
          <Github className="hover:text-emerald-400 cursor-pointer" />
          <Twitter className="hover:text-emerald-400 cursor-pointer" />
        </div>
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.6em]">
          © 2026 // EcoMindAI // Planetary Systems Intelligence
        </p>
      </footer>
    </div>
  );
};

export default EcoMindAbout;
