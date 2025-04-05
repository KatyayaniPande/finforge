'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/sidebar-context";
import { cn } from '@/lib/utils';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      const isAuthPage = pathname === '/login' || pathname === '/register';
      
      if (!user && !isAuthPage) {
        router.push('/login');
      } else if (user && isAuthPage) {
        router.push(user.role === 'investor' ? '/startups' : '/startups/edit/profile');
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  const showNavbar = user && pathname !== '/login' && pathname !== '/register';

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {showNavbar && <Navbar />}
        <div className={cn("flex-1", showNavbar && "transition-all duration-300 ml-16 lg:ml-56")}>
          <main className="p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
} 