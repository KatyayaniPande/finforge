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
  X
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for different tabs
const startups = {
  featured: [
    {
      id: 1,
      name: "NeuralKey",
      stage: "Series A",
      location: "Singapore",
      description: "Enterprise-grade AI security platform with advanced threat detection and real-time response capabilities.",
      fundingCurrent: 1200000,
      fundingTarget: 2000000,
      daysLeft: 28,
      tags: ["AI", "Cybersecurity", "Enterprise"],
      teamSize: 15,
      rating: 4.8,
      icon: Shield,
    },
    {
      id: 2,
      name: "OceanPulse",
      stage: "Seed",
      location: "Singapore",
      description: "Revolutionary ocean monitoring technology providing real-time data for environmental conservation and maritime operations.",
      fundingCurrent: 900000,
      fundingTarget: 1500000,
      daysLeft: 35,
      tags: ["CleanTech", "Sustainability", "IoT"],
      teamSize: 8,
      rating: 4.5,
      icon: Leaf,
    },
    {
      id: 3,
      name: "MediSync",
      stage: "Series A",
      location: "Singapore",
      description: "AI-powered healthcare platform streamlining patient care and medical record management across Southeast Asia.",
      fundingCurrent: 2500000,
      fundingTarget: 4000000,
      daysLeft: 42,
      tags: ["HealthTech", "AI", "SaaS"],
      teamSize: 25,
      rating: 4.9,
      icon: Heart,
    }
  ],
  trending: [
    {
      id: 4,
      name: "FinEdge",
      stage: "Series B",
      location: "Singapore",
      description: "Next-generation fintech platform revolutionizing cross-border payments and digital banking solutions.",
      fundingCurrent: 8000000,
      fundingTarget: 12000000,
      daysLeft: 21,
      tags: ["FinTech", "Blockchain", "Payments"],
      teamSize: 45,
      rating: 4.7,
      icon: Wallet,
    },
    {
      id: 5,
      name: "RoboMinds",
      stage: "Seed",
      location: "Southeast Asia",
      description: "Cutting-edge robotics startup developing autonomous solutions for manufacturing and logistics.",
      fundingCurrent: 750000,
      fundingTarget: 2000000,
      daysLeft: 45,
      tags: ["Robotics", "AI", "Manufacturing"],
      teamSize: 12,
      rating: 4.4,
      icon: Brain,
    },
    {
      id: 6,
      name: "SpaceVenture",
      stage: "Series A",
      location: "Global",
      description: "Innovative space technology company developing sustainable satellite solutions for global connectivity.",
      fundingCurrent: 3500000,
      fundingTarget: 5000000,
      daysLeft: 30,
      tags: ["SpaceTech", "Hardware", "Connectivity"],
      teamSize: 20,
      rating: 4.6,
      icon: Rocket,
    }
  ],
  recent: [
    {
      id: 7,
      name: "GreenLoop",
      stage: "Seed",
      location: "Singapore",
      description: "Sustainable packaging solutions using biodegradable materials and circular economy principles.",
      fundingCurrent: 400000,
      fundingTarget: 1000000,
      daysLeft: 60,
      tags: ["CleanTech", "Sustainability", "Manufacturing"],
      teamSize: 6,
      rating: 4.3,
      icon: Leaf,
    },
    {
      id: 8,
      name: "DataGuard",
      stage: "Series A",
      location: "Southeast Asia",
      description: "Advanced data privacy and protection platform using quantum-resistant encryption.",
      fundingCurrent: 1800000,
      fundingTarget: 3000000,
      daysLeft: 25,
      tags: ["Cybersecurity", "Enterprise", "Privacy"],
      teamSize: 18,
      rating: 4.7,
      icon: Shield,
    },
    {
      id: 9,
      name: "BioInnovate",
      stage: "Series B",
      location: "Global",
      description: "Biotechnology company developing breakthrough solutions for sustainable agriculture.",
      fundingCurrent: 5500000,
      fundingTarget: 8000000,
      daysLeft: 15,
      tags: ["BioTech", "Agriculture", "Sustainability"],
      teamSize: 35,
      rating: 4.8,
      icon: Heart,
    }
  ]
}

interface Startup {
  id: number
  name: string
  stage: string
  location: string
  description: string
  fundingCurrent: number
  fundingTarget: number
  daysLeft: number
  tags: string[]
  teamSize: number
  rating: number
  icon: React.ComponentType<{ className?: string }>
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
}

interface FilterOption {
  value: string
  label: string
  count: number
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

export default function InvestmentsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"default" | "fundingProgress" | "rating" | "daysLeft">("default")
  const [filters, setFilters] = useState<FilterState>({
    industry: null,
    stage: null,
    location: null,
    teamSize: null,
  })

  // Filter and sort startups
  const filteredStartups = startups[activeTab as keyof StartupsData]
    .filter((startup: Startup) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          startup.name.toLowerCase().includes(query) ||
          startup.description.toLowerCase().includes(query) ||
          startup.tags.some(tag => tag.toLowerCase().includes(query)) ||
          startup.location.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Category filters
      if (filters.industry && !startup.tags.includes(filters.industry)) return false
      if (filters.stage && startup.stage !== filters.stage) return false
      if (filters.location && startup.location !== filters.location) return false
      if (filters.teamSize) {
        const [min, max] = filters.teamSize.split('-').map(Number)
        if (startup.teamSize < min || (max && startup.teamSize > max)) return false
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "fundingProgress":
          return (b.fundingCurrent / b.fundingTarget) - (a.fundingCurrent / a.fundingTarget)
        case "rating":
          return b.rating - a.rating
        case "daysLeft":
          return a.daysLeft - b.daysLeft
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
    })
    setSearchQuery("")
    setSortBy("default")
    setIsFilterOpen(false)
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0)

  const StartupCard = ({ startup }: { startup: Startup }) => {
    const Icon = startup.icon
    const progress = (startup.fundingCurrent / startup.fundingTarget) * 100
    const formattedCurrent = (startup.fundingCurrent / 1000000).toFixed(1)
    const formattedTarget = (startup.fundingTarget / 1000000).toFixed(1)

  return (
      <Card className="group p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full border-2 hover:border-singlife-primary">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-singlife-light rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-singlife-primary/10 transition-colors">
            <Icon className="h-8 w-8 text-singlife-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-xl font-bold truncate">{startup.name}</h3>
              <Badge variant="outline" className="bg-singlife-light whitespace-nowrap">{startup.stage}</Badge>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" /> 
              <span className="truncate">{startup.location}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
          {startup.description}
        </p>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Funding Progress</span>
            <span className="text-sm font-medium whitespace-nowrap">${formattedCurrent}M / ${formattedTarget}M</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 group-hover:h-3 transition-all"
            indicatorClassName={progress >= 80 ? "bg-green-500" : progress >= 50 ? "bg-yellow-500" : "bg-singlife-primary"}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">{progress.toFixed(1)}% Funded</span>
            <span className="text-xs text-gray-500">{startup.daysLeft} days left</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {startup.tags.map((tag: string) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="whitespace-nowrap cursor-pointer hover:bg-singlife-primary hover:text-white transition-colors"
              onClick={() => setFilters(prev => ({ ...prev, industry: tag }))}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Users2 className="h-4 w-4 text-gray-500 flex-shrink-0" />
            <span className="whitespace-nowrap">Team of {startup.teamSize}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
            <span className="whitespace-nowrap">{startup.rating}/5 Rating</span>
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

      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
        <Button 
          className="flex-1 bg-singlife-primary hover:bg-singlife-primary/90"
          onClick={() => setIsFilterOpen(false)}
        >
          Apply Filters
        </Button>
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
              placeholder="Search startups, industries, or locations..." 
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
              <DropdownMenuItem onClick={() => setSortBy("fundingProgress")}>
                Funding Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("rating")}>
                Rating
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("daysLeft")}>
                Time Left
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Button
                variant={activeTab === "featured" ? "default" : "outline"}
                onClick={() => setActiveTab("featured")}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Star className="h-4 w-4" />
                Featured
              </Button>
              <Button
                variant={activeTab === "trending" ? "default" : "outline"}
                onClick={() => setActiveTab("trending")}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <TrendingUp className="h-4 w-4" />
                Trending
              </Button>
              <Button
                variant={activeTab === "recent" ? "default" : "outline"}
                onClick={() => setActiveTab("recent")}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Clock className="h-4 w-4" />
                Recent
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Showing {filteredStartups.length} startups
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <SortAsc className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("default")}>
                    Default
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("fundingProgress")}>
                    Funding Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>
                    Rating
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("daysLeft")}>
                    Time Left
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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