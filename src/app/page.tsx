"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, ArrowRight, BarChart3, Globe, Zap, Users, 
  ShieldCheck, Map, Cpu, MessageSquare, Mail, Github, Twitter,
  Activity, Radio, Waves, Sparkles, Terminal, Database, ArrowUpRight
} from 'lucide-react';
import { Button } from "@/components/ui/button"; 
import { Card, CardContent } from "@/components/ui/card";

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

  return (
    <div className="relative min-h-screen bg-[#fcfdfc] overflow-x-hidden text-slate-900 selection:bg-emerald-200">
      
      {/* 1. TOP NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 max-w-7xl mx-auto mt-4 rounded-full border border-white/20 backdrop-blur-md bg-black/10 shadow-lg">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
            <Leaf size={18} />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase italic text-white">
            EcoMind<span className="text-emerald-400">AI</span>
          </span>
        </div>
        
        <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
          <a href="#how" className="hover:text-emerald-400 transition-colors">Lab_Method</a>
          <a href="#features" className="hover:text-emerald-400 transition-colors">Ecosystem</a>
          <a href="#stats" className="hover:text-emerald-400 transition-colors">Impact_Index</a>
        </div>

        <Button className="rounded-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black px-6 h-9 text-xs shadow-lg transition-all">
          Launch App
        </Button>
      </nav>

      {/* 2. HERO VIDEO BACKGROUND */}
      <section className="relative h-[90vh] w-full flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/Hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 text-center pt-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-400 text-[10px] font-black mb-10 tracking-[0.2em] uppercase">
            <Sparkles size={14} className="animate-pulse" />
            <span>NIT Patna TechSprint '25 Special Deployment</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.8] text-white drop-shadow-2xl"
          >
            Heal the <br /> 
            <span className="text-emerald-400 italic font-serif font-light">Planet</span>.
          </motion.h1>

          <motion.p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed italic drop-shadow-md">
            Turning fragments of community infrastructure data into high-fidelity narrative action plans via Generative Intelligence.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 h-16 px-10 rounded-2xl text-lg font-black shadow-2xl shadow-emerald-200">
              Start Visualization <ArrowRight className="ml-2" />
            </Button>
            <div className="flex flex-col items-start border-l border-white/20 pl-6 text-left">
               <div className="flex -space-x-2 mb-1">
                 {[1,2,3].map(i => (
                   <img key={i} className="w-8 h-8 rounded-full border-2 border-slate-900" src={`https://i.pravatar.cc/100?img=${i+20}`} alt="user" />
                 ))}
               </div>
               <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">400+ Nodes Active</span>
            </div>
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
                      <p className="text-emerald-500/50 text-[10px] font-mono tracking-widest uppercase italic">Live Data Synthesis</p>
                   </div>
                </div>

                <h2 className="text-white text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter">
                  Visioning <br/> <span className="text-emerald-500">Tomorrow.</span>
                </h2>

                <div className="space-y-6">
                   <div className="p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-md">
                      <p className="text-slate-400 font-mono text-xs leading-relaxed">
                        <span className="text-emerald-500 font-bold">LOG:</span> Analyzing Sector 4 greywater runoff. AI suggests 14% efficiency gain via decentralized LoRa mesh integration.
                      </p>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em]">
                          <span>Current Grid Load Efficiency</span>
                          <span className="text-emerald-400">85% OPTIMIZED</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div animate={{ width: isHovered ? "85%" : "30%" }} className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em]">
                          <span>Community Resource Sync</span>
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
                      <span className="block text-6xl font-black text-white">+34%</span>
                      <span className="text-emerald-500/40 text-[10px] font-black uppercase tracking-[0.3em]">Projected Impact</span>
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
            <p className="text-slate-400 text-lg mb-12 font-medium leading-relaxed">We bridge the gap between "knowing" and "doing" by converting dry sensor data into human-centric blueprints.</p>
            <Button variant="outline" className="border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-xl h-14 px-8 font-black uppercase text-xs">Technical Paper</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {[
               { icon: <Map />, title: "Ingest", desc: "Local context acquisition." },
               { icon: <Cpu />, title: "Reason", desc: "Gemini-driven modeling." },
               { icon: <MessageSquare />, title: "Plan", desc: "Narrative vision output." },
               { icon: <Globe />, title: "Sync", desc: "Global impact alignment." }
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
        {/* Changed from md:grid-cols-3 and removed md:col-span-2 for symmetry */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           <FeatureItem icon={<Globe />} title="Vision Planning" desc="AI-generated journey of your community's ecological future." />
           <FeatureItem icon={<Users />} title="Personalization" desc="Hyper-local habit adjustment suggestions for residents." />
           <FeatureItem icon={<ShieldCheck />} title="Privacy Vault" desc="Encrypted data storage ensuring community safety." />
           <FeatureItem icon={<BarChart3 />} title="Resilience Engine" desc="Forecast energy grid surges and climate shifts 6 months in advance." />
        </div>
      </section>

      {/* 6. Impact Ticker */}
      <section className="bg-emerald-600 py-10 overflow-hidden relative border-y-8 border-emerald-950">
         <div className="flex gap-20 whitespace-nowrap animate-infinite-scroll font-black uppercase italic text-4xl">
            <span className="text-white">99.2% AI Confidence</span>
            <span className="text-emerald-950/20">Plan for the future</span>
            <span className="text-white">12k+ Districts Mapped</span>
            <span className="text-emerald-950/20">Decentralized Power</span>
         </div>
      </section>

      {/* 7. REIMAGINED FOOTER */}
      <footer className="bg-slate-950 text-white pt-24 pb-8 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 bg-emerald-600 rounded-lg text-white transition-transform group-hover:rotate-12">
                <Leaf size={24} />
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase italic">EcoMind<span className="text-emerald-500">AI</span></span>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-md">
              The first community-scale generative intelligence engine designed to bridge the gap between sensor data and human transformation. Built for the <span className="text-white">NIT Patna TechSprint '25</span>.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                <Github size={18} className="group-hover:text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest">Source</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                <Twitter size={18} className="group-hover:text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest">Updates</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Environment</h5>
            <ul className="space-y-4 text-xs font-bold text-slate-400">
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><Database size={12}/> API Access</li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><Terminal size={12}/> Lab Logs</li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><Activity size={12}/> Impact Map</li>
            </ul>
          </div>

          <div className="md:col-span-5 space-y-6">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">System Status</h5>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic font-mono">Server Instance: Patna_01</span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </div>
              <p className="text-sm font-bold tracking-tight text-slate-300">Ready for incoming community infrastructure data ingest.</p>
              <div className="pt-2 flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-tighter cursor-pointer group">
                Support Line: team@ecomind.ai <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.6em] animate-pulse">
            © 2026 // DEPLOYED BY CHOKERS_TEAM // NITP_TECHSPRINT
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EcoMindHome;