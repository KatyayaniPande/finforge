"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Star, 
  Clock, 
  MapPin, 
  Users2, 
  Building2,
  Rocket,
  Brain,
  Shield,
  Leaf,
  Heart,
  Wallet,
  SortAsc,
  ChevronDown,
  X,
  DollarSign,
  ChartBar,
  User,
  Calendar,
  Target
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Startup {
  id: number
  company_name: string
  stage: string
  product_short: string
  description: string
  arr: string
  founders: string
  tam: string
  market_growth_rate: string
  product_stage: string
  user_growth: string
  revenue_growth: string
  current_valuation: string
  projected_exit_value: string
  exit_timeline: string
}

interface StartupsData {
  featured: Startup[]
  trending: Startup[]
  recent: Startup[]
}

interface FilterState {
  industry: string | null
  stage: string | null
  location: string | null
  teamSize: string | null
  product_stage: string | null
}

// Define available filter options
const filterOptions = {
  industry: [
    { value: "AI", label: "AI & Machine Learning", count: 12 },
    { value: "CleanTech", label: "CleanTech", count: 8 },
    { value: "Cybersecurity", label: "Cybersecurity", count: 15 },
    { value: "FinTech", label: "FinTech", count: 20 },
    { value: "HealthTech", label: "HealthTech", count: 18 },
    { value: "Robotics", label: "Robotics", count: 6 },
    { value: "SpaceTech", label: "SpaceTech", count: 4 },
    { value: "BioTech", label: "BioTech", count: 10 }
  ],
  stage: [
    { value: "Seed", label: "Seed", count: 25 },
    { value: "Series A", label: "Series A", count: 18 },
    { value: "Series B", label: "Series B", count: 12 },
    { value: "Series C+", label: "Series C+", count: 5 }
  ],
  location: [
    { value: "Singapore", label: "Singapore", count: 30 },
    { value: "Southeast Asia", label: "Southeast Asia", count: 20 },
    { value: "Global", label: "Global", count: 10 }
  ],
  teamSize: [
    { value: "1-5", label: "1-5 people", count: 15 },
    { value: "6-10", label: "6-10 people", count: 20 },
    { value: "11-20", label: "11-20 people", count: 18 },
    { value: "21-50", label: "21-50 people", count: 12 },
    { value: "50+", label: "50+ people", count: 5 }
  ]
}

// Sample data - Replace with actual database fetch
const startups: StartupsData = {
  featured: [
    {
      id: 1,
      company_name: "NeuralKey",
      stage: "Series A",
      product_short: "AI Security Platform",
      description: "Enterprise-grade AI security platform with advanced threat detection and real-time response capabilities.",
      arr: "$1.2M",
      founders: "John Smith, Sarah Johnson",
      tam: "$15B",
      market_growth_rate: "28% CAGR",
      product_stage: "Revenue-generating",
      user_growth: "42% MoM",
      revenue_growth: "35% MoM",
      current_valuation: "$15M",
      projected_exit_value: "$120M",
      exit_timeline: "3-5 years"
    },
    {
      id: 2,
      company_name: "OceanPulse",
      stage: "Seed",
      product_short: "Ocean Monitoring Tech",
      description: "Revolutionary ocean monitoring technology providing real-time data for environmental conservation.",
      arr: "$500K",
      founders: "Michael Chen, Lisa Wong",
      tam: "$8B",
      market_growth_rate: "22% CAGR",
      product_stage: "Beta",
      user_growth: "35% MoM",
      revenue_growth: "28% MoM",
      current_valuation: "$8M",
      projected_exit_value: "$80M",
      exit_timeline: "4-6 years"
    }
  ],
  trending: [
    {
      id: 3,
      company_name: "MediSync",
      stage: "Series A",
      product_short: "Healthcare Platform",
      description: "AI-powered healthcare platform streamlining patient care and medical record management.",
      arr: "$2.5M",
      founders: "David Lee, Emily Tan",
      tam: "$12B",
      market_growth_rate: "35% CAGR",
      product_stage: "Revenue-generating",
      user_growth: "45% MoM",
      revenue_growth: "38% MoM",
      current_valuation: "$25M",
      projected_exit_value: "$150M",
      exit_timeline: "3-4 years"
    }
  ],
  recent: [
    {
      id: 4,
      company_name: "FinEdge",
      stage: "Series B",
      product_short: "FinTech Platform",
      description: "Next-generation fintech platform revolutionizing cross-border payments.",
      arr: "$5M",
      founders: "James Wilson, Sarah Chen",
      tam: "$20B",
      market_growth_rate: "30% CAGR",
      product_stage: "Scaling",
      user_growth: "50% MoM",
      revenue_growth: "40% MoM",
      current_valuation: "$50M",
      projected_exit_value: "$200M",
      exit_timeline: "2-3 years"
    }
  ]
}

export default function InvestmentsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"default" | "valuation" | "growth" | "stage">("default")
  const [filters, setFilters] = useState<FilterState>({
    industry: null,
    stage: null,
    location: null,
    teamSize: null,
    product_stage: null
  })

  // Filter and sort startups
  const filteredStartups = startups[activeTab as keyof StartupsData]
    .filter((startup) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          startup.company_name.toLowerCase().includes(query) ||
          startup.description.toLowerCase().includes(query) ||
          startup.product_short.toLowerCase().includes(query) ||
          startup.founders.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Category filters
      if (filters.stage && startup.stage !== filters.stage) return false
      if (filters.product_stage && startup.product_stage !== filters.product_stage) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "valuation":
          return parseFloat(b.current_valuation.replace('$', '')) - parseFloat(a.current_valuation.replace('$', ''))
        case "growth":
          return parseFloat(b.revenue_growth.replace('%', '')) - parseFloat(a.revenue_growth.replace('%', ''))
        case "stage":
          const stageOrder: Record<string, number> = { "Seed": 0, "Series A": 1, "Series B": 2, "Series C+": 3 }
          return (stageOrder[b.stage] || 0) - (stageOrder[a.stage] || 0)
        default:
          return 0
      }
    })

  const clearFilters = () => {
    setFilters({
      industry: null,
      stage: null,
      location: null,
      teamSize: null,
      product_stage: null
    })
    setSearchQuery("")
    setSortBy("default")
    setIsFilterOpen(false)
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0)

  const StartupCard = ({ startup }: { startup: Startup }) => {
    return (
      <Card className="group p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full border-2 hover:border-singlife-primary">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-singlife-light rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-singlife-primary/10 transition-colors">
            <Building2 className="h-8 w-8 text-singlife-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-xl font-bold truncate">{startup.company_name}</h3>
              <Badge variant="outline" className="bg-singlife-light whitespace-nowrap">{startup.stage}</Badge>
            </div>
            <p className="text-sm text-gray-500">{startup.product_short}</p>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
          {startup.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{startup.arr}</span>
              <span className="text-gray-500">ARR</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ChartBar className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{startup.revenue_growth}</span>
              <span className="text-gray-500">Growth</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{startup.tam}</span>
              <span className="text-gray-500">TAM</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{startup.exit_timeline}</span>
              <span className="text-gray-500">Exit</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="whitespace-nowrap">{startup.founders}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="whitespace-nowrap">{startup.market_growth_rate}</span>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href={`/investments/${startup.id}`} className="w-full">
              <Button className="w-full bg-singlife-primary hover:bg-singlife-primary/90">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    )
  }

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Building2 className="h-4 w-4 mr-2 text-gray-500" />
          Industry
        </h3>
        <div className="space-y-2">
          {filterOptions.industry.map((option) => (
            <Button 
              key={option.value} 
              variant={filters.industry === option.value ? "default" : "ghost"} 
              className={`w-full justify-start hover:bg-singlife-light transition-colors ${
                filters.industry === option.value ? 'bg-singlife-primary text-white hover:text-white' : ''
              }`}
              onClick={() => {
                setFilters(prev => ({
                  ...prev,
                  industry: prev.industry === option.value ? null : option.value
                }))
              }}
            >
              {option.label}
              <Badge variant={filters.industry === option.value ? "outline" : "secondary"} className="ml-auto">
                {option.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
          Funding Stage
        </h3>
        <div className="space-y-2">
          {filterOptions.stage.map((option) => (
            <Button 
              key={option.value} 
              variant={filters.stage === option.value ? "default" : "ghost"} 
              className={`w-full justify-start hover:bg-singlife-light transition-colors ${
                filters.stage === option.value ? 'bg-singlife-primary text-white hover:text-white' : ''
              }`}
              onClick={() => {
                setFilters(prev => ({
                  ...prev,
                  stage: prev.stage === option.value ? null : option.value
                }))
              }}
            >
              {option.label}
              <Badge variant={filters.stage === option.value ? "outline" : "secondary"} className="ml-auto">
                {option.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
          Location
        </h3>
        <div className="space-y-2">
          {filterOptions.location.map((option) => (
            <Button 
              key={option.value} 
              variant={filters.location === option.value ? "default" : "ghost"} 
              className={`w-full justify-start hover:bg-singlife-light transition-colors ${
                filters.location === option.value ? 'bg-singlife-primary text-white hover:text-white' : ''
              }`}
              onClick={() => {
                setFilters(prev => ({
                  ...prev,
                  location: prev.location === option.value ? null : option.value
                }))
              }}
            >
              {option.label}
              <Badge variant={filters.location === option.value ? "outline" : "secondary"} className="ml-auto">
                {option.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Users2 className="h-4 w-4 mr-2 text-gray-500" />
          Team Size
        </h3>
        <div className="space-y-2">
          {filterOptions.teamSize.map((option) => (
            <Button 
              key={option.value} 
              variant={filters.teamSize === option.value ? "default" : "ghost"} 
              className={`w-full justify-start hover:bg-singlife-light transition-colors ${
                filters.teamSize === option.value ? 'bg-singlife-primary text-white hover:text-white' : ''
              }`}
              onClick={() => {
                setFilters(prev => ({
                  ...prev,
                  teamSize: prev.teamSize === option.value ? null : option.value
                }))
              }}
            >
              {option.label}
              <Badge variant={filters.teamSize === option.value ? "outline" : "secondary"} className="ml-auto">
                {option.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Rocket className="h-4 w-4 mr-2 text-gray-500" />
          Product Stage
        </h3>
        <div className="space-y-2">
          {["Concept", "Beta", "Revenue-generating", "Scaling"].map((stage) => (
            <Button 
              key={stage} 
              variant={filters.product_stage === stage ? "default" : "ghost"} 
              className={`w-full justify-start hover:bg-singlife-light transition-colors ${
                filters.product_stage === stage ? 'bg-singlife-primary text-white hover:text-white' : ''
              }`}
              onClick={() => {
                setFilters(prev => ({
                  ...prev,
                  product_stage: prev.product_stage === stage ? null : stage
                }))
              }}
            >
              {stage}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-6">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Startup Marketplace</h1>
          <p className="text-gray-500">Discover and invest in promising startups</p>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1 md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search startups, products, or founders..." 
              className="pl-10 pr-4 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button className="md:hidden relative">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="py-6">
                <h2 className="text-2xl font-bold mb-2">Filters</h2>
                <p className="text-gray-500 mb-6">Narrow down investments that match your criteria</p>
                <FilterSection />
              </div>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden md:flex">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort By
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("default")}>
                Default
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("valuation")}>
                Valuation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("growth")}>
                Growth Rate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("stage")}>
                Stage
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filter Section - Desktop */}
        <div className="hidden md:block md:col-span-1 space-y-6">
          <Card className="p-6 sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Filters</h2>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>
            <FilterSection />
          </Card>

          <Card className="p-6 bg-singlife-light border-none">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">Our investment advisors are here to help you make informed decisions.</p>
            <Button variant="outline" className="w-full">Schedule a Call</Button>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={activeTab === "featured" ? "default" : "outline"}
              onClick={() => setActiveTab("featured")}
              className={`flex items-center gap-2 whitespace-nowrap ${
                activeTab === "featured" ? 'bg-singlife-primary text-white hover:bg-singlife-primary/90' : ''
              }`}
            >
              <Star className="h-4 w-4" />
              Featured
            </Button>
            <Button
              variant={activeTab === "trending" ? "default" : "outline"}
              onClick={() => setActiveTab("trending")}
              className={`flex items-center gap-2 whitespace-nowrap ${
                activeTab === "trending" ? 'bg-singlife-primary text-white hover:bg-singlife-primary/90' : ''
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </Button>
            <Button
              variant={activeTab === "recent" ? "default" : "outline"}
              onClick={() => setActiveTab("recent")}
              className={`flex items-center gap-2 whitespace-nowrap ${
                activeTab === "recent" ? 'bg-singlife-primary text-white hover:bg-singlife-primary/90' : ''
              }`}
            >
              <Clock className="h-4 w-4" />
              Recent
            </Button>
          </div>

          {filteredStartups.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="mb-4">
                <Search className="h-12 w-12 mx-auto text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No startups found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredStartups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}