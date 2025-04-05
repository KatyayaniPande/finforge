import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export const metadata: Metadata = {
  title: 'News & Market Sentiment',
  description: 'Real-time market news and sentiment analysis'
}

// Sample data - in a real app, this would come from an API
const sectors = [
  { name: 'Technology', sentiment: 75, change: '+2.5%', news: 12 },
  { name: 'Finance', sentiment: 68, change: '-1.2%', news: 8 },
  { name: 'Healthcare', sentiment: 82, change: '+3.1%', news: 10 },
  { name: 'Energy', sentiment: 45, change: '-4.3%', news: 6 },
  { name: 'Consumer Goods', sentiment: 60, change: '+0.8%', news: 7 },
  { name: 'Real Estate', sentiment: 52, change: '-2.1%', news: 5 },
  { name: 'Industrials', sentiment: 58, change: '+1.5%', news: 9 },
  { name: 'Materials', sentiment: 49, change: '-3.2%', news: 4 }
]

const aiSummaries = [
  {
    title: 'Market Overview',
    content: 'The technology sector continues to lead market gains, driven by AI innovations and strong earnings from major tech companies. Healthcare shows resilience with positive sentiment, while energy and materials face headwinds due to global economic concerns.'
  },
  {
    title: 'Key Insights',
    content: 'Market volatility remains elevated as investors digest mixed economic data. Tech stocks are benefiting from AI-driven growth, while traditional sectors like finance and real estate show signs of weakness. Overall market sentiment is cautiously optimistic.'
  },
  {
    title: 'Trending Analysis',
    content: 'AI and semiconductor companies are seeing increased investment flows. Financial technology adoption is accelerating, while traditional banking faces regulatory challenges. Healthcare innovation, particularly in biotech, is attracting significant attention.'
  }
]

export default function NewsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">News & Market Sentiment</h2>
      </div>
      
      {/* AI-Generated Summaries */}
      <div className="grid gap-4 md:grid-cols-3">
        {aiSummaries.map((summary, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{summary.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{summary.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="sectors">Sector Analysis</TabsTrigger>
          <TabsTrigger value="trending">Trending Topics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Market News Section */}
            <div className="col-span-2 rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-4">Latest Market News</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Tech Stocks Rally on AI Breakthroughs</h4>
                    <Badge variant="outline">Technology</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Major technology companies reported stronger-than-expected earnings, driven by AI product adoption.</p>
                  <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Federal Reserve Signals Potential Rate Cut</h4>
                    <Badge variant="outline">Finance</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">The Federal Reserve's latest meeting minutes suggest a possible shift in monetary policy.</p>
                  <p className="text-xs text-muted-foreground mt-2">5 hours ago</p>
                </div>
                <div className="pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Healthcare Innovation Drives Sector Growth</h4>
                    <Badge variant="outline">Healthcare</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">New medical technologies and treatments are boosting healthcare company valuations.</p>
                  <p className="text-xs text-muted-foreground mt-2">8 hours ago</p>
                </div>
              </div>
            </div>

            {/* Market Sentiment Section */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-4">Market Sentiment</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-medium">Overall Sentiment</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={65} className="h-2" />
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Moderately Bullish</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-medium">Fear & Greed Index</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={55} className="h-2" />
                    <span className="text-sm font-medium">55</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Neutral</p>
                </div>
                <div className="pb-4">
                  <h4 className="font-medium">Market Volatility</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={40} className="h-2" />
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Moderate</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sectors" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{sector.name}</CardTitle>
                    <Badge variant={sector.change.startsWith('+') ? 'default' : 'destructive'}>
                      {sector.change}
                    </Badge>
                  </div>
                  <CardDescription>{sector.news} news items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sentiment</span>
                      <span>{sector.sentiment}%</span>
                    </div>
                    <Progress value={sector.sentiment} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Trending Topics Section */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-4">Trending Topics</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Artificial Intelligence</h4>
                    <Badge variant="secondary">+32%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">AI companies and technologies are driving market growth and innovation.</p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Renewable Energy</h4>
                    <Badge variant="secondary">+18%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Clean energy initiatives and policy changes are impacting the energy sector.</p>
                </div>
                <div className="pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Cryptocurrency</h4>
                    <Badge variant="secondary">+15%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Digital assets are gaining mainstream acceptance and regulatory clarity.</p>
                </div>
              </div>
            </div>

            {/* Sector Performance Section */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-4">Sector Performance</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Technology</h4>
                    <Badge variant="default">+2.5%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Leading market gains with strong AI and cloud computing performance.</p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Healthcare</h4>
                    <Badge variant="default">+3.1%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Benefiting from innovation and demographic trends.</p>
                </div>
                <div className="pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Energy</h4>
                    <Badge variant="destructive">-4.3%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Facing headwinds from shifting consumer preferences and policy changes.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 