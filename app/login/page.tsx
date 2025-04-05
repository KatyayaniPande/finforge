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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">FinForge</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="investor" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="investor" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Investor
              </TabsTrigger>
              <TabsTrigger value="startup" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Startup
              </TabsTrigger>
            </TabsList>

            <TabsContent value="investor">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="investor-email">Email</Label>
                  <Input
                    id="investor-email"
                    name="email"
                    type="email"
                    placeholder="jondoe@finforge.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investor-password">Password</Label>
                  <Input
                    id="investor-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <div className="text-sm text-red-500">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in as Investor'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="startup">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="startup-email">Email</Label>
                  <Input
                    id="startup-email"
                    name="email"
                    type="email"
                    placeholder="neuralkey@startup.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startup-password">Password</Label>
                  <Input
                    id="startup-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <div className="text-sm text-red-500">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in as Startup'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-500">
            Don't have an account?{' '}
            <Button variant="link" className="p-0 h-auto font-normal" onClick={() => router.push('/register')}>
              Register here
            </Button>
          </div>
          <div className="text-xs text-center text-gray-500">
            By signing in, you agree to our{' '}
            <Button variant="link" className="p-0 h-auto text-xs font-normal" onClick={() => router.push('/terms')}>
              Terms of Service
            </Button>
            {' '}and{' '}
            <Button variant="link" className="p-0 h-auto text-xs font-normal" onClick={() => router.push('/privacy')}>
              Privacy Policy
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 