"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Leaf, Mail, Lock, ArrowRight, Terminal, Activity,
    AlertCircle, CheckCircle2, Sparkles, Eye, EyeOff
} from "lucide-react";
import Link from "next/link";

interface FormData {
    email: string;
    password: string;
}

interface TerminalLine {
    text: string;
    type: "system" | "info" | "success" | "error";
    timestamp?: number;
}

export default function LoginPage() {
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
        { text: "// ECOMIND_AI AUTHENTICATION TERMINAL", type: "system" },
        { text: "// Awaiting credentials...", type: "info" },
    ]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addTerminalLine = (text: string, type: TerminalLine["type"] = "info") => {
        setTerminalLines((prev) => [...prev, { text, type, timestamp: Date.now() }]);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        addTerminalLine("> Initiating authentication sequence...", "info");
        addTerminalLine(`> Validating node: ${formData.email}`, "info");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                addTerminalLine("✗ Authentication failed", "error");
                addTerminalLine(`✗ ${data.error || "Invalid credentials"}`, "error");
                setMessage(data.error || "Authentication failed");
            } else {
                // --- CRITICAL STORAGE LOGIC ---
                localStorage.setItem("userToken", data.token || "authenticated");
                
                addTerminalLine("✓ Identity verified", "success");
                addTerminalLine("✓ Access granted to EcoMind ecosystem", "success");
                addTerminalLine("> Syncing session state...", "success");
                setMessage("✓ Access granted");

                setTimeout(() => {
                    // Force a hard refresh to ensure the homepage Navbar updates
                    window.location.href = "/"; 
                }, 1500);
            }
        } catch (err) {
            addTerminalLine("✗ System error occurred", "error");
            setMessage("Connection failed. Retry.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#0a110f] text-white overflow-hidden relative selection:bg-emerald-500/20">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

            {/* Scanning Line Effect */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <motion.div
                    className="absolute w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>

            {/* Floating Orbs */}
            <motion.div
                className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Top Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 max-w-7xl mx-auto mt-4">
                <motion.div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => router.push("/")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="p-1.5 bg-emerald-600 rounded-lg text-white group-hover:rotate-12 transition-transform">
                        <Leaf size={18} />
                    </div>
                    <span className="font-black text-xl tracking-tighter uppercase italic text-white">
                        EcoMind<span className="text-emerald-400">AI</span>
                    </span>
                </motion.div>

                <motion.a
                    href="/signup"
                    className="text-xs font-black uppercase tracking-[0.2em] text-white/60 hover:text-emerald-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                >
                    New_User →
                </motion.a>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-24 pb-12">
                <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
                    {/* Left Side - Terminal */}
                    <motion.div
                        className="bg-slate-950/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <Terminal size={20} className="text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider">System_Terminal</h3>
                                <p className="text-[9px] text-emerald-500/60 font-mono tracking-widest">LIVE_FEED</p>
                            </div>
                        </div>

                        {/* Terminal Output */}
                        <div className="bg-black/40 rounded-2xl p-6 font-mono text-xs h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent">
                            <AnimatePresence>
                                {terminalLines.map((line, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`mb-2 ${line.type === "error" ? "text-red-400" :
                                                line.type === "success" ? "text-emerald-400" :
                                                line.type === "system" ? "text-blue-400" :
                                                        "text-slate-400"
                                            }`}
                                    >
                                        <span className="text-slate-600 mr-2">
                                            [{new Date().toLocaleTimeString()}]
                                        </span>
                                        {line.text}
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            <motion.span
                                className="inline-block w-2 h-4 bg-emerald-500 ml-1"
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                        </div>

                        {/* Status Indicators */}
                        <div className="mt-6 grid grid-cols-3 gap-3">
                            {[
                                { label: "Server", status: "Online", color: "emerald" },
                                { label: "Database", status: "Active", color: "blue" },
                                { label: "Network", status: "Secure", color: "purple" },
                            ].map((item, i) => (
                                <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`flex h-2 w-2 rounded-full bg-${item.color}-500 animate-pulse`} />
                                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">{item.label}</span>
                                    </div>
                                    <p className="text-xs font-bold text-white">{item.status}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Login Form */}
                    <motion.div
                        className="flex flex-col justify-center"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="mb-8">
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-emerald-400 text-[10px] font-black mb-6 tracking-[0.2em] uppercase"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <Sparkles size={12} className="animate-pulse" />
                                <span>Secure Access Point</span>
                            </motion.div>

                            <motion.h1
                                className="text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-[0.9]"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                User <span className="text-emerald-500 italic">Access</span>
                            </motion.h1>

                            <motion.p className="text-slate-400 text-sm font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                Enter your credentials to access the EcoMind ecosystem
                            </motion.p>
                        </div>

                        <motion.div className="bg-slate-950/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                        <Mail size={12} /> Email_User
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="bee@ecomind.ai"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all font-mono text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                        <Lock size={12} /> Security_Key
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all font-mono text-sm pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-400"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${loading ? "bg-slate-700" : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20 shadow-lg"}`}
                                >
                                    {loading ? <Activity size={18} className="animate-spin" /> : "Access Ecosystem"}
                                    {!loading && <ArrowRight size={18} />}
                                </motion.button>
                            </form>

                            <AnimatePresence>
                                {message && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-6 p-4 rounded-xl border font-mono text-xs flex items-center gap-2 ${message.includes("✓") ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-red-500/10 border-red-500/50 text-red-400"}`}>
                                        {message.includes("✓") ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                        {message}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                                <div className="relative flex justify-center text-xs"><span className="px-4 bg-slate-950/50 text-slate-500 font-mono">New to EcoMind?</span></div>
                            </div>

                            <Link href="/signup" className="block w-full px-6 py-4 rounded-xl border-2 border-white/10 hover:border-emerald-500/50 font-black text-sm uppercase tracking-widest text-center transition-all group">
                                <span className="text-slate-400 group-hover:text-emerald-400 transition-colors">Deploy New User →</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <div className="fixed bottom-4 left-4 px-4 py-2 bg-slate-950/80 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-mono text-slate-500 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Authentication_Gateway
            </div>
        </div>
    );
}