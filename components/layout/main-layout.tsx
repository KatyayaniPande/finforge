"use client"

import { cn } from "@/lib/utils"
import { Navbar } from "@/components/navbar"
import { useSidebar } from "@/components/sidebar-context"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="flex min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div 
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          isCollapsed ? "ml-16" : "ml-56"
        )}
      >
        <main className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 