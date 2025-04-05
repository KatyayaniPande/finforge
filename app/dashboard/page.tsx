"use client"

import { useState, useEffect } from "react";
import { Activity, ArrowRightCircle, DollarSign, FileText, PieChart, Plus, TrendingUp } from "lucide-react";

import { StatCard } from "@/components/dashboard/StatCard";
import { UpcomingEventCard } from "@/components/dashboard/UpcomingEventCard";
import { InvestmentSummaryChart } from "@/components/dashboard/InvestmentSummaryChart";
import { PortfolioAllocationChart } from "@/components/dashboard/PortfolioAllocationChart";
import { QuickActionButton } from "@/components/dashboard/QuickActionButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const events = [
    {
      title: "Quarterly Review",
      date: new Date(2025, 3, 10, 14, 30),
      type: "Portfolio Review",
      description: "Review Q1 performance with your financial advisor",
    },
    {
      title: "Dividend Payment",
      date: new Date(2025, 3, 15, 9, 0),
      type: "Income Event",
      description: "Expected dividend payments from your stock investments",
    },
    {
      title: "Market Outlook Webinar",
      date: new Date(2025, 3, 18, 16, 0),
      type: "Educational",
      description: "Join our experts as they discuss market trends and future outlook",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Investments</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your personal portfolio.
          </p>
        </div>
        <Button className="bg-brand-red hover:bg-brand-red/90">
          <Plus className="mr-2 h-4 w-4" /> New Investment
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Portfolio Value"
          value="$124,572.80"
          description="Total value of your investments"
          icon={DollarSign}
          trend={{ value: 3.2, isPositive: true }}
          colorClass="bg-brand-red"
          index={0}
        />
        <StatCard
          title="Monthly Returns"
          value="$2,380.25"
          description="Returns earned this month"
          icon={TrendingUp}
          trend={{ value: 1.8, isPositive: true }}
          colorClass="bg-green-500"
          index={1}
        />
        <StatCard
          title="Active Investments"
          value="12"
          description="Across 4 investment categories"
          icon={Activity}
          index={2}
        />
        <StatCard
          title="Due Diligence"
          value="3 Pending"
          description="Tasks requiring your attention"
          icon={FileText}
          colorClass="bg-amber-500"
          index={3}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-6 lg:grid-cols-12 mb-8">
        <div className="md:col-span-4 lg:col-span-8">
          <InvestmentSummaryChart />
        </div>
        <div className="md:col-span-2 lg:col-span-4">
          <PortfolioAllocationChart />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-12 mb-8">
        <div className="md:col-span-8">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Your Portfolio Summary</CardTitle>
                <CardDescription>Overview of your investment performance</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Top Performing Assets</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Tech Growth ETF</span>
                      <span className="text-green-600">+8.2%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Renewable Energy Fund</span>
                      <span className="text-green-600">+6.7%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Dividend Aristocrats</span>
                      <span className="text-green-600">+4.3%</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Recent Transactions</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Bought: Tech Growth ETF</span>
                      <span className="text-muted-foreground">2 days ago</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Dividend: Blue Chip Corp</span>
                      <span className="text-muted-foreground">1 week ago</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Sold: Healthcare Fund</span>
                      <span className="text-muted-foreground">2 weeks ago</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used features</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <QuickActionButton
                  icon={Plus}
                  label="Add Investment"
                />
                <QuickActionButton
                  icon={PieChart}
                  label="Portfolio Analysis"
                />
                <QuickActionButton
                  icon={FileText}
                  label="Documents"
                />
                <QuickActionButton
                  icon={TrendingUp}
                  label="Performance"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <Button variant="ghost" className="gap-1" size="sm">
            View calendar <ArrowRightCircle className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <UpcomingEventCard key={i} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}