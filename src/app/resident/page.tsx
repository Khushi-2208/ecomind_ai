'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, Users, Zap, Droplets, Car, MapPin, 
  TrendingDown, TrendingUp, Sparkles, ChevronDown,
  Calendar, DollarSign, Target, Award, CheckCircle2,
  ArrowRight, RotateCcw, Battery, Fuel, Bus, Bike
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

type AreaType = 'urban' | 'suburban' | 'rural';
type TransportMode = 'personal car' | 'two-wheeler' | 'public transit' | 'bicycle' | 'walking';
type VehicleType = 'petrol' | 'diesel' | 'cng' | 'electric' | 'none';
type Priority = 'high' | 'medium' | 'low';

interface FormData {
  members: number;
  children: number;
  adults: number;
  seniors: number;
  electricity: number;
  hasSolar: boolean;
  water: number;
  hasRainwater: boolean;
  city: string;
  area: AreaType;
  transport: TransportMode;
  commute: number;
  vehicleType: VehicleType;
}

interface Recommendation {
  action: string;
  priority: Priority;
  category: string;
  reason: string;
  cost: string;
  savings: string;
  impact: string;
  payback: string;
  howTo: string;
  timeframe: string;
  difficulty: string;
}

interface ApiResponse {
  success: boolean;
  plan: {
    analysis: {
      electricityAssessment: string;
      waterAssessment: string;
      transportAssessment: string;
      overallScore: string;
    };
    currentImpact: {
      carbonFootprint: string;
      waterFootprint: string;
      wasteGeneration: string;
      monthlyCost: string;
    };
    potentialSavings: {
      co2Reduction: string;
      costSavings: string;
      waterSavings: string;
    };
    quickWins: string[];
    recommendations: Recommendation[];
    longTermPlan: {
      month1: string;
      month3: string;
      month6: string;
      year1: string;
    };
  };
}

export default function Resident() {
  const [formData, setFormData] = useState<FormData>({
    members: 4,
    children: 1,
    adults: 2,
    seniors: 1,
    electricity: 450,
    hasSolar: false,
    water: 15000,
    hasRainwater: false,
    city: 'Mumbai',
    area: 'urban',
    transport: 'personal car',
    commute: 25,
    vehicleType: 'petrol'
  });

  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedRec, setExpandedRec] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        members: formData.members,
        ageGroups: {
          children: formData.children,
          adults: formData.adults,
          seniors: formData.seniors
        },
        electricity: {
          monthlyUsage: formData.electricity,
          hasSolar: formData.hasSolar,
        },
        water: {
          monthlyUsage: formData.water,
          hasRainwaterHarvesting: formData.hasRainwater,
        },
        transport: {
          primaryMode: formData.transport,
          dailyCommuteKm: formData.commute,
          vehicleType: formData.vehicleType,
        },
        location: {
          city: formData.city,
          area: formData.area
        }
      };

      const response = await fetch('/api/query-sustainability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        alert('Error: ' + (data as any).error);
      }
    } catch (error: any) {
      console.error('Error:', error);
      alert('Something went wrong: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const getPriorityVariant = (priority: Priority): "default" | "destructive" | "secondary" => {
    switch(priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 md:p-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          variants={itemVariants}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-green-100 rounded-full">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-800">AI-Powered Sustainability</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Eco<span className="text-green-600">Mind</span>AI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized sustainability recommendations powered by advanced AI analysis
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            /* Form View */
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-2xl border-2 border-green-100">
                <CardHeader className=" text-green-600">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    Household Sustainability Assessment
                  </CardTitle>
                  <CardDescription className="text-green-50">
                    Tell us about your household to receive customized recommendations
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Family Section */}
                    <motion.div variants={itemVariants}>
                      <div className="flex items-center gap-2 mb-6">
                        <Users className="w-6 h-6 text-green-600" />
                        <h3 className="text-xl font-semibold text-gray-900">Family Information</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="members" className="text-sm font-medium">Total Members</Label>
                          <Input
                            id="members"
                            type="number"
                            value={formData.members}
                            onChange={(e) => setFormData({ ...formData, members: parseInt(e.target.value) })}
                            className="text-lg"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="children" className="text-sm font-medium">Children</Label>
                          <Input
                            id="children"
                            type="number"
                            value={formData.children}
                            onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })}
                            className="text-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="adults" className="text-sm font-medium">Adults</Label>
                          <Input
                            id="adults"
                            type="number"
                            value={formData.adults}
                            onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) })}
                            className="text-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="seniors" className="text-sm font-medium">Seniors (60+)</Label>
                          <Input
                            id="seniors"
                            type="number"
                            value={formData.seniors}
                            onChange={(e) => setFormData({ ...formData, seniors: parseInt(e.target.value) })}
                            className="text-lg"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-sm font-medium flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            City
                          </Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="Mumbai"
                            className="text-lg"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="area" className="text-sm font-medium">Area Type</Label>
                          <Select value={formData.area} onValueChange={(value: AreaType) => setFormData({ ...formData, area: value })}>
                            <SelectTrigger className="text-lg">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="urban">Urban</SelectItem>
                              <SelectItem value="suburban">Suburban</SelectItem>
                              <SelectItem value="rural">Rural</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </motion.div>

                    <Separator />

                    {/* Electricity Section */}
                    <motion.div variants={itemVariants}>
                      <div className="flex items-center gap-2 mb-6">
                        <Zap className="w-6 h-6 text-amber-600" />
                        <h3 className="text-xl font-semibold text-gray-900">Electricity Usage</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="electricity" className="text-sm font-medium">Monthly Usage (kWh)</Label>
                          <Input
                            id="electricity"
                            type="number"
                            value={formData.electricity}
                            onChange={(e) => setFormData({ ...formData, electricity: parseInt(e.target.value) })}
                            placeholder="450"
                            className="text-lg"
                            required
                          />
                          <p className="text-xs text-gray-500">Check your electricity bill</p>
                        </div>
                        <div className="flex items-center space-x-3 pt-6">
                          <Checkbox
                            id="solar"
                            checked={formData.hasSolar}
                            onCheckedChange={(checked) => setFormData({ ...formData, hasSolar: checked === true })}
                          />
                          <Label htmlFor="solar" className="text-sm font-medium cursor-pointer flex items-center gap-2">
                            <Battery className="w-4 h-4 text-yellow-600" />
                            Have Solar Panels?
                          </Label>
                        </div>
                      </div>
                    </motion.div>

                    <Separator />

                    {/* Water Section */}
                    <motion.div variants={itemVariants}>
                      <div className="flex items-center gap-2 mb-6">
                        <Droplets className="w-6 h-6 text-blue-600" />
                        <h3 className="text-xl font-semibold text-gray-900">Water Consumption</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="water" className="text-sm font-medium">Monthly Usage (Liters)</Label>
                          <Input
                            id="water"
                            type="number"
                            value={formData.water}
                            onChange={(e) => setFormData({ ...formData, water: parseInt(e.target.value) })}
                            placeholder="15000"
                            className="text-lg"
                            required
                          />
                          <p className="text-xs text-gray-500">Typical: 10,000-20,000 for 4 people</p>
                        </div>
                        <div className="flex items-center space-x-3 pt-6">
                          <Checkbox
                            id="rainwater"
                            checked={formData.hasRainwater}
                            onCheckedChange={(checked) => setFormData({ ...formData, hasRainwater: checked === true })}
                          />
                          <Label htmlFor="rainwater" className="text-sm font-medium cursor-pointer flex items-center gap-2">
                            <Droplets className="w-4 h-4 text-blue-600" />
                            Rainwater Harvesting?
                          </Label>
                        </div>
                      </div>
                    </motion.div>

                    <Separator />

                    {/* Transport Section */}
                    <motion.div variants={itemVariants}>
                      <div className="flex items-center gap-2 mb-6">
                        <Car className="w-6 h-6 text-purple-600" />
                        <h3 className="text-xl font-semibold text-gray-900">Transportation</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="transport" className="text-sm font-medium">Primary Mode</Label>
                          <Select value={formData.transport} onValueChange={(value: TransportMode) => setFormData({ ...formData, transport: value })}>
                            <SelectTrigger className="text-lg">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="personal car">
                                <div className="flex items-center gap-2">
                                  <Car className="w-4 h-4" />
                                  Personal Car
                                </div>
                              </SelectItem>
                              <SelectItem value="two-wheeler">
                                <div className="flex items-center gap-2">
                                  <Bike className="w-4 h-4" />
                                  Two-Wheeler
                                </div>
                              </SelectItem>
                              <SelectItem value="public transit">
                                <div className="flex items-center gap-2">
                                  <Bus className="w-4 h-4" />
                                  Public Transit
                                </div>
                              </SelectItem>
                              <SelectItem value="bicycle">Bicycle</SelectItem>
                              <SelectItem value="walking">Walking</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="commute" className="text-sm font-medium">Daily Commute (km)</Label>
                          <Input
                            id="commute"
                            type="number"
                            value={formData.commute}
                            onChange={(e) => setFormData({ ...formData, commute: parseInt(e.target.value) })}
                            placeholder="25"
                            className="text-lg"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vehicleType" className="text-sm font-medium">Vehicle Type</Label>
                          <Select value={formData.vehicleType} onValueChange={(value: VehicleType) => setFormData({ ...formData, vehicleType: value })}>
                            <SelectTrigger className="text-lg">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="petrol">
                                <div className="flex items-center gap-2">
                                  <Fuel className="w-4 h-4" />
                                  Petrol
                                </div>
                              </SelectItem>
                              <SelectItem value="diesel">Diesel</SelectItem>
                              <SelectItem value="cng">CNG</SelectItem>
                              <SelectItem value="electric">Electric</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="mr-2"
                            >
                              <Sparkles className="w-5 h-5" />
                            </motion.div>
                            Analyzing with AI...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Generate AI Recommendations
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            /* Results View */
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {result.success && result.plan && (
                <>
                  {/* AI Analysis */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-900">
                          <Target className="w-6 h-6" />
                          AI Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid md:grid-cols-2 gap-4">
                        <Alert>
                          <Zap className="w-4 h-4" />
                          <AlertDescription>
                            <strong className="block mb-1">Electricity</strong>
                            {result.plan.analysis.electricityAssessment}
                          </AlertDescription>
                        </Alert>
                        <Alert>
                          <Droplets className="w-4 h-4" />
                          <AlertDescription>
                            <strong className="block mb-1">Water</strong>
                            {result.plan.analysis.waterAssessment}
                          </AlertDescription>
                        </Alert>
                        <Alert>
                          <Car className="w-4 h-4" />
                          <AlertDescription>
                            <strong className="block mb-1">Transport</strong>
                            {result.plan.analysis.transportAssessment}
                          </AlertDescription>
                        </Alert>
                        <Alert className="bg-green-50 border-green-200">
                          <Award className="w-4 h-4 text-green-600" />
                          <AlertDescription>
                            <strong className="block mb-1">Overall Score</strong>
                            <span className="text-2xl font-bold text-green-600">
                              {result.plan.analysis.overallScore}
                            </span>
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Current Impact & Potential Savings */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Card className="border-2 border-red-200 h-full">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-red-700">
                            <TrendingUp className="w-5 h-5" />
                            Current Impact
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Carbon Footprint</p>
                            <p className="text-xl font-bold">{result.plan.currentImpact.carbonFootprint}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Water per Person</p>
                            <p className="text-xl font-bold">{result.plan.currentImpact.waterFootprint}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Waste Generated</p>
                            <p className="text-xl font-bold">{result.plan.currentImpact.wasteGeneration}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Monthly Cost</p>
                            <p className="text-xl font-bold text-red-600">{result.plan.currentImpact.monthlyCost}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 h-full">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-green-700">
                            <TrendingDown className="w-5 h-5" />
                            Potential Savings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-4 rounded-lg border border-green-200"
                          >
                            <p className="text-sm text-gray-600 mb-1">CO₂ Reduction</p>
                            <p className="text-3xl font-bold text-green-600">{result.plan.potentialSavings.co2Reduction}</p>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-4 rounded-lg border border-green-200"
                          >
                            <p className="text-sm text-gray-600 mb-1">Cost Savings</p>
                            <p className="text-3xl font-bold text-green-600">{result.plan.potentialSavings.costSavings}</p>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-4 rounded-lg border border-green-200"
                          >
                            <p className="text-sm text-gray-600 mb-1">Water Savings</p>
                            <p className="text-3xl font-bold text-green-600">{result.plan.potentialSavings.waterSavings}</p>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Quick Wins */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-700">
                          <Sparkles className="w-5 h-5" />
                          Quick Wins - Start Today!
                        </CardTitle>
                        <CardDescription>Easy actions with immediate impact</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          {result.plan.quickWins.map((win, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              whileHover={{ scale: 1.03, y: -2 }}
                              className="bg-white p-4 rounded-lg border-2 border-blue-100 hover:border-blue-300 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-semibold text-blue-900 mb-1">Action {i + 1}</p>
                                  <p className="text-sm text-gray-700">{win}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Detailed Recommendations */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Leaf className="w-6 h-6 text-green-600" />
                          Detailed Recommendations
                          <Badge variant="secondary" className="ml-2">
                            {result.plan.recommendations.length} Actions
                          </Badge>
                        </CardTitle>
                        <CardDescription>Click each recommendation for detailed implementation guide</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {result.plan.recommendations.map((rec, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + i * 0.05 }}
                          >
                            <Card 
                              className={`cursor-pointer transition-all hover:shadow-lg ${
                                expandedRec === i ? 'ring-2 ring-green-500' : ''
                              }`}
                              onClick={() => setExpandedRec(expandedRec === i ? null : i)}
                            >
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <CardTitle className="text-lg">{rec.action}</CardTitle>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge 
                                      variant={getPriorityVariant(rec.priority)}
                                    >
                                      {rec.priority.toUpperCase()}
                                    </Badge>
                                    <Badge variant="outline">{rec.category}</Badge>
                                    <motion.div
                                      animate={{ rotate: expandedRec === i ? 180 : 0 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <ChevronDown className="w-5 h-5 text-gray-400" />
                                    </motion.div>
                                  </div>
                                </div>
                              </CardHeader>

                              <AnimatePresence>
                                {expandedRec === i && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <CardContent className="pt-0 space-y-4">
                                      <Separator />
                                      
                                      <Alert>
                                        <AlertDescription>
                                          <strong className="block mb-2">Why this matters for your household:</strong>
                                          {rec.reason}
                                        </AlertDescription>
                                      </Alert>

                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div className="bg-amber-50 p-3 rounded-lg text-center border border-amber-200">
                                          <DollarSign className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                                          <p className="text-xs text-amber-800 mb-1">Cost</p>
                                          <p className="font-bold text-amber-900">{rec.cost}</p>
                                        </div>
                                        <div className="bg-green-50 p-3 rounded-lg text-center border border-green-200">
                                          <TrendingDown className="w-4 h-4 mx-auto mb-1 text-green-600" />
                                          <p className="text-xs text-green-800 mb-1">Savings</p>
                                          <p className="font-bold text-green-900">{rec.savings}</p>
                                        </div>
                                        <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-200">
                                          <Target className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                                          <p className="text-xs text-blue-800 mb-1">Impact</p>
                                          <p className="font-bold text-blue-900">{rec.impact}</p>
                                        </div>
                                        <div className="bg-purple-50 p-3 rounded-lg text-center border border-purple-200">
                                          <Calendar className="w-4 h-4 mx-auto mb-1 text-purple-600" />
                                          <p className="text-xs text-purple-800 mb-1">Payback</p>
                                          <p className="font-bold text-purple-900">{rec.payback}</p>
                                        </div>
                                      </div>

                                      <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                                          How to Implement
                                        </h4>
                                        <p className="text-sm text-gray-700">{rec.howTo}</p>
                                      </div>

                                      <div className="flex flex-wrap gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                          <Calendar className="w-4 h-4 text-gray-500" />
                                          <span className="font-medium">Timeline:</span>
                                          <span className="text-gray-600">{rec.timeframe}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Target className="w-4 h-4 text-gray-500" />
                                          <span className="font-medium">Difficulty:</span>
                                          <span className="text-gray-600">{rec.difficulty}</span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </Card>
                          </motion.div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Long-Term Roadmap */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-700">
                          <Calendar className="w-6 h-6" />
                          Long-Term Roadmap
                        </CardTitle>
                        <CardDescription>Your journey to sustainable living</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            { label: 'Month 1', content: result.plan.longTermPlan.month1 },
                            { label: 'Month 3', content: result.plan.longTermPlan.month3 },
                            { label: 'Month 6', content: result.plan.longTermPlan.month6 },
                            { label: 'Year 1', content: result.plan.longTermPlan.year1 }
                          ].map((milestone, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.8 + i * 0.1 }}
                              whileHover={{ scale: 1.03 }}
                              className="bg-white p-4 rounded-lg border-2 border-purple-100 hover:border-purple-300 transition-colors"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-purple-600" />
                                <h4 className="font-bold text-purple-900">{milestone.label}</h4>
                              </div>
                              <p className="text-sm text-gray-700">{milestone.content}</p>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Reset Button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => setResult(null)}
                      variant="outline"
                      size="lg"
                      className="w-full h-14 text-lg font-semibold border-2"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Create New Analysis
                    </Button>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}