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
import { Startup } from "@/lib/db/investments"

interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface FilterCounts {
  industry: FilterOption[];
  stage: FilterOption[];
}

interface FilterState {
  industry: string | null;
  stage: string | null;
}

export default function InvestmentsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"default" | "valuation" | "growth" | "stage">("default")
  const [filters, setFilters] = useState<FilterState>({
    industry: null,
    stage: null
  })
  const [featuredStartups, setFeaturedStartups] = useState<Startup[]>([])
  const [trendingStartups, setTrendingStartups] = useState<Startup[]>([])
  const [earlyStageStartups, setEarlyStageStartups] = useState<Startup[]>([])
  const [filterCounts, setFilterCounts] = useState<FilterCounts>({
    industry: [],
    stage: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        console.log('Frontend: Starting to fetch startups...');
        setLoading(true)
        setError(null)

        console.log('Frontend: Making API requests...');
        const [featuredRes, trendingRes, earlyStageRes] = await Promise.all([
          fetch('/api/investments?type=featured'),
          fetch('/api/investments?type=trending'),
          fetch('/api/investments?type=early-stage')
        ])

        console.log('Frontend: API Response statuses:', {
          featured: featuredRes.status,
          trending: trendingRes.status,
          earlyStage: earlyStageRes.status
        });

        if (!featuredRes.ok || !trendingRes.ok || !earlyStageRes.ok) {
          console.error('Frontend: Response details:', {
            featured: await featuredRes.text().catch(() => 'Failed to get response text'),
            trending: await trendingRes.text().catch(() => 'Failed to get response text'),
            earlyStage: await earlyStageRes.text().catch(() => 'Failed to get response text')
          });
          throw new Error('Failed to fetch startups')
        }

        console.log('Frontend: Parsing JSON responses...');
        const [featured, trending, earlyStage] = await Promise.all([
          featuredRes.json(),
          trendingRes.json(),
          earlyStageRes.json()
        ])

        console.log('Frontend: Received data:', {
          featured: featured?.data?.length || 0,
          trending: trending?.data?.length || 0,
          earlyStage: earlyStage?.data?.length || 0
        });

        setFeaturedStartups(featured.data || [])
        setTrendingStartups(trending.data || [])
        setEarlyStageStartups(earlyStage.data || [])
      } catch (err) {
        console.error('Frontend Error:', err)
        setError('Failed to load startups')
      } finally {
        setLoading(false)
      }
    }

    fetchStartups()
  }, [])

  // Fetch filter counts
  useEffect(() => {
    const fetchFilterCounts = async () => {
      try {
        const response = await fetch('/api/startups?query=all');
        const result = await response.json();
        
        if (result.success && result.data) {
          const startups = result.data.startups || [];
          
          // Calculate industry counts
          const industryCount = startups.reduce((acc: Record<string, number>, startup: Startup) => {
            if (startup.industry) {
              acc[startup.industry] = (acc[startup.industry] || 0) + 1;
            }
            return acc;
          }, {});

          // Calculate stage counts
          const stageCount = startups.reduce((acc: Record<string, number>, startup: Startup) => {
            if (startup.stage) {
              acc[startup.stage] = (acc[startup.stage] || 0) + 1;
            }
            return acc;
          }, {});

          // Update filter counts
          setFilterCounts({
            industry: Object.entries(industryCount).map(([value, count]) => ({
              value,
              label: value === 'AI & Machine Learning' ? 'AI & ML' : value,
              count: count as number
            })),
            stage: Object.entries(stageCount).map(([value, count]) => ({
              value,
              label: value,
              count: count as number
            }))
          });
        }
      } catch (error) {
        console.error('Failed to fetch filter counts:', error);
      }
    };

    fetchFilterCounts();
  }, []);

  // Get the current tab's startups
  const currentTabStartups = (() => {
    switch (activeTab) {
      case "featured":
        return featuredStartups
      case "trending":
        return trendingStartups
      case "early":
        return earlyStageStartups
      default:
        return []
    }
  })()

  // Filter startups
  const filteredStartups = currentTabStartups
    .filter((startup) => {
      console.log('Filtering startup:', {
        name: startup.company_name,
        currentFilters: filters,
        startupValues: {
          industry: startup.industry,
          stage: startup.stage
        }
      });

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

      // Category filters - normalize values for comparison
      if (filters.stage && startup.stage.toLowerCase() !== filters.stage.toLowerCase()) return false
      if (filters.industry && startup.industry?.toLowerCase() !== filters.industry.toLowerCase()) return false
      
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "valuation":
          return parseFloat(b.current_valuation.replace(/[^0-9.]/g, '')) - parseFloat(a.current_valuation.replace(/[^0-9.]/g, ''))
        case "growth":
          return parseFloat(b.revenue_growth.replace(/[^0-9.]/g, '')) - parseFloat(a.revenue_growth.replace(/[^0-9.]/g, ''))
        case "stage":
          const stageOrder: Record<string, number> = { "Pre-Seed": 0, "Seed": 1, "Series A": 2, "Series B": 3, "Series C+": 4 }
          return (stageOrder[b.stage] || 0) - (stageOrder[a.stage] || 0)
        default:
          return 0
      }
    })

  const clearFilters = () => {
    setFilters({
      industry: null,
      stage: null
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
          {filterCounts.industry.map((option) => (
            <Button 
              key={option.value} 
              variant={filters.industry === option.value ? "default" : "ghost"} 
              className={`w-full justify-start hover:bg-singlife-light transition-colors ${
                filters.industry === option.value ? 'bg-singlife-primary text-white hover:text-white' : ''
              }`}
              onClick={() => {
                setFilters({
                  ...filters,
                  industry: filters.industry === option.value ? null : option.value
                });
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
          {filterCounts.stage.map((option) => (
            <Button 
              key={option.value} 
              variant={filters.stage === option.value ? "default" : "ghost"} 
              className={`w-full justify-start hover:bg-singlife-light transition-colors ${
                filters.stage === option.value ? 'bg-singlife-primary text-white hover:text-white' : ''
              }`}
              onClick={() => {
                setFilters({
                  ...filters,
                  stage: filters.stage === option.value ? null : option.value
                });
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
    </div>
  )

  // Define available filter options with dynamic counts
  const filterOptions = {
    industry: filterCounts.industry,
    stage: filterCounts.stage
  }

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
              variant={activeTab === "early" ? "default" : "outline"}
              onClick={() => setActiveTab("early")}
              className={`flex items-center gap-2 whitespace-nowrap ${
                activeTab === "early" ? 'bg-singlife-primary text-white hover:bg-singlife-primary/90' : ''
              }`}
            >
              <Clock className="h-4 w-4" />
              Early Stage
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