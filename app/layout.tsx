import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/lib/auth-context';
import { ClientLayout } from '@/components/client-layout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
  title: {
    default: 'FinForge - Contract and Investment Due Diligence Tool',
    template: `%s - FinForge`
  },
  description:
    'AI-powered contract and investment due diligence platform for Singlife',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable,
          inter.className
        )}
      >
        <Toaster position="top-center" />
        <Providers
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
