'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { getMarketNews } from '@/lib/services/news-service';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from '@radix-ui/react-icons';

interface NewsItem {
  title: string;
  url: string;
  time_published: string;
  summary: string;
  source: string;
  category: string;
  sectors: string[];
  sentiment?: {
    score: number;
    label: string;
    confidence: number;
    impact: 'high' | 'medium' | 'low';
  };
}

interface MarketNews {
  items: NewsItem[];
  sentiment: {
    overall: number;
    byCategory: {
      [key: string]: number;
    };
    bySector: {
      [key: string]: {
        sentiment: number;
        articles: number;
        trend: 'up' | 'down' | 'stable';
      };
    };
    marketImpact: {
      bullish: number;
      bearish: number;
      neutral: number;
    };
    trendingTopics: {
      topic: string;
      count: number;
      sentiment: number;
    }[];
  };
}

export default function NewsPage() {
  const [news, setNews] = useState<MarketNews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        console.log('Starting news fetch...');
        const data = await getMarketNews();
        console.log('News data received:', data);
        setNews(data);
      } catch (err) {
        console.error('Error in news page:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch news data');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Loading news...</h2>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-red-500">Error Loading News</h2>
            <p className="mt-2 text-muted-foreground">{error || 'No news data available'}</p>
            <p className="mt-4">Please check:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Your Alpha Vantage API key is correctly set in .env.local</li>
              <li>Your internet connection is working</li>
              <li>The Alpha Vantage API service is available</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Group news items by category
  const categorizedNews = news.items.reduce<Record<string, NewsItem[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">News & Market Sentiment</h2>
      </div>
      
      {/* Featured News */}
      <div className="grid gap-4 md:grid-cols-3">
        {news.items.slice(0, 3).map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>{item.source}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.summary}</p>
              <div className="mt-4 flex justify-between items-center">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Read more
                </a>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(item.time_published), { addSuffix: true })}
                </span>
              </div>
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
                {news.items.slice(3, 6).map((item, index) => (
                  <div key={index} className={index < 2 ? "border-b pb-4" : "pb-4"}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{item.title}</h4>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.summary}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDistanceToNow(new Date(item.time_published), { addSuffix: true })}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Sentiment Section */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-4">Market Sentiment</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-medium">Overall Sentiment</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={news.sentiment.overall} className="h-2" />
                    <span className="text-sm font-medium">{Math.round(news.sentiment.overall)}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {news.sentiment.overall > 60 ? 'Bullish' : 
                     news.sentiment.overall < 40 ? 'Bearish' : 'Neutral'}
                  </p>
                </div>
                {Object.entries(news.sentiment.byCategory).map(([category, sentiment], index, array) => (
                  <div key={category} className={index < array.length - 1 ? "border-b pb-4" : "pb-4"}>
                    <h4 className="font-medium">{category}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <Progress value={sentiment} className="h-2" />
                      <span className="text-sm font-medium">{Math.round(sentiment)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sectors" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(news.sentiment.bySector).map(([sector, data], index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg capitalize">{sector}</CardTitle>
                    <div className="flex items-center gap-1">
                      {data.trend === 'up' && <ArrowUpIcon className="text-green-500" />}
                      {data.trend === 'down' && <ArrowDownIcon className="text-red-500" />}
                      {data.trend === 'stable' && <MinusIcon className="text-yellow-500" />}
                      <Badge variant={data.sentiment > 60 ? "default" : data.sentiment < 40 ? "destructive" : "secondary"}>
                        {Math.round(data.sentiment)}%
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>
                    {data.articles} articles • Trend: {data.trend}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress 
                      value={data.sentiment} 
                      className="h-2"
                      indicatorClassName={
                        data.sentiment > 60 ? "bg-green-500" : 
                        data.sentiment < 40 ? "bg-red-500" : 
                        "bg-yellow-500"
                      }
                    />
                    <p className="text-sm text-muted-foreground">
                      {data.sentiment > 60 ? 'Bullish' : 
                       data.sentiment < 40 ? 'Bearish' : 
                       'Neutral'} sentiment
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sector Performance</CardTitle>
                <CardDescription>Relative sentiment across sectors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(news.sentiment.bySector)
                    .sort(([, a], [, b]) => b.sentiment - a.sentiment)
                    .map(([sector, data], index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{sector}</span>
                          <span className="flex items-center gap-1">
                            {data.trend === 'up' && <ArrowUpIcon className="text-green-500" />}
                            {data.trend === 'down' && <ArrowDownIcon className="text-red-500" />}
                            {data.trend === 'stable' && <MinusIcon className="text-yellow-500" />}
                            {Math.round(data.sentiment)}%
                          </span>
                        </div>
                        <Progress 
                          value={data.sentiment} 
                          className="h-1.5"
                          indicatorClassName={
                            data.sentiment > 60 ? "bg-green-500" : 
                            data.sentiment < 40 ? "bg-red-500" : 
                            "bg-yellow-500"
                          }
                        />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Activity</CardTitle>
                <CardDescription>Number of articles by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(news.sentiment.bySector)
                    .sort(([, a], [, b]) => b.articles - a.articles)
                    .map(([sector, data], index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="capitalize">{sector}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{data.articles} articles</Badge>
                          {data.trend === 'up' && <ArrowUpIcon className="text-green-500" />}
                          {data.trend === 'down' && <ArrowDownIcon className="text-red-500" />}
                          {data.trend === 'stable' && <MinusIcon className="text-yellow-500" />}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
                <CardDescription>Based on news coverage and sentiment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(news.sentiment.byCategory)
                    .sort(([, a], [, b]) => b - a)
                    .map(([category, sentiment], index) => (
                      <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{category}</h4>
                          <Badge variant="secondary">
                            {Math.round(sentiment)}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {categorizedNews[category]?.length || 0} related articles
                        </p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 