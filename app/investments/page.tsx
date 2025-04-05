"use client"

import { useState } from "react"
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
  Wallet
} from "lucide-react"
import Link from "next/link"

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

export default function InvestmentsPage() {
  const [activeTab, setActiveTab] = useState("featured")
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const StartupCard = ({ startup }: { startup: any }) => {
    const Icon = startup.icon
    const progress = (startup.fundingCurrent / startup.fundingTarget) * 100
    const formattedCurrent = (startup.fundingCurrent / 1000000).toFixed(1)
    const formattedTarget = (startup.fundingTarget / 1000000).toFixed(1)

    return (
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-singlife-light rounded-lg flex items-center justify-center">
            <Icon className="h-8 w-8 text-singlife-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold">{startup.name}</h3>
              <Badge variant="outline" className="bg-singlife-light">{startup.stage}</Badge>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-3 w-3 mr-1" /> {startup.location}
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          {startup.description}
        </p>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Funding Progress</span>
            <span className="text-sm font-medium">${formattedCurrent}M / ${formattedTarget}M</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">{progress.toFixed(1)}% Funded</span>
            <span className="text-xs text-gray-500">{startup.daysLeft} days left</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {startup.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Users2 className="h-4 w-4 text-gray-500" />
            <span>Team of {startup.teamSize}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>{startup.rating}/5 Rating</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/investments/${startup.id}`} className="flex-1">
            <Button variant="outline" className="w-full">View Details</Button>
          </Link>
          <Button className="flex-1 bg-singlife-primary hover:bg-singlife-primary/90">Contact Team</Button>
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
          {["AI & Machine Learning", "CleanTech", "Cybersecurity", "FinTech", "HealthTech"].map((industry) => (
            <Button key={industry} variant="ghost" className="w-full justify-start hover:bg-singlife-light">
              {industry}
              <Badge className="ml-auto">{Math.floor(Math.random() * 30 + 10)}</Badge>
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
          {["Seed", "Series A", "Series B", "Series C+"].map((stage) => (
            <Button key={stage} variant="ghost" className="w-full justify-start hover:bg-singlife-light">
              {stage}
              <Badge className="ml-auto">{Math.floor(Math.random() * 30 + 10)}</Badge>
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
          {["Singapore", "Southeast Asia", "Global"].map((location) => (
            <Button key={location} variant="ghost" className="w-full justify-start hover:bg-singlife-light">
              {location}
              <Badge className="ml-auto">{Math.floor(Math.random() * 30 + 10)}</Badge>
            </Button>
          ))}
        </div>
      </div>

      <Button className="w-full bg-singlife-primary hover:bg-singlife-primary/90">
        Apply Filters
      </Button>
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
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
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
          <Button className="hidden md:flex">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filter Section - Desktop */}
        <div className="hidden md:block md:col-span-1 space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-2">Filters</h2>
            <p className="text-gray-500 mb-6">Narrow down investments that match your criteria</p>
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
          <Tabs defaultValue="featured" className="mb-6" onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-singlife-light">
                <TabsTrigger value="featured" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Featured
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="recent" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recent
                </TabsTrigger>
              </TabsList>
              <div className="text-sm text-gray-500">
                Showing {startups[activeTab as keyof typeof startups].length} startups
              </div>
            </div>

            {Object.keys(startups).map((tab) => (
              <TabsContent key={tab} value={tab} className="m-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {startups[tab as keyof typeof startups].map((startup) => (
                    <StartupCard key={startup.id} startup={startup} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}