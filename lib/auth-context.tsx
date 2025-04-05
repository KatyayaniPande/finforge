'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'investor' | 'startup' | 'admin';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockUser = MOCK_USERS[email as keyof typeof MOCK_USERS];
      
      if (!mockUser || mockUser.password !== password) {
        throw new Error('Invalid credentials');
      }

      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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