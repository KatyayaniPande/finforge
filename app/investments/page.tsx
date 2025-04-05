"use client";

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InvestmentsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-4 gap-6">
        {/* Filter Section */}
        <div className="col-span-1">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-2">Filter Opportunities</h2>
            <p className="text-gray-500 mb-6">Narrow down investments that match your criteria</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Industry</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    AI & Machine Learning
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    CleanTech
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Cybersecurity
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    FinTech
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Funding Stage</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    Seed
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Series A
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Series B
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Series C+
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Funding Amount</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    Under $1M
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    $1M - $5M
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    $5M - $10M
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    $10M+
                  </Button>
                </div>
              </div>

              <Button className="w-full" variant="default">
                Apply Filters
              </Button>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-3">
          <h1 className="text-3xl font-bold mb-6">Startups Seeking Investment</h1>
          
          <Tabs defaultValue="featured" className="mb-6">
            <TabsList>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-2 gap-6">
            {/* Startup Card */}
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                <div>
                  <h3 className="text-xl font-bold">NeuralKey</h3>
                  <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">
                    Series A
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                Enterprise-grade AI security platform with advanced threat detection
              </p>

              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Funding</span>
                  <span className="text-sm font-medium">$1.2M / $2M</span>
                </div>
                <Progress value={60} />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">AI</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Cybersecurity</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Enterprise</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Details</Button>
                <Button className="flex-1">Contact</Button>
              </div>
            </Card>

            {/* Another Startup Card */}
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                <div>
                  <h3 className="text-xl font-bold">OceanPulse</h3>
                  <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">
                    Seed
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                Revolutionary ocean monitoring technology that provides real-time data
              </p>

              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Funding</span>
                  <span className="text-sm font-medium">$900K / $1.5M</span>
                </div>
                <Progress value={60} />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">CleanTech</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Sustainability</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">IoT</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Details</Button>
                <Button className="flex-1">Contact</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
