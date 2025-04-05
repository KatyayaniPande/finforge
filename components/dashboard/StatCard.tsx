import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorClass?: string;
  index: number;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  colorClass = "bg-muted",
  index,
}: StatCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", 
      "animate-in fade-in slide-in-from-bottom duration-500",
      { "delay-100": index === 0,
        "delay-200": index === 1,
        "delay-300": index === 2,
        "delay-400": index === 3 }
    )}>
      <div className={cn(
        "absolute right-0 top-0 h-full w-2",
        colorClass
      )} />
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold">{value}</h2>
          {trend && (
            <p className={cn(
              "text-xs mt-1",
              trend.isPositive ? "text-green-500" : "text-red-500"
            )}>
              {trend.isPositive ? "+" : "-"}{trend.value}% vs last month
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
} 