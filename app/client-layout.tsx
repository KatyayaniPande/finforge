'use client';

import { AuthProvider } from '@/lib/auth-context';
import { SidebarProvider } from "@/components/sidebar-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MainLayout } from "@/components/layout/main-layout";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from 'next/navigation';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <AuthProvider>
      <TooltipProvider>
        {isAuthPage ? (
          <>
            {children}
            <Toaster position="top-center" />
          </>
        ) : (
          <SidebarProvider>
            <MainLayout>
              {children}
            </MainLayout>
            <Toaster position="top-center" />
          </SidebarProvider>
        )}
      </TooltipProvider>
    </AuthProvider>
  );
} 