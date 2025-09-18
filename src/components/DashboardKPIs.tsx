import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Train, 
  Clock, 
  Zap, 
  Shield,
  TrendingUp,
  TrendingDown 
} from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
  color: "success" | "warning" | "primary" | "accent";
}

function KPICard({ title, value, change, trend, icon: Icon, color }: KPICardProps) {
  const colorClasses = {
    success: "text-success border-success/20 bg-success/5",
    warning: "text-warning border-warning/20 bg-warning/5", 
    primary: "text-primary border-primary/20 bg-primary/5",
    accent: "text-railway-orange border-railway-orange/20 bg-railway-orange/5"
  };

  const trendColor = trend === "up" ? "text-success" : "text-destructive";
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;

  return (
    <Card className="relative overflow-hidden shadow-control hover:shadow-elevated transition-all duration-300 border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
            <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
              <TrendIcon className="h-4 w-4" />
              <span className="font-medium">{change}</span>
            </div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className={`absolute top-0 right-0 w-20 h-20 ${colorClasses[color]} rounded-full blur-3xl opacity-10 -translate-y-4 translate-x-4`}></div>
      </CardContent>
    </Card>
  );
}

export function DashboardKPIs() {
  const kpis = [
    {
      title: "Section Throughput",
      value: "120",
      unit: "trains/day",
      change: "+18%",
      trend: "up" as const,
      icon: Train,
      color: "success" as const
    },
    {
      title: "Average Delay",
      value: "2.5",
      unit: "minutes",
      change: "↓ 35%",
      trend: "down" as const,
      icon: Clock,
      color: "warning" as const
    },
    {
      title: "Decision Time",
      value: "< 10",
      unit: "seconds",
      change: "+25%",
      trend: "up" as const,
      icon: Zap,
      color: "primary" as const
    },
    {
      title: "Conflicts Resolved",
      value: "14",
      unit: "today",
      change: "+43%",
      trend: "up" as const,
      icon: Shield,
      color: "accent" as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => (
        <KPICard
          key={index}
          title={kpi.title}
          value={`${kpi.value} ${kpi.unit}`}
          change={kpi.change}
          trend={kpi.trend}
          icon={kpi.icon}
          color={kpi.color}
        />
      ))}
    </div>
  );
}