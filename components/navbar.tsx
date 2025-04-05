'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MessageSquare, LayoutDashboard, Newspaper } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button
              variant={pathname === '/dashboard' ? 'default' : 'ghost'}
              className="flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/chat">
            <Button
              variant={pathname.includes('chat') ? 'default' : 'ghost'}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Chat
            </Button>
          </Link>
          <Link href="/news">
            <Button
              variant={pathname.includes('news') ? 'default' : 'ghost'}
              className="flex items-center gap-2"
            >
              <Newspaper className="h-4 w-4" />
              News
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 