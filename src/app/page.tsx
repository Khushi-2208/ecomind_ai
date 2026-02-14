"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, ArrowRight, BarChart3, Globe, Zap, Users, 
  ShieldCheck, Map, Cpu, MessageSquare, Mail, Github, Twitter,
  Activity, Radio, Waves, Sparkles, Terminal, Database, ArrowUpRight, UserCircle2, ShieldHalf
} from 'lucide-react';
import { Button } from "@/components/ui/button"; 
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- TypeScript Interfaces ---
interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
}

const FeatureItem = ({ icon, title, desc, className }: FeatureItemProps) => (
  <motion.div whileHover={{ y: -5 }} className={className}>
    <Card className="h-full border border-emerald-100/20 bg-white/40 backdrop-blur-md shadow-2xl shadow-emerald-900/5 transition-all p-6 group overflow-hidden relative hover:bg-white/60">
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
      <CardContent className="p-0 relative z-10">
        <div className="mb-4 p-3 bg-emerald-600 text-white w-fit rounded-xl shadow-lg shadow-emerald-200 group-hover:rotate-6 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-700 transition-colors tracking-tight">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-sm font-medium">{desc}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const EcoMindHome = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check for authentication on mount
  useEffect(() => {
    const user = localStorage.getItem("userToken");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear the session
    setIsLoggedIn(false);
    router.push("/"); // Stay on home or refresh state
  };

  return (
    <div className="relative min-h-screen bg-[#fcfdfc] overflow-x-hidden text-slate-900 selection:bg-emerald-200">
      
      {/* 1. TOP NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 max-w-7xl mx-auto mt-4 rounded-full border border-white/20 backdrop-blur-md bg-black/10 shadow-lg">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
            <Leaf size={18} />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase italic text-white leading-none">
            EcoMind<span className="text-emerald-400">AI</span>
          </span>
        </Link>
        
        <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/80 leading-none">
          <a href="#footer" className="hover:text-emerald-400 transition-colors">Contact</a>
          <Link href="/about" className="hover:text-emerald-400 transition-colors">About</Link>
          <Link href="/data" className="hover:text-emerald-400 transition-colors">Data</Link> 
          <a href="#features" className="hover:text-emerald-400 transition-colors">Ecosystem</a>
        </div>

        {/* Dynamic Login/Logout Button */}
        {isLoggedIn ? (
          <Button 
            onClick={handleLogout}
            className="rounded-full bg-rose-600 hover:bg-rose-500 text-white font-black px-6 h-9 text-xs shadow-lg transition-all leading-none"
          >
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button className="rounded-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black px-6 h-9 text-xs shadow-lg transition-all leading-none">
              Login
            </Button>
          </Link>
        )}
      </nav>

      {/* 2. HERO VIDEO BACKGROUND */}
      <section className="relative h-[90vh] w-full flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/Hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 text-center pt-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-400 text-[10px] font-black mb-10 tracking-[0.2em] uppercase">
            <Sparkles size={14} className="animate-pulse" />
            <span>NIT Patna ZeroHour '26 Special Deployment</span>
          </motion.div>

          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.8] text-white drop-shadow-2xl">
            Heal the <br /> 
            <span className="text-emerald-400 italic font-serif font-light">Planet</span>.
          </motion.h1>

          <motion.p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed italic drop-shadow-md">
            Turning fragments of community infrastructure data into high-fidelity narrative action plans via Generative Intelligence.
          </motion.p>

          {/* TWO BUTTON LAYOUT - Routing Updated */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/resident">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 h-16 px-10 rounded-2xl text-lg font-black shadow-2xl shadow-emerald-200 border border-emerald-400/20 group">
                <UserCircle2 className="mr-2 group-hover:scale-110 transition-transform" /> Residents
              </Button>
            </Link>
            <Link href="/community">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 backdrop-blur-md h-16 px-10 rounded-2xl text-lg font-black text-white border-white/20 group shadow-2xl">
                <ShieldHalf className="mr-2 group-hover:rotate-12 transition-transform" /> Community Leaders
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. The "Resilience Engine" (Floating Dark UI) */}
      <section className="max-w-6xl mx-auto px-6 mb-40 mt-20 relative">
        <motion.div 
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative bg-slate-950 rounded-[3.5rem] p-1 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]"
        >
          <div className="bg-[#0a110f] rounded-[3.3rem] p-10 md:p-16 flex flex-col md:flex-row gap-16 items-center border border-white/5">
             <div className="flex-1 space-y-10 z-10">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                      <Activity className="text-emerald-400 animate-pulse" size={24} />
                   </div>
                   <div>
                      <h4 className="text-white font-bold tracking-tight">Ecosystem_Pulse_Monitor</h4>
                      <p className="text-emerald-500/50 text-[10px] font-mono tracking-widest uppercase italic">Live Insight Synthesis</p>
                   </div>
                </div>

                <h2 className="text-white text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter">
                  Visioning <br/> <span className="text-emerald-500">Tomorrow.</span>
                </h2>

                <div className="space-y-6 text-left">
                   <div className="p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-md">
                      <p className="text-slate-400 font-mono text-xs leading-relaxed italic">
                        <span className="text-emerald-500 font-bold">INSIGHT:</span> Neighborhood resource distribution analyzed. AI suggests habit-shifting toward renewable peaks for 14% efficiency gain.
                      </p>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] leading-none">
                          <span>Current Sustainability Level</span>
                          <span className="text-emerald-400">85% OPTIMIZED</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div animate={{ width: isHovered ? "85%" : "30%" }} className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] leading-none">
                          <span>Community Engagement Rate</span>
                          <span className="text-blue-400">92% RELIABILITY</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div animate={{ width: isHovered ? "92%" : "45%" }} className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                        </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex-1 w-full flex justify-center relative">
                <div className="relative w-80 h-80 flex items-center justify-center">
                   <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[3px] border-dashed border-emerald-500/10 rounded-full" />
                   <div className="text-center group-hover:scale-110 transition-transform">
                      <Waves className="text-emerald-500 mb-4 mx-auto" size={56} />
                      <span className="block text-6xl font-black text-white leading-none">+34%</span>
                      <span className="text-emerald-500/40 text-[10px] font-black uppercase tracking-[0.3em] leading-none mt-2 block">Projected Impact</span>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* 4. Methodology (Asymmetric) */}
      <section id="how" className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.85]">Our DNA. <br/> <span className="text-emerald-500 italic">Methodology.</span></h2>
            <p className="text-slate-400 text-lg mb-12 font-medium leading-relaxed">We bridge the gap between "knowing" and "doing" by converting dry environmental metrics into human-centric blueprints.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {[
               { icon: <Map />, title: "Ingest", desc: "Local habit acquisition." },
               { icon: <Cpu />, title: "Reason", desc: "Generative modeling." },
               { icon: <MessageSquare />, title: "Plan", desc: "Narrative vision output." },
               { icon: <Globe />, title: "Sync", desc: "Global climate alignment." }
             ].map((item, i) => (
               <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <div className={`mb-4 text-emerald-500`}>{item.icon}</div>
                  <h4 className="font-bold mb-1 tracking-tight">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. Symmetrical Ecosystem Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-40">
        <div className="flex items-center gap-4 mb-20">
           <div className="h-[2px] w-20 bg-emerald-600 rounded-full" />
           <h2 className="text-3xl font-black uppercase tracking-widest text-emerald-950 italic">Ecosystem Features</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           <FeatureItem icon={<Globe />} title="Vision Planning" desc="AI-generated journey of your community's ecological future." />
           <FeatureItem icon={<Users />} title="Personalization" desc="Hyper-local lifestyle adjustment suggestions for residents." />
           <FeatureItem icon={<ShieldCheck />} title="Privacy Vault" desc="Encrypted data storage ensuring community safety." />
           <FeatureItem icon={<BarChart3 />} title="Resilience Engine" desc="Forecast resource strain and climate shifts 6 months in advance." />
        </div>
      </section>

      {/* 6. Impact Ticker */}
      <section className="bg-emerald-600 py-10 overflow-hidden relative border-y-8 border-emerald-950">
          <div className="flex gap-20 whitespace-nowrap animate-infinite-scroll font-black uppercase italic text-4xl text-white leading-none">
            <span>Plan for the future</span>
            <span className="text-emerald-950/20">99.2% AI Confidence</span>
            <span>12k+ Districts Mapped</span>
            <span className="text-emerald-950/20">Decentralized Power</span>
          </div>
      </section>

      {/* 7. REIMAGINED FOOTER */}
      <footer id="footer" className="bg-slate-950 text-white pt-32 pb-16 border-t border-white/5 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-32 pb-24 border-b border-white/5">
          <div className="space-y-12 text-left">
            <div className="flex items-center gap-3">
              <Leaf size={32} className="text-emerald-500" />
              <span className="text-4xl font-black uppercase italic tracking-tighter leading-none">EcoMind<span className="text-emerald-500">AI</span></span>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-md italic">
              The first community-scale generative intelligence engine designed to bridge the gap between sensor data and human transformation. Built for the NIT Patna ZeroHour '26.
            </p>
            <div className="flex gap-8">
              <Github size={28} className="text-white/20 hover:text-emerald-400 transition-colors cursor-pointer" />
              <Twitter size={28} className="text-white/20 hover:text-emerald-400 transition-colors cursor-pointer" />
            </div>
          </div>

          <div className="space-y-10">
            <h5 className="text-[12px] font-black uppercase tracking-[0.5em] text-emerald-500 leading-none">System_Architecture</h5>
            <div className="p-10 bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 flex justify-between items-center shadow-2xl">
              <div className="space-y-2 font-mono uppercase italic tracking-widest text-left leading-none">
                <p className="text-lg text-white font-black leading-none mb-1">Region_Patna_01</p>
                <p className="text-[11px] text-emerald-500">Status: Optimized</p>
              </div>
              <div className="flex h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_20px_#10b981] animate-pulse" />
            </div>
            <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em] pt-10 leading-none italic">
                © 2026 // DEPLOYED BY LITTI CHOKERS // NITP_ZEROHOUR
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcoMindHome;