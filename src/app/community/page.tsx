'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, MapPin, AlertTriangle, Target, Users, Download, Share2,
  TrendingUp, Droplets, Leaf, Factory, Trash2, Zap, Wind, TreePine,
  DollarSign, Calendar, CheckCircle2, ArrowRight, RotateCcw, Sparkles,
  Shield, Award, Lightbulb, TrendingDown, FileText, Heart, Clock,
  Briefcase, GraduationCap, Handshake, BarChart3, PieChart, Settings
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type CommunitySize = 'small' | 'medium' | 'large' | 'metropolitan';
type InfrastructureQuality = 'poor' | 'fair' | 'good' | 'excellent';

interface CommunityData {
  communityName: string;
  location: string;
  population: number;
  size: CommunitySize;
  waterInfrastructure: InfrastructureQuality;
  wasteManagement: InfrastructureQuality;
  energyInfrastructure: InfrastructureQuality;
  publicTransport: InfrastructureQuality;
  greenSpaces: number;
  airQualityIndex: number;
  waterPollution: string;
  wasteGeneration: number;
  recyclingRate: number;
  deforestationRate: number;
  carbonEmissions: number;
  annualBudget: number;
  volunteers: number;
  technicalStaff: number;
  existingInitiatives: string;
  topPriorities: string;
  urgentChallenges: string;
  communityFeedback: string;
}

// Subtle background component
const SubtleBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
    <motion.div
      className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
      animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

export default function CommunityLeadersPage() {
  const [formData, setFormData] = useState<CommunityData>({
    communityName: '',
    location: '',
    population: 50000,
    size: 'medium',
    waterInfrastructure: 'fair',
    wasteManagement: 'fair',
    energyInfrastructure: 'good',
    publicTransport: 'fair',
    greenSpaces: 15,
    airQualityIndex: 85,
    waterPollution: '',
    wasteGeneration: 50,
    recyclingRate: 25,
    deforestationRate: 3,
    carbonEmissions: 100000,
    annualBudget: 500000,
    volunteers: 50,
    technicalStaff: 10,
    existingInitiatives: '',
    topPriorities: '',
    urgentChallenges: '',
    communityFeedback: '',
  });

  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/query-community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setReport(data);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error: any) {
      console.error('Error:', error);
      alert('Something went wrong: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority?.toLowerCase()) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-[#fff] text-black relative">
      <SubtleBackground />
      
      <div className="max-w-7xl mx-auto p-6 md:p-12 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 text-blue-400">
            <Building2 className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide">COMMUNITY SUSTAINABILITY</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light mb-4 tracking-tight">
            Community<span className="font-semibold text-blue-400">Leaders</span> Portal
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            AI-powered environmental analysis and strategic resource allocation for sustainable community development
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!report ? (
            /* Form View */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="bg-[#fff] border border-gray-800 shadow-2xl">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-2xl font-light">Community Environmental Assessment</CardTitle>
                  <CardDescription className="text-gray-500">
                    Provide comprehensive data about your community for detailed AI analysis
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Basic Information */}
                    <section>
                      <div className="flex items-center gap-2 mb-6">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-medium">Community Profile</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Community Name *</Label>
                          <Input
                            value={formData.communityName}
                            onChange={(e) => setFormData({ ...formData, communityName: e.target.value })}
                            placeholder="e.g., Green Valley Township"
                            className="bg-white border-gray-800 focus:border-blue-500/50 focus:ring-0"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Location *</Label>
                          <Input
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g., Maharashtra, India"
                            className="bg-white border-gray-800 focus:border-blue-500/50 focus:ring-0"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Population *</Label>
                          <Input
                            type="number"
                            value={formData.population}
                            onChange={(e) => setFormData({ ...formData, population: parseInt(e.target.value) })}
                            className="bg-white border-gray-800 focus:border-blue-500/50 focus:ring-0"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Community Size *</Label>
                          <Select value={formData.size} onValueChange={(value: CommunitySize) => setFormData({ ...formData, size: value })}>
                            <SelectTrigger className="bg-white border-gray-800 focus:ring-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#fff] border-gray-800">
                              <SelectItem value="small">Small (&lt;10k residents)</SelectItem>
                              <SelectItem value="medium">Medium (10k-100k)</SelectItem>
                              <SelectItem value="large">Large (100k-1M)</SelectItem>
                              <SelectItem value="metropolitan">Metropolitan (1M+)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </section>

                    <Separator className="bg-gray-800" />

                    {/* Infrastructure Quality */}
                    <section>
                      <div className="flex items-center gap-2 mb-6">
                        <Building2 className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-lg font-medium">Infrastructure Assessment</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {[
                          { key: 'waterInfrastructure', label: 'Water Infrastructure', icon: Droplets },
                          { key: 'wasteManagement', label: 'Waste Management', icon: Trash2 },
                          { key: 'energyInfrastructure', label: 'Energy Infrastructure', icon: Zap },
                          { key: 'publicTransport', label: 'Public Transportation', icon: Building2 },
                        ].map(({ key, label, icon: Icon }) => (
                          <div key={key} className="space-y-2">
                            <Label className="text-sm text-gray-400 flex items-center gap-2">
                              <Icon className="w-4 h-4 text-cyan-400" />
                              {label}
                            </Label>
                            <Select 
                              value={formData[key as keyof CommunityData] as string} 
                              onValueChange={(value: InfrastructureQuality) => setFormData({ ...formData, [key]: value })}
                            >
                              <SelectTrigger className="bg-white border-gray-800 focus:ring-0">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-[#fff] border-gray-800">
                                <SelectItem value="poor">Poor - Needs Major Upgrade</SelectItem>
                                <SelectItem value="fair">Fair - Functional but Limited</SelectItem>
                                <SelectItem value="good">Good - Well Maintained</SelectItem>
                                <SelectItem value="excellent">Excellent - Modern & Efficient</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400 flex items-center gap-2">
                            <TreePine className="w-4 h-4 text-green-400" />
                            Green Spaces Coverage (%)
                          </Label>
                          <Input
                            type="number"
                            value={formData.greenSpaces}
                            onChange={(e) => setFormData({ ...formData, greenSpaces: parseInt(e.target.value) })}
                            className="bg-white border-gray-800 focus:border-cyan-500/50 focus:ring-0"
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
                    </section>

                    <Separator className="bg-gray-800" />

                    {/* Environmental Metrics */}
                    <section>
                      <div className="flex items-center gap-2 mb-6">
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                        <h3 className="text-lg font-medium">Environmental Challenges</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Air Quality Index (0-500)</Label>
                          <Input
                            type="number"
                            value={formData.airQualityIndex}
                            onChange={(e) => setFormData({ ...formData, airQualityIndex: parseInt(e.target.value) })}
                            className="bg-white border-gray-800 focus:border-amber-500/50 focus:ring-0"
                            min="0"
                            max="500"
                          />
                          <p className="text-xs text-gray-600">0-50: Good, 51-100: Moderate, 101+: Unhealthy</p>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Daily Waste Generation (tons)</Label>
                          <Input
                            type="number"
                            value={formData.wasteGeneration}
                            onChange={(e) => setFormData({ ...formData, wasteGeneration: parseInt(e.target.value) })}
                            className="bg-white border-gray-800 focus:border-amber-500/50 focus:ring-0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Recycling Rate (%)</Label>
                          <Input
                            type="number"
                            value={formData.recyclingRate}
                            onChange={(e) => setFormData({ ...formData, recyclingRate: parseInt(e.target.value) })}
                            className="bg-white border-gray-800 focus:border-amber-500/50 focus:ring-0"
                            min="0"
                            max="100"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Deforestation Rate (% per year)</Label>
                          <Input
                            type="number"
                            value={formData.deforestationRate}
                            onChange={(e) => setFormData({ ...formData, deforestationRate: parseInt(e.target.value) })}
                            className="bg-white border-gray-800 focus:border-amber-500/50 focus:ring-0"
                            min="0"
                            max="100"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Annual Carbon Emissions (tons CO₂)</Label>
                          <Input
                            type="number"
                            value={formData.carbonEmissions}
                            onChange={(e) => setFormData({ ...formData, carbonEmissions: parseInt(e.target.value) })}
                            className="bg-white border-gray-800 focus:border-amber-500/50 focus:ring-0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Water Pollution Sources</Label>
                          <Input
                            value={formData.waterPollution}
                            onChange={(e) => setFormData({ ...formData, waterPollution: e.target.value })}
                            placeholder="e.g., Industrial discharge, agricultural runoff"
                            className="bg-white border-gray-800 focus:border-amber-500/50 focus:ring-0"
                          />
                        </div>
                      </div>
                    </section>

                    <Separator className="bg-gray-800" />

                    {/* Resources */}
                    <section>
                      <div className="flex items-center gap-2 mb-6">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <h3 className="text-lg font-medium">Available Resources</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Annual Budget ($) *</Label>
                          <Input
                            type="number"
                            value={formData.annualBudget}
                            onChange={(e) => setFormData({ ...formData, annualBudget: parseInt(e.target.value) })}
                            className="bg-white border-gray-800 focus:border-green-500/50 focus:ring-0"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Available Volunteers</Label>
                          <Input
                            type="number"
                            value={formData.volunteers}
                            onChange={(e) => setFormData({ ...formData, volunteers: parseInt(e.target.value) })}
                            className="bg-white border-gray-800 focus:border-green-500/50 focus:ring-0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Technical Staff</Label>
                          <Input
                            type="number"
                            value={formData.technicalStaff}
                            onChange={(e) => setFormData({ ...formData, technicalStaff: parseInt(e.target.value) })}
                            className="bg-white border-gray-800 focus:border-green-500/50 focus:ring-0"
                          />
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <Label className="text-sm text-gray-400">Existing Environmental Initiatives</Label>
                        <Textarea
                          value={formData.existingInitiatives}
                          onChange={(e) => setFormData({ ...formData, existingInitiatives: e.target.value })}
                          placeholder="Describe any ongoing environmental programs, projects, or initiatives..."
                          className="bg-white border-gray-800 focus:border-green-500/50 focus:ring-0 min-h-[100px]"
                        />
                      </div>
                    </section>

                    <Separator className="bg-gray-800" />

                    {/* Community Input */}
                    <section>
                      <div className="flex items-center gap-2 mb-6">
                        <Target className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-medium">Community Priorities & Feedback</h3>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Top Environmental Priorities *</Label>
                          <Textarea
                            value={formData.topPriorities}
                            onChange={(e) => setFormData({ ...formData, topPriorities: e.target.value })}
                            placeholder="What are your community's main environmental goals and priorities? (e.g., improving air quality, increasing green spaces, reducing waste)"
                            className="bg-white border-gray-800 focus:border-purple-500/50 focus:ring-0 min-h-[100px]"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Urgent Environmental Challenges *</Label>
                          <Textarea
                            value={formData.urgentChallenges}
                            onChange={(e) => setFormData({ ...formData, urgentChallenges: e.target.value })}
                            placeholder="What environmental issues need immediate attention? (e.g., water contamination, waste management crisis, pollution hotspots)"
                            className="bg-white border-gray-800 focus:border-purple-500/50 focus:ring-0 min-h-[100px]"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-400">Community Feedback (Optional)</Label>
                          <Textarea
                            value={formData.communityFeedback}
                            onChange={(e) => setFormData({ ...formData, communityFeedback: e.target.value })}
                            placeholder="What are residents saying about environmental issues? Any specific concerns or suggestions from the community?"
                            className="bg-white border-gray-800 focus:border-purple-500/50 focus:ring-0 min-h-[80px]"
                          />
                        </div>
                      </div>
                    </section>

                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium text-lg"
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-3"
                          >
                            <Sparkles className="w-6 h-6" />
                          </motion.div>
                          Generating Comprehensive AI Report...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-6 h-6 mr-3" />
                          Generate Sustainability Report
                          <ArrowRight className="w-6 h-6 ml-3" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            /* Report View */
            <motion.div
              key="report"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {report.success && report.report && (
                <>
                  {/* Report Header */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-3xl font-light mb-2">
                        Sustainability Report
                      </h2>
                      <p className="text-gray-900">
                        {formData.communityName}, {formData.location} • Generated {new Date(report.generatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" className="border-gray-800 hover:border-blue-500/50">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                      <Button variant="outline" className="border-gray-800 hover:border-blue-500/50">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Executive Summary */}
                  {report.report.executiveSummary && (
                    <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                      <CardHeader>
                        <CardTitle className="text-2xl font-light flex items-center gap-3">
                          <Award className="w-6 h-6 text-blue-400" />
                          Executive Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="p-4 bg-white text-black rounded-lg border border-blue-500/20">
                            <p className="text-sm text-gray-400 mb-2">Sustainability Score</p>
                            <p className="text-4xl font-light text-blue-400">{report.report.executiveSummary.sustainabilityScore}</p>
                          </div>
                          <div className="p-4 bg-white text-black rounded-lg border border-blue-500/20">
                            <p className="text-sm text-gray-400 mb-2">Urgency Level</p>
                            <Badge variant={getPriorityColor(report.report.executiveSummary.urgencyLevel)} className="text-lg px-3 py-1">
                              {report.report.executiveSummary.urgencyLevel}
                            </Badge>
                          </div>
                          <div className="p-4 bg-white text-black rounded-lg border border-blue-500/20">
                            <p className="text-sm text-gray-400 mb-2">Population</p>
                            <p className="text-2xl font-light text-white">{formData.population.toLocaleString()}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Overall Assessment</h4>
                          <p className="text-gray-300 leading-relaxed">{report.report.executiveSummary.overallStatus}</p>
                        </div>

                        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <p className="text-blue-300 font-medium">
                            💡 Key Insight: {report.report.executiveSummary.keyTakeaway}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Visual Timeline Overview */}
                  <Card className="bg-white text-black border-gray-800 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Clock className="w-6 h-6 text-emerald-400" />
                        Sustainability Journey Timeline
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Your community's path to environmental excellence
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="relative overflow-x-auto pb-4">
                        {/* Horizontal Timeline */}
                        <div className="flex items-start gap-8 min-w-max">
                          {[
                            {
                              phase: 'NOW',
                              title: 'Assessment Complete',
                              description: 'Current sustainability score',
                              value: report.report.executiveSummary?.sustainabilityScore || 'N/A',
                              color: 'red',
                              icon: AlertTriangle
                            },
                            {
                              phase: '0-3 Months',
                              title: 'Quick Wins',
                              description: report.report.quickWins?.length ? `${report.report.quickWins.length} immediate actions` : 'Launch immediate actions',
                              value: report.report.actionPlan?.immediate?.budget || 'N/A',
                              color: 'amber',
                              icon: Zap
                            },
                            {
                              phase: '3-12 Months',
                              title: 'Foundation Building',
                              description: 'Infrastructure improvements',
                              value: report.report.actionPlan?.shortTerm?.budget || 'N/A',
                              color: 'blue',
                              icon: Building2
                            },
                            {
                              phase: '1-3 Years',
                              title: 'System Transformation',
                              description: 'Major sustainability upgrades',
                              value: report.report.actionPlan?.mediumTerm?.budget || 'N/A',
                              color: 'purple',
                              icon: TrendingUp
                            },
                            {
                              phase: '3-10 Years',
                              title: 'Sustainable Future',
                              description: 'Carbon neutral community',
                              value: report.report.actionPlan?.longTerm?.budget || 'N/A',
                              color: 'green',
                              icon: Leaf
                            }
                          ].map((stage, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.2, duration: 0.5 }}
                              className="relative flex flex-col items-center min-w-[180px]"
                            >
                              {/* Connecting line */}
                              {i < 4 && (
                                <motion.div 
                                  className={`absolute top-12 left-1/2 w-full h-1 bg-gradient-to-r from-${stage.color}-500 to-${stage.color === 'red' ? 'amber' : stage.color === 'amber' ? 'blue' : stage.color === 'blue' ? 'purple' : stage.color === 'purple' ? 'green' : 'green'}-500`}
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  transition={{ delay: i * 0.2 + 0.3, duration: 0.5 }}
                                  style={{ transformOrigin: 'left' }}
                                />
                              )}
                              
                              {/* Icon circle */}
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                                className={`relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-${stage.color}-500 to-${stage.color}-700 border-4 border-[#0a0a0a] flex items-center justify-center shadow-lg shadow-${stage.color}-500/50 mb-4`}
                              >
                                <stage.icon className="w-10 h-10 text-white" />
                              </motion.div>
                              
                              {/* Content */}
                              <div className="text-center">
                                <Badge className={`mb-2 bg-${stage.color}-500/20 text-${stage.color}-300 border-${stage.color}-500/30`}>
                                  {stage.phase}
                                </Badge>
                                <h4 className="font-semibold text-white mb-1">{stage.title}</h4>
                                <p className="text-xs text-gray-500 mb-2">{stage.description}</p>
                                <p className={`text-sm font-medium text-${stage.color}-400`}>{stage.value}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Progress indicator */}
                      <div className="mt-8 p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-400">Projected Progress</span>
                          <span className="text-sm font-medium text-emerald-400">
                            {report.report.executiveSummary?.sustainabilityScore} → Target: 85+
                          </span>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        >
                          <Progress 
                            value={75} 
                            className="h-3 bg-gray-800"
                          />
                        </motion.div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          Expected improvement over 10-year period
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Main Content Tabs */}
                  <Tabs defaultValue="situation" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-white text-black border border-gray-800">
                      <TabsTrigger value="situation">Situation</TabsTrigger>
                      <TabsTrigger value="priorities">Priorities</TabsTrigger>
                      <TabsTrigger value="resources">Resources</TabsTrigger>
                      <TabsTrigger value="action">Action Plan</TabsTrigger>
                      <TabsTrigger value="funding">Funding</TabsTrigger>
                    </TabsList>

                    {/* Situation Analysis Tab */}
                    <TabsContent value="situation" className="space-y-6 mt-6">
                      {report.report.situationAnalysis && (
                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="bg-[#111111] border-green-500/30">
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                Strengths
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                {report.report.situationAnalysis.strengths?.map((strength: string, i: number) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span className="text-sm text-gray-300">{strength}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="bg-white text-black border-red-500/30">
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                                Critical Issues
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                {report.report.situationAnalysis.criticalIssues?.map((issue: string, i: number) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <span className="text-red-400 mt-1">!</span>
                                    <span className="text-sm text-gray-300">{issue}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="bg-white text-black border-blue-500/30">
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-blue-400" />
                                Opportunities
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                {report.report.situationAnalysis.opportunities?.map((opp: string, i: number) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <span className="text-blue-400 mt-1">→</span>
                                    <span className="text-sm text-gray-300">{opp}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="bg-white text-black border-amber-500/30">
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Shield className="w-5 h-5 text-amber-400" />
                                Risks
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                {report.report.situationAnalysis.risks?.map((risk: string, i: number) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <span className="text-amber-400 mt-1">⚠</span>
                                    <span className="text-sm text-gray-300">{risk}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </TabsContent>

                    {/* Priority Areas Tab */}
                    <TabsContent value="priorities" className="space-y-6 mt-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {report.report.priorityAreas?.map((area: any, i: number) => (
                          <Card key={i} className="bg-white text-black border-gray-800 hover:border-blue-500/50 transition-colors">
                            <CardHeader>
                              <div className="flex items-start justify-between gap-3">
                                <CardTitle className="text-base flex-1">{area.area}</CardTitle>
                                <Badge variant={getPriorityColor(area.priority)}>
                                  {area.priority}
                                </Badge>
                              </div>
                              <CardDescription className="text-sm">{area.currentStatus}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="p-3 bg-white text-black rounded-lg border border-gray-800">
                                <p className="text-xs text-gray-500 mb-1">Target Goal</p>
                                <p className="text-sm text-green-400">{area.targetGoal}</p>
                              </div>

                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div className="p-2 bg-white text-black rounded border border-gray-800">
                                  <p className="text-gray-500">Impact</p>
                                  <p className="text-white font-medium">{area.estimatedImpact}</p>
                                </div>
                                <div className="p-2 bg-white text-black rounded border border-gray-800">
                                  <p className="text-gray-500">Cost</p>
                                  <p className="text-white font-medium">{area.estimatedCost}</p>
                                </div>
                                <div className="p-2 bg-white text-black rounded border border-gray-800">
                                  <p className="text-gray-500">Timeline</p>
                                  <p className="text-white font-medium">{area.timeframe}</p>
                                </div>
                              </div>

                              {area.resourcesNeeded && (
                                <div>
                                  <p className="text-xs text-gray-500 mb-2">Resources Needed</p>
                                  <div className="flex flex-wrap gap-2">
                                    {area.resourcesNeeded.map((resource: string, idx: number) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {resource}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {area.successMetrics && (
                                <div>
                                  <p className="text-xs text-gray-500 mb-2">Success Metrics</p>
                                  <ul className="space-y-1">
                                    {area.successMetrics.map((metric: string, idx: number) => (
                                      <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                                        <Target className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                                        {metric}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Resource Allocation Tab */}
                    <TabsContent value="resources" className="space-y-6 mt-6">
                      {report.report.resourceAllocation && (
                        <Card className="bg-white text-black border-green-500/30">
                          <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                              <PieChart className="w-5 h-5 text-green-400" />
                              Budget Allocation Strategy
                            </CardTitle>
                            <CardDescription>
                              Total Budget: {report.report.resourceAllocation.totalBudget}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {report.report.resourceAllocation.allocations?.map((allocation: any, i: number) => (
                              <div key={i} className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium">{allocation.category}</h4>
                                  <div className="text-right">
                                    <p className="text-lg font-light text-green-400">{allocation.amount}</p>
                                    <p className="text-xs text-gray-500">{allocation.percentage}% of budget</p>
                                  </div>
                                </div>
                                <Progress value={allocation.percentage} className="h-2" />
                                <p className="text-sm text-gray-400">{allocation.justification}</p>
                                
                                {allocation.expectedOutcomes && (
                                  <div className="pl-4 border-l-2 border-gray-800">
                                    <p className="text-xs text-gray-500 mb-2">Expected Outcomes:</p>
                                    <ul className="space-y-1">
                                      {allocation.expectedOutcomes.map((outcome: string, idx: number) => (
                                        <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                                          <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                          {outcome}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {i < report.report.resourceAllocation.allocations.length - 1 && (
                                  <Separator className="bg-gray-800 mt-4" />
                                )}
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      )}

                      {/* Quick Wins */}
                      {report.report.quickWins && (
                        <Card className="bg-white text-black border-yellow-500/30">
                          <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                              <Zap className="w-5 h-5 text-yellow-400" />
                              Quick Wins - Immediate Impact
                            </CardTitle>
                            <CardDescription>Low-cost, high-impact actions to start immediately</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-2 gap-4">
                              {report.report.quickWins.map((win: any, i: number) => (
                                <div key={i} className="p-4 bg-white text-black border border-gray-800 rounded-lg hover:border-yellow-500/30 transition-colors">
                                  <h4 className="font-medium mb-2 text-yellow-400">{win.title || win.action}</h4>
                                  <div className="space-y-2 text-sm">
                                    <p className="text-gray-400">
                                      <span className="text-gray-500">Impact:</span> {win.impact}
                                    </p>
                                    <p className="text-gray-400">
                                      <span className="text-gray-500">Cost:</span> {win.cost}
                                    </p>
                                    <p className="text-gray-400">
                                      <span className="text-gray-500">Timeline:</span> {win.timeline}
                                    </p>
                                    <p className="text-gray-400">
                                      <span className="text-gray-500">How:</span> {win.implementation}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>

                    {/* Action Plan Tab */}
                    <TabsContent value="action" className="space-y-6 mt-6">
                      {/* Enhanced Interactive Timeline */}
                      {report.report.actionPlan && (
                        <>
                          {/* Timeline Overview Cards */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            {[
                              { 
                                key: 'immediate', 
                                label: 'Immediate', 
                                time: '0-3 months',
                                icon: Zap,
                                color: 'red',
                                gradient: 'from-red-500 to-orange-500'
                              },
                              { 
                                key: 'shortTerm', 
                                label: 'Short-Term', 
                                time: '3-12 months',
                                icon: Target,
                                color: 'orange',
                                gradient: 'from-orange-500 to-amber-500'
                              },
                              { 
                                key: 'mediumTerm', 
                                label: 'Medium-Term', 
                                time: '1-3 years',
                                icon: TrendingUp,
                                color: 'amber',
                                gradient: 'from-amber-500 to-yellow-500'
                              },
                              { 
                                key: 'longTerm', 
                                label: 'Long-Term', 
                                time: '3-10 years',
                                icon: Award,
                                color: 'green',
                                gradient: 'from-green-500 to-emerald-500'
                              },
                            ].map((phase, i) => {
                              const phaseData = report.report.actionPlan[phase.key];
                              if (!phaseData) return null;
                              
                              return (
                                <motion.div
                                  key={phase.key}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                  whileHover={{ scale: 1.05, y: -5 }}
                                >
                                  <Card className={`bg-${phase.color}-500/10 border-${phase.color}-500/30 cursor-pointer`}>
                                    <CardContent className="p-4">
                                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${phase.gradient} flex items-center justify-center mb-3`}>
                                        <phase.icon className="w-6 h-6 text-white" />
                                      </div>
                                      <h4 className="font-semibold text-white mb-1">{phase.label}</h4>
                                      <p className="text-xs text-gray-400 mb-2">{phase.time}</p>
                                      <Badge variant="outline" className="text-xs">
                                        {phaseData.budget}
                                      </Badge>
                                      <div className="mt-3">
                                        <p className="text-xs text-gray-500 mb-1">Actions</p>
                                        <Progress value={(i + 1) * 25} className="h-1" />
                                        <p className="text-xs text-gray-400 mt-1">{phaseData.actions?.length || 0} items</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* Visual Timeline with Cards */}
                          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 overflow-hidden">
                            <CardHeader>
                              <CardTitle className="text-2xl flex items-center gap-2">
                                <Clock className="w-6 h-6 text-purple-400" />
                                Implementation Timeline
                              </CardTitle>
                              <CardDescription className="text-gray-400">
                                Your community's transformation journey from 0-10 years
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="relative">
                                {/* Animated Timeline line */}
                                <motion.div 
                                  className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 via-orange-500 to-green-500"
                                  initial={{ scaleY: 0 }}
                                  animate={{ scaleY: 1 }}
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                                  style={{ transformOrigin: 'top' }}
                                />
                                
                                <div className="space-y-12">
                                  {Object.entries(report.report.actionPlan).map(([key, phase]: [string, any], i: number) => {
                                    const colors = ['purple', 'pink', 'orange', 'green'];
                                    const color = colors[i % 4];
                                    const isLeft = i % 2 === 0;
                                    const icons = [Zap, Target, TrendingUp, Award];
                                    const PhaseIcon = icons[i % 4];
                                    
                                    return (
                                      <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                                        className="relative"
                                      >
                                        <div className={`flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                          {/* Content Card */}
                                          <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                                            <motion.div
                                              whileHover={{ scale: 1.02, y: -4 }}
                                              className={`p-6 rounded-xl bg-gradient-to-br from-${color}-500/20 to-black/40 border-2 border-${color}-500/30 backdrop-blur-sm shadow-lg`}
                                            >
                                              <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse md:justify-start' : ''}`}>
                                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-${color}-500 to-${color}-700 flex items-center justify-center`}>
                                                  <PhaseIcon className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                  <Badge className={`bg-${color}-500/20 text-${color}-300 border-${color}-500/30 text-xs mb-1`}>
                                                    Phase {i + 1}
                                                  </Badge>
                                                  <h3 className="text-xl font-semibold text-white">{phase.phase}</h3>
                                                </div>
                                              </div>
                                              <p className="text-gray-400 text-sm mb-4">{phase.focus}</p>
                                              <div className={`flex flex-wrap gap-3 text-sm ${isLeft ? 'md:justify-end' : ''}`}>
                                                <div className="flex items-center gap-2">
                                                  <DollarSign className={`w-4 h-4 text-${color}-400`} />
                                                  <span className={`text-${color}-400 font-medium`}>{phase.budget}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                  <Briefcase className={`w-4 h-4 text-${color}-400`} />
                                                  <span className="text-gray-400">{phase.actions?.length || 0} Actions</span>
                                                </div>
                                              </div>
                                              
                                              {/* Mini preview of actions */}
                                              <div className={`mt-4 pt-4 border-t border-${color}-500/20`}>
                                                <p className="text-xs text-gray-500 mb-2">Key Actions:</p>
                                                <ul className="space-y-1">
                                                  {phase.actions?.slice(0, 2).map((action: string, idx: number) => (
                                                    <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                                                      <span className={`text-${color}-400 mt-0.5`}>•</span>
                                                      {action.length > 60 ? action.substring(0, 60) + '...' : action}
                                                    </li>
                                                  ))}
                                                  {phase.actions?.length > 2 && (
                                                    <li className="text-xs text-gray-500 italic">
                                                      +{phase.actions.length - 2} more actions...
                                                    </li>
                                                  )}
                                                </ul>
                                              </div>
                                            </motion.div>
                                          </div>

                                          {/* Timeline Node */}
                                          <div className="relative z-10 flex-shrink-0">
                                            <motion.div
                                              initial={{ scale: 0, rotate: -180 }}
                                              animate={{ scale: 1, rotate: 0 }}
                                              transition={{ 
                                                delay: 0.7 + i * 0.2, 
                                                type: "spring", 
                                                stiffness: 200,
                                                damping: 10
                                              }}
                                              whileHover={{ scale: 1.3, rotate: 180 }}
                                              className={`w-16 h-16 rounded-full bg-gradient-to-br from-${color}-500 to-${color}-700 border-4 border-[#0a0a0a] flex items-center justify-center shadow-lg shadow-${color}-500/50 cursor-pointer`}
                                            >
                                              <span className="text-white font-bold text-xl">{i + 1}</span>
                                            </motion.div>
                                            
                                            {/* Connecting pulse animation */}
                                            <motion.div
                                              className={`absolute inset-0 rounded-full bg-${color}-500`}
                                              initial={{ scale: 1, opacity: 0.5 }}
                                              animate={{ scale: 1.5, opacity: 0 }}
                                              transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.5
                                              }}
                                            />
                                          </div>

                                          {/* Spacer for alternating layout */}
                                          <div className="flex-1 hidden md:block" />
                                        </div>
                                      </motion.div>
                                    );
                                  })}
                                </div>

                                {/* Timeline completion indicator */}
                                <motion.div 
                                  className="mt-12 text-center"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 2 }}
                                >
                                  <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                      <CheckCircle2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-left">
                                      <p className="text-sm font-semibold text-green-400">Sustainable Future Achieved</p>
                                      <p className="text-xs text-gray-400">Complete transformation in 10 years</p>
                                    </div>
                                  </div>
                                </motion.div>
                              </div>
                            </CardContent>
                          </Card>
                        </>
                      )}

                      {/* Detailed Phase Cards */}
                      {report.report.actionPlan && (
                        <div className="space-y-6">
                          {Object.entries(report.report.actionPlan).map(([key, phase]: [string, any], i: number) => (
                            <Card key={i} className="bg-white text-black border-gray-800">
                              <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                  <Calendar className="w-5 h-5 text-purple-400" />
                                  {phase.phase}
                                </CardTitle>
                                <CardDescription>{phase.focus}</CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div>
                                  <p className="text-sm font-medium text-black mb-2">Budget: {phase.budget}</p>
                                </div>
                                
                                <div>
                                  <p className="text-sm font-medium text-black mb-2">Key Actions:</p>
                                  <ul className="space-y-2">
                                    {phase.actions?.map((action: string, idx: number) => (
                                      <li key={idx} className="text-sm text-black flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">•</span>
                                        {action}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {phase.expectedResults && (
                                  <div className="p-3 bg-white text-black rounded-lg border border-gray-800">
                                    <p className="text-xs text-black mb-2">Expected Results:</p>
                                    <ul className="space-y-1">
                                      {phase.expectedResults.map((result: string, idx: number) => (
                                        <li key={idx} className="text-xs text-black flex items-start gap-2">
                                          <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                          {result}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}

                      {/* Milestones */}
                      {report.report.milestones && (
                        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                          <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                              <Target className="w-5 h-5 text-blue-400" />
                              Key Milestones & Targets
                            </CardTitle>
                            <CardDescription className="text-black">
                              Measurable checkpoints to track progress
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-6 relative pl-8">
                              {/* Animated gradient line */}
                              <motion.div 
                                className="absolute left-2 top-2 w-px bg-gradient-to-b from-blue-500 via-cyan-500 via-teal-500 to-green-500"
                                initial={{ height: 0 }}
                                animate={{ height: '100%' }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                style={{ bottom: '0.5rem' }}
                              />
                              
                              {report.report.milestones.map((milestone: any, i: number) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -30 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.15, duration: 0.5 }}
                                  className="relative"
                                >
                                  {/* Animated dot */}
                                  <motion.div 
                                    className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-[#0a0a0a]"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 300 }}
                                    whileHover={{ scale: 1.5 }}
                                  />
                                  
                                  {/* Milestone card */}
                                  <motion.div 
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    className="p-4 bg-white text-black rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all"
                                  >
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                      <h4 className="text-sm font-semibold text-blue-400 flex-1">{milestone.milestone}</h4>
                                      <Badge variant="outline" className="text-xs bg-blue-500/10 border-blue-500/30 text-blue-300">
                                        {milestone.deadline}
                                      </Badge>
                                    </div>
                                    
                                    <div className="space-y-2 text-xs">
                                      <div className="flex items-center gap-2">
                                        <Target className="w-3 h-3 text-cyan-400" />
                                        <span className="text-black">Target:</span>
                                        <span className="text-black">{milestone.target}</span>
                                      </div>
                                      
                                      <div className="flex items-center gap-2">
                                        <Users className="w-3 h-3 text-teal-400" />
                                        <span className="text-black">Owner:</span>
                                        <span className="text-black">{milestone.owner}</span>
                                      </div>
                                      
                                      {milestone.dependencies && (
                                        <div className="flex items-start gap-2 mt-2 pt-2 border-t border-gray-800">
                                          <AlertTriangle className="w-3 h-3 text-amber-400 mt-0.5" />
                                          <div>
                                            <span className="text-black">Dependencies:</span>
                                            <p className="text-black text-xs mt-1">{milestone.dependencies}</p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                </motion.div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>

                    {/* Funding Tab */}
                    <TabsContent value="funding" className="space-y-6 mt-6">
                      {report.report.fundingOpportunities && (
                        <Card className="bg-white text-black border-gray-800">
                          <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                              <DollarSign className="w-5 h-5 text-green-400" />
                              Funding Opportunities
                            </CardTitle>
                            <CardDescription>Grants, partnerships, and funding sources to support your initiatives</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {report.report.fundingOpportunities.map((funding: any, i: number) => (
                                <div key={i} className="p-4 bg-white text-black border border-gray-800 rounded-lg">
                                  <div className="flex items-start justify-between mb-3">
                                    <div>
                                      <h4 className="font-medium text-green-400 mb-1">{funding.source}</h4>
                                      <div className="flex gap-2">
                                        <Badge variant="outline" className="text-xs">
                                          {funding.type}
                                        </Badge>
                                        <Badge className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                                          {funding.amount}
                                        </Badge>
                                        {funding.competitiveness && (
                                          <Badge variant="outline" className="text-xs">
                                            {funding.competitiveness} competition
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-2 text-sm">
                                    <p className="text-">
                                      <span className="text-black">Focus:</span> {funding.focus}
                                    </p>
                                    <p className="text-black">
                                      <span className="text-black">Eligibility:</span> {funding.eligibility}
                                    </p>
                                    <p className="text-black">
                                      <span className="text-black">Deadline:</span> {funding.applicationDeadline}
                                    </p>
                                    {funding.applicationTips && (
                                      <div className="mt-3 p-2 bg-green-500/10 border border-green-500/30 rounded">
                                        <p className="text-xs text-green-300">💡 Tips: {funding.applicationTips}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>
                  </Tabs>

                  {/* Reset Button */}
                  <Button
                    onClick={() => setReport(null)}
                    variant="outline"
                    className="w-full h-12 border-gray-800 hover:border-blue-500/50 hover:bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Generate New Report
                  </Button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}