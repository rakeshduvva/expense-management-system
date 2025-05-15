
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, description, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("hover-scale", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="h-5 w-5 text-primary">{icon}</div>}
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-2xl font-bold">{value}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {trend && (
          <div className="flex items-center text-xs">
            <span
              className={cn(
                "inline-flex items-center mr-1",
                trend.positive ? "text-green-500" : "text-red-500"
              )}
            >
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground">vs. last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default StatCard;
