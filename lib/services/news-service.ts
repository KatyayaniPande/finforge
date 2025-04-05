import axios from 'axios';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

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

// Market-specific sentiment analysis
const marketSentimentKeywords = {
  bullish: {
    strong: ['surge', 'soar', 'skyrocket', 'breakthrough', 'outperform', 'exceed', 'beat', 'record high', 'rally', 'boom'],
    moderate: ['gain', 'rise', 'growth', 'boost', 'improve', 'upgrade', 'positive', 'optimistic', 'momentum', 'confidence'],
    weak: ['up', 'higher', 'better', 'recover', 'stabilize', 'opportunity', 'potential']
  },
  bearish: {
    strong: ['crash', 'plunge', 'collapse', 'crisis', 'disaster', 'downgrade', 'default', 'bankruptcy', 'recession'],
    moderate: ['fall', 'drop', 'decline', 'loss', 'weak', 'concern', 'risk', 'warning', 'volatile', 'pressure'],
    weak: ['down', 'lower', 'caution', 'uncertain', 'slowdown', 'challenging']
  },
  sectors: {
    technology: {
      keywords: ['software', 'hardware', 'ai', 'cloud', 'data', 'cybersecurity', 'semiconductor', 'tech'],
      companies: ['apple', 'microsoft', 'google', 'amazon', 'meta', 'nvidia', 'tsmc', 'intel']
    },
    finance: {
      keywords: ['banking', 'investment', 'insurance', 'fintech', 'payment', 'credit', 'lending'],
      companies: ['jpmorgan', 'goldman sachs', 'visa', 'mastercard', 'paypal', 'blackrock']
    },
    healthcare: {
      keywords: ['biotech', 'pharmaceutical', 'healthcare', 'medical', 'drug', 'therapy', 'clinical'],
      companies: ['pfizer', 'johnson & johnson', 'unitedhealth', 'merck', 'novartis', 'roche']
    },
    energy: {
      keywords: ['oil', 'gas', 'renewable', 'solar', 'wind', 'energy', 'power', 'climate'],
      companies: ['exxon', 'chevron', 'shell', 'bp', 'total', 'nextera']
    },
    consumer: {
      keywords: ['retail', 'consumer', 'e-commerce', 'food', 'beverage', 'luxury', 'apparel'],
      companies: ['walmart', 'coca-cola', 'nike', 'mcdonald', 'procter & gamble', 'netflix']
    },
    industrial: {
      keywords: ['manufacturing', 'aerospace', 'defense', 'construction', 'machinery', 'transport'],
      companies: ['boeing', 'caterpillar', 'ge', 'lockheed martin', '3m', 'honeywell']
    },
    realestate: {
      keywords: ['real estate', 'reit', 'property', 'housing', 'commercial', 'residential', 'mortgage'],
      companies: ['prologis', 'american tower', 'equinix', 'public storage']
    }
  },
  topics: {
    economy: ['gdp', 'economy', 'economic', 'fed', 'federal reserve', 'inflation', 'interest rate', 'monetary', 'fiscal'],
    market: ['stock', 'market', 'index', 'nasdaq', 'dow', 's&p', 'trading', 'volatility', 'liquidity'],
    crypto: ['bitcoin', 'crypto', 'blockchain', 'ethereum', 'digital currency', 'defi', 'nft'],
    regulation: ['regulation', 'compliance', 'policy', 'legislation', 'regulatory', 'oversight', 'reform'],
    global: ['global', 'international', 'trade', 'geopolitical', 'emerging markets', 'foreign']
  }
};

export async function getMarketNews(): Promise<MarketNews> {
  if (!NEWS_API_KEY) {
    throw new Error('News API key is not configured. Please add NEXT_PUBLIC_NEWS_API_KEY to your .env.local file');
  }

  try {
    console.log('Fetching news data...');
    
    // Fetch news from multiple categories
    const categories = ['business', 'technology', 'health', 'science'];
    const searchQueries = [
      'finance OR banking OR investment',
      'energy OR oil OR renewable',
      'real estate OR property OR housing',
      'retail OR consumer OR e-commerce'
    ];

    // Fetch category-based news
    const categoryPromises = categories.map(category =>
      axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=10&apiKey=${NEWS_API_KEY}`
      )
    );

    // Fetch keyword-based news
    const searchPromises = searchQueries.map(q =>
      axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${NEWS_API_KEY}`
      )
    );

    const responses = await Promise.all([...categoryPromises, ...searchPromises]);
    
    console.log('API Responses received');

    // Combine all articles
    const allArticles = responses.flatMap((response, index) => {
      const category = index < categories.length 
        ? categories[index]
        : 'general';
      
      return response.data.articles.map((article: any) => ({
        category,
        ...article
      }));
    });

    // Remove duplicates based on title
    const uniqueArticles = Array.from(
      new Map(allArticles.map(article => [article.title, article])).values()
    );

    // Process and transform the news items
    const newsItems: NewsItem[] = uniqueArticles.map((article: any) => {
      const text = (article.title + ' ' + (article.description || '')).toLowerCase();
      
      // Calculate sentiment scores
      let sentimentScore = 0.5; // neutral by default
      let confidence = 0;
      let impact: 'high' | 'medium' | 'low' = 'low';

      // Calculate bullish signals
      const strongBullish = marketSentimentKeywords.bullish.strong.filter(word => text.includes(word)).length * 3;
      const moderateBullish = marketSentimentKeywords.bullish.moderate.filter(word => text.includes(word)).length * 2;
      const weakBullish = marketSentimentKeywords.bullish.weak.filter(word => text.includes(word)).length;

      // Calculate bearish signals
      const strongBearish = marketSentimentKeywords.bearish.strong.filter(word => text.includes(word)).length * 3;
      const moderateBearish = marketSentimentKeywords.bearish.moderate.filter(word => text.includes(word)).length * 2;
      const weakBearish = marketSentimentKeywords.bearish.weak.filter(word => text.includes(word)).length;

      // Calculate total sentiment score
      const bullishScore = strongBullish + moderateBullish + weakBullish;
      const bearishScore = strongBearish + moderateBearish + weakBearish;
      const totalSignals = bullishScore + bearishScore;

      if (totalSignals > 0) {
        sentimentScore = (bullishScore / (bullishScore + bearishScore));
        confidence = Math.min((totalSignals / 10), 1); // Cap confidence at 1

        // Determine impact based on signal strength
        if (strongBullish > 0 || strongBearish > 0) {
          impact = 'high';
        } else if (moderateBullish > 0 || moderateBearish > 0) {
          impact = 'medium';
        }
      }

      // Identify sectors mentioned in the article
      const sectors = Object.entries(marketSentimentKeywords.sectors).reduce((acc: string[], [sector, data]) => {
        const hasKeywords = data.keywords.some(keyword => text.includes(keyword));
        const hasCompanies = data.companies.some(company => text.includes(company.toLowerCase()));
        if (hasKeywords || hasCompanies) {
          acc.push(sector);
        }
        return acc;
      }, []);

      // If no specific sectors are detected, assign based on category
      if (sectors.length === 0) {
        switch (article.category) {
          case 'technology':
            sectors.push('technology');
            break;
          case 'business':
            sectors.push('finance');
            break;
          case 'health':
            sectors.push('healthcare');
            break;
          case 'science':
            if (text.includes('energy') || text.includes('climate')) {
              sectors.push('energy');
            } else {
              sectors.push('technology');
            }
            break;
        }
      }

      return {
        title: article.title,
        url: article.url,
        time_published: article.publishedAt,
        summary: article.description || 'No description available',
        source: article.source.name,
        category: article.category,
        sectors: sectors.length > 0 ? sectors : ['general'],
        sentiment: {
          score: sentimentScore,
          label: sentimentScore > 0.6 ? 'bullish' : sentimentScore < 0.4 ? 'bearish' : 'neutral',
          confidence: confidence,
          impact: impact
        }
      };
    });

    console.log('Processed news items:', newsItems.length);

    // Calculate overall sentiment
    const sentimentScores = newsItems
      .filter((item: NewsItem) => item.sentiment)
      .map((item: NewsItem) => item.sentiment!.score * item.sentiment!.confidence);
    
    const overallSentiment = sentimentScores.length > 0
      ? (sentimentScores.reduce((a: number, b: number) => a + b, 0) / sentimentScores.length) * 100
      : 50;

    // Calculate sentiment by category
    const categorySentiment: { [key: string]: number[] } = {};
    newsItems.forEach((item: NewsItem) => {
      if (item.sentiment && item.category) {
        if (!categorySentiment[item.category]) {
          categorySentiment[item.category] = [];
        }
        categorySentiment[item.category].push(item.sentiment.score * item.sentiment!.confidence);
      }
    });

    const sentimentByCategory = Object.entries(categorySentiment).reduce(
      (acc, [category, scores]) => ({
        ...acc,
        [category]: (scores.reduce((a: number, b: number) => a + b, 0) / scores.length) * 100
      }),
      {} as { [key: string]: number }
    );

    // Calculate sentiment by sector
    const sectorSentiment: { [key: string]: { scores: number[]; history: number[] } } = {};
    newsItems.forEach((item: NewsItem) => {
      item.sectors.forEach(sector => {
        if (!sectorSentiment[sector]) {
          sectorSentiment[sector] = { scores: [], history: [] };
        }
        if (item.sentiment) {
          sectorSentiment[sector].scores.push(item.sentiment.score * item.sentiment.confidence);
          // Keep last 5 sentiment scores for trend analysis
          sectorSentiment[sector].history.push(item.sentiment.score);
          if (sectorSentiment[sector].history.length > 5) {
            sectorSentiment[sector].history.shift();
          }
        }
      });
    });

    const sentimentBySector = Object.entries(sectorSentiment).reduce<{
      [key: string]: { sentiment: number; articles: number; trend: 'up' | 'down' | 'stable' }
    }>((acc, [sector, data]) => {
      const sentiment = data.scores.length > 0
        ? (data.scores.reduce((a, b) => a + b, 0) / data.scores.length) * 100
        : 50;

      // Calculate trend
      const trend: 'up' | 'down' | 'stable' = data.history.length >= 2
        ? data.history[data.history.length - 1] > data.history[0]
          ? 'up'
          : data.history[data.history.length - 1] < data.history[0]
            ? 'down'
            : 'stable'
        : 'stable';

      return {
        ...acc,
        [sector]: {
          sentiment,
          articles: data.scores.length,
          trend
        }
      };
    }, {});

    // Calculate market impact distribution
    const marketImpact = {
      bullish: newsItems.filter(item => item.sentiment?.label === 'bullish').length,
      bearish: newsItems.filter(item => item.sentiment?.label === 'bearish').length,
      neutral: newsItems.filter(item => item.sentiment?.label === 'neutral').length,
    };

    // Calculate trending topics
    const topicMentions: Map<string, { count: number; sentiment: number[] }> = new Map();

    newsItems.forEach(item => {
      const text = (item.title + ' ' + item.summary).toLowerCase();
      
      Object.entries(marketSentimentKeywords.topics).forEach(([category, keywords]) => {
        keywords.forEach(keyword => {
          if (text.includes(keyword)) {
            const key = category;
            const existing = topicMentions.get(key) || { count: 0, sentiment: [] };
            topicMentions.set(key, {
              count: existing.count + 1,
              sentiment: [...existing.sentiment, item.sentiment?.score || 0.5]
            });
          }
        });
      });
    });

    const trendingTopics = Array.from(topicMentions.entries())
      .map(([topic, data]) => ({
        topic,
        count: data.count,
        sentiment: (data.sentiment.reduce((a, b) => a + b, 0) / data.sentiment.length) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      items: newsItems,
      sentiment: {
        overall: overallSentiment,
        byCategory: sentimentByCategory,
        bySector: sentimentBySector,
        marketImpact: {
          bullish: (marketImpact.bullish / newsItems.length) * 100,
          bearish: (marketImpact.bearish / newsItems.length) * 100,
          neutral: (marketImpact.neutral / newsItems.length) * 100
        },
        trendingTopics
      }
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your News API key');
      }
    }
    console.error('Error fetching market news:', error);
    throw error;
  }
} 