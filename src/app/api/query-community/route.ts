import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    console.log('📥 Received community analysis request');
    
    const data = await request.json();
    
    const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      console.error('❌ Gemini API key not configured');
      return NextResponse.json(
        { success: false, error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    console.log('🤖 Initializing Gemini AI...');
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash"
    });

    // Construct comprehensive prompt for Gemini
    const prompt = `You are an expert environmental consultant and sustainability strategist specializing in community planning. Analyze the following community environmental data and provide a comprehensive, actionable sustainability report.

COMMUNITY PROFILE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Community Name: ${data.communityName}
Location: ${data.location}
Population: ${data.population.toLocaleString()}
Community Size: ${data.size}

INFRASTRUCTURE ASSESSMENT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Water Infrastructure: ${data.waterInfrastructure}
• Waste Management System: ${data.wasteManagement}
• Energy Infrastructure: ${data.energyInfrastructure}
• Green Spaces Coverage: ${data.greenSpaces}%
• Public Transportation: ${data.publicTransport}

ENVIRONMENTAL CHALLENGES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Air Quality Index: ${data.airQualityIndex} (0-500 scale)
• Water Pollution Sources: ${data.waterPollution}
• Daily Waste Generation: ${data.wasteGeneration} tons/day
• Recycling Rate: ${data.recyclingRate}%
• Deforestation Rate: ${data.deforestationRate}%/year
• Carbon Emissions: ${data.carbonEmissions} tons CO2/year

AVAILABLE RESOURCES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Annual Environmental Budget: $${data.annualBudget.toLocaleString()}
• Available Volunteers: ${data.volunteers}
• Technical Staff: ${data.technicalStaff}
• Existing Green Initiatives: ${data.existingInitiatives || 'None specified'}

COMMUNITY PRIORITIES & CONCERNS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Top Priorities: ${data.topPriorities}
Urgent Environmental Challenges: ${data.urgentChallenges}
Community Feedback: ${data.communityFeedback || 'Not provided'}

TASK: Generate a comprehensive sustainability report in VALID JSON format following this EXACT structure:

{
  "executiveSummary": {
    "overallStatus": "2-3 sentences providing high-level assessment of community environmental health",
    "sustainabilityScore": "Score out of 100 based on all factors",
    "urgencyLevel": "Critical|High|Moderate|Low",
    "keyTakeaway": "One impactful sentence summarizing the main finding"
  },
  "situationAnalysis": {
    "strengths": [
      "List 4-6 existing environmental strengths and positive aspects"
    ],
    "criticalIssues": [
      "List 4-6 most urgent environmental problems requiring immediate action"
    ],
    "opportunities": [
      "List 4-5 opportunities for improvement or innovation"
    ],
    "risks": [
      "List 4-5 environmental risks if issues remain unaddressed"
    ]
  },
  "priorityAreas": [
    {
      "area": "Specific focus area (e.g., 'Water Quality Management', 'Waste Reduction')",
      "priority": "critical|high|medium|low",
      "currentStatus": "Brief current state assessment",
      "targetGoal": "Specific measurable goal",
      "estimatedImpact": "High|Medium|Low - explain the impact",
      "estimatedCost": "$XX,XXX - $XXX,XXX",
      "timeframe": "X-X months",
      "roi": "Expected return on investment or benefit",
      "resourcesNeeded": [
        "Specific resources: equipment, expertise, materials, partnerships"
      ],
      "successMetrics": [
        "3-4 measurable KPIs to track progress"
      ]
    }
  ],
  "resourceAllocation": {
    "totalBudget": "$${data.annualBudget.toLocaleString()}",
    "allocations": [
      {
        "category": "Budget category (e.g., 'Water Infrastructure Upgrade')",
        "amount": "$XX,XXX",
        "percentage": 25,
        "justification": "2-3 sentences explaining why this allocation is optimal",
        "expectedOutcomes": [
          "List 3-5 specific measurable outcomes"
        ],
        "timeline": "Implementation timeline"
      }
    ],
    "costSavingOpportunities": [
      "List 3-4 ways to reduce costs or improve efficiency"
    ]
  },
  "actionPlan": {
    "immediate": {
      "phase": "Immediate Actions (0-3 months)",
      "focus": "Quick wins and urgent issues",
      "actions": [
        "List 5-7 specific immediate actions"
      ],
      "budget": "$XX,XXX",
      "expectedResults": [
        "What will be achieved in this phase"
      ]
    },
    "shortTerm": {
      "phase": "Short-term Actions (3-12 months)",
      "focus": "Foundation building",
      "actions": [
        "List 5-7 specific short-term actions"
      ],
      "budget": "$XX,XXX",
      "expectedResults": [
        "What will be achieved in this phase"
      ]
    },
    "mediumTerm": {
      "phase": "Medium-term Actions (1-3 years)",
      "focus": "System improvements",
      "actions": [
        "List 5-7 specific medium-term actions"
      ],
      "budget": "$XX,XXX",
      "expectedResults": [
        "What will be achieved in this phase"
      ]
    },
    "longTerm": {
      "phase": "Long-term Vision (3-10 years)",
      "focus": "Transformation and sustainability",
      "actions": [
        "List 4-6 specific long-term actions"
      ],
      "budget": "$XX,XXX",
      "expectedResults": [
        "What will be achieved in this phase"
      ]
    }
  },
  "quickWins": [
    {
      "title": "Catchy title for quick win",
      "action": "Specific action to take",
      "impact": "Expected environmental impact",
      "cost": "$X,XXX or 'Minimal' or 'Free'",
      "timeline": "1-4 weeks",
      "difficulty": "Easy|Moderate|Challenging",
      "implementation": "Step-by-step how to implement (2-3 sentences)",
      "volunteers": "Number of volunteers needed"
    }
  ],
  "communityEngagement": {
    "strategies": [
      "List 4-6 strategies to engage community members"
    ],
    "educationPrograms": [
      "List 3-5 educational initiatives"
    ],
    "volunteerOpportunities": [
      "List 4-6 ways volunteers can contribute"
    ],
    "partnerships": [
      "Suggest 3-5 potential local partnerships (schools, businesses, NGOs)"
    ]
  },
  "milestones": [
    {
      "milestone": "Specific milestone name",
      "target": "Specific measurable target",
      "deadline": "Month Year",
      "owner": "Responsible party (e.g., 'Environmental Committee')",
      "dependencies": "What needs to happen first"
    }
  ],
  "fundingOpportunities": [
    {
      "source": "Funding source name (specific real grants when possible)",
      "type": "Grant|Loan|Subsidy|Corporate Partnership|Government Program",
      "amount": "$XX,XXX - $XXX,XXX",
      "focus": "What the funding supports",
      "eligibility": "Eligibility requirements",
      "applicationDeadline": "Typical deadline or 'Rolling basis'",
      "competitiveness": "High|Medium|Low",
      "applicationTips": "2-3 tips for successful application"
    }
  ],
  "riskAssessment": {
    "environmentalRisks": [
      {
        "risk": "Specific risk",
        "probability": "High|Medium|Low",
        "impact": "High|Medium|Low",
        "mitigation": "How to mitigate this risk"
      }
    ],
    "implementationRisks": [
      {
        "risk": "Implementation challenge",
        "probability": "High|Medium|Low",
        "impact": "High|Medium|Low",
        "mitigation": "How to address this challenge"
      }
    ]
  },
  "successStories": [
    {
      "community": "Similar community name (real if possible)",
      "challenge": "What they faced",
      "solution": "What they implemented",
      "results": "Measurable outcomes",
      "applicability": "How this applies to current community"
    }
  ],
  "technologyRecommendations": [
    {
      "technology": "Specific technology or system",
      "purpose": "What problem it solves",
      "cost": "$XX,XXX - $XXX,XXX",
      "savings": "Annual savings or ROI",
      "implementation": "Implementation complexity and timeline",
      "vendors": "Suggested vendors or solutions (real when possible)"
    }
  ],
  "performanceIndicators": {
    "environmental": [
      {
        "kpi": "Specific KPI name",
        "current": "Current value",
        "target": "Target value",
        "timeline": "When to achieve",
        "measurement": "How to measure"
      }
    ],
    "social": [
      {
        "kpi": "Social impact KPI",
        "current": "Current value",
        "target": "Target value",
        "timeline": "When to achieve",
        "measurement": "How to measure"
      }
    ],
    "economic": [
      {
        "kpi": "Economic KPI",
        "current": "Current value",
        "target": "Target value",
        "timeline": "When to achieve",
        "measurement": "How to measure"
      }
    ]
  }
}

CRITICAL REQUIREMENTS:
1. Return ONLY valid JSON - no markdown, no code blocks, no explanatory text
2. All dollar amounts should be realistic and based on the stated budget of $${data.annualBudget.toLocaleString()}
3. Prioritize actions based on the stated community priorities: ${data.topPriorities}
4. Be specific to ${data.communityName}, ${data.location} - avoid generic advice
5. Consider the local context and the community size: ${data.size}
6. Include diverse perspectives (environment, economy, social impact)
7. Make recommendations actionable and measurable
8. Budget allocations in resourceAllocation should approximately sum to total budget
9. Include 6-8 priority areas, 6-8 quick wins, 8-12 milestones, 6-10 funding opportunities
10. All fields must be filled - no null or empty values

Generate the comprehensive sustainability report now:`;

    console.log('🔄 Sending request to Gemini...');
    
    // Call Gemini API using SDK
     const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();
    
    console.log('✅ Received response from Gemini');
    
    // Clean up response - remove markdown code blocks if present
    text = text.replace(/```json\n?|\n?```/g, '').trim();
    
    // Parse JSON
    let report;
    try {
      report = JSON.parse(text);
      console.log('✅ Successfully parsed JSON response');
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      console.error('Raw response (first 500 chars):', text.slice(0, 500));
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to parse AI response as JSON',
          details: 'The AI returned invalid JSON. Please try again.',
          rawResponse: text.substring(0, 500)
        },
        { status: 500 }
      );
    }
    
    // Add metadata
    const finalResponse = {
      success: true,
      report,
      metadata: {
        generatedAt: new Date().toISOString(),
        community: {
          name: data.communityName,
          location: data.location,
          population: data.population,
          size: data.size,
          budget: data.annualBudget
        },
        model: "gemini-2.5-flash",
        method: "direct-ai-generation"
      }
    };

    console.log('✅ Report generated successfully');
    console.log(`   - Priority Areas: ${report.priorityAreas?.length || 0}`);
    console.log(`   - Quick Wins: ${report.quickWins?.length || 0}`);
    console.log(`   - Milestones: ${report.milestones?.length || 0}`);
    console.log(`   - Funding Opportunities: ${report.fundingOpportunities?.length || 0}`);

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