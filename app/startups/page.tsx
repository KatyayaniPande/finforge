'use client';

import { useEffect, useState } from 'react';
import { useAuth, useRequireAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusIcon, LineChartIcon, BuildingIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface StartupData {
  id: string;
  name: string;
  description: string;
  industry: string;
  stage: string;
  fundingRaised: number;
  valuation: number;
  teamSize: number;
  location: string;
}

export default function StartupsPage() {
  const { isLoading, isAuthorized } = useRequireAuth(['investor', 'startup', 'admin']);
  const { user } = useAuth();
  const [startups, setStartups] = useState<StartupData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthorized && !isLoading) {
      redirect('/login');
    }
  }, [isAuthorized, isLoading]);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch('/api/startups');
        const data = await response.json();
        setStartups(data);
      } catch (error) {
        console.error('Failed to fetch startups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  // Investor View
  if (user?.role === 'investor') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Startup Directory</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/startups/favorites">
              View Favorites
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Startups</TabsTrigger>
            <TabsTrigger value="tech">Tech</TabsTrigger>
            <TabsTrigger value="fintech">Fintech</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {startups.map((startup) => (
                <Card key={startup.id}>
                  <CardHeader>
                    <CardTitle>{startup.name}</CardTitle>
                    <CardDescription>{startup.industry} • {startup.stage}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">{startup.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Funding Raised</span>
                        <span className="font-medium">${startup.fundingRaised.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Valuation</span>
                        <span className="font-medium">${startup.valuation.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" asChild>
                      <Link href={`/startups/${startup.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Startup View
  if (user?.role === 'startup') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Startup Profile</h1>
          <Button asChild>
            <Link href="/startups/edit">
              <PlusIcon className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Company Details</h3>
                  <p className="text-sm text-gray-500">Update your company's information and profile</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/startups/edit/profile">Manage Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investor Interest</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">View interested investors</h3>
                  <p className="text-sm text-gray-500">Track and manage investor interactions</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/startups/investors">View Investors</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
} 