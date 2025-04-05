import { NextResponse } from 'next/server';

const mockData = {
  marketAnalysis: {
    marketSizeAssessment: "The Total Addressable Market (TAM) for this startup is $1 billion, indicating significant potential for revenue generation and growth within the industry. Given the robust growth rate of 15%, the market is expected to expand rapidly, providing a favorable environment for the startup to scale its operations and capture market share.",
    growthPotential: "With a current user base of 10,000 and a monthly growth rate of 20%, the startup is on a strong trajectory to increase its user base significantly over the next few years. Coupled with a 15% overall market growth rate, this suggests that the startup could potentially capture a sizeable portion of the market by leveraging its current growth momentum.",
    competitivePosition: "The company's current position is competitive due to its solid retention rate of 80%, which indicates that customers find value in the product. The successful launch and favorable market conditions suggest that the startup is well-positioned against competitors, provided it can maintain user satisfaction and address any emerging competition effectively."
  },
  financialMetrics: {
    revenueProjection: "The startup's monthly revenue growth rate of 25%, combined with a current revenue of $100,000, points to potential exponential revenue growth. If this rate is maintained, annual revenue could exceed $1 million, thus reflecting a solid financial trajectory with a gross margin of 60%, which is favorable for sustainability and profitability.",
    valuationAssessment: "Currently valued at $5 million with projections of reaching an exit value of $50 million in 36 months suggests an attractive growth potential. A 10.00x multiple on the initial investment indicates high expected returns upon exit, making the startup appealing for investors looking for high-growth opportunities.",
    returnPotential: "The Internal Rate of Return (IRR) of 115.44% and a risk-adjusted return of 98.13% are exceptionally strong, offering compelling incentives for investors. The payback period of 12 months presents a low risk of capital loss and indicates rapid recovery of investment."
  },
  riskAnalysis: {
    marketRisks: [
      "Increased competition leading to market saturation",
      "Changes in consumer preferences affecting retention and acquisition",
      "Economic downturn affecting overall market growth rate"
    ],
    operationalRisks: [
      "Challenges in scaling operations to meet user growth",
      "Reliability of technology and infrastructure as user base expands",
      "Human resource challenges in hiring and retaining talent"
    ],
    financialRisks: [
      "Reliance on continued investor funding for accelerated growth",
      "Potential for cash flow issues during scaling if growth slows",
      "Vulnerability to fluctuations in gross margins depending on operating efficiencies"
    ]
  },
  investmentRecommendation: {
    riskLevel: "medium",
    expectedReturn: "Investors can anticipate high returns given the expected IRR of 115.44% and a viable exit plan targeting a valuation increase of 10x. With a strong revenue growth trajectory and a robust market growth rate, opportunities for substantial returns are promising.",
    timeHorizon: "The recommended investment horizon aligns with the projected exit timeline of 36 months, allowing investors to benefit from the planned growth and exit strategy.",
    keyConsiderations: [
      "Monitor user acquisition and retention strategies to stay ahead of market competition",
      "Ensure operational scalability to support rapid growth without sacrificing service quality",
      "Maintain a strong financial cushion to manage potential cash flow challenges"
    ]
  },
  keyMetrics: {
    irr: 115.44346900318838,
    multiple: 10,
    paybackPeriod: 12,
    riskAdjustedReturn: 98.12694865271013
  }
};

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    console.log('POST request received');
    const body = await request.json();
    console.log('Request body:', body);

    // Here we could use the body data to calculate actual metrics
    // For now, we're returning the mock data
    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Error in POST /api/analyze-startup:', error);
    return NextResponse.json(
      { error: 'Failed to analyze startup' },
      { status: 500 }
    );
  }
} 