"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts"
import {
  AlertTriangle,
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart2,
  Target,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Percent,
  Clock,
  Activity,
  Shield,
  Zap,
  Brain,
  CheckCircle,
} from "lucide-react"

// Sample data - In a real app, this would come from your API/database
const portfolioData = {
  totalValue: 25000000,
  riskScore: 72,
  allocation: [
    { name: "Tech Startups", value: 45 },
    { name: "HealthTech", value: 25 },
    { name: "FinTech", value: 20 },
    { name: "CleanTech", value: 10 },
  ],
  performance: [
    { month: "Jan", return: 2.5 },
    { month: "Feb", return: 1.8 },
    { month: "Mar", return: -0.5 },
    { month: "Apr", return: 3.2 },
    { month: "May", return: 2.1 },
    { month: "Jun", return: 1.5 },
  ],
}

const startupRiskData = {
  name: "NeuralKey",
  riskScore: 65,
  marketRisk: 58,
  financialHealth: 82,
  exitPotential: 75,
  burnRate: "850K/month",
  runway: "18 months",
  marketSize: "15B",
  competitorCount: 8,
  lastValuation: "42M",
  projectedValuation: "120M",
  exitScenarios: [
    { scenario: "Conservative", value: 80000000, probability: 0.3 },
    { scenario: "Base", value: 120000000, probability: 0.5 },
    { scenario: "Optimistic", value: 200000000, probability: 0.2 },
  ],
}

const COLORS = ["#00A0E9", "#2C3E50", "#FF6B6B", "#2ECC71"]

interface SimulationParams {
  marketGrowth: number
  competitorImpact: number
  burnRate: number
  initialInvestment: number
}

interface TimelinePoint {
  month: number
  value: number
}

interface SimulationResult {
  finalValue: number
  timeline: TimelinePoint[]
}

interface RiskMetrics {
  mean: number
  median: number
  min: number
  max: number
  percentile95: number
  percentile05: number
  successRate: number
}

interface SimulationScenario {
  name: string
  params: SimulationParams
  results: SimulationResult[] | null
  metrics: RiskMetrics | null
  timeline: TimelinePoint[] | null
}

// Monte Carlo simulation function
function monteCarloSimulation(params: SimulationParams, iterations: number = 1000): SimulationResult[] {
  const results: SimulationResult[] = []
  const timeHorizon = 60 // 5 years in months
  const baseValue = Number(startupRiskData.lastValuation.replace(/[^0-9.]/g, '')) * 1000000 // Convert "42M" to number
  
  for (let i = 0; i < iterations; i++) {
    let value = baseValue
    let monthlyGrowth = (params.marketGrowth / 100) / 12 // Convert annual growth to monthly
    let monthlyBurnRate = params.burnRate
    let competitorImpact = params.competitorImpact / 100
    
    const timeline: TimelinePoint[] = []
    for (let month = 0; month < timeHorizon; month++) {
      // Market volatility factor (random walk with drift)
      const volatility = 0.15 // 15% annual volatility
      const randomFactor = Math.random() * 2 - 1 // Random number between -1 and 1
      const monthlyVolatility = (volatility * randomFactor) / Math.sqrt(12)
      
      // Competitor impact (increases over time)
      const competitorFactor = 1 - (competitorImpact * (month / timeHorizon))
      
      // Calculate growth with all factors
      const growthRate = monthlyGrowth * competitorFactor * (1 + monthlyVolatility)
      value = value * (1 + growthRate) - monthlyBurnRate
      
      // Add milestone boosts (e.g., product launches, partnerships)
      if (month % 12 === 0 && Math.random() > 0.7) { // 30% chance of milestone boost each year
        value *= 1.1 // 10% boost
      }
      
      timeline.push({
        month,
        value: Math.max(0, value),
      })
    }
    
    results.push({
      finalValue: Math.max(0, value),
      timeline,
    })
  }
  
  return results
}

// Calculate risk metrics based on simulation results
function calculateRiskMetrics(results: SimulationResult[]): RiskMetrics {
  const finalValues = results.map(r => r.finalValue)
  const sortedValues = [...finalValues].sort((a, b) => a - b)
  const baseValue = Number(startupRiskData.lastValuation.replace(/[^0-9.]/g, '')) * 1000000
  
  return {
    mean: finalValues.reduce((a, b) => a + b, 0) / finalValues.length,
    median: sortedValues[Math.floor(sortedValues.length / 2)],
    min: Math.min(...finalValues),
    max: Math.max(...finalValues),
    percentile95: sortedValues[Math.floor(sortedValues.length * 0.95)],
    percentile05: sortedValues[Math.floor(sortedValues.length * 0.05)],
    successRate: finalValues.filter(v => v > baseValue * 2).length / finalValues.length,
  }
}

// Add this new function for AI-generated advice
function generateInvestmentAdvice(
  startupData: typeof startupRiskData,
  metrics: RiskMetrics | null,
  scenario: SimulationScenario
): {
  recommendation: string
  confidence: number
  keyPoints: string[]
  risks: string[]
  opportunities: string[]
} {
  const riskScore = startupData.riskScore
  const marketRisk = startupData.marketRisk
  const financialHealth = startupData.financialHealth
  const exitPotential = startupData.exitPotential
  const marketSize = Number(startupData.marketSize.replace(/[^0-9.]/g, ''))
  const competitorCount = startupData.competitorCount
  const burnRate = Number(startupData.burnRate.replace(/[^0-9.]/g, ''))
  const runway = Number(startupData.runway.replace(/[^0-9.]/g, ''))
  
  // Calculate overall health score
  const healthScore = (financialHealth + exitPotential) / 2
  const marketScore = (100 - marketRisk) * (marketSize / 100)
  
  // Determine recommendation
  let recommendation = ""
  let confidence = 0
  const keyPoints: string[] = []
  const risks: string[] = []
  const opportunities: string[] = []
  
  if (healthScore > 75 && marketScore > 60) {
    recommendation = "Strong Investment Opportunity"
    confidence = 85
    keyPoints.push(
      "Strong financial health and exit potential",
      "Favorable market conditions",
      "Competitive advantage in the market"
    )
  } else if (healthScore > 60 && marketScore > 40) {
    recommendation = "Moderate Investment Opportunity"
    confidence = 65
    keyPoints.push(
      "Solid financial metrics",
      "Growing market potential",
      "Some competitive pressure"
    )
  } else {
    recommendation = "High-Risk Investment"
    confidence = 40
    keyPoints.push(
      "Significant market challenges",
      "Financial metrics need improvement",
      "High competition in the space"
    )
  }
  
  // Add scenario-specific insights
  if (scenario.name === "Aggressive") {
    if (metrics && metrics.successRate > 0.6) {
      opportunities.push(
        "High growth potential with aggressive strategy",
        "Strong market capture opportunity",
        "Potential for significant returns"
      )
    } else {
      risks.push(
        "High burn rate in aggressive scenario",
        "Increased market competition risk",
        "Higher capital requirements"
      )
    }
  } else if (scenario.name === "Conservative") {
    if (metrics && metrics.successRate > 0.8) {
      opportunities.push(
        "Stable growth with lower risk",
        "Sustainable business model",
        "Strong cash flow potential"
      )
    } else {
      risks.push(
        "Limited market capture in conservative approach",
        "Potential for missed growth opportunities",
        "Longer path to profitability"
      )
    }
  }
  
  // Add market-specific insights
  if (marketSize > 10) {
    opportunities.push("Large addressable market")
  } else {
    risks.push("Limited market size")
  }
  
  if (competitorCount < 5) {
    opportunities.push("Limited direct competition")
  } else {
    risks.push("Highly competitive market")
  }
  
  // Add financial insights
  if (burnRate < 500) {
    opportunities.push("Efficient capital utilization")
  } else {
    risks.push("High burn rate requires careful monitoring")
  }
  
  if (runway > 18) {
    opportunities.push("Comfortable runway for growth")
  } else {
    risks.push("Limited runway requires immediate action")
  }
  
  return {
    recommendation,
    confidence,
    keyPoints,
    risks,
    opportunities
  }
}

export default function RiskAnalysisPage() {
  const [activeScenario, setActiveScenario] = useState<string>("base")
  const [scenarios, setScenarios] = useState<Record<string, SimulationScenario>>({
    base: {
      name: "Base Case",
      params: {
        marketGrowth: 20,
        competitorImpact: 30,
        burnRate: 850000,
        initialInvestment: 1000000,
      },
      results: null,
      metrics: null,
      timeline: null,
    },
    conservative: {
      name: "Conservative",
      params: {
        marketGrowth: 15,
        competitorImpact: 50,
        burnRate: 1000000,
        initialInvestment: 1000000,
      },
      results: null,
      metrics: null,
      timeline: null,
    },
    aggressive: {
      name: "Aggressive",
      params: {
        marketGrowth: 40,
        competitorImpact: 20,
        burnRate: 1500000,
        initialInvestment: 2000000,
      },
      results: null,
      metrics: null,
      timeline: null,
    },
  })

  // Run simulation for all scenarios on mount
  useEffect(() => {
    const updatedScenarios = { ...scenarios }
    Object.keys(scenarios).forEach(key => {
      const scenario = scenarios[key]
      const results = monteCarloSimulation(scenario.params)
      const metrics = calculateRiskMetrics(results)
      const medianIndex = Math.floor(results.length / 2)
      const medianTimeline = results[medianIndex].timeline

      updatedScenarios[key] = {
        ...scenario,
        results,
        metrics,
        timeline: medianTimeline,
      }
    })
    setScenarios(updatedScenarios)
  }, [])

  const updateScenario = (scenarioKey: string, params: SimulationParams) => {
    const results = monteCarloSimulation(params)
    const metrics = calculateRiskMetrics(results)
    const medianIndex = Math.floor(results.length / 2)
    const medianTimeline = results[medianIndex].timeline

    setScenarios({
      ...scenarios,
      [scenarioKey]: {
        ...scenarios[scenarioKey],
        params,
        results,
        metrics,
        timeline: medianTimeline,
      },
    })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Risk Analysis</h1>
          <p className="text-gray-500">
            Analyze investment risk and portfolio impact for {startupRiskData.name}
          </p>
        </div>
        <Button className="bg-singlife-primary hover:bg-singlife-primary/90">
          Generate Report
        </Button>
      </div>

      <div className="space-y-8">
        {/* Portfolio Overview */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Portfolio Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 bg-gray-50">
              <DollarSign className="h-5 w-5 text-gray-500 mb-2" />
              <div className="text-sm text-gray-500">Portfolio Value</div>
              <div className="text-xl font-bold">
                ${(portfolioData.totalValue / 1000000).toFixed(1)}M
              </div>
            </Card>
            <Card className="p-4 bg-gray-50">
              <Shield className="h-5 w-5 text-gray-500 mb-2" />
              <div className="text-sm text-gray-500">Risk Score</div>
              <div className="text-xl font-bold">{portfolioData.riskScore}/100</div>
            </Card>
            <Card className="p-4 bg-gray-50">
              <Activity className="h-5 w-5 text-gray-500 mb-2" />
              <div className="text-sm text-gray-500">Monthly Return</div>
              <div className="text-xl font-bold text-green-500">+2.1%</div>
            </Card>
            <Card className="p-4 bg-gray-50">
              <Clock className="h-5 w-5 text-gray-500 mb-2" />
              <div className="text-sm text-gray-500">Avg. Hold Period</div>
              <div className="text-xl font-bold">3.2 yrs</div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Asset Allocation</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioData.allocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {portfolioData.allocation.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Historical Performance</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={portfolioData.performance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="return" fill="#00A0E9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        {/* Simulation Section - Now Full Width */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Investment Scenario Simulation</h2>
              <p className="text-gray-500 mt-1">
                Compare different investment scenarios and analyze potential outcomes
              </p>
            </div>
            <Badge variant="outline" className="bg-blue-50">
              <Zap className="h-4 w-4 text-blue-500 mr-1" />
              Monte Carlo Analysis
            </Badge>
          </div>

          <div className="mb-6">
            <div className="flex space-x-4 mb-4">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <Button
                  key={key}
                  variant={activeScenario === key ? "default" : "outline"}
                  onClick={() => setActiveScenario(key)}
                  className={activeScenario === key ? "bg-singlife-primary hover:bg-singlife-primary/90" : ""}
                >
                  {scenario.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Parameters Column */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Simulation Parameters</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Market Growth Rate (% per year)
                    </label>
                    <Slider
                      defaultValue={[scenarios[activeScenario].params.marketGrowth]}
                      max={100}
                      step={1}
                      className="mb-4"
                      onValueChange={(values: number[]) =>
                        updateScenario(activeScenario, {
                          ...scenarios[activeScenario].params,
                          marketGrowth: values[0],
                        })
                      }
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Conservative: 10%</span>
                      <span>Aggressive: 50%+</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Competitor Impact (% market share loss)
                    </label>
                    <Slider
                      defaultValue={[scenarios[activeScenario].params.competitorImpact]}
                      max={100}
                      step={1}
                      className="mb-4"
                      onValueChange={(values: number[]) =>
                        updateScenario(activeScenario, {
                          ...scenarios[activeScenario].params,
                          competitorImpact: values[0],
                        })
                      }
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Low: 10%</span>
                      <span>High: 70%</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Monthly Burn Rate ($K)
                    </label>
                    <Slider
                      defaultValue={[scenarios[activeScenario].params.burnRate / 1000]}
                      max={2000}
                      step={50}
                      className="mb-4"
                      onValueChange={(values: number[]) =>
                        updateScenario(activeScenario, {
                          ...scenarios[activeScenario].params,
                          burnRate: values[0] * 1000,
                        })
                      }
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Efficient: $500K</span>
                      <span>High Growth: $2M</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Initial Investment ($M)
                    </label>
                    <Slider
                      defaultValue={[scenarios[activeScenario].params.initialInvestment / 1000000]}
                      max={10}
                      step={0.1}
                      className="mb-4"
                      onValueChange={(values: number[]) =>
                        updateScenario(activeScenario, {
                          ...scenarios[activeScenario].params,
                          initialInvestment: values[0] * 1000000,
                        })
                      }
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Min: $1M</span>
                      <span>Max: $10M</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-gray-50">
                  <h4 className="text-sm text-gray-500 mb-1">Expected Return (5Y)</h4>
                  <div className="text-xl font-bold text-green-500">
                    {scenarios[activeScenario].metrics ? 
                      `${((scenarios[activeScenario].metrics.mean / (Number(startupRiskData.lastValuation.replace(/[^0-9.]/g, '')) * 1000000)) - 1).toFixed(1)}x` : 
                      '-'
                    }
                  </div>
                </Card>
                <Card className="p-4 bg-gray-50">
                  <h4 className="text-sm text-gray-500 mb-1">Success Rate</h4>
                  <div className="text-xl font-bold text-blue-500">
                    {scenarios[activeScenario].metrics ? 
                      `${(scenarios[activeScenario].metrics.successRate * 100).toFixed(0)}%` : 
                      '-'
                    }
                  </div>
                </Card>
                <Card className="p-4 bg-gray-50">
                  <h4 className="text-sm text-gray-500 mb-1">Potential Range</h4>
                  <div className="text-xl font-bold">
                    {scenarios[activeScenario].metrics ? 
                      `${(scenarios[activeScenario].metrics.percentile05 / (Number(startupRiskData.lastValuation.replace(/[^0-9.]/g, '')) * 1000000)).toFixed(1)}x - ${(scenarios[activeScenario].metrics.percentile95 / (Number(startupRiskData.lastValuation.replace(/[^0-9.]/g, '')) * 1000000)).toFixed(1)}x` : 
                      '-'
                    }
                  </div>
                </Card>
                <Card className="p-4 bg-gray-50">
                  <h4 className="text-sm text-gray-500 mb-1">Break-Even Time</h4>
                  <div className="text-xl font-bold">
                    {scenarios[activeScenario].timeline ? 
                      `${Math.ceil(scenarios[activeScenario].timeline.findIndex((point: TimelinePoint) => 
                        point.value > Number(startupRiskData.lastValuation.replace(/[^0-9.]/g, '')) * 1000000 * 1.5
                      ) / 12)} years` : 
                      '-'
                    }
                  </div>
                </Card>
              </div>
            </div>

            {/* Visualization Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart>
                    <defs>
                      {Object.entries(scenarios).map(([key, scenario], index) => (
                        <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS[index]} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={COLORS[index]} stopOpacity={0}/>
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="month" 
                      label={{ value: 'Months', position: 'bottom' }}
                    />
                    <YAxis 
                      label={{ value: 'Valuation ($M)', angle: -90, position: 'insideLeft' }}
                      tickFormatter={(value: number) => `$${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, 'Valuation']}
                      labelFormatter={(label: number) => `Month ${label}`}
                    />
                    <Legend />
                    {Object.entries(scenarios).map(([key, scenario], index) => (
                      scenario.timeline && (
                        <Area 
                          key={key}
                          type="monotone" 
                          data={scenario.timeline}
                          dataKey="value" 
                          name={scenario.name}
                          stroke={COLORS[index]}
                          fillOpacity={activeScenario === key ? 0.3 : 0.1}
                          fill={`url(#color${key})`}
                          strokeWidth={activeScenario === key ? 2 : 1}
                        />
                      )
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        {/* Risk Analysis and Investment Advice in Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Risk Analysis */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Risk Analysis</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Risk Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Startup Risk Score</span>
                      <span className="font-medium">{startupRiskData.riskScore}/100</span>
                    </div>
                    <Progress value={startupRiskData.riskScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Market Risk</span>
                      <span className="font-medium">{startupRiskData.marketRisk}/100</span>
                    </div>
                    <Progress value={startupRiskData.marketRisk} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Financial Health</span>
                      <span className="font-medium">{startupRiskData.financialHealth}/100</span>
                    </div>
                    <Progress value={startupRiskData.financialHealth} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Exit Potential</span>
                      <span className="font-medium">{startupRiskData.exitPotential}/100</span>
                    </div>
                    <Progress value={startupRiskData.exitPotential} className="h-2" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Burn Rate</span>
                    <Badge variant="outline">{startupRiskData.burnRate}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Runway</span>
                    <Badge variant="outline">{startupRiskData.runway}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Market Size</span>
                    <Badge variant="outline">${startupRiskData.marketSize}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Competitors</span>
                    <Badge variant="outline">{startupRiskData.competitorCount}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Investment Advice */}
          <Card className="p-6 bg-singlife-light border-none">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">AI Investment Analysis</h2>
              <Badge variant="outline" className="bg-blue-50">
                <Brain className="h-4 w-4 text-blue-500 mr-1" />
                AI-Powered
              </Badge>
            </div>
            
            {scenarios[activeScenario].metrics && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">Recommendation</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {generateInvestmentAdvice(startupRiskData, scenarios[activeScenario].metrics, scenarios[activeScenario]).confidence}% Confidence
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-singlife-primary">
                    {generateInvestmentAdvice(startupRiskData, scenarios[activeScenario].metrics, scenarios[activeScenario]).recommendation}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Investment Points</h3>
                  <ul className="space-y-2">
                    {generateInvestmentAdvice(startupRiskData, scenarios[activeScenario].metrics, scenarios[activeScenario]).keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Opportunities</h3>
                    <ul className="space-y-2">
                      {generateInvestmentAdvice(startupRiskData, scenarios[activeScenario].metrics, scenarios[activeScenario]).opportunities.map((opportunity, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ArrowUp className="h-5 w-5 text-blue-500 mt-0.5" />
                          <span>{opportunity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Risks to Consider</h3>
                    <ul className="space-y-2">
                      {generateInvestmentAdvice(startupRiskData, scenarios[activeScenario].metrics, scenarios[activeScenario]).risks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    This analysis is generated based on the startup's metrics, market conditions, and the selected scenario. 
                    The AI considers multiple factors including financial health, market potential, and competitive landscape.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
} 