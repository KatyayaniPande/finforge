'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { getMarketNews } from '@/lib/services/news-service';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, PieChartIcon, BarChartIcon, FileTextIcon } from '@radix-ui/react-icons';

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

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 60) return 'text-green-500';
    if (sentiment < 40) return 'text-red-500';
    return 'text-yellow-500';
  };

  const getSentimentBg = (sentiment: number) => {
    if (sentiment > 60) return 'bg-green-500';
    if (sentiment < 40) return 'bg-red-500';
    return 'bg-yellow-500';
  };

  const getSentimentGradient = (sentiment: number) => {
    if (sentiment > 60) return 'bg-gradient-to-r from-green-500/20 to-green-500/10';
    if (sentiment < 40) return 'bg-gradient-to-r from-red-500/20 to-red-500/10';
    return 'bg-gradient-to-r from-yellow-500/20 to-yellow-500/10';
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">News & Market Sentiment</h2>
          <p className="text-muted-foreground mt-1">Real-time market analysis and sentiment tracking</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold tracking-tight">
              <span className={getSentimentColor(news.sentiment.overall)}>
                {Math.round(news.sentiment.overall)}%
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Overall Sentiment</div>
          </div>
        </div>
      </div>
      
      {/* Featured News */}
      <div className="grid gap-6 md:grid-cols-3">
        {news.items.slice(0, 3).map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="mt-2 flex items-center gap-2">
                    <FileTextIcon className="h-4 w-4" />
                    {item.source}
                  </CardDescription>
                </div>
                {item.sentiment && (
                  <Badge variant={item.sentiment.score > 0.6 ? "default" : item.sentiment.score < 0.4 ? "destructive" : "secondary"}>
                    {item.sentiment.label}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{item.summary}</p>
              <div className="flex justify-between items-center">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                >
                  Read more →
                </a>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(item.time_published), { addSuffix: true })}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            Market Overview
          </TabsTrigger>
          <TabsTrigger value="sectors" className="flex items-center gap-2">
            <BarChartIcon className="h-4 w-4" />
            Sector Analysis
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            Trending Topics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Market News Section */}
            <div className="col-span-2 rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FileTextIcon className="h-5 w-5" />
                Latest Market News
              </h3>
              <div className="space-y-6">
                {news.items.slice(3, 6).map((item, index) => (
                  <div key={index} className={`${index < 2 ? "border-b pb-6" : ""} hover:bg-muted/50 rounded-lg transition-colors`}>
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <h4 className="font-medium line-clamp-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Read more →
                      </a>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(item.time_published), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Sentiment Section */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <PieChartIcon className="h-5 w-5" />
                Market Sentiment
              </h3>
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <h4 className="font-medium mb-3">Overall Sentiment</h4>
                  <div className={`rounded-lg p-4 ${getSentimentGradient(news.sentiment.overall)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Progress 
                        value={news.sentiment.overall} 
                        className="h-2"
                        indicatorClassName={getSentimentBg(news.sentiment.overall)}
                      />
                      <span className={`text-sm font-medium ${getSentimentColor(news.sentiment.overall)}`}>
                        {Math.round(news.sentiment.overall)}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {news.sentiment.overall > 60 ? 'Bullish sentiment dominates the market' : 
                       news.sentiment.overall < 40 ? 'Bearish pressure in the market' : 
                       'Market showing neutral sentiment'}
                    </p>
                  </div>
                </div>
                {Object.entries(news.sentiment.byCategory).map(([category, sentiment], index, array) => (
                  <div key={category} className={index < array.length - 1 ? "border-b pb-6" : ""}>
                    <h4 className="font-medium mb-3 capitalize">{category}</h4>
                    <div className={`rounded-lg p-4 ${getSentimentGradient(sentiment)}`}>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={sentiment} 
                          className="h-2"
                          indicatorClassName={getSentimentBg(sentiment)}
                        />
                        <span className={`text-sm font-medium ${getSentimentColor(sentiment)}`}>
                          {Math.round(sentiment)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sectors" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(news.sentiment.bySector).map(([sector, data], index) => (
              <Card key={index} className={`hover:shadow-lg transition-shadow ${getSentimentGradient(data.sentiment)}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg capitalize flex items-center gap-2">
                      <BarChartIcon className="h-5 w-5" />
                      {sector}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      {data.trend === 'up' && <ArrowUpIcon className="text-green-500 h-5 w-5" />}
                      {data.trend === 'down' && <ArrowDownIcon className="text-red-500 h-5 w-5" />}
                      {data.trend === 'stable' && <MinusIcon className="text-yellow-500 h-5 w-5" />}
                      <Badge variant={data.sentiment > 60 ? "default" : data.sentiment < 40 ? "destructive" : "secondary"}>
                        {Math.round(data.sentiment)}%
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="mt-2 flex items-center gap-2">
                    <span>{data.articles} articles</span>
                    <span>•</span>
                    <span className="capitalize">Trend: {data.trend}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress 
                      value={data.sentiment} 
                      className="h-2"
                      indicatorClassName={getSentimentBg(data.sentiment)}
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

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Sector Performance
                </CardTitle>
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
                            <span className={getSentimentColor(data.sentiment)}>
                              {Math.round(data.sentiment)}%
                            </span>
                          </span>
                        </div>
                        <Progress 
                          value={data.sentiment} 
                          className="h-1.5"
                          indicatorClassName={getSentimentBg(data.sentiment)}
                        />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChartIcon className="h-5 w-5" />
                  Sector Activity
                </CardTitle>
                <CardDescription>Number of articles by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(news.sentiment.bySector)
                    .sort(([, a], [, b]) => b.articles - a.articles)
                    .map(([sector, data], index) => (
                      <div key={index} className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <span className="capitalize flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${getSentimentBg(data.sentiment)}`} />
                          {sector}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono">{data.articles} articles</Badge>
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
        
        <TabsContent value="trending" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Trending Topics
                </CardTitle>
                <CardDescription>Based on news coverage and sentiment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.sentiment.trendingTopics.map((topic, index) => (
                    <div key={index} className={`p-4 rounded-lg ${getSentimentGradient(topic.sentiment)}`}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium capitalize">{topic.topic}</h4>
                        <Badge variant="secondary" className="font-mono">
                          {topic.count} mentions
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={topic.sentiment} 
                            className="h-1.5"
                            indicatorClassName={getSentimentBg(topic.sentiment)}
                          />
                          <span className={`text-sm font-medium ${getSentimentColor(topic.sentiment)}`}>
                            {Math.round(topic.sentiment)}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {topic.sentiment > 60 ? 'Strong positive sentiment' : 
                           topic.sentiment < 40 ? 'Negative sentiment prevails' : 
                           'Mixed sentiment'}
                        </p>
                      </div>
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