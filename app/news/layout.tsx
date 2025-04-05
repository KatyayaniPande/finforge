import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News & Market Sentiment',
  description: 'Real-time market news and sentiment analysis'
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 