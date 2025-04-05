import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Mock data for development when API key is not available
const mockAnalysis = {
  marketAnalysis: {
    marketSizeAssessment: "The startup operates in a large addressable market of $8.7B with significant growth potential.",
    growthPotential: "Strong growth trajectory supported by 35% YoY market expansion and increasing adoption.",
    competitivePosition: "Market leader position with proprietary technology creating high barriers to entry."
  },
  financialMetrics: {
    revenueProjection: "Current revenue of $4.5M with projected growth to $15M within 24 months.",
    valuationAssessment: "Current valuation of $120M is justified by strong growth metrics and market position.",
    returnPotential: "Potential for 6.7x return based on projected exit value and timeline."
  },
  riskAnalysis: {
    marketRisks: [
      "Regulatory changes in sports betting markets",
      "Emerging competition from established tech companies"
    ],
    operationalRisks: [
      "Scaling infrastructure to meet demand",
      "Maintaining accuracy during rapid growth"
    ],
    financialRisks: [
      "High cash burn rate during expansion",
      "Dependency on future funding rounds"
    ]
  },
  investmentRecommendation: {
    riskLevel: "medium",
    expectedReturn: "Expected IRR of 67% based on projected exit value of $800M in 2-3 years.",
    timeHorizon: "2-3 year path to exit through strategic acquisition or IPO.",
    keyConsiderations: [
      "Strong product-market fit with proven traction",
      "Experienced team with domain expertise",
      "Clear path to profitability with current growth rate"
    ]
  },
  keyMetrics: {
    irr: 67.5,
    multiple: 6.7,
    paybackPeriod: 18,
    riskAdjustedReturn: 57.4
  }
};

export async function POST(request: Request) {
  try {
    console.log('POST /api/analyze-startup: Received request');
    const body = await request.json();
    
    const { prompt } = body;
    if (!prompt) {
      console.error('POST /api/analyze-startup: No prompt provided');
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.OPENAI_API_KEY;
    console.log('POST /api/analyze-startup: Environment variables:', {
      OPENAI_API_KEY_EXISTS: !!process.env.OPENAI_API_KEY,
      OPENAI_API_KEY_LENGTH: process.env.OPENAI_API_KEY?.length,
      NODE_ENV: process.env.NODE_ENV
    });
    
    if (!apiKey) {
      console.log('POST /api/analyze-startup: No API key found, using mock data');
      return NextResponse.json({
        ...mockAnalysis,
        _debug: {
          mode: 'mock',
          reason: 'No API key found'
        }
      });
    }

    try {
      console.log('POST /api/analyze-startup: Initializing OpenAI with API key');
      const openai = new OpenAI({
        apiKey: apiKey
      });

      console.log('POST /api/analyze-startup: Sending request to OpenAI');
      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: `You are an expert venture capital analyst. Analyze the startup data and return a JSON response with the following structure:
{
  "marketAnalysis": {
    "marketSizeAssessment": string,
    "growthPotential": string,
    "competitivePosition": string
  },
  "financialMetrics": {
    "revenueProjection": string,
    "valuationAssessment": string,
    "returnPotential": string
  },
  "riskAnalysis": {
    "marketRisks": string[],
    "operationalRisks": string[],
    "financialRisks": string[]
  },
  "investmentRecommendation": {
    "riskLevel": "low" | "medium" | "high",
    "expectedReturn": string,
    "timeHorizon": string,
    "keyConsiderations": string[]
  },
  "keyMetrics": {
    "irr": number,
    "multiple": number,
    "paybackPeriod": number,
    "riskAdjustedReturn": number
  }
}`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      });

      console.log('POST /api/analyze-startup: OpenAI Response received:', {
        status: 'success',
        model: completion.model,
        usage: completion.usage
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error('No content received from OpenAI');
      }

      const analysis = JSON.parse(content);
      return NextResponse.json({
        ...analysis,
        _debug: {
          mode: 'openai',
          model: completion.model,
          usage: completion.usage
        }
      });

    } catch (openaiError) {
      console.error('POST /api/analyze-startup: OpenAI Error:', {
        name: openaiError instanceof Error ? openaiError.name : 'Unknown',
        message: openaiError instanceof Error ? openaiError.message : String(openaiError)
      });
      
      // Fallback to mock data on OpenAI error
      return NextResponse.json({
        ...mockAnalysis,
        _debug: {
          mode: 'mock',
          reason: 'OpenAI Error',
          error: openaiError instanceof Error ? openaiError.message : String(openaiError)
        }
      });
    }
  } catch (error) {
    console.error('POST /api/analyze-startup: Error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error)
    });
    return NextResponse.json(
      { 
        error: 'Failed to generate analysis',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 