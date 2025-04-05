'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FileText, 
  BarChart2, 
  Shield, 
  Users, 
  Settings, 
  LogOut,
  User,
  Info,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Newspaper,
  Rocket,
  Building2
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from './sidebar-context';
import { useAuth } from '@/lib/auth-context';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();

  const isInvestor = user?.role === 'investor';
  const isStartup = user?.role === 'startup';

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-singlife-primary flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-56"
      )}
    >
      <div className="p-2">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-singlife-primary">FinForge</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        <nav className="space-y-1">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'w-full justify-start gap-2 h-9',
                pathname === '/dashboard' && 'bg-singlife-light text-singlife-primary',
                isCollapsed && 'justify-center'
              )}
            >
              <Home className="h-4 w-4" />
              {!isCollapsed && "Dashboard"}
            </Button>
          </Link>

          {isInvestor && (
            <>
              <Link href="/chat">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'w-full justify-start gap-2 h-9',
                    pathname === '/chat' && 'bg-singlife-light text-singlife-primary',
                    isCollapsed && 'justify-center'
                  )}
                >
                  <MessageSquare className="h-4 w-4" />
                  {!isCollapsed && "Chat"}
                </Button>
              </Link>

              <Link href="/investments">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'w-full justify-start gap-2 h-9',
                    pathname === '/investments' && 'bg-singlife-light text-singlife-primary',
                    isCollapsed && 'justify-center'
                  )}
                >
                  <BarChart2 className="h-4 w-4" />
                  {!isCollapsed && "Investments"}
                </Button>
              </Link>

              <Link href="/news">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'w-full justify-start gap-2 h-9',
                    pathname === '/news' && 'bg-singlife-light text-singlife-primary',
                    isCollapsed && 'justify-center'
                  )}
                >
                  <Newspaper className="h-4 w-4" />
                  {!isCollapsed && "News"}
                </Button>
              </Link>

              <Link href="/due-diligence">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'w-full justify-start gap-2 h-9',
                    pathname === '/due-diligence' && 'bg-singlife-light text-singlife-primary',
                    isCollapsed && 'justify-center'
                  )}
                >
                  <FileText className="h-4 w-4" />
                  {!isCollapsed && "Due Diligence"}
                </Button>
              </Link>
            </>
          )}

          {isStartup && (
            <>
              <Link href="/startups/edit/profile">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'w-full justify-start gap-2 h-9',
                    pathname === '/startups/edit/profile' && 'bg-singlife-light text-singlife-primary',
                    isCollapsed && 'justify-center'
                  )}
                >
                  <Building2 className="h-4 w-4" />
                  {!isCollapsed && "My Profile"}
                </Button>
              </Link>
            </>
          )}

          <Link href="/about">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'w-full justify-start gap-2 h-9',
                pathname === '/about' && 'bg-singlife-light text-singlife-primary',
                isCollapsed && 'justify-center'
              )}
            >
              <Info className="h-4 w-4" />
              {!isCollapsed && "About"}
            </Button>
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-2 border-t border-singlife-primary">
        <div className={cn("flex items-center gap-2 mb-2", isCollapsed && "justify-center")}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar-placeholder.png" />
            <AvatarFallback>{user?.name?.slice(0, 2) || 'U'}</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div>
              <p className="font-medium text-sm text-singlife-secondary">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Guest'}</p>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn("w-full justify-start gap-2 h-9", isCollapsed && "justify-center")}
          >
            <Settings className="h-4 w-4" />
            {!isCollapsed && "Settings"}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start gap-2 h-9 text-red-500 hover:text-red-600",
              isCollapsed && "justify-center"
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </div>
    </div>
  );
}
