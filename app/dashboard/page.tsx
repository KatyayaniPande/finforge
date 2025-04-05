"use client"

import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  BarChart, 
  Calendar, 
  Users, 
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  FileText,
  MessageSquare,
  Plus,
  Lightbulb
} from 'lucide-react';
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import StartupDashboardPage from '@/app/startup/dashboard/page';

import { StatCard } from "@/components/dashboard/StatCard";
import { UpcomingEventCard } from "@/components/dashboard/UpcomingEventCard";
import { InvestmentSummaryChart } from "@/components/dashboard/InvestmentSummaryChart";
import { PortfolioAllocationChart } from "@/components/dashboard/PortfolioAllocationChart";
import { QuickActionButton } from "@/components/dashboard/QuickActionButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { SectorAllocationChart } from "@/components/dashboard/SectorAllocationChart";
import { InvestmentsTable } from "@/components/dashboard/InvestmentsTable";
import { InvestorProfile } from "@/components/dashboard/InvestorProfile";

// Mock data for demonstration
const mockPortfolio = {
  totalInvested: 2500000,
  currentValue: 3200000,
  returns: 28,
  activeInvestments: 8,
  completedInvestments: 3,
  upcomingPayments: 2,
  recentActivity: [
    {
      id: 1,
      type: 'investment',
      startup: 'NeuralKey',
      amount: 500000,
      date: '2024-03-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'payment',
      startup: 'TechFlow',
      amount: 25000,
      date: '2024-03-14',
      status: 'pending'
    }
  ],
  performance: {
    monthly: 5.2,
    quarterly: 15.8,
    yearly: 28.0
  },
  allocation: [
    { sector: 'HealthTech', percentage: 35, amount: 1120000 },
    { sector: 'FinTech', percentage: 25, amount: 800000 },
    { sector: 'EdTech', percentage: 20, amount: 640000 },
    { sector: 'AI/ML', percentage: 15, amount: 480000 },
    { sector: 'Other', percentage: 5, amount: 160000 }
  ]
};

// Add mock investor profile data
const mockInvestorProfile = {
  riskTolerance: 'Medium' as const,
  investmentStrategy: 'Growth-focused' as const,
  preferredSectors: ['HealthTech', 'FinTech', 'AI/ML'],
  investmentStagePreference: ['Seed', 'Series A'],
  averageInvestmentSize: 100000,
  portfolioDiversificationGoal: 'Increase exposure in AI/ML sector while maintaining balance in HealthTech'
};

// Add recommended startups based on portfolio goals
const recommendedStartups = [
  {
    id: 1,
    name: 'MetaBriefs',
    industry: 'AI & Machine Learning',
    stage: 'Seed',
    currentValuation: '$18M',
    description: 'AI system that aggregates internal company data to create personalized daily briefings for executives.',
    matchReason: 'Aligns with goal to increase AI/ML exposure while maintaining strong fundamentals',
    metrics: {
      arr: '$300K',
      growth: '30% QoQ',
      marketSize: '$7.2B'
    }
  },
  {
    id: 2,
    name: 'LoopHealth AI',
    industry: 'HealthTech',
    stage: 'Seed',
    currentValuation: '$18M',
    description: 'AI-powered diagnostic assistant that analyzes patient symptoms and medical history.',
    matchReason: 'Maintains balanced exposure to HealthTech while incorporating AI capabilities',
    metrics: {
      arr: '$300K',
      growth: '32% QoQ',
      marketSize: '$9.2B'
    }
  },
  {
    id: 3,
    name: 'Synthex Labs',
    industry: 'BioTech',
    stage: 'Seed',
    currentValuation: '$25M',
    description: 'Platform that uses deep learning to design novel molecular structures for drug discovery.',
    matchReason: 'Combines HealthTech focus with cutting-edge AI applications',
    metrics: {
      arr: '$450K',
      growth: '35% QoQ',
      marketSize: '$12.8B'
    }
  }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
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

  if (user?.role === 'startup') {
    return <StartupDashboardPage />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-singlife-primary">Investor Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-singlife-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockPortfolio.currentValue.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              {mockPortfolio.returns}% returns
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <Building2 className="h-4 w-4 text-singlife-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPortfolio.activeInvestments}</div>
            <p className="text-xs text-gray-500">Across different sectors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Returns</CardTitle>
            <TrendingUp className="h-4 w-4 text-singlife-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPortfolio.performance.monthly}%</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              vs last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Payments</CardTitle>
            <Calendar className="h-4 w-4 text-singlife-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPortfolio.upcomingPayments}</div>
            <p className="text-xs text-gray-500">Next 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Investor Profile */}
      <div className="mb-8">
        <InvestorProfile {...mockInvestorProfile} />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="recommended" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Recommended
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Track your investment returns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Monthly</div>
                      <div className="text-xl font-bold text-green-600">
                        +{mockPortfolio.performance.monthly}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Quarterly</div>
                      <div className="text-xl font-bold text-green-600">
                        +{mockPortfolio.performance.quarterly}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Yearly</div>
                      <div className="text-xl font-bold text-green-600">
                        +{mockPortfolio.performance.yearly}%
                      </div>
                    </div>
                  </div>
                  <PerformanceChart />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Allocation</CardTitle>
                <CardDescription>Distribution of your investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPortfolio.allocation.map((item) => (
                    <div key={item.sector} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.sector}</span>
                        <span>${item.amount.toLocaleString()}</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
                <SectorAllocationChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment Portfolio</CardTitle>
              <CardDescription>Detailed view of your investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-singlife-primary" />
                    <h3 className="font-semibold">Active Investments</h3>
                  </div>
                  <Button size="sm" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Investment
                  </Button>
                </div>
                <InvestmentsTable />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Investments</CardTitle>
              <CardDescription>
                Startups that align with your portfolio diversification goal: 
                <span className="font-medium text-singlife-primary ml-1">
                  {mockInvestorProfile.portfolioDiversificationGoal}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recommendedStartups.map((startup) => (
                  <Card key={startup.id} className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{startup.name}</CardTitle>
                          <CardDescription className="text-sm">
                            {startup.industry} • {startup.stage} • Current Valuation: {startup.currentValuation}
                          </CardDescription>
                        </div>
                        <Button variant="outline" className="bg-white">
                          View Details
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          {startup.description}
                        </p>
                        
                        <div className="grid grid-cols-3 gap-4 py-2">
                          <div>
                            <div className="text-sm font-medium">ARR</div>
                            <div className="text-lg text-singlife-primary">{startup.metrics.arr}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Growth</div>
                            <div className="text-lg text-green-600">{startup.metrics.growth}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Market Size</div>
                            <div className="text-lg text-singlife-primary">{startup.metrics.marketSize}</div>
                          </div>
                        </div>

                        <div className="bg-singlife-primary/5 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-singlife-primary" />
                            <span className="text-sm font-medium text-singlife-primary">Why this matches your goals</span>
                          </div>
                          <p className="text-sm mt-1 text-gray-600">{startup.matchReason}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Track your investment activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPortfolio.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'investment' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        {activity.type === 'investment' ? (
                          <DollarSign className="h-5 w-5 text-blue-600" />
                        ) : (
                          <FileText className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{activity.startup}</h4>
                        <p className="text-sm text-gray-500">
                          {activity.type === 'investment' ? 'Investment' : 'Payment'} - {activity.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${activity.amount.toLocaleString()}</div>
                      <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}