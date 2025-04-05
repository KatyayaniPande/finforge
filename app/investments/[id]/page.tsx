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
  ChevronDown
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
        burnRate: "850K/month",
        runway: "18 months",
        marketSize: "$15B",
        competitors: 8
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

interface SimulationValues {
  marketGrowthRate: number
  competitorImpact: number
  monthlyBurnRate: number
  initialInvestment: number
}

interface SimulationResults {
  expectedReturn: number
  successRate: number
  potentialRange: { min: number; max: number }
  breakEvenTime: number
}

export default function StartupDetailsPage() {
  const params = useParams()
  const startupId = parseInt(params.id as string)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedScenario, setSelectedScenario] = useState("base")
  const [simulationResults, setSimulationResults] = useState<SimulationResults>({
    expectedReturn: -0.3,
    successRate: 0,
    potentialRange: { min: 0.5, max: 1.1 },
    breakEvenTime: 0
  })
  const [simulationValues, setSimulationValues] = useState<SimulationValues>({
    marketGrowthRate: 25,
    competitorImpact: 40,
    monthlyBurnRate: 850000,
    initialInvestment: 5000000
  })

  // Find the startup by ID
  const startup = startups.featured.find(s => s.id === startupId)
  if (!startup) return <div>Startup not found</div>

  const Icon = startup.icon
  const progress = (startup.fundingCurrent / startup.fundingTarget) * 100
  const formattedCurrent = (startup.fundingCurrent / 1000000).toFixed(1)
  const formattedTarget = (startup.fundingTarget / 1000000).toFixed(1)

  // Monte Carlo simulation calculation
  const calculateSimulationResults = (values: SimulationValues, scenario: string): SimulationResults => {
    const {
      marketGrowthRate,
      competitorImpact,
      monthlyBurnRate,
      initialInvestment
    } = values

    // Base multipliers for different scenarios
    const scenarioMultipliers = {
      base: 1,
      conservative: 0.8,
      aggressive: 1.2
    }

    // Calculate growth factor based on market growth and competitor impact
    const growthFactor = (marketGrowthRate / 100) * (1 - competitorImpact / 100)
    
    // Calculate burn rate impact
    const burnRateImpact = 1 - (monthlyBurnRate / initialInvestment) * 0.1
    
    // Calculate expected return based on scenario
    const baseReturn = growthFactor * burnRateImpact * scenarioMultipliers[scenario as keyof typeof scenarioMultipliers]
    const expectedReturn = baseReturn * 5 // 5-year projection
    
    // Calculate success rate based on parameters
    const successRate = Math.min(
      100,
      Math.max(
        0,
        (marketGrowthRate - competitorImpact) * (1 - monthlyBurnRate / (initialInvestment * 0.2))
      )
    )
    
    // Calculate potential range
    const volatility = competitorImpact / 100
    const minReturn = expectedReturn * (1 - volatility)
    const maxReturn = expectedReturn * (1 + volatility)
    
    // Calculate break-even time (in years)
    const breakEvenTime = initialInvestment / (monthlyBurnRate * 12) * burnRateImpact

    return {
      expectedReturn: Number(expectedReturn.toFixed(1)),
      successRate: Math.round(successRate),
      potentialRange: {
        min: Number(minReturn.toFixed(1)),
        max: Number(maxReturn.toFixed(1))
      },
      breakEvenTime: Number(breakEvenTime.toFixed(1))
    }
  }

  // Monte Carlo simulation data generation
  const generateSimulationData = (scenario: string) => {
    const { initialInvestment, competitorImpact } = simulationValues
    const results = calculateSimulationResults(simulationValues, scenario)
    const baseMultiplier = results.expectedReturn
    
    return Array.from({ length: 60 }, (_, i) => {
      const month = i + 1
      const baseValue = initialInvestment * (1 + baseMultiplier * (month / 60))
      const volatility = competitorImpact / 100
      
      return {
        month,
        baseCase: baseValue,
        baseCaseUpper: baseValue * (1 + volatility * 0.5),
        baseCaseLower: baseValue * (1 - volatility * 0.5),
        conservative: baseValue * 0.8,
        conservativeUpper: baseValue * 0.8 * (1 + volatility * 0.5),
        conservativeLower: baseValue * 0.8 * (1 - volatility * 0.5),
        aggressive: baseValue * 1.2,
        aggressiveUpper: baseValue * 1.2 * (1 + volatility * 0.5),
        aggressiveLower: baseValue * 1.2 * (1 - volatility * 0.5),
      }
    })
  }

  // Update simulation results when parameters change
  useEffect(() => {
    const results = calculateSimulationResults(simulationValues, selectedScenario)
    setSimulationResults(results)
  }, [simulationValues, selectedScenario])

  const simulationData = generateSimulationData(selectedScenario)

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/investments">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Investments
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-start gap-6">
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
      <div className="grid grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="col-span-2">
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
              {/* AI Investment Analysis - Moved to top */}
              <Card className="p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">AI Investment Analysis</h3>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-green-50">
                      {startup.aiAnalysis.confidence} Confidence
                    </Badge>
                    <Badge variant="outline">AI-Powered</Badge>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-red-500">
                      {startup.aiAnalysis.recommendation}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Overall Score:</span>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700">
                        72/100
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Growth and Capital Efficiency */}
                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="font-medium mb-3 text-gray-900">Growth & Capital Efficiency</h4>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">ARR Growth Rate</div>
                        <div className="text-lg font-semibold text-green-600">+187%</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Growth/Burn Ratio</div>
                        <div className="text-lg font-semibold">2.2x</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">CAC Payback</div>
                        <div className="text-lg font-semibold">9.5 mo</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Strong growth momentum with 187% YoY ARR growth, outperforming 75% of peers. 
                      Growth efficiency shows promise with a 2.2x growth-to-burn ratio, though CAC payback 
                      period needs improvement.
                    </p>
                  </div>

                  {/* Product-Market Fit */}
                  <div>
                    <h4 className="font-medium mb-3 text-gray-900">Product-Market Fit</h4>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">NPS Score</div>
                        <div className="text-lg font-semibold">72</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">12-Mo Retention</div>
                        <div className="text-lg font-semibold text-green-600">89%</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Expansion Revenue</div>
                        <div className="text-lg font-semibold">142%</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Strong product-market fit indicators with NPS of 72 and exceptional retention at 89%. 
                      Net revenue retention of 142% suggests strong product stickiness and customer value realization.
                    </p>
                  </div>

                  {/* Team and Execution */}
                  <div>
                    <h4 className="font-medium mb-3 text-gray-900">Team & Execution</h4>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Hiring Velocity</div>
                        <div className="text-lg font-semibold">+12/mo</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Sales Cycle</div>
                        <div className="text-lg font-semibold">45 days</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Win Rate</div>
                        <div className="text-lg font-semibold">38%</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Team demonstrates strong execution with consistent hiring velocity and improving sales metrics. 
                      Key executive positions filled in Engineering and Sales, with planned CPO hire in Q3.
                    </p>
                  </div>

                  {/* Market Position & Competition */}
                  <div>
                    <h4 className="font-medium mb-3 text-gray-900">Market Position & Competition</h4>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Market Share</div>
                        <div className="text-lg font-semibold">4.2%</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Pricing Power</div>
                        <div className="text-lg font-semibold text-green-600">High</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Competitor Count</div>
                        <div className="text-lg font-semibold">8</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Growing market presence with 4.2% share in enterprise segment. Strong pricing power 
                      demonstrated by 15% price increase acceptance. Competitive position strengthening vs key rivals.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Key Strengths</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-600">
                        <ChevronUp className="h-4 w-4 text-green-500" />
                        Strong growth efficiency metrics (2.2x growth/burn)
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <ChevronUp className="h-4 w-4 text-green-500" />
                        Exceptional customer retention (89% at 12 months)
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <ChevronUp className="h-4 w-4 text-green-500" />
                        High net revenue retention at 142%
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <ChevronUp className="h-4 w-4 text-green-500" />
                        Strong product-market fit indicators (NPS 72)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Risk Factors</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-600">
                        <ChevronDown className="h-4 w-4 text-red-500" />
                        CAC payback period above target (9.5 months)
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <ChevronDown className="h-4 w-4 text-red-500" />
                        Key product leadership position still vacant
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <ChevronDown className="h-4 w-4 text-red-500" />
                        Technical debt in core platform components
                      </li>
                      <li className="flex items-center gap-2 text-gray-600">
                        <ChevronDown className="h-4 w-4 text-red-500" />
                        High competition in enterprise segment
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Portfolio Overview */}
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Portfolio Value</div>
                    <div className="text-xl font-bold">${startup.portfolioValue}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Risk Score</div>
                    <div className="text-xl font-bold">{startup.riskScore}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Monthly Return</div>
                    <div className="text-xl font-bold text-green-500">{startup.monthlyReturn}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Avg. Hold Period</div>
                    <div className="text-xl font-bold">{startup.avgHoldPeriod}</div>
                  </div>
                </div>
              </Card>

              {/* Risk Metrics */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Risk Metrics</h3>
                  <div className="space-y-4">
                    {Object.entries(startup.riskMetrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-gray-600">
                          {key.replace(/([A-Z])/g, ' $1').split(' ').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
                  <div className="space-y-4">
                    {Object.entries(startup.keyMetrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-gray-600">
                          {key.replace(/([A-Z])/g, ' $1').split(' ').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Investment Scenario Simulation */}
              <Card className="p-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">Investment Scenario Simulation</h3>
                    <p className="text-sm text-gray-500">Compare different investment scenarios and analyze potential outcomes</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">Monte Carlo Analysis</Badge>
                </div>
                
                <div className="flex gap-2 mb-6">
                  <Button 
                    variant={selectedScenario === "base" ? "destructive" : "outline"} 
                    className={cn(
                      "flex-1",
                      selectedScenario === "base" ? "bg-orange-600 hover:bg-orange-700 text-white border-orange-600" : ""
                    )}
                    onClick={() => setSelectedScenario("base")}
                  >
                    Base Case
                  </Button>
                  <Button 
                    variant={selectedScenario === "conservative" ? "destructive" : "outline"} 
                    className={cn(
                      "flex-1",
                      selectedScenario === "conservative" ? "bg-orange-600 hover:bg-orange-700 text-white border-orange-600" : ""
                    )}
                    onClick={() => setSelectedScenario("conservative")}
                  >
                    Conservative
                  </Button>
                  <Button 
                    variant={selectedScenario === "aggressive" ? "destructive" : "outline"} 
                    className={cn(
                      "flex-1",
                      selectedScenario === "aggressive" ? "bg-orange-600 hover:bg-orange-700 text-white border-orange-600" : ""
                    )}
                    onClick={() => setSelectedScenario("aggressive")}
                  >
                    Aggressive
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2">
                    {/* Monte Carlo Simulation Graph */}
                    <div className="h-[300px] mb-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={simulationData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
                          />
                          <Tooltip 
                            formatter={(value) => `$${(Number(value) / 1000000).toFixed(1)}M`}
                            labelFormatter={(label) => `Month ${label}`}
                          />
                          {/* Base Case */}
                          <Area
                            type="monotone"
                            dataKey="baseCaseUpper"
                            stackId="1"
                            stroke="none"
                            fill="#fee2e2"
                            fillOpacity={selectedScenario === "base" ? 0.5 : 0.1}
                          />
                          <Area
                            type="monotone"
                            dataKey="baseCase"
                            stackId="2"
                            stroke="#ef4444"
                            strokeWidth={selectedScenario === "base" ? 2 : 1}
                            fill="#fecaca"
                            fillOpacity={selectedScenario === "base" ? 0.3 : 0.1}
                          />
                          <Area
                            type="monotone"
                            dataKey="baseCaseLower"
                            stackId="3"
                            stroke="none"
                            fill="#fee2e2"
                            fillOpacity={selectedScenario === "base" ? 0.5 : 0.1}
                          />
                          {/* Conservative Case */}
                          <Area
                            type="monotone"
                            dataKey="conservativeUpper"
                            stackId="4"
                            stroke="none"
                            fill="#e0f2fe"
                            fillOpacity={selectedScenario === "conservative" ? 0.5 : 0.1}
                          />
                          <Area
                            type="monotone"
                            dataKey="conservative"
                            stackId="5"
                            stroke="#0ea5e9"
                            strokeWidth={selectedScenario === "conservative" ? 2 : 1}
                            fill="#bae6fd"
                            fillOpacity={selectedScenario === "conservative" ? 0.3 : 0.1}
                          />
                          <Area
                            type="monotone"
                            dataKey="conservativeLower"
                            stackId="6"
                            stroke="none"
                            fill="#e0f2fe"
                            fillOpacity={selectedScenario === "conservative" ? 0.5 : 0.1}
                          />
                          {/* Aggressive Case */}
                          <Area
                            type="monotone"
                            dataKey="aggressiveUpper"
                            stackId="7"
                            stroke="none"
                            fill="#f1f5f9"
                            fillOpacity={selectedScenario === "aggressive" ? 0.5 : 0.1}
                          />
                          <Area
                            type="monotone"
                            dataKey="aggressive"
                            stackId="8"
                            stroke="#64748b"
                            strokeWidth={selectedScenario === "aggressive" ? 2 : 1}
                            fill="#e2e8f0"
                            fillOpacity={selectedScenario === "aggressive" ? 0.3 : 0.1}
                          />
                          <Area
                            type="monotone"
                            dataKey="aggressiveLower"
                            stackId="9"
                            stroke="none"
                            fill="#f1f5f9"
                            fillOpacity={selectedScenario === "aggressive" ? 0.5 : 0.1}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-4">Simulation Parameters</h4>
                    <div className="space-y-6">
                      {(Object.entries(startup.simulationParams) as [SimulationParamKey, any][]).map(([key, value]) => (
                        <div key={key}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">
                              {key.replace(/([A-Z])/g, ' $1').split(' ').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </span>
                          </div>
                          <div className="relative">
                            <Slider
                              defaultValue={[value.current]}
                              min={value.min}
                              max={value.max}
                              step={key.includes('Rate') ? 1 : 100000}
                              onValueChange={(newValue) => {
                                setSimulationValues(prev => ({
                                  ...prev,
                                  [key]: newValue[0]
                                }))
                              }}
                              className="mb-2"
                            />
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">
                              {key.includes('Rate') ? `${value.min}%` : (
                                value.min >= 1000000
                                  ? `$${(value.min / 1000000).toFixed(0)}M`
                                  : `$${(value.min / 1000).toFixed(0)}K`
                              )}
                            </span>
                            <span className="text-xs text-gray-500">
                              {key.includes('Rate') ? `${value.max}%` : (
                                value.max >= 1000000
                                  ? `$${(value.max / 1000000).toFixed(0)}M`
                                  : `$${(value.max / 1000).toFixed(0)}K`
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Simulation Results */}
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Expected Return (5Y)</div>
                    <div className={cn(
                      "text-xl font-semibold",
                      simulationResults.expectedReturn > 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {simulationResults.expectedReturn}x
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Success Rate</div>
                    <div className="text-xl font-semibold">{simulationResults.successRate}%</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Potential Range</div>
                    <div className="text-xl font-semibold">
                      {simulationResults.potentialRange.min}x - {simulationResults.potentialRange.max}x
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Break-Even Time</div>
                    <div className="text-xl font-semibold">{simulationResults.breakEvenTime} years</div>
                  </div>
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