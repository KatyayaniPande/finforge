'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, User, ArrowRight, Shield, Rocket, TrendingUp, Sparkles, Mail, Lock, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'investor'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Here you would typically make an API call to register the user
      // For now, we'll just simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Registration successful!');
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-singlife-primary/5 via-white to-singlife-secondary/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Registration Form */}
        <Card className="border-2 border-singlife-primary/20 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-singlife-primary">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Join our community of investors and startups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="investor" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-singlife-primary/10">
                <TabsTrigger 
                  value="investor" 
                  className="flex items-center gap-2 data-[state=active]:bg-singlife-primary data-[state=active]:text-white"
                >
                  <User className="h-4 w-4" />
                  Investor
                </TabsTrigger>
                <TabsTrigger 
                  value="startup" 
                  className="flex items-center gap-2 data-[state=active]:bg-singlife-primary data-[state=active]:text-white"
                >
                  <Building2 className="h-4 w-4" />
                  Startup
                </TabsTrigger>
              </TabsList>

              <TabsContent value="investor">
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-singlife-secondary">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="pl-10 border-singlife-primary/30 focus:border-singlife-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-singlife-secondary">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jondoe@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="pl-10 border-singlife-primary/30 focus:border-singlife-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-singlife-secondary">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="pl-10 border-singlife-primary/30 focus:border-singlife-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-singlife-secondary">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="pl-10 border-singlife-primary/30 focus:border-singlife-primary"
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="text-sm text-red-500">
                      {error}
                    </div>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full bg-singlife-primary hover:bg-singlife-primary/90 text-white h-12 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Creating account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Create Investor Account
                        <UserPlus className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="startup">
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="startup-name" className="text-singlife-secondary">Company Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="startup-name"
                        name="name"
                        type="text"
                        placeholder="NeuralKey"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="pl-10 border-singlife-primary/30 focus:border-singlife-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startup-email" className="text-singlife-secondary">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="startup-email"
                        name="email"
                        type="email"
                        placeholder="contact@startup.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="pl-10 border-singlife-primary/30 focus:border-singlife-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startup-password" className="text-singlife-secondary">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="startup-password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="pl-10 border-singlife-primary/30 focus:border-singlife-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startup-confirm-password" className="text-singlife-secondary">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="startup-confirm-password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="pl-10 border-singlife-primary/30 focus:border-singlife-primary"
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="text-sm text-red-500">
                      {error}
                    </div>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full bg-singlife-primary hover:bg-singlife-primary/90 text-white h-12 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Creating account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Create Startup Account
                        <UserPlus className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center">
              Already have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal text-singlife-primary hover:text-singlife-primary/80" 
                onClick={() => router.push('/login')}
              >
                Sign in here
              </Button>
            </div>
            <div className="text-xs text-center text-gray-500">
              By registering, you agree to our{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto text-xs font-normal text-singlife-primary hover:text-singlife-primary/80" 
                onClick={() => router.push('/terms')}
              >
                Terms of Service
              </Button>
              {' '}and{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto text-xs font-normal text-singlife-primary hover:text-singlife-primary/80" 
                onClick={() => router.push('/privacy')}
              >
                Privacy Policy
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Right side - Features & Benefits */}
        <div className="hidden lg:flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-singlife-primary">Why Join FinForge?</h2>
            <p className="text-lg text-gray-600">
              Connect with a network of innovative startups and visionary investors
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-singlife-primary/5 border border-singlife-primary/20">
              <div className="p-2 rounded-full bg-singlife-primary/10">
                <Shield className="h-6 w-6 text-singlife-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-singlife-secondary">Secure Platform</h3>
                <p className="text-gray-600">Enterprise-grade security for your investments and data</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-singlife-primary/5 border border-singlife-primary/20">
              <div className="p-2 rounded-full bg-singlife-primary/10">
                <Rocket className="h-6 w-6 text-singlife-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-singlife-secondary">Fast Growth</h3>
                <p className="text-gray-600">Connect with high-potential startups and investors</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-singlife-primary/5 border border-singlife-primary/20">
              <div className="p-2 rounded-full bg-singlife-primary/10">
                <TrendingUp className="h-6 w-6 text-singlife-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-singlife-secondary">Smart Investments</h3>
                <p className="text-gray-600">AI-powered insights for better investment decisions</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-singlife-primary/5 border border-singlife-primary/20">
              <div className="p-2 rounded-full bg-singlife-primary/10">
                <Sparkles className="h-6 w-6 text-singlife-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-singlife-secondary">Innovation Hub</h3>
                <p className="text-gray-600">Access to cutting-edge technologies and market trends</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 