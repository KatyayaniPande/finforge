
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';

interface RiskData {
  name: string;
  value: number;
  color: string;
}

interface RiskValuationCardProps {
  riskData: RiskData[];
  riskScore: number;
  valuationChange: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
}

const RiskValuationCard = ({ riskData, riskScore, valuationChange }: RiskValuationCardProps) => {
  const getRiskScoreColor = (score: number) => {
    if (score <= 30) return "text-finance-green";
    if (score <= 60) return "text-finance-gold";
    return "text-finance-red";
  };

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return "text-finance-green";
    if (trend === 'down') return "text-finance-red";
    return "text-muted-foreground";
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Risk Assessment & Valuation</CardTitle>
          <Badge variant={riskScore > 60 ? "destructive" : "outline"} className="ml-2">
            Risk Score: {riskScore}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`${value}%`, undefined]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #f0f0f0'
                  }}
                />
                <Legend 
                  layout="vertical" 
                  align="right"
                  verticalAlign="middle"
                  iconSize={10}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Overall Valuation Trend</h4>
              <p className={`text-xl font-bold ${getTrendColor(valuationChange.trend)}`}>
                {getTrendIcon(valuationChange.trend)} {valuationChange.value}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">AI Risk Assessment</h4>
              <p className={`text-xl font-bold ${getRiskScoreColor(riskScore)}`}>
                {riskScore <= 30 ? "Low Risk" : riskScore <= 60 ? "Moderate Risk" : "High Risk"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskValuationCard;