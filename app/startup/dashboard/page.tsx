'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart, 
  FileText, 
  Briefcase, 
  Shield, 
  Bell, 
  Building2,
  Calendar,
  Target,
  LineChart,
  PieChart,
  MessageSquare,
  FileSpreadsheet
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

// Mock data for demonstration
const mockData = {
  company: {
    name: 'NeuralKey',
    stage: 'Seed',
    industry: 'HealthTech',
    location: 'Singapore',
    fundingRaised: 350000,
    targetFunding: 500000,
    valuation: {
      preMoney: 2000000,
      postMoney: 2500000
    },
    equityOffered: 20,
    investorsCount: 5
  },
  financials: {
    monthlyRevenue: 50000,
    mrr: 45000,
    burnRate: 25000,
    runway: 14,
    grossMargin: 65,
    profitability: {
      ebitda: 15000,
      netProfitMargin: 20
    }
  },
  growth: {
    mau: 15000,
    dau: 5000,
    cac: 50,
    ltv: 500,
    churnRate: 2.5,
    retentionRate: 85,
    activeLeads: 25,
    conversionRate: 15
  }
};

export default function StartupDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'startup') {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-singlife-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-singlife-primary">Startup Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funding Progress</CardTitle>
            <DollarSign className="h-4 w-4 text-singlife-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockData.company.fundingRaised.toLocaleString()}</div>
            <p className="text-xs text-gray-500">of ${mockData.company.targetFunding.toLocaleString()} target</p>
            <Progress value={(mockData.company.fundingRaised / mockData.company.targetFunding) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-singlife-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockData.financials.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-singlife-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.growth.mau.toLocaleString()}</div>
            <p className="text-xs text-gray-500">Monthly Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Runway</CardTitle>
            <Calendar className="h-4 w-4 text-singlife-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.financials.runway} months</div>
            <p className="text-xs text-gray-500">Current burn rate: ${mockData.financials.burnRate.toLocaleString()}/month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="funding" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Funding
          </TabsTrigger>
          <TabsTrigger value="financials" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Financials
          </TabsTrigger>
          <TabsTrigger value="growth" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Growth
          </TabsTrigger>
          <TabsTrigger value="investors" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Investors
          </TabsTrigger>
          <TabsTrigger value="product" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Product
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Legal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stage</span>
                    <span className="font-medium">{mockData.company.stage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry</span>
                    <span className="font-medium">{mockData.company.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium">{mockData.company.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valuation</span>
                    <span className="font-medium">${mockData.company.valuation.preMoney.toLocaleString()} (pre-money)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Revenue</span>
                    <span className="font-medium">${mockData.financials.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">MRR</span>
                    <span className="font-medium">${mockData.financials.mrr.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gross Margin</span>
                    <span className="font-medium">{mockData.financials.grossMargin}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Users</span>
                    <span className="font-medium">{mockData.growth.mau.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Funding Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Current Round</span>
                    <span className="font-medium">{mockData.company.stage}</span>
                  </div>
                  <Progress value={(mockData.company.fundingRaised / mockData.company.targetFunding) * 100} />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-500">Raised: ${mockData.company.fundingRaised.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">Target: ${mockData.company.targetFunding.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Valuation</h3>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pre-money</span>
                      <span className="font-medium">${mockData.company.valuation.preMoney.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Post-money</span>
                      <span className="font-medium">${mockData.company.valuation.postMoney.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Equity</h3>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Offered</span>
                      <span className="font-medium">{mockData.company.equityOffered}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investors</span>
                      <span className="font-medium">{mockData.company.investorsCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Revenue</span>
                    <span className="font-medium">${mockData.financials.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">MRR</span>
                    <span className="font-medium">${mockData.financials.mrr.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gross Margin</span>
                    <span className="font-medium">{mockData.financials.grossMargin}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Burn Rate</span>
                    <span className="font-medium">${mockData.financials.burnRate.toLocaleString()}/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Runway</span>
                    <span className="font-medium">{mockData.financials.runway} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">EBITDA</span>
                    <span className="font-medium">${mockData.financials.profitability.ebitda.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="growth" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>User Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Active Users</span>
                    <span className="font-medium">{mockData.growth.mau.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Active Users</span>
                    <span className="font-medium">{mockData.growth.dau.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Retention Rate</span>
                    <span className="font-medium">{mockData.growth.retentionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Churn Rate</span>
                    <span className="font-medium">{mockData.growth.churnRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">CAC</span>
                    <span className="font-medium">${mockData.growth.cac}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">LTV</span>
                    <span className="font-medium">${mockData.growth.ltv}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Leads</span>
                    <span className="font-medium">{mockData.growth.activeLeads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-medium">{mockData.growth.conversionRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investor Relations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Current Investors</h3>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Message Investors
                  </Button>
                </div>
                <div className="space-y-4">
                  {/* Mock investor list */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">John Smith</h4>
                      <p className="text-sm text-gray-500">Angel Investor</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$100,000</p>
                      <p className="text-sm text-gray-500">5% Equity</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">TechVentures</h4>
                      <p className="text-sm text-gray-500">Venture Capital</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$250,000</p>
                      <p className="text-sm text-gray-500">12.5% Equity</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="product" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Development</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Product Roadmap</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-singlife-primary"></div>
                      <div>
                        <h4 className="font-medium">MVP Launch</h4>
                        <p className="text-sm text-gray-500">Completed - March 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-singlife-primary"></div>
                      <div>
                        <h4 className="font-medium">Beta Testing</h4>
                        <p className="text-sm text-gray-500">In Progress - April 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <div>
                        <h4 className="font-medium">Full Launch</h4>
                        <p className="text-sm text-gray-500">Planned - June 2024</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Key Achievements</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Partnership with HealthTech Inc.</h4>
                      <p className="text-sm text-gray-500">Strategic partnership signed for integration</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">$50K MRR Milestone</h4>
                      <p className="text-sm text-gray-500">Achieved monthly recurring revenue target</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Legal & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Legal Structure</span>
                    <span className="font-medium">Private Limited Company</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Incorporation Date</span>
                    <span className="font-medium">January 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Regulatory Compliance</span>
                    <span className="font-medium">GDPR, HIPAA</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Intellectual Property</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Patents</span>
                      <span className="font-medium">2 Filed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trademarks</span>
                      <span className="font-medium">1 Registered</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 