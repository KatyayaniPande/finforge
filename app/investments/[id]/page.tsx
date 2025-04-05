"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Globe, 
  MapPin, 
  Users2, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Building2,
  ExternalLink,
  Plus,
  Mail,
  Phone,
  FileText
} from "lucide-react"

// This would come from your API/database in a real app
const startupDetails = {
  id: 1,
  name: "NeuralKey",
  stage: "Series A",
  logo: "/placeholder.png",
  description: "Enterprise-grade AI security platform with advanced threat detection and real-time monitoring for organizations of all sizes.",
  tags: ["AI", "Cybersecurity", "Enterprise", "Machine Learning", "B2B", "SaaS"],
  website: "https://neuralkey.ai",
  location: "San Francisco, CA",
  founded: "2022",
  teamSize: "28 employees",
  valuation: "$15M",
  growth: "+63%",
  traction: "42 Enterprises",
  overview: "NeuralKey is revolutionizing cybersecurity with an AI-powered platform that provides real-time threat detection and automated response capabilities. Our proprietary neural network architecture can identify zero-day threats and sophisticated attacks that traditional security solutions miss. By combining machine learning with expert security knowledge, we help enterprises protect their most sensitive data from increasingly complex cyber threats.",
  team: [
    {
      name: "Alexandra Chen",
      role: "CEO & Co-founder",
      image: "/placeholder.png",
      bio: "Former Head of Security at CloudSecure with 12+ years of experience in cybersecurity and AI."
    },
    {
      name: "Marcus Johnson",
      role: "CTO & Co-founder",
      image: "/placeholder.png",
      bio: "PhD in Machine Learning, previously led AI research at Google's security division."
    },
    {
      name: "Olivia Rodriguez",
      role: "COO",
      image: "/placeholder.png",
      bio: "15+ years of operational experience in enterprise SaaS companies."
    }
  ],
  investment: {
    current: 1200000,
    target: 2000000,
    minimum: 50000,
    equity: "4-8%",
    closingDate: "October 30, 2025",
    documents: [
      { name: "Pitch Deck", url: "#" },
      { name: "Financial Projections", url: "#" },
      { name: "Technical Documentation", url: "#" }
    ]
  },
  contact: {
    email: "investors@neuralkey.ai",
    phone: "(415) 555-0123"
  }
}

export default function StartupDetailsPage() {
  const params = useParams()

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-singlife-light rounded-lg flex items-center justify-center">
            <Building2 className="h-12 w-12 text-singlife-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{startupDetails.name}</h1>
              <Badge variant="outline" className="text-base">{startupDetails.stage}</Badge>
            </div>
            <p className="text-lg text-gray-600 mb-4 max-w-3xl">
              {startupDetails.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {startupDetails.tags.map((tag) => (
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
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add to Watchlist
          </Button>
          <Button className="bg-singlife-primary hover:bg-singlife-primary/90">
            Contact Startup
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Company Overview</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                  <DollarSign className="h-5 w-5 text-gray-500 mb-2" />
                  <div className="text-sm text-gray-500">Valuation</div>
                  <div className="text-xl font-bold">{startupDetails.valuation}</div>
                </Card>
                <Card className="p-4">
                  <TrendingUp className="h-5 w-5 text-gray-500 mb-2" />
                  <div className="text-sm text-gray-500">Growth</div>
                  <div className="text-xl font-bold">{startupDetails.growth}</div>
                </Card>
                <Card className="p-4">
                  <Users2 className="h-5 w-5 text-gray-500 mb-2" />
                  <div className="text-sm text-gray-500">Team Size</div>
                  <div className="text-xl font-bold">{startupDetails.teamSize}</div>
                </Card>
                <Card className="p-4">
                  <Building2 className="h-5 w-5 text-gray-500 mb-2" />
                  <div className="text-sm text-gray-500">Traction</div>
                  <div className="text-xl font-bold">{startupDetails.traction}</div>
                </Card>
              </div>

              {/* Company Description */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">About {startupDetails.name}</h2>
                <p className="text-gray-600 mb-6">{startupDetails.overview}</p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Globe className="h-4 w-4" />
                      <a href={startupDetails.website} className="text-singlife-primary hover:underline">
                        {startupDetails.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {startupDetails.location}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Calendar className="h-4 w-4" />
                      Founded {startupDetails.founded}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users2 className="h-4 w-4" />
                      {startupDetails.teamSize}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Leadership Team</h2>
                <div className="space-y-6">
                  {startupDetails.team.map((member) => (
                    <div key={member.name} className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full" />
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <div className="text-sm text-gray-500 mb-2">{member.role}</div>
                        <p className="text-gray-600">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          {/* Investment Opportunity */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Investment Opportunity</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Funding Progress</span>
                  <span className="font-medium">
                    ${startupDetails.investment.current.toLocaleString()} of ${startupDetails.investment.target.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={(startupDetails.investment.current / startupDetails.investment.target) * 100} 
                  className="h-2"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum Investment</span>
                  <span className="font-medium">${startupDetails.investment.minimum.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Equity Offered</span>
                  <span className="font-medium">{startupDetails.investment.equity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Closing Date</span>
                  <span className="font-medium">{startupDetails.investment.closingDate}</span>
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

          {/* Contact Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <a href={`mailto:${startupDetails.contact.email}`} className="text-singlife-primary hover:underline">
                  {startupDetails.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{startupDetails.contact.phone}</span>
              </div>
            </div>
          </Card>

          {/* Documents */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Documents</h2>
            
            <div className="space-y-3">
              {startupDetails.investment.documents.map((doc) => (
                <Button
                  key={doc.name}
                  variant="outline"
                  className="w-full justify-start gap-3"
                >
                  <FileText className="h-4 w-4" />
                  {doc.name}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 