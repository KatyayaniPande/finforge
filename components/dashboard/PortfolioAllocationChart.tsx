import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketTrending } from "@/components/tradingview/market-trending";

export function PortfolioAllocationChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Portfolio Allocation</CardTitle>
        <CardDescription>
          Current investment breakdown
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <MarketTrending />
        </div>
      </CardContent>
    </Card>
  );
} 