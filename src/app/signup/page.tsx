"use client";

import { useState, FormEvent, ChangeEvent, FocusEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Leaf, Mail, Lock, User, Phone, FileText, Shield, 
  ArrowRight, Sparkles, Activity, Check, AlertCircle, 
  Eye, EyeOff, CheckCircle2
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

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  bio?: string;
}

interface FormTouched {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  phone?: boolean;
  bio?: boolean;
}

interface PasswordStrength {
  strength: number;
  label: string;
  color: string;
}

export default function SignupPage() {
  const router = useRouter();

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Password strength calculation
  const getPasswordStrength = (password: string): PasswordStrength => {
    if (!password) return { strength: 0, label: "", color: "#64748b" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const configs: PasswordStrength[] = [
      { strength: 0, label: "", color: "#64748b" },
      { strength: 1, label: "WEAK", color: "#ef4444" },
      { strength: 2, label: "FAIR", color: "#f59e0b" },
      { strength: 3, label: "GOOD", color: "#10b981" },
      { strength: 4, label: "STRONG", color: "#10b981" },
    ];

    return configs[strength];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Validation
  const validate = (field: keyof FormData, value: string): boolean => {
    const newErrors = { ...errors };

    if (field === "name") {
      if (!value.trim()) newErrors.name = "Name is required";
      else if (value.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
      else delete newErrors.name;
    }

    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) newErrors.email = "Email is required";
      else if (!emailRegex.test(value)) newErrors.email = "Invalid email format";
      else delete newErrors.email;
    }

    if (field === "password") {
      if (!value) newErrors.password = "Password is required";
      else if (value.length < 8) newErrors.password = "Password must be at least 8 characters";
      else delete newErrors.password;
    }

    if (field === "phone") {
      if (value && !/^[+\d\s()-]{7,15}$/.test(value)) newErrors.phone = "Invalid phone format";
      else delete newErrors.phone;
    }

    if (field === "bio") {
      if (value && value.length > 500) newErrors.bio = "Bio must be less than 500 characters";
      else delete newErrors.bio;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name as keyof FormTouched]) validate(name as keyof FormData, value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validate(name as keyof FormData, value);
  };

  const validateAllFields = (): boolean => {
    const fields: (keyof FormData)[] = ["name", "email", "password"];
    let isValid = true;

    fields.forEach((field) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      if (!validate(field, formData[field])) isValid = false;
    });

    return isValid;
  };

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!validateAllFields()) return;

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
      setMessage("✓ Account created successfully!");
      
      // Redirect to home page immediately after signup
      setTimeout(() => router.push("/"), 1500); // 1.5s delay to show message
    }
  } catch (err) {
    setMessage("System error. Please try again.");
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen bg-[#fcfdfc] text-slate-900 overflow-x-hidden selection:bg-emerald-200">
      {/* Top Navbar - Same as Homepage */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 max-w-7xl mx-auto mt-4 rounded-full border border-white/20 backdrop-blur-md bg-black/10 shadow-lg">
        <motion.div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.05 }}
        >
          <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
            <Leaf size={18} />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase italic text-white">
            EcoMind<span className="text-emerald-400">AI</span>
          </span>
        </motion.div>
        
        <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
          <a href="/#how" className="hover:text-emerald-400 transition-colors">Lab_Method</a>
          <a href="/#features" className="hover:text-emerald-400 transition-colors">Ecosystem</a>
          <a href="/#stats" className="hover:text-emerald-400 transition-colors">Impact_Index</a>
        </div>

        <Button 
          onClick={() => router.push("/login")}
          className="rounded-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black px-6 h-9 text-xs shadow-lg transition-all"
        >
          Login
        </Button>
      </nav>

      {/* Hero Section with Form */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-emerald-100/50 text-emerald-600 text-[10px] font-black tracking-[0.2em] uppercase shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Sparkles size={14} className="animate-pulse" />
              <span>Join the Ecosystem</span>
            </motion.div>

            <div>
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.85]">
                Start Your <br />
                <span className="text-emerald-600 italic font-serif font-light">Journey</span>
              </h1>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-lg">
                Join thousands of eco-conscious communities already transforming their environmental impact through AI-powered insights.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <CheckCircle2 size={20} />, text: "AI-driven sustainability planning" },
                  { icon: <CheckCircle2 size={20} />, text: "Real-time environmental monitoring" },
                  { icon: <CheckCircle2 size={20} />, text: "Community impact tracking" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <div className="text-emerald-600">{item.icon}</div>
                    <span className="text-slate-700 font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-slate-200">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white"
                    src={`https://i.pravatar.cc/100?img=${i + 20}`}
                    alt={`user ${i}`}
                  />
                ))}
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 uppercase tracking-widest">400+ Active Nodes</p>
                <p className="text-[10px] text-slate-500 font-medium">Already making impact</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border border-emerald-100/50 bg-white/80 backdrop-blur-md shadow-2xl shadow-emerald-900/10 overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="text-3xl font-black tracking-tight mb-2">Create Account</h2>
                  <p className="text-slate-500 text-sm font-medium">Get started with EcoMind AI</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <User size={14} className="text-emerald-600" />
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 bg-white border-2 ${
                          errors.name && touched.name 
                            ? "border-red-400 focus:border-red-500" 
                            : "border-slate-200 focus:border-emerald-500"
                        } rounded-xl outline-none transition-all text-sm font-medium placeholder:text-slate-400`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.name && touched.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs text-red-500 font-medium flex items-center gap-1"
                        >
                          <AlertCircle size={12} /> {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <Mail size={14} className="text-emerald-600" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-white border-2 ${
                        errors.email && touched.email 
                          ? "border-red-400 focus:border-red-500" 
                          : "border-slate-200 focus:border-emerald-500"
                      } rounded-xl outline-none transition-all text-sm font-medium placeholder:text-slate-400`}
                    />
                    <AnimatePresence>
                      {errors.email && touched.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs text-red-500 font-medium flex items-center gap-1"
                        >
                          <AlertCircle size={12} /> {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <Lock size={14} className="text-emerald-600" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 bg-white border-2 ${
                          errors.password && touched.password 
                            ? "border-red-400 focus:border-red-500" 
                            : "border-slate-200 focus:border-emerald-500"
                        } rounded-xl outline-none transition-all text-sm font-medium placeholder:text-slate-400 pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {errors.password && touched.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs text-red-500 font-medium flex items-center gap-1"
                        >
                          <AlertCircle size={12} /> {errors.password}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Password Strength */}
                    <AnimatePresence>
                      {formData.password && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <div className="flex gap-1">
                            {[1, 2, 3, 4].map((level) => (
                              <div
                                key={level}
                                className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden"
                              >
                                <motion.div
                                  className="h-full"
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: level <= passwordStrength.strength ? "100%" : "0%",
                                    backgroundColor: level <= passwordStrength.strength
                                      ? passwordStrength.color
                                      : "#e2e8f0",
                                  }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                            ))}
                          </div>
                          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: passwordStrength.color }}>
                            {passwordStrength.label}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Phone Field (Optional) */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <Phone size={14} className="text-emerald-600" />
                      Phone Number <span className="text-slate-400 text-[10px] normal-case">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 focus:border-emerald-500 rounded-xl outline-none transition-all text-sm font-medium placeholder:text-slate-400"
                    />
                  </div>

                  {/* Bio Field (Optional) */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <FileText size={14} className="text-emerald-600" />
                      Bio <span className="text-slate-400 text-[10px] normal-case">(Optional)</span>
                    </label>
                    <textarea
                      name="bio"
                      placeholder="Tell us about yourself..."
                      value={formData.bio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={3}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 focus:border-emerald-500 rounded-xl outline-none transition-all text-sm font-medium placeholder:text-slate-400 resize-none"
                    />
                    <p className="text-[10px] text-slate-500 text-right font-medium">
                      {formData.bio.length}/500
                    </p>
                  </div>

                  {/* Role Selection */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <Shield size={14} className="text-emerald-600" />
                      Account Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "user" as const, label: "User", icon: "👤", desc: "Standard access" },
                        { value: "admin" as const, label: "Admin", icon: "⚡", desc: "Full access" },
                      ].map((role) => (
                        <label
                          key={role.value}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.role === role.value
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-slate-200 bg-white hover:border-emerald-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role.value}
                            checked={formData.role === role.value}
                            onChange={handleChange}
                            className="hidden"
                          />
                          <div className="text-center">
                            <div className="text-3xl mb-2">{role.icon}</div>
                            <p className="text-sm font-black uppercase tracking-wide text-slate-900">{role.label}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{role.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full h-14 rounded-xl text-base font-black uppercase tracking-wider shadow-lg transition-all ${
                      loading
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-200"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-3">
                        <Activity size={20} className="animate-spin" />
                        Creating Account...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        <Check size={20} />
                        Create Account
                      </span>
                    )}
                  </Button>
                </form>

                {/* Message */}
                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-6 p-4 rounded-xl border-2 text-sm font-medium flex items-center gap-2 ${
                        message.includes("✓")
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-red-50 border-red-200 text-red-700"
                      }`}
                    >
                      {message.includes("✓") ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <AlertCircle size={18} />
                      )}
                      {message}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Login Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-600 font-medium">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="text-emerald-600 hover:text-emerald-500 font-black uppercase tracking-wider transition-colors"
                    >
                      Login →
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer Badge */}
      <div className="fixed bottom-6 left-6 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-emerald-100 shadow-lg text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
        <span className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          System Online
        </span>
      </div>
    </div>
  );
}