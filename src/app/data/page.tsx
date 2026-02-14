"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, Sparkles, Github, Twitter, 
  Globe, AlertTriangle, BarChart3, MapPin, 
  Droplets, Trash2, Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button"; 
import Link from 'next/link';

// --- Enhanced Leader Metric Card ---
const SectorStatusCard = ({ sector, efficiency, status, problemType, description }: any) => {
  const getIcon = () => {
    switch(problemType) {
      case 'Water': return <Droplets size={16} className="text-blue-400" />;
      case 'Waste': return <Trash2 size={16} className="text-orange-400" />;
      case 'Energy': return <Zap size={16} className="text-yellow-400" />;
      default: return <MapPin size={16} className="text-emerald-500" />;
    }
  };

  return (
    <div className="p-6 bg-white/5 border border-stone-800 rounded-3xl space-y-4 hover:border-emerald-500/50 transition-all group flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getIcon()}
            <span className="text-xs font-black uppercase tracking-widest text-stone-100">{sector}</span>
          </div>
          <span className={`text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-tighter ${
            status === 'Critical' ? 'bg-rose-500 text-white' : 'bg-stone-800 text-stone-400'
          }`}>
            {status}
          </span>
        </div>
        
        <div className="space-y-1">
          <p className="text-3xl font-light text-white tracking-tighter">{efficiency}%</p>
          <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Health Index</p>
        </div>

        <div className="bg-black/40 p-4 rounded-xl border border-white/5">
           <p className="text-[11px] text-stone-300 leading-relaxed italic">
             <span className="text-emerald-500 font-bold uppercase not-italic mr-1">{problemType}:</span> 
             {description}
           </p>
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-stone-800 flex justify-between items-center">
          <Button variant="ghost" className="h-6 text-[9px] uppercase tracking-tighter text-emerald-500 hover:text-emerald-400 p-0 font-black">
            Deploy Resources →
          </Button>
      </div>
    </div>
  );
};

const ResourceAllocationBar = ({ label, current, demand, color }: any) => (
  <div className="space-y-3 py-4 border-b border-stone-800/50">
    <div className="flex justify-between items-baseline">
      <span className="text-sm font-medium text-stone-300 tracking-wide">{label}</span>
      <span className="text-[10px] font-mono text-stone-500">Resource Gap: {demand - current}%</span>
    </div>
    <div className="relative h-[4px] w-full bg-stone-800 overflow-hidden rounded-full">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${current}%` }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className={`absolute top-0 left-0 h-full ${color} shadow-[0_0_10px_rgba(16,185,129,0.3)]`}
      />
    </div>
    <div className="flex justify-between text-[9px] uppercase tracking-widest text-stone-500 italic">
      <span>Provisioned: {current}%</span>
      <span className="text-white font-bold">Unmet Demand: {demand}%</span>
    </div>
  </div>
);

const DataVisualPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <div className="relative min-h-screen bg-[#0f0f0f] overflow-x-hidden text-stone-200 selection:bg-emerald-900/30 font-sans">
      
      {/* 1. NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-8 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3 group transition-opacity hover:opacity-80">
          <Leaf size={20} className="text-emerald-500" />
          <span className="font-serif text-2xl tracking-tight text-white italic">
            EcoMind<span className="font-sans font-bold not-italic ml-1 text-emerald-500">AI</span>
          </span>
        </Link>

        {isLoggedIn ? (
          <Button onClick={handleLogout} className="rounded-full bg-rose-600 hover:bg-rose-500 text-white font-black px-8 h-10 text-[10px] font-bold uppercase tracking-widest transition-all">
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button variant="outline" className="rounded-full border-stone-800 bg-transparent hover:bg-stone-100 hover:text-black text-white px-8 h-10 text-[10px] font-bold uppercase tracking-widest transition-all">
              Login
            </Button>
          </Link>
        )}
      </nav>

      {/* 2. LEADER STRATEGY HERO */}
      <section className="relative min-h-[60vh] w-full flex flex-col items-center justify-center px-6 pt-32">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center space-y-10 relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 text-rose-500/80 text-[9px] font-black tracking-[0.5em] uppercase px-4 py-2 border border-rose-500/20 rounded-full bg-rose-500/5">
            <AlertTriangle size={12} />
            <span>Patna Deployment: Resource Strain Detected</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif text-white leading-[1.1] tracking-tight italic">
            Strategic <br /> 
            <span className="font-sans not-italic font-black text-emerald-500">Asset Allocation.</span>
          </h1>

          <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed italic border-l border-emerald-800 pl-8 text-left">
            Community Leader Dashboard: Analyze cross-sector entropy to determine high-priority intervention zones across the Patna Metropolitan Area.
          </p>
        </motion.div>
      </section>

      {/* 3. SECTOR GRID (Actionable for Leaders) */}
      <section className="max-w-7xl mx-auto px-8 py-20 border-t border-stone-900/50">
        <div className="mb-12 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-widest text-white italic">Neighborhood_Pulse</h2>
            <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] text-stone-500 uppercase font-bold"><span className="h-2 w-2 rounded-full bg-emerald-500"/> Stable</div>
                <div className="flex items-center gap-2 text-[10px] text-stone-500 uppercase font-bold"><span className="h-2 w-2 rounded-full bg-rose-500"/> Critical</div>
            </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SectorStatusCard 
            sector="Kankarbagh (Sector 4)" 
            efficiency={42} 
            status="Critical" 
            problemType="Energy"
            description="High thermal loss in older residential blocks. Transformer surges detected due to non-optimized HVAC timing." 
          />
          <SectorStatusCard 
            sector="Boring Road Cluster" 
            efficiency={88} 
            status="Stable" 
            problemType="Waste"
            description="Optimal composting rates. Minimal landfill diversion required this cycle." 
          />
          <SectorStatusCard 
            sector="NIT Ghat Precinct" 
            efficiency={31} 
            status="Critical" 
            problemType="Water"
            description="Severe greywater runoff contamination. Surface water sensors indicate 40% loss during distribution." 
          />
          <SectorStatusCard 
            sector="Patliputra Zone" 
            efficiency={34} 
            status="Critical" 
            problemType="Waste"
            description="Illegal dumping hotspots detected via satellite. Waste recovery units operating at 200% capacity." 
          />
        </div>
      </section>

      {/* 4. RESOURCE ANALYSIS */}
      <section id="metrics" className="max-w-7xl mx-auto px-8 py-40 border-t border-stone-900/50">
        <div className="grid lg:grid-cols-12 gap-24 items-start">
          
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-6">
              <h2 className="text-stone-100 text-4xl md:text-5xl font-serif italic tracking-tight leading-none">
                Demand vs. <br/> <span className="text-emerald-500 not-italic font-sans font-black uppercase tracking-tighter">Availability.</span>
              </h2>
              <p className="text-stone-500 text-lg leading-relaxed italic">
                Allocative efficiency requires real-time gap analysis. These metrics indicate where Patna's current policy must shift.
              </p>
            </div>

            <div className="space-y-4">
               <ResourceAllocationBar label="Grid Load Capacity" current={65} demand={95} color="bg-rose-500" />
               <ResourceAllocationBar label="Potable Water Reserves" current={80} demand={85} color="bg-blue-500" />
               <ResourceAllocationBar label="Waste Recovery Units" current={40} demand={90} color="bg-orange-500" />
            </div>
            
            <div className="flex items-start gap-4 text-stone-500 border-t border-stone-900 pt-10">
              <BarChart3 size={20} className="text-emerald-500/50 shrink-0" />
              <p className="text-[11px] leading-relaxed uppercase tracking-widest font-medium">
                Leader Note: <span className="text-stone-300">Data suggests redistribution of Surplus Energy from Boring Road to Kankarbagh will increase city-wide efficiency by 18%.</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#141414] p-12 md:p-16 rounded-[3rem] border border-stone-900 shadow-2xl">
            <div className="mb-16 space-y-2 flex justify-between items-end">
              <div>
                <h3 className="text-white font-black text-xl tracking-widest uppercase italic">AI_Strategy_Synthesis</h3>
                <p className="text-emerald-500 text-[10px] font-mono tracking-widest">GEN_INTELLIGENCE_OUTPUT_26</p>
              </div>
              <Sparkles size={20} className="text-emerald-500" />
            </div>

            <div className="space-y-10">
               <div className="space-y-2">
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Recommended Action Blueprint</p>
                    <p className="text-xl font-serif italic text-stone-200 leading-relaxed">
                        "Deploy <span className="text-emerald-500 font-sans not-italic font-black">Localized Water Treatment Nodes</span> at the NIT Ghat precinct. Greywater recovery can fulfill 30% of Sector 4's non-potable demand."
                    </p>
               </div>
               <div className="h-[1px] w-full bg-stone-800" />
               <div className="space-y-2">
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Forecasted Resilience Gain</p>
                    <p className="text-5xl font-black text-white tracking-tighter">+22.4%</p>
                    <p className="text-[10px] text-stone-600 uppercase tracking-widest">Anticipated system stability in 90 days</p>
               </div>
            </div>

            <div className="mt-20">
               <Button className="w-full h-16 bg-white text-black hover:bg-stone-200 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                    Authorize Community Resource Sync
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer id="footer" className="bg-[#0a0a0a] pt-32 pb-20 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-32">
          <div className="space-y-10 text-left">
            <Link href="/" className="flex items-center gap-3 group transition-opacity hover:opacity-80">
              <Leaf size={28} className="text-emerald-600 opacity-80" />
              <span className="text-3xl font-serif italic text-white leading-none tracking-tight">EcoMind<span className="font-sans font-bold not-italic ml-1">AI</span></span>
            </Link>
            <p className="text-stone-500 text-lg font-light leading-relaxed max-w-sm italic pr-10">
              Transforming planetary infrastructure monitoring into strategic leadership decision cycles.
            </p>
          </div>

          <div className="space-y-12">
            <div className="grid grid-cols-2 gap-10">
               <div className="space-y-4">
                  <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500/60">Leader_Resources</h5>
                  <ul className="space-y-3 text-[11px] font-medium text-stone-500">
                    <li className="hover:text-white transition-colors cursor-pointer italic underline decoration-stone-800 underline-offset-4">Asset Map</li>
                    <li className="hover:text-white transition-colors cursor-pointer italic underline decoration-stone-800 underline-offset-4">Policy Sync</li>
                  </ul>
               </div>
               <div className="space-y-4">
                  <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500/60">Node Status</h5>
                  <div className="flex items-center gap-2">
                     <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[10px] font-bold text-stone-300">Live Strategy Feed</span>
                  </div>
               </div>
            </div>
            <p className="text-[10px] font-medium text-stone-700 uppercase tracking-[0.5em] border-t border-stone-900 pt-10">
                © 2026 // NITP_ZEROHOUR // PATNA_DEPLOYMENT
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DataVisualPage;