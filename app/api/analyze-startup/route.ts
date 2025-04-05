import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { PortfolioAnalysis, StartupInsights } from '@/lib/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function calculateKeyMetrics(metrics: PortfolioAnalysis['startupMetrics']): StartupInsights['keyMetrics'] {
  const { currentValuation, projectedExitValue, exitTimeline, revenueGrowth } = metrics;
  
  // Calculate IRR (simplified version)
  const months = metrics.exitTimeline;
  const investment = metrics.currentValuation;
  const exitValue = metrics.projectedExitValue;
  const irr = Math.pow(exitValue / investment, 12 / months) - 1;
  
  // Calculate return multiple
  const multiple = exitValue / investment;
  
  // Calculate payback period (simplified)
  const monthlyRevenue = revenueGrowth.currentRevenue;
  const monthlyGrowth = revenueGrowth.monthlyGrowthRate / 100;
  let cumulativeRevenue = 0;
  let paybackPeriod = 0;
  
  while (cumulativeRevenue < investment && paybackPeriod < months) {
    cumulativeRevenue += monthlyRevenue * Math.pow(1 + monthlyGrowth, paybackPeriod);
    paybackPeriod++;
  }
  
  // Calculate risk-adjusted return (simplified)
  const riskAdjustedReturn = (irr * 100) * (1 - (metrics.marketGrowthRate / 100));
  
  return {
    irr: irr * 100, // Convert to percentage
    multiple,
    paybackPeriod,
    riskAdjustedReturn
  };
}

export async function POST(request: Request) {
  try {
    const analysis: PortfolioAnalysis = await request.json();
    const keyMetrics = calculateKeyMetrics(analysis.startupMetrics);

    const prompt = `Analyze the following startup metrics and generate comprehensive insights:

Startup Metrics:
- TAM: $${analysis.startupMetrics.tam.toLocaleString()}
- Market Growth Rate: ${analysis.startupMetrics.marketGrowthRate}%
- Product Stage: ${analysis.startupMetrics.productStage}
- User Growth:
  - Current Users: ${analysis.startupMetrics.userGrowth.currentUsers.toLocaleString()}
  - Monthly Growth Rate: ${analysis.startupMetrics.userGrowth.monthlyGrowthRate}%
  - Retention Rate: ${analysis.startupMetrics.userGrowth.retentionRate}%
- Revenue Growth:
  - Current Revenue: $${analysis.startupMetrics.revenueGrowth.currentRevenue.toLocaleString()}
  - Monthly Growth Rate: ${analysis.startupMetrics.revenueGrowth.monthlyGrowthRate}%
  - Gross Margin: ${analysis.startupMetrics.revenueGrowth.grossMargin}%
- Current Valuation: $${analysis.startupMetrics.currentValuation.toLocaleString()}
- Projected Exit Value: $${analysis.startupMetrics.projectedExitValue.toLocaleString()}
- Exit Timeline: ${analysis.startupMetrics.exitTimeline} months

Investor Profile:
- Risk Tolerance: ${analysis.investorProfile?.riskTolerance || 'Not specified'}
- Investment Horizon: ${analysis.investorProfile?.investmentHorizon || 'Not specified'}
- Portfolio Diversification: ${analysis.investorProfile?.portfolioDiversification || 'Not specified'}%

Calculated Key Metrics:
- IRR: ${keyMetrics.irr.toFixed(2)}%
- Multiple: ${keyMetrics.multiple.toFixed(2)}x
- Payback Period: ${keyMetrics.paybackPeriod} months
- Risk-Adjusted Return: ${keyMetrics.riskAdjustedReturn.toFixed(2)}%

Please provide insights in the following JSON format:
{
  "marketAnalysis": {
    "marketSizeAssessment": "detailed assessment of market size and potential",
    "growthPotential": "analysis of growth potential",
    "competitivePosition": "assessment of competitive position"
  },
  "financialMetrics": {
    "revenueProjection": "detailed revenue projection analysis",
    "valuationAssessment": "assessment of current and projected valuation",
    "returnPotential": "analysis of return potential"
  },
  "riskAnalysis": {
    "marketRisks": ["list of market risks"],
    "operationalRisks": ["list of operational risks"],
    "financialRisks": ["list of financial risks"]
  },
  "investmentRecommendation": {
    "riskLevel": "low/medium/high",
    "expectedReturn": "detailed return expectation",
    "timeHorizon": "recommended investment horizon",
    "keyConsiderations": ["list of key considerations"]
  }
}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
    });

    const insights: Omit<StartupInsights, 'keyMetrics'> = JSON.parse(completion.choices[0].message.content || '{}');
    
    const response: StartupInsights = {
      ...insights,
      keyMetrics
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in analyze-startup route:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
} 