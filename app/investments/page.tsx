"use client";

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, TrendingUp, Star, Clock, MapPin, Users2, Building2 } from "lucide-react"

export default function InvestmentsPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Header with Search */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Startup Marketplace</h1>
          <p className="text-gray-500">Discover and invest in promising startups</p>
        </div>
        <div className="flex gap-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search startups, industries, or locations..." 
              className="pl-10 pr-4"
            />
          </div>
          <Button>
            <Filter className="h-4 w-4 mr-2" />
            Advanced Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Filter Section */}
        <div className="col-span-1 space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-2">Filters</h2>
            <p className="text-gray-500 mb-6">Narrow down investments that match your criteria</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                  Industry
                </h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    AI & Machine Learning
                    <Badge className="ml-auto">24</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    CleanTech
                    <Badge className="ml-auto">18</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    Cybersecurity
                    <Badge className="ml-auto">15</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    FinTech
                    <Badge className="ml-auto">32</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    HealthTech
                    <Badge className="ml-auto">28</Badge>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
                  Funding Stage
                </h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    Seed
                    <Badge className="ml-auto">45</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    Series A
                    <Badge className="ml-auto">32</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    Series B
                    <Badge className="ml-auto">18</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    Series C+
                    <Badge className="ml-auto">12</Badge>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  Location
                </h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    Singapore
                    <Badge className="ml-auto">56</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    Southeast Asia
                    <Badge className="ml-auto">42</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    Global
                    <Badge className="ml-auto">35</Badge>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Users2 className="h-4 w-4 mr-2 text-gray-500" />
                  Team Size
                </h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    1-10
                    <Badge className="ml-auto">38</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    11-50
                    <Badge className="ml-auto">45</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-singlife-light">
                    51+
                    <Badge className="ml-auto">24</Badge>
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-singlife-primary hover:bg-singlife-primary/90">
                Apply Filters
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-singlife-light border-none">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">Our investment advisors are here to help you make informed decisions.</p>
            <Button variant="outline" className="w-full">Schedule a Call</Button>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-3">
          <Tabs defaultValue="featured" className="mb-6">
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
                Showing 6 of 124 startups
              </div>
            </div>

            <TabsContent value="featured" className="m-0">
              <div className="grid grid-cols-2 gap-6">
                {/* NeuralKey Card */}
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-singlife-light rounded-lg flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-singlife-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">NeuralKey</h3>
                        <Badge variant="outline" className="bg-singlife-light">Series A</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" /> Singapore
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Enterprise-grade AI security platform with advanced threat detection and real-time response capabilities.
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">Funding Progress</span>
                      <span className="text-sm font-medium">$1.2M / $2M</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">60% Funded</span>
                      <span className="text-xs text-gray-500">28 days left</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">AI</Badge>
                    <Badge variant="secondary">Cybersecurity</Badge>
                    <Badge variant="secondary">Enterprise</Badge>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users2 className="h-4 w-4 text-gray-500" />
                      <span>Team of 15</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>4.8/5 Rating</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">View Details</Button>
                    <Button className="flex-1 bg-singlife-primary hover:bg-singlife-primary/90">Contact Team</Button>
                  </div>
                </Card>

                {/* OceanPulse Card */}
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-singlife-light rounded-lg flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-singlife-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">OceanPulse</h3>
                        <Badge variant="outline" className="bg-singlife-light">Seed</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" /> Singapore
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Revolutionary ocean monitoring technology providing real-time data for environmental conservation and maritime operations.
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">Funding Progress</span>
                      <span className="text-sm font-medium">$900K / $1.5M</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">60% Funded</span>
                      <span className="text-xs text-gray-500">35 days left</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">CleanTech</Badge>
                    <Badge variant="secondary">Sustainability</Badge>
                    <Badge variant="secondary">IoT</Badge>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users2 className="h-4 w-4 text-gray-500" />
                      <span>Team of 8</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>4.5/5 Rating</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">View Details</Button>
                    <Button className="flex-1 bg-singlife-primary hover:bg-singlife-primary/90">Contact Team</Button>
                  </div>
                </Card>

                {/* MediSync Card */}
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-singlife-light rounded-lg flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-singlife-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">MediSync</h3>
                        <Badge variant="outline" className="bg-singlife-light">Series A</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" /> Singapore
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    AI-powered healthcare platform streamlining patient care and medical record management across Southeast Asia.
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">Funding Progress</span>
                      <span className="text-sm font-medium">$2.5M / $4M</span>
                    </div>
                    <Progress value={62.5} className="h-2" />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">62.5% Funded</span>
                      <span className="text-xs text-gray-500">42 days left</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">HealthTech</Badge>
                    <Badge variant="secondary">AI</Badge>
                    <Badge variant="secondary">SaaS</Badge>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users2 className="h-4 w-4 text-gray-500" />
                      <span>Team of 25</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>4.9/5 Rating</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">View Details</Button>
                    <Button className="flex-1 bg-singlife-primary hover:bg-singlife-primary/90">Contact Team</Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
