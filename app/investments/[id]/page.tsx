"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MapPin, 
  Users2, 
  Shield,
  ArrowLeft,
  TrendingUp,
  Building2,
  Globe,
  ExternalLink,
  DollarSign,
  Calendar,
  Brain,
  AlertTriangle,
  XCircleIcon
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Startup } from "@/lib/db/investments"

// Function to generate analysis prompt from startup data
function generateAnalysisPrompt(startup: Startup): string {
  return `Analyze this startup investment opportunity:

Company: ${startup.company_name}
Stage: ${startup.stage}
Product: ${startup.product_short}
Description: ${startup.description}

Key Metrics:
- Annual Recurring Revenue (ARR): ${startup.arr}
- Team: ${startup.founders}
- Total Addressable Market (TAM): ${startup.tam}
- Market Growth Rate: ${startup.market_growth_rate}
- Product Stage: ${startup.product_stage}
- User Growth: ${startup.user_growth}
- Revenue Growth: ${startup.revenue_growth}
- Current Valuation: ${startup.current_valuation}
- Projected Exit Value: ${startup.projected_exit_value}
- Expected Exit Timeline: ${startup.exit_timeline}

Please provide a comprehensive investment analysis including:
1. Market Opportunity Assessment
2. Growth Potential Analysis
3. Risk Factors
4. Investment Recommendation
5. Key Metrics to Monitor`
}

interface AnalysisData {
  marketAnalysis: {
    marketSizeAssessment: string;
    growthPotential: string;
    competitivePosition: string;
  };
  financialMetrics: {
    revenueProjection: string;
    valuationAssessment: string;
    returnPotential: string;
  };
  riskAnalysis: {
    marketRisks: string[];
    operationalRisks: string[];
    financialRisks: string[];
  };
  investmentRecommendation: {
    riskLevel: string;
    expectedReturn: string;
    timeHorizon: string;
    keyConsiderations: string[];
  };
  keyMetrics: {
    irr: number;
    multiple: number;
    paybackPeriod: number;
    riskAdjustedReturn: number;
  };
}

export default function StartupDetailsPage() {
  const params = useParams()
  const startupId = parseInt(params.id as string)
  const [startup, setStartup] = useState<Startup | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        console.log('Detail Page: Starting to fetch startup details for ID:', startupId);
        setLoading(true)
        setError(null)

        console.log('Detail Page: Making API request...');
        const response = await fetch(`/api/investments?id=${startupId}`)
        
        console.log('Detail Page: API Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Detail Page: Error response:', errorText);
          throw new Error('Failed to fetch startup details')
        }

        console.log('Detail Page: Parsing JSON response...');
        const { data } = await response.json()
        console.log('Detail Page: Received startup data:', data);

        setStartup(data)
        
        // Auto-generate analysis once startup data is loaded
        if (data) {
          console.log('Detail Page: Auto-generating analysis...');
          generateAnalysis(data);
        }
      } catch (err) {
        console.error('Detail Page Error:', err)
        setError('Failed to load startup details')
      } finally {
        setLoading(false)
      }
    }

    fetchStartup()
  }, [startupId])

  const generateAnalysis = async (startup: Startup) => {
    console.log('Generating analysis for startup:', startup.company_name);
    setIsLoading(true);
    setError(null);
    
    try {
      const prompt = `Analyze this startup:
Company: ${startup.company_name}
Product: ${startup.product_short}
Description: ${startup.description}
Stage: ${startup.stage}
Current ARR: $${startup.arr}M
Team Size: ${startup.founders} founders
TAM: $${startup.tam}B
Market Growth Rate: ${startup.market_growth_rate}%
Product Stage: ${startup.product_stage}
User Growth: ${startup.user_growth}%
Revenue Growth: ${startup.revenue_growth}%
Current Valuation: $${startup.current_valuation}M
Projected Exit Value: $${startup.projected_exit_value}M
Exit Timeline: ${startup.exit_timeline}`;

      console.log('Sending analysis request with prompt:', prompt);
      
      const response = await fetch('/api/analyze-startup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      console.log('Received response:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Analysis data received:', data);
      
      setAnalysis(data);
    } catch (err) {
      console.error('Error generating analysis:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate analysis');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading startup details...</div>
      </div>
    )
  }

  if (error || !startup) {
    return (
      <div className="p-6">
        <div className="text-center text-red-500">{error || 'Startup not found'}</div>
      </div>
    )
  }

  // Convert valuation strings to numbers for calculations
  const currentValuation = parseFloat(startup.current_valuation.replace(/[^0-9.]/g, ''))
  const projectedValue = parseFloat(startup.projected_exit_value.replace(/[^0-9.]/g, ''))
  const progress = (currentValuation / projectedValue) * 100

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link href="/investments">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Investments
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="w-24 h-24 bg-singlife-light rounded-lg flex items-center justify-center">
            <Shield className="h-12 w-12 text-singlife-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{startup.company_name}</h1>
              <Badge variant="outline" className="text-base">{startup.stage}</Badge>
            </div>
            <p className="text-lg text-gray-600 mb-4 max-w-3xl">
              {startup.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{startup.product_stage}</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="bg-singlife-primary hover:bg-singlife-primary/90">
            Contact Team
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Company Overview</TabsTrigger>
                <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                {/* Key Metrics */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <Card className="p-4">
                    <DollarSign className="h-5 w-5 text-gray-500 mb-2" />
                    <div className="text-sm text-gray-500">Valuation</div>
                    <div className="text-xl font-bold">{startup.current_valuation}</div>
                  </Card>
                  <Card className="p-4">
                    <TrendingUp className="h-5 w-5 text-gray-500 mb-2" />
                    <div className="text-sm text-gray-500">Growth</div>
                    <div className="text-xl font-bold">{startup.revenue_growth}</div>
                  </Card>
                  <Card className="p-4">
                    <Users2 className="h-5 w-5 text-gray-500 mb-2" />
                    <div className="text-sm text-gray-500">User Growth</div>
                    <div className="text-xl font-bold">{startup.user_growth}</div>
                  </Card>
                  <Card className="p-4">
                    <Building2 className="h-5 w-5 text-gray-500 mb-2" />
                    <div className="text-sm text-gray-500">Stage</div>
                    <div className="text-xl font-bold">{startup.product_stage}</div>
                  </Card>
                </div>

                {/* Company Info */}
                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">About {startup.company_name}</h2>
                  <p className="text-gray-600 mb-6">{startup.description}</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <Users2 className="h-4 w-4" />
                        Founders: {startup.founders}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        Market Size: {startup.tam}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <Calendar className="h-4 w-4" />
                        Exit Timeline: {startup.exit_timeline}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp className="h-4 w-4" />
                        Market Growth: {startup.market_growth_rate}
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="risk-analysis">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Risk Analysis</h3>
                      <p className="text-sm text-gray-500">AI-powered investment analysis</p>
                    </div>
                    {!analysis && !isLoading && !error && (
                      <div className="text-center py-8">
                        <button
                          onClick={() => generateAnalysis(startup)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Generate Risk Analysis
                        </button>
                      </div>
                    )}
                  </div>

                  {isLoading && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating Analysis...</span>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">Error</h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>{error}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {analysis && (
                    <div className="grid grid-cols-3 gap-6">
                      {/* Market Analysis */}
                      <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <Globe className="h-5 w-5 text-blue-600" />
                          </div>
                          <h4 className="text-lg font-semibold">Market Analysis</h4>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium mb-1">Market Size</h5>
                            <p className="text-sm text-gray-600">{analysis.marketAnalysis.marketSizeAssessment}</p>
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Growth Potential</h5>
                            <p className="text-sm text-gray-600">{analysis.marketAnalysis.growthPotential}</p>
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Competitive Position</h5>
                            <p className="text-sm text-gray-600">{analysis.marketAnalysis.competitivePosition}</p>
                          </div>
                        </div>
                      </Card>

                      {/* Financial Analysis */}
                      <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-green-50 rounded-lg">
                            <DollarSign className="h-5 w-5 text-green-600" />
                          </div>
                          <h4 className="text-lg font-semibold">Financial Analysis</h4>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium mb-1">Revenue Projection</h5>
                            <p className="text-sm text-gray-600">{analysis.financialMetrics.revenueProjection}</p>
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Valuation</h5>
                            <p className="text-sm text-gray-600">{analysis.financialMetrics.valuationAssessment}</p>
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Return Potential</h5>
                            <p className="text-sm text-gray-600">{analysis.financialMetrics.returnPotential}</p>
                          </div>
                        </div>
                      </Card>

                      {/* Risk Assessment */}
                      <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-red-50 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          </div>
                          <h4 className="text-lg font-semibold">Risk Assessment</h4>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h5 className="font-medium">Risk Level</h5>
                              <Badge variant={
                                analysis.investmentRecommendation.riskLevel === "high" ? "destructive" :
                                analysis.investmentRecommendation.riskLevel === "medium" ? "secondary" :
                                "default"
                              }>
                                {analysis.investmentRecommendation.riskLevel.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-600">Key Risks:</p>
                              <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                                {analysis.riskAnalysis.marketRisks.slice(0, 2).map((risk, i) => (
                                  <li key={i}>{risk}</li>
                                ))}
                                {analysis.riskAnalysis.operationalRisks.slice(0, 1).map((risk, i) => (
                                  <li key={i}>{risk}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Key Metrics */}
                      <div className="col-span-3">
                        <Card className="p-6">
                          <h4 className="text-lg font-semibold mb-4">Key Metrics</h4>
                          <div className="grid grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">IRR</p>
                              <p className="text-2xl font-bold">{analysis.keyMetrics.irr.toFixed(1)}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Multiple</p>
                              <p className="text-2xl font-bold">{analysis.keyMetrics.multiple.toFixed(1)}x</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Payback Period</p>
                              <p className="text-2xl font-bold">{analysis.keyMetrics.paybackPeriod} mo</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Risk-Adjusted Return</p>
                              <p className="text-2xl font-bold">{analysis.keyMetrics.riskAdjustedReturn.toFixed(1)}%</p>
                            </div>
                          </div>
                        </Card>
                      </div>

                      {/* Investment Recommendation */}
                      <div className="col-span-3">
                        <Card className="p-6">
                          <h4 className="text-lg font-semibold mb-4">Investment Recommendation</h4>
                          <div className="space-y-4">
                            <p className="text-gray-600">{analysis.investmentRecommendation.expectedReturn}</p>
                            <div>
                              <h5 className="font-medium mb-2">Key Considerations</h5>
                              <ul className="list-disc pl-5 space-y-1">
                                {analysis.investmentRecommendation.keyConsiderations.map((item, i) => (
                                  <li key={i} className="text-gray-600">{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Investment Opportunity</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Exit Progress</span>
                    <span className="font-medium">
                      {startup.current_valuation} of {startup.projected_exit_value}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Revenue</span>
                    <span className="font-medium">{startup.arr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Rate</span>
                    <span className="font-medium">{startup.revenue_growth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exit Timeline</span>
                    <span className="font-medium">{startup.exit_timeline}</span>
                  </div>
                </div>

                <Button className="w-full bg-singlife-primary hover:bg-singlife-primary/90">
                  Express Interest
                </Button>

                <Button variant="outline" className="w-full">
                  Schedule Call
                </Button>
              </div>
            </Card>

            <Button className="w-full" variant="outline">
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 