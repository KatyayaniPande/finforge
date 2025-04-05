"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { 
  MapPin, 
  Users2, 
  Star,
  Shield,
  ArrowLeft,
  TrendingUp,
  Building2,
  Globe,
  ExternalLink,
  DollarSign,
  Calendar,
  ChevronUp,
  ChevronDown,
  Brain,
  PieChart,
  CheckCircle
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts"
import { cn } from "@/lib/utils"

// Sample data
const startups = {
  featured: [
    {
      id: 1,
      name: "NeuralKey",
      stage: "Series A",
      location: "San Francisco, CA",
      website: "https://neuralkey.ai",
      founded: "2022",
      description: "Enterprise-grade AI security platform with advanced threat detection and real-time monitoring for organizations of all sizes.",
      fundingCurrent: 1200000,
      fundingTarget: 2000000,
      daysLeft: 28,
      tags: ["AI", "Cybersecurity", "Enterprise"],
      teamSize: 28,
      rating: 4.8,
      icon: Shield,
      valuation: "15M",
      growth: "+63%",
      traction: "42 Enterprises",
      minimumInvestment: 50000,
      equityOffered: "4-8%",
      closingDate: "October 30, 2025",
      // Risk Analysis Data
      portfolioValue: "25.0M",
      riskScore: "72/100",
      monthlyReturn: "+2.1%",
      avgHoldPeriod: "3.2 yrs",
      riskMetrics: {
        startupRiskScore: "65/100",
        marketRisk: "58/100",
        financialHealth: "82/100",
        exitPotential: "75/100"
      },
      keyMetrics: {
        monthlyRevenue: "420K",
        revenueGrowth: "+28%",
        ltvCacRatio: "3.2x",
        burnRate: "850K/month",
        runway: "18 months",
        marketSize: "$15B",
        retention: "92%",
        churnRate: "0.8%",
        competitors: 8,
        productStage: "Revenue-generating",
        maus: "12,000",
        mrr: "$25K",
        momGrowth: "+18%",
        arpu: "$12/user/month",
        grossMargin: "65%"
      },
      businessMetrics: {
        revenue: {
          current: 420000,
          growth: 28,
          trend: "up"
        },
        ltv: {
          value: 125000,
          trend: "up"
        },
        cac: {
          value: 39000,
          trend: "down"
        },
        retention: {
          monthly: 92,
          trend: "up"
        },
        market: {
          tam: 15000000000,
          penetration: 0.8,
          trend: "up"
        },
        product: {
          stage: "Revenue-generating",
          maus: 12000,
          mrr: 25000,
          momGrowth: 18,
          arpu: 12,
          grossMargin: 65
        }
      },
      simulationParams: {
        marketGrowthRate: {
          min: 10,
          max: 50,
          current: 25
        },
        competitorImpact: {
          min: 10,
          max: 70,
          current: 40
        },
        monthlyBurnRate: {
          min: 500000,
          max: 2000000,
          current: 850000
        },
        initialInvestment: {
          min: 1000000,
          max: 10000000,
          current: 5000000
        }
      },
      aiAnalysis: {
        recommendation: "High-Risk Investment",
        confidence: "40%",
        keyPoints: [
          "Significant market challenges",
          "Financial metrics need improvement",
          "High competition in the space"
        ],
        opportunities: [
          "Large addressable market"
        ],
        risks: [
          "Highly competitive market",
          "High burn rate requires careful monitoring",
          "Limited runway requires immediate action"
        ]
      }
    }
  ]
}

type SimulationParamKey = 'marketGrowthRate' | 'competitorImpact' | 'monthlyBurnRate' | 'initialInvestment'

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
  const [activeTab, setActiveTab] = useState("overview")
  const [data, setData] = useState<AnalysisData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Find the startup by ID
  const startup = startups.featured.find(s => s.id === startupId)
  if (!startup) return <div>Startup not found</div>

  const Icon = startup.icon
  const progress = (startup.fundingCurrent / startup.fundingTarget) * 100
  const formattedCurrent = (startup.fundingCurrent / 1000000).toFixed(1)
  const formattedTarget = (startup.fundingTarget / 1000000).toFixed(1)

  useEffect(() => {
    const fetchData = async () => {
      if (!startup) return;
      
      try {
        setIsLoading(true);
        setError(null);

        // Prepare the analysis data
        const analysisData = {
          startupMetrics: {
            tam: startup.businessMetrics.market.tam,
            marketGrowthRate: startup.simulationParams.marketGrowthRate.current,
            productStage: startup.keyMetrics.productStage,
            userGrowth: {
              currentUsers: parseInt(startup.keyMetrics.maus.replace(/,/g, '')),
              monthlyGrowthRate: startup.businessMetrics.product.momGrowth,
              retentionRate: parseFloat(startup.keyMetrics.retention)
            },
            revenueGrowth: {
              currentRevenue: startup.businessMetrics.revenue.current,
              monthlyGrowthRate: startup.businessMetrics.revenue.growth,
              grossMargin: startup.businessMetrics.product.grossMargin
            },
            currentValuation: parseFloat(startup.valuation.replace('M', '')) * 1000000,
            projectedExitValue: 75000000,
            exitTimeline: 48
          }
        };

        console.log('Sending analysis data:', analysisData);

        const response = await fetch('/api/analyze-startup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(analysisData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Received response:', responseData);
        setData(responseData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startup]);

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
            <Icon className="h-12 w-12 text-singlife-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{startup.name}</h1>
              <Badge variant="outline" className="text-base">{startup.stage}</Badge>
            </div>
            <p className="text-lg text-gray-600 mb-4 max-w-3xl">
              {startup.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {startup.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Visit Website</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button className="bg-singlife-primary hover:bg-singlife-primary/90">
            Contact Team
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">Company Overview</TabsTrigger>
              <TabsTrigger value="risk-analysis" className="flex-1">Risk Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              {/* Key Metrics */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <Card className="p-4">
                  <DollarSign className="h-5 w-5 text-gray-500 mb-2" />
                  <div className="text-sm text-gray-500">Valuation</div>
                  <div className="text-xl font-bold">${startup.valuation}</div>
                </Card>
                <Card className="p-4">
                  <TrendingUp className="h-5 w-5 text-gray-500 mb-2" />
                  <div className="text-sm text-gray-500">Growth</div>
                  <div className="text-xl font-bold">{startup.growth}</div>
                </Card>
                <Card className="p-4">
                  <Users2 className="h-5 w-5 text-gray-500 mb-2" />
                  <div className="text-sm text-gray-500">Team Size</div>
                  <div className="text-xl font-bold">{startup.teamSize} employees</div>
                </Card>
                <Card className="p-4">
                  <Building2 className="h-5 w-5 text-gray-500 mb-2" />
                  <div className="text-sm text-gray-500">Traction</div>
                  <div className="text-xl font-bold">{startup.traction}</div>
                </Card>
              </div>

              {/* Company Info */}
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">About {startup.name}</h2>
                <p className="text-gray-600 mb-6">{startup.description}</p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Globe className="h-4 w-4" />
                      <a href={startup.website} className="text-singlife-primary hover:underline">
                        {startup.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {startup.location}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Calendar className="h-4 w-4" />
                      Founded {startup.founded}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users2 className="h-4 w-4" />
                      {startup.teamSize} employees
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="risk-analysis">
              <Card className="p-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">Risk Analysis</h3>
                    <p className="text-sm text-gray-500">AI-powered investment risk assessment</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">AI Analysis</Badge>
                </div>

                {/* Risk Analysis Content */}
                <div className="space-y-8">
                  {/* AI Analysis Summary */}
                  <Card className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Brain className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">AI Investment Analysis</h3>
                        <p className="text-sm text-gray-500">AI-powered risk assessment and recommendations</p>
                      </div>
                    </div>

                    {isLoading ? (
                      <div className="text-center py-8">Loading analysis...</div>
                    ) : error ? (
                      <div className="text-center text-red-500 py-8">{error}</div>
                    ) : data ? (
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-medium mb-3">Market Analysis</h4>
                            <div className="space-y-4">
                              <p className="text-gray-600">{data.marketAnalysis.marketSizeAssessment}</p>
                              <p className="text-gray-600">{data.marketAnalysis.growthPotential}</p>
                              <p className="text-gray-600">{data.marketAnalysis.competitivePosition}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-3">Financial Metrics</h4>
                            <div className="space-y-4">
                              <p className="text-gray-600">{data.financialMetrics.revenueProjection}</p>
                              <p className="text-gray-600">{data.financialMetrics.valuationAssessment}</p>
                              <p className="text-gray-600">{data.financialMetrics.returnPotential}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-medium mb-3">Risk Analysis</h4>
                            <div className="space-y-4">
                              <div>
                                <h5 className="text-sm font-medium mb-2">Market Risks</h5>
                                <ul className="space-y-2">
                                  {data.riskAnalysis.marketRisks.map((risk, index) => (
                                    <li key={index} className="flex items-center gap-2 text-gray-600">
                                      <ChevronDown className="h-4 w-4 text-red-500" />
                                      {risk}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium mb-2">Operational Risks</h5>
                                <ul className="space-y-2">
                                  {data.riskAnalysis.operationalRisks.map((risk, index) => (
                                    <li key={index} className="flex items-center gap-2 text-gray-600">
                                      <ChevronDown className="h-4 w-4 text-red-500" />
                                      {risk}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium mb-2">Financial Risks</h5>
                                <ul className="space-y-2">
                                  {data.riskAnalysis.financialRisks.map((risk, index) => (
                                    <li key={index} className="flex items-center gap-2 text-gray-600">
                                      <ChevronDown className="h-4 w-4 text-red-500" />
                                      {risk}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-3">Investment Recommendation</h4>
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={
                                  data.investmentRecommendation.riskLevel === "medium" 
                                    ? "bg-yellow-50 text-yellow-700"
                                    : "bg-red-50 text-red-700"
                                }>
                                  {data.investmentRecommendation.riskLevel}
                                </Badge>
                                <span className="text-sm text-gray-500">Risk Level</span>
                              </div>
                              <p className="text-gray-600">{data.investmentRecommendation.expectedReturn}</p>
                              <p className="text-gray-600">{data.investmentRecommendation.timeHorizon}</p>
                              <div>
                                <h5 className="text-sm font-medium mb-2">Key Considerations</h5>
                                <ul className="space-y-2">
                                  {data.investmentRecommendation.keyConsiderations.map((consideration, index) => (
                                    <li key={index} className="flex items-center gap-2 text-gray-600">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      {consideration}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </Card>

                  {/* Key Metrics */}
                  {data && (
                    <div className="grid grid-cols-4 gap-4">
                      <Card className="p-4 bg-gray-50">
                        <h4 className="text-sm text-gray-500 mb-1">IRR</h4>
                        <div className="text-xl font-bold text-green-500">
                          {data.keyMetrics.irr.toFixed(2)}%
                        </div>
                      </Card>
                      <Card className="p-4 bg-gray-50">
                        <h4 className="text-sm text-gray-500 mb-1">Multiple</h4>
                        <div className="text-xl font-bold">
                          {data.keyMetrics.multiple}x
                        </div>
                      </Card>
                      <Card className="p-4 bg-gray-50">
                        <h4 className="text-sm text-gray-500 mb-1">Payback Period</h4>
                        <div className="text-xl font-bold">
                          {data.keyMetrics.paybackPeriod} months
                        </div>
                      </Card>
                      <Card className="p-4 bg-gray-50">
                        <h4 className="text-sm text-gray-500 mb-1">Risk-Adjusted Return</h4>
                        <div className="text-xl font-bold text-blue-500">
                          {data.keyMetrics.riskAdjustedReturn.toFixed(2)}%
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Investment Opportunity */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Investment Opportunity</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Funding Progress</span>
                  <span className="font-medium">
                    ${formattedCurrent}M of ${formattedTarget}M
                  </span>
                </div>
                <Progress 
                  value={progress} 
                  className="h-2"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum Investment</span>
                  <span className="font-medium">${startup.minimumInvestment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Equity Offered</span>
                  <span className="font-medium">{startup.equityOffered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Closing Date</span>
                  <span className="font-medium">{startup.closingDate}</span>
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

          {/* Generate Report Button */}
          <Button className="w-full" variant="outline">
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  )
} 