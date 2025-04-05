import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"
import { MainLayout } from "@/components/layout/main-layout"
import { SidebarProvider } from "@/components/sidebar-context"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
  title: "FinForge - Investment Platform",
  description: "AI-powered investment platform for startups and investors",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
      >
        <TooltipProvider>
          <SidebarProvider>
            <MainLayout>
              {children}
            </MainLayout>
            <Toaster position="top-center" />
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}
