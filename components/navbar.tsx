'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MessageSquare, LayoutDashboard, Newspaper, FileText, Info, TrendingUp } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  // Function to determine active button style
  const getButtonClass = (path: string) => {
    return pathname === path || pathname.includes(path)
      ? 'bg-red-600 text-white'  // Red background with white text for active
      : 'bg-transparent text-red-600 hover:bg-red-500 hover:text-white'; // Transparent background, red text for inactive with hover effect
  };

  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        {/* Singlife Logo on the left */}
        <img
          src="https://singlife.com/etc.clientlibs/asl-public/clientlibs/clientlib-base/resources/assets/logo/sl-logo-singlife.png"
          alt="Singlife Logo"
          className="h-8" // Adjust the size of the logo as needed
        />
        
        {/* Sections aligned to the right */}
        <div className="flex items-center space-x-4 ml-auto">
          <Link href="/dashboard">
            <Button
              className={`flex items-center gap-2 ${getButtonClass('/dashboard')}`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/chat">
            <Button
              className={`flex items-center gap-2 ${getButtonClass('chat')}`}
            >
              <MessageSquare className="h-4 w-4" />
              Chat
            </Button>
          </Link>
          <Link href="/news">
            <Button
              className={`flex items-center gap-2 ${getButtonClass('news')}`}
            >
              <Newspaper className="h-4 w-4" />
              News
            </Button>
          </Link>
          <Link href="/investments">
            <Button
              className={`flex items-center gap-2 ${getButtonClass('investments')}`}
            >
              <TrendingUp className="h-4 w-4" />
              Investments
            </Button>
          </Link>
          <Link href="/due-diligence">
            <Button
              className={`flex items-center gap-2 ${getButtonClass('due-diligence')}`}
            >
              <FileText className="h-4 w-4" />
              Due Diligence
            </Button>
          </Link>
          <Link href="/about">
            <Button
              className={`flex items-center gap-2 ${getButtonClass('about')}`}
            >
              <Info className="h-4 w-4" />
              About
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
