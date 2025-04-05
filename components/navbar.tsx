'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  ChevronRight
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from './sidebar-context';

export function Navbar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-singlife-primary flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-56"
      )}
    >
      <div className="p-2">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && <h1 className="text-xl font-bold text-singlife-primary">FinForge</h1>}
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
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'w-full justify-start gap-2 h-9',
                pathname === '/' && 'bg-singlife-light text-singlife-primary',
                isCollapsed && 'justify-center'
              )}
            >
              <Home className="h-4 w-4" />
              {!isCollapsed && "Dashboard"}
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

          <Link href="/risk-assessment">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'w-full justify-start gap-2 h-9',
                pathname === '/risk-assessment' && 'bg-singlife-light text-singlife-primary',
                isCollapsed && 'justify-center'
              )}
            >
              <BarChart2 className="h-4 w-4" />
              {!isCollapsed && "Risk Assessment"}
            </Button>
          </Link>

          <Link href="/compliance">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'w-full justify-start gap-2 h-9',
                pathname === '/compliance' && 'bg-singlife-light text-singlife-primary',
                isCollapsed && 'justify-center'
              )}
            >
              <Shield className="h-4 w-4" />
              {!isCollapsed && "Compliance"}
            </Button>
          </Link>

          <Link href="/team">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'w-full justify-start gap-2 h-9',
                pathname === '/team' && 'bg-singlife-light text-singlife-primary',
                isCollapsed && 'justify-center'
              )}
            >
              <Users className="h-4 w-4" />
              {!isCollapsed && "Team"}
            </Button>
          </Link>

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
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div>
              <p className="font-medium text-sm text-singlife-secondary">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
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
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </div>
    </div>
  );
}
