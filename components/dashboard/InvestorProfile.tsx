import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Target, 
  PieChart, 
  DollarSign, 
  Layers, 
  TrendingUp 
} from "lucide-react";

interface InvestorProfileProps {
  riskTolerance: 'Low' | 'Medium' | 'High';
  investmentStrategy: 'Growth-focused' | 'Balanced' | 'Value-driven' | 'Diversification-heavy';
  preferredSectors: string[];
  investmentStagePreference: string[];
  averageInvestmentSize: number;
  portfolioDiversificationGoal: string;
}

export function InvestorProfile({
  riskTolerance,
  investmentStrategy,
  preferredSectors,
  investmentStagePreference,
  averageInvestmentSize,
  portfolioDiversificationGoal
}: InvestorProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Investor Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <AlertTriangle className="h-4 w-4" />
              Risk Tolerance
            </div>
            <Badge 
              variant="outline" 
              className={`${
                riskTolerance === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                riskTolerance === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                'bg-green-50 text-green-700 border-green-200'
              }`}
            >
              {riskTolerance}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <TrendingUp className="h-4 w-4" />
              Investment Strategy
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {investmentStrategy}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <PieChart className="h-4 w-4" />
              Preferred Sectors
            </div>
            <div className="flex flex-wrap gap-2">
              {preferredSectors.map((sector) => (
                <Badge key={sector} variant="secondary">
                  {sector}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Layers className="h-4 w-4" />
              Investment Stage Preference
            </div>
            <div className="flex flex-wrap gap-2">
              {investmentStagePreference.map((stage) => (
                <Badge key={stage} variant="secondary">
                  {stage}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <DollarSign className="h-4 w-4" />
              Average Investment Size
            </div>
            <div className="text-lg font-semibold">
              ${averageInvestmentSize.toLocaleString()}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Target className="h-4 w-4" />
              Portfolio Diversification Goal
            </div>
            <p className="text-sm">{portfolioDiversificationGoal}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 