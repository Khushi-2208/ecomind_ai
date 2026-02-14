"use client";

import { useState, FormEvent, ChangeEvent, FocusEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Leaf, Mail, Lock, User, Check, AlertCircle, Eye, EyeOff, CheckCircle2, Sparkles, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  bio: string;
  role: "user" | "admin";
}

export default function SignupPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track auth state for navbar
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    role: "user",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Sync navbar state on load
  useEffect(() => {
    const user = localStorage.getItem("userToken");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "#64748b" };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    const configs = [
      { strength: 0, label: "", color: "#64748b" },
      { strength: 1, label: "WEAK", color: "#ef4444" },
      { strength: 2, label: "FAIR", color: "#f59e0b" },
      { strength: 3, label: "GOOD", color: "#10b981" },
      { strength: 4, label: "STRONG", color: "#10b981" },
    ];
    return configs[strength];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Registration failed");
      } else {
        // --- CRITICAL STORAGE LOGIC ---
        localStorage.setItem("userToken", data.token || "authenticated");
        setMessage("✓ Account created successfully!");
        
        setTimeout(() => {
          // Hard redirect to home ensures Navbar Effect triggers across the app
          window.location.href = "/"; 
        }, 1500);
      }
    } catch (err) {
      setMessage("System error. Please try again.");
    }
    setLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-[#fcfdfc] text-slate-900 overflow-x-hidden selection:bg-emerald-200">
      
      {/* MATCHED NAVBAR WITH DYNAMIC LOGIN/LOGOUT */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 max-w-7xl mx-auto mt-4 rounded-full border border-white/20 backdrop-blur-md bg-black/10 shadow-lg">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
            <Leaf size={18} />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase italic text-white">
            EcoMind<span className="text-emerald-400">AI</span>
          </span>
        </Link>
        
        <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
          <a href="/#footer" className="hover:text-emerald-400 transition-colors">Contact</a>
          <Link href="/data" className="hover:text-emerald-400 transition-colors">Data</Link> 
          <a href="/#features" className="hover:text-emerald-400 transition-colors">Ecosystem</a>
        </div>

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

      {/* Hero Section with Form */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]" animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, 50, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
        </div>

        <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <motion.div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-emerald-100/50 text-emerald-600 text-[10px] font-black tracking-[0.2em] uppercase shadow-sm">
              <Sparkles size={14} className="animate-pulse" />
              <span>Join the Ecosystem</span>
            </motion.div>
            <div>
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.85]">Start Your <br /><span className="text-emerald-600 italic font-serif">Journey</span></h1>
              <p className="text-slate-600 mt-4 text-lg">Join communities already transforming impact through AI.</p>
              <div className="space-y-4 mt-8 text-slate-700 font-medium">
                <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-emerald-600" /><span>AI-driven sustainability planning</span></div>
                <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-emerald-600" /><span>Real-time environmental monitoring</span></div>
              </div>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border border-emerald-100/50 bg-white/80 backdrop-blur-md shadow-2xl overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <h2 className="text-3xl font-black tracking-tight mb-6">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition-all" required />
                  <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition-all" required />
                  
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" onChange={handleChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition-all pr-12" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((l) => (
                          <div key={l} className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                            <motion.div className="h-full" animate={{ width: l <= passwordStrength.strength ? "100%" : "0%", backgroundColor: l <= passwordStrength.strength ? passwordStrength.color : "#e2e8f0" }} />
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] font-bold uppercase" style={{ color: passwordStrength.color }}>{passwordStrength.label}</p>
                    </div>
                  )}

                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Account Type</p>
                    <div className="grid grid-cols-2 gap-3">
                      {["user", "admin"].map((r) => (
                        <label key={r} className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${formData.role === r ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-emerald-100"}`}>
                          <input type="radio" name="role" value={r} checked={formData.role === r} onChange={() => setFormData({...formData, role: r as any})} className="hidden" />
                          <div className="text-xl mb-1">{r === 'user' ? '👤' : '⚡'}</div>
                          <p className="text-xs font-black uppercase tracking-wide">{r === 'user' ? 'User' : 'Lead'}</p>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 font-black uppercase text-white shadow-lg">
                    {loading ? <Activity className="animate-spin mr-2" /> : <CheckCircle2 className="mr-2" />}
                    {loading ? "Processing..." : "Create Account"}
                  </Button>
                </form>

                <AnimatePresence>
                  {message && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-6 p-4 rounded-xl border-2 text-sm font-medium flex items-center gap-2 ${message.includes("✓") ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-red-50 border-red-200 text-red-700"}`}>
                      <AlertCircle size={18} /> {message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-6 text-center text-sm text-slate-600">
                  Already have an account? <Link href="/login" className="text-emerald-600 hover:text-emerald-500 font-black uppercase ml-1">Login →</Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <div className="fixed bottom-6 left-6 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-emerald-100 shadow-lg text-[10px] font-black text-slate-600 flex items-center gap-2 uppercase tracking-widest">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        System Online
      </div>
    </div>
  );
}