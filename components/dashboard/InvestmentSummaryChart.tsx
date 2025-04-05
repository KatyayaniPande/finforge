import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketOverview } from "@/components/tradingview/market-overview";

export function InvestmentSummaryChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Investment Performance</CardTitle>
        <CardDescription>
          Investment allocation for the past 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <MarketOverview />
        </div>
      </CardContent>
    </Card>
  );
} 