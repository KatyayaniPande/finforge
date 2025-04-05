"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { StockPrice } from "@/components/tradingview/stock-price";
import { MarketOverview } from "@/components/tradingview/market-overview";
import { MarketTrending } from "@/components/tradingview/market-trending";

const symbols: string[] = ['AAPL', 'MSFT', 'TSLA', 'AMZN', 'GOOGL', 'NVDA'];

export default function InvestmentsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Top Deal Opportunities</h2>
        <p className="text-sm text-muted-foreground">
          Powered by TradingView
        </p>
      </div>

      {/* Market Overview Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Market Overview</h3>
        <div className="h-[300px]">
          <MarketOverview />
        </div>
      </div>
      
      {/* Stock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {symbols.map((symbol) => (
          <Card key={symbol} className="relative overflow-hidden">
            <CardHeader>
              <h3 className="text-lg font-semibold">{symbol}</h3>
            </CardHeader>
            <CardContent className="h-[400px] p-0">
              <StockPrice props={symbol} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trending Stocks Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Trending Stocks</h3>
        <Card>
          <CardContent className="h-[500px] p-4">
            <MarketTrending />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
