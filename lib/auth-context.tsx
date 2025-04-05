'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'investor' | 'startup' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'investor' | 'startup';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

// Mock users for demo
const MOCK_USERS = {
  'jondoe@finforge.com': {
    id: '1',
    email: 'jondoe@finforge.com',
    password: 'investor123',
    role: 'investor' as const,
    name: 'Jon Doe'
  },
  'neuralkey@startup.com': {
    id: '2',
    email: 'neuralkey@startup.com',
    password: 'startup123',
    role: 'startup' as const,
    name: 'NeuralKey'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // This is a mock implementation. Replace with your actual login logic
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: email.includes('startup') ? 'startup' : 'investor',
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      // Redirect based on user role
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useRequireAuth(allowedRoles?: UserRole[]) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return { isLoading: true, isAuthorized: false };
  }

  if (!user) {
    return { isLoading: false, isAuthorized: false };
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return { isLoading: false, isAuthorized: false };
  }

  return { isLoading: false, isAuthorized: true };
} 