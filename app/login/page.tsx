'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, User } from 'lucide-react';
import { toast } from 'sonner';

// Mock users for demo
const MOCK_USERS = {
  'jondoe@finforge.com': {
    password: 'investor123',
    role: 'investor',
    name: 'Jon Doe'
  },
  'neuralkey@startup.com': {
    password: 'startup123',
    role: 'startup',
    name: 'NeuralKey'
  }
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      // Login function now handles the redirection
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-1 bg-gradient-to-r from-singlife-primary/5 to-singlife-primary/10 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center text-singlife-primary">FinForge</CardTitle>
          <CardDescription className="text-center text-singlife-secondary">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="investor" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="investor" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-singlife-primary">
                <User className="h-4 w-4" />
                Investor
              </TabsTrigger>
              <TabsTrigger value="startup" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-singlife-primary">
                <Building2 className="h-4 w-4" />
                Startup
              </TabsTrigger>
            </TabsList>

            <TabsContent value="investor" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="investor-email" className="text-singlife-secondary">Email</Label>
                  <Input
                    id="investor-email"
                    name="email"
                    type="email"
                    placeholder="jondoe@finforge.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-singlife-primary/50 transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investor-password" className="text-singlife-secondary">Password</Label>
                  <Input
                    id="investor-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-singlife-primary/50 transition-all duration-200"
                  />
                </div>
                {error && (
                  <div className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
                    {error}
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-singlife-primary hover:bg-singlife-primary-dark text-white transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in as Investor'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="startup" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="startup-email" className="text-singlife-secondary">Email</Label>
                  <Input
                    id="startup-email"
                    name="email"
                    type="email"
                    placeholder="neuralkey@startup.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-singlife-primary/50 transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startup-password" className="text-singlife-secondary">Password</Label>
                  <Input
                    id="startup-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-singlife-primary/50 transition-all duration-200"
                  />
                </div>
                {error && (
                  <div className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
                    {error}
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-singlife-primary hover:bg-singlife-primary-dark text-white transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in as Startup'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 bg-gray-50 rounded-b-lg p-6">
          <div className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Button variant="link" className="p-0 h-auto font-normal text-singlife-primary hover:text-singlife-primary-dark" onClick={() => router.push('/register')}>
              Register here
            </Button>
          </div>
          <div className="text-xs text-center text-gray-500">
            By signing in, you agree to our{' '}
            <Button variant="link" className="p-0 h-auto text-xs font-normal text-singlife-primary hover:text-singlife-primary-dark" onClick={() => router.push('/terms')}>
              Terms of Service
            </Button>
            {' '}and{' '}
            <Button variant="link" className="p-0 h-auto text-xs font-normal text-singlife-primary hover:text-singlife-primary-dark" onClick={() => router.push('/privacy')}>
              Privacy Policy
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 