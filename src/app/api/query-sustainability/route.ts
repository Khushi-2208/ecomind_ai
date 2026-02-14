import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

if (!GOOGLE_GEMINI_API_KEY) {
  throw new Error('Missing GOOGLE_GEMINI_API_KEY');
}

const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);

interface HouseholdInput {
  members: number;
  ageGroups: {
    children: number;
    adults: number;
    seniors: number;
  };
  electricity: {
    monthlyUsage: number;
    hasSolar: boolean;
  };
  water: {
    monthlyUsage: number;
    hasRainwaterHarvesting: boolean;
  };
  transport: {
    primaryMode: string;
    dailyCommuteKm: number;
    vehicleType: string;
  };
  location: {
    city: string;
    area: 'urban' | 'suburban' | 'rural';
  };
}

export async function POST(req: NextRequest) {
  try {
    const input: HouseholdInput = await req.json();

    console.log('📥 Received household data');
    console.log(`   - Members: ${input.members}`);
    console.log(`   - Electricity: ${input.electricity.monthlyUsage} kWh/month`);
    console.log(`   - Water: ${input.water.monthlyUsage} L/month`);
    console.log(`   - Transport: ${input.transport.primaryMode}, ${input.transport.dailyCommuteKm} km/day`);

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash"
    });

    // Build comprehensive prompt
    const prompt = `You are an expert environmental sustainability advisor specializing in Indian households. Analyze this household data and provide personalized, actionable recommendations to reduce resource wastage and improve sustainability.

HOUSEHOLD PROFILE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 Family Composition:
   - Total Members: ${input.members}
   - Children (0-17): ${input.ageGroups.children}
   - Adults (18-59): ${input.ageGroups.adults}
   - Seniors (60+): ${input.ageGroups.seniors}
   - Location: ${input.location.city} (${input.location.area} area)

⚡ Electricity Usage:
   - Monthly Consumption: ${input.electricity.monthlyUsage} kWh
   - Solar Panels: ${input.electricity.hasSolar ? 'Installed' : 'Not installed'}
   - Average per person: ${(input.electricity.monthlyUsage / input.members).toFixed(0)} kWh

💧 Water Consumption:
   - Monthly Usage: ${input.water.monthlyUsage} liters
   - Rainwater Harvesting: ${input.water.hasRainwaterHarvesting ? 'Yes' : 'No'}
   - Average per person: ${(input.water.monthlyUsage / input.members).toFixed(0)} liters/month
   - Daily per person: ${(input.water.monthlyUsage / input.members / 30).toFixed(0)} liters/day

🚗 Transportation:
   - Primary Mode: ${input.transport.primaryMode}
   - Vehicle Type: ${input.transport.vehicleType}
   - Daily Commute: ${input.transport.dailyCommuteKm} km
   - Monthly Distance: ${input.transport.dailyCommuteKm * 25} km (approx)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TASK: Generate a comprehensive sustainability action plan in JSON format with this EXACT structure:

{
  "analysis": {
    "electricityAssessment": "Brief assessment: is usage high/medium/low? Why?",
    "waterAssessment": "Brief assessment: is usage high/medium/low? Why?",
    "transportAssessment": "Brief assessment: is transport eco-friendly? Suggestions?",
    "overallScore": "Rate overall sustainability: Poor/Fair/Good/Excellent"
  },
  "currentImpact": {
    "carbonFootprint": "Calculate estimated kg CO2/month based on electricity and transport",
    "waterFootprint": "Daily liters per person",
    "wasteGeneration": "Estimated kg/month based on family size",
    "monthlyCost": "Estimated total monthly cost in ₹ for electricity, water, fuel"
  },
  "potentialSavings": {
    "co2Reduction": "Potential % reduction",
    "costSavings": "Estimated ₹ savings per month",
    "waterSavings": "Liters saved per month"
  },
  "recommendations": [
    {
      "category": "electricity/water/transport/waste",
      "priority": "high/medium/low",
      "action": "Specific action tailored to this household",
      "reason": "Why this is important for THIS specific household",
      "howTo": "Step-by-step implementation guide",
      "cost": "Estimated cost in ₹ (be specific)",
      "savings": "Monthly savings in ₹",
      "impact": "Environmental impact (CO2, water, etc)",
      "difficulty": "easy/moderate/challenging",
      "timeframe": "immediate/1-3 months/3-6 months/6-12 months",
      "payback": "How long until savings cover cost"
    }
  ],
  "quickWins": [
    "5-7 immediate free/low-cost actions they can take TODAY"
  ],
  "longTermPlan": {
    "month1": "What to focus on in first month",
    "month3": "What to focus on by month 3",
    "month6": "What to focus on by month 6",
    "year1": "Goals for end of first year"
  }
}

IMPORTANT GUIDELINES:
1. Be SPECIFIC to India - mention Indian brands, government schemes (MNRE, BEE, FAME II), local products
2. Use REAL costs and savings in ₹ (be realistic, not generic)
3. Prioritize based on THEIR usage patterns:
   - High electricity usage (>400 kWh) → Focus on solar, LED, appliances
   - High water usage (>15000 L) → Focus on rainwater harvesting, fixtures
   - Long commute (>20 km) → Focus on carpooling, EV, public transport
4. Give 10-15 recommendations across all categories
5. Consider family composition:
   - With children → Focus on education, waste reduction
   - With seniors → Focus on easy, safe solutions
   - Small families → Focus on efficiency
6. Make it ACTIONABLE - exact products, exact costs, exact savings
7. Include government subsidies where applicable

Calculate everything realistically:
- Electricity: ₹7-8 per kWh
- Water: ₹20-30 per 1000 liters
- Petrol: ₹100 per liter, average 15 km/liter
- Diesel: ₹90 per liter, average 20 km/liter

Return ONLY valid JSON, no markdown formatting.`;

    console.log('🤖 Calling Gemini API...');
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();
    
    console.log('✅ Received response from Gemini');
    
    // Clean up response
    text = text.replace(/```json\n?|\n?```/g, '').trim();
    
    // Parse JSON
    let plan;
    try {
      plan = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw response (first 500 chars):', text.slice(0, 500));
      throw new Error('Failed to parse AI response as JSON');
    }
    
    // Add metadata
    const finalResponse = {
      success: true,
      plan,
      metadata: {
        generatedAt: new Date().toISOString(),
        household: {
          members: input.members,
          location: input.location.city,
          electricityUsage: input.electricity.monthlyUsage,
          waterUsage: input.water.monthlyUsage,
          dailyCommute: input.transport.dailyCommuteKm
        },
        model: "gemini-2.0-flash-exp",
        method: "direct-ai-generation"
      }
    };

    console.log('✅ Plan generated successfully');
    console.log(`   - Recommendations: ${plan.recommendations?.length || 0}`);
    console.log(`   - Quick wins: ${plan.quickWins?.length || 0}`);

    return NextResponse.json(finalResponse);

  } catch (error: any) {
    console.error('❌ API error:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message || 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}