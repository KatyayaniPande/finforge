'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export default function AddStartupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    startupName: '',
    description: '',
    industry: '',
    stage: '',
    location: '',
    foundingDate: '',
    teamSize: '',
    fundingRaised: '',
    valuation: '',
    revenue: '',
    growthRate: '',
    burnRate: '',
    runway: '',
    keyMetrics: '',
    competitors: '',
    marketSize: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // Redirect to startups list after submission
    router.push('/startups');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Startup</CardTitle>
          <CardDescription>Enter the startup details to add to the database</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="startupName">Startup Name</Label>
                  <Input
                    id="startupName"
                    value={formData.startupName}
                    onChange={(e) => handleChange('startupName', e.target.value)}
                    placeholder="Enter startup name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Brief description of the startup"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    onValueChange={(value) => handleChange('industry', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="healthtech">HealthTech</SelectItem>
                      <SelectItem value="ai">AI/ML</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stage">Stage</Label>
                  <Select
                    onValueChange={(value) => handleChange('stage', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="seriesA">Series A</SelectItem>
                      <SelectItem value="seriesB">Series B</SelectItem>
                      <SelectItem value="seriesC">Series C</SelectItem>
                      <SelectItem value="growth">Growth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Financial Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fundingRaised">Funding Raised</Label>
                  <Input
                    id="fundingRaised"
                    value={formData.fundingRaised}
                    onChange={(e) => handleChange('fundingRaised', e.target.value)}
                    placeholder="Total funding raised"
                    type="number"
                  />
                </div>

                <div>
                  <Label htmlFor="valuation">Valuation</Label>
                  <Input
                    id="valuation"
                    value={formData.valuation}
                    onChange={(e) => handleChange('valuation', e.target.value)}
                    placeholder="Current valuation"
                    type="number"
                  />
                </div>

                <div>
                  <Label htmlFor="revenue">Revenue</Label>
                  <Input
                    id="revenue"
                    value={formData.revenue}
                    onChange={(e) => handleChange('revenue', e.target.value)}
                    placeholder="Annual revenue"
                    type="number"
                  />
                </div>

                <div>
                  <Label htmlFor="burnRate">Burn Rate</Label>
                  <Input
                    id="burnRate"
                    value={formData.burnRate}
                    onChange={(e) => handleChange('burnRate', e.target.value)}
                    placeholder="Monthly burn rate"
                    type="number"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input
                    id="teamSize"
                    value={formData.teamSize}
                    onChange={(e) => handleChange('teamSize', e.target.value)}
                    placeholder="Number of employees"
                    type="number"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="Headquarters location"
                  />
                </div>

                <div>
                  <Label htmlFor="foundingDate">Founding Date</Label>
                  <Input
                    id="foundingDate"
                    value={formData.foundingDate}
                    onChange={(e) => handleChange('foundingDate', e.target.value)}
                    type="date"
                  />
                </div>
              </div>

              {/* Market Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="marketSize">Market Size</Label>
                  <Input
                    id="marketSize"
                    value={formData.marketSize}
                    onChange={(e) => handleChange('marketSize', e.target.value)}
                    placeholder="Total addressable market size"
                    type="number"
                  />
                </div>

                <div>
                  <Label htmlFor="competitors">Key Competitors</Label>
                  <Textarea
                    id="competitors"
                    value={formData.competitors}
                    onChange={(e) => handleChange('competitors', e.target.value)}
                    placeholder="List main competitors"
                  />
                </div>

                <div>
                  <Label htmlFor="keyMetrics">Key Metrics</Label>
                  <Textarea
                    id="keyMetrics"
                    value={formData.keyMetrics}
                    onChange={(e) => handleChange('keyMetrics', e.target.value)}
                    placeholder="Important metrics and KPIs"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">
                Add Startup
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 