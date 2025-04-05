'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StartupProfile {
  name: string;
  description: string;
  industry: string;
  stage: string;
  location: string;
  foundingDate: string;
  teamSize: string;
  fundingRaised: string;
  valuation: string;
  revenue: string;
  website: string;
  pitch: string;
  competitors: string;
  marketSize: string;
}

export default function StartupProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState<StartupProfile>({
    name: 'NeuralKey',
    description: '',
    industry: '',
    stage: '',
    location: '',
    foundingDate: '',
    teamSize: '',
    fundingRaised: '',
    valuation: '',
    revenue: '',
    website: '',
    pitch: '',
    competitors: '',
    marketSize: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Here you would typically send the data to your API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      router.push('/startups');
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof StartupProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Startup Profile</CardTitle>
            <CardDescription>
              Enter your startup details to help investors understand your business better.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                      value={profile.industry}
                      onValueChange={(value) => handleChange('industry', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai">Artificial Intelligence</SelectItem>
                        <SelectItem value="fintech">Fintech</SelectItem>
                        <SelectItem value="healthtech">HealthTech</SelectItem>
                        <SelectItem value="ecommerce">E-Commerce</SelectItem>
                        <SelectItem value="saas">SaaS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={profile.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Describe your startup in detail..."
                    className="h-32"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stage">Stage</Label>
                    <Select
                      value={profile.stage}
                      onValueChange={(value) => handleChange('stage', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idea">Idea Stage</SelectItem>
                        <SelectItem value="mvp">MVP</SelectItem>
                        <SelectItem value="seed">Seed</SelectItem>
                        <SelectItem value="series_a">Series A</SelectItem>
                        <SelectItem value="series_b">Series B</SelectItem>
                        <SelectItem value="series_c">Series C+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Business Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fundingRaised">Funding Raised</Label>
                    <Input
                      id="fundingRaised"
                      value={profile.fundingRaised}
                      onChange={(e) => handleChange('fundingRaised', e.target.value)}
                      placeholder="$0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="valuation">Valuation</Label>
                    <Input
                      id="valuation"
                      value={profile.valuation}
                      onChange={(e) => handleChange('valuation', e.target.value)}
                      placeholder="$0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revenue">Annual Revenue</Label>
                    <Input
                      id="revenue"
                      value={profile.revenue}
                      onChange={(e) => handleChange('revenue', e.target.value)}
                      placeholder="$0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Input
                      id="teamSize"
                      value={profile.teamSize}
                      onChange={(e) => handleChange('teamSize', e.target.value)}
                      type="number"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Market & Competition</h3>
                <div className="space-y-2">
                  <Label htmlFor="marketSize">Target Market Size</Label>
                  <Input
                    id="marketSize"
                    value={profile.marketSize}
                    onChange={(e) => handleChange('marketSize', e.target.value)}
                    placeholder="$0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="competitors">Key Competitors</Label>
                  <Textarea
                    id="competitors"
                    value={profile.competitors}
                    onChange={(e) => handleChange('competitors', e.target.value)}
                    placeholder="List your main competitors..."
                    className="h-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pitch">Elevator Pitch</Label>
                  <Textarea
                    id="pitch"
                    value={profile.pitch}
                    onChange={(e) => handleChange('pitch', e.target.value)}
                    placeholder="Your compelling elevator pitch..."
                    className="h-32"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 