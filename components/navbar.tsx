'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FileText,
  Settings, 
  LogOut,
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

  const menuItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/chat", icon: MessageSquare, label: "Chat" },
    { href: "/investments", icon: TrendingUp, label: "Investments" },
    { href: "/news", icon: Newspaper, label: "News" },
    { href: "/due-diligence", icon: FileText, label: "Due Diligence" },
    { href: "/about", icon: Info, label: "About" },
  ];

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
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-singlife-primary/10 text-singlife-primary"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
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
