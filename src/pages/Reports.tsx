import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileBarChart, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  Train,
  Filter,
  Eye
} from "lucide-react";

interface ReportData {
  trainId: string;
  priority: "Express" | "Local" | "Freight";
  action: "Proceed" | "Hold" | "Delay";
  delay: number;
  reason: string;
  timestamp: string;
}

const reportsData: ReportData[] = [
  {
    trainId: "EXP101",
    priority: "Express",
    action: "Proceed", 
    delay: 0,
    reason: "High priority, clear section",
    timestamp: "14:02"
  },
  {
    trainId: "LCL301",
    priority: "Local",
    action: "Hold",
    delay: 2,
    reason: "Conflict resolution with EXP101",
    timestamp: "14:05"
  },
  {
    trainId: "FRT201", 
    priority: "Freight",
    action: "Delay",
    delay: 5,
    reason: "Low priority, optimize passenger flow",
    timestamp: "14:08"
  },
  {
    trainId: "EXP102",
    priority: "Express", 
    action: "Proceed",
    delay: 1,
    reason: "Minor signal coordination delay",
    timestamp: "14:15"
  },
  {
    trainId: "LCL302",
    priority: "Local",
    action: "Hold",
    delay: 3,
    reason: "Platform occupancy management",
    timestamp: "14:20"
  }
];

const performanceMetrics = {
  totalDecisions: 156,
  avgDecisionTime: "8.2 sec",
  efficiencyGain: "+18%",
  delayReduction: "-32%",
  safetyScore: "100%",
  conflictsResolved: 42
};

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const periods = [
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" }
  ];

  const actionColors = {
    Proceed: "text-success bg-success/10 border-success/20",
    Hold: "text-warning bg-warning/10 border-warning/20",
    Delay: "text-destructive bg-destructive/10 border-destructive/20"
  };

  const priorityColors = {
    Express: "text-destructive bg-destructive/10 border-destructive/20",
    Local: "text-warning bg-warning/10 border-warning/20",
    Freight: "text-muted-foreground bg-muted/10 border-muted/20"
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive performance analysis and historical decision tracking
        </p>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Total Decisions",
            value: performanceMetrics.totalDecisions,
            change: "+12%",
            trend: "up",
            icon: FileBarChart
          },
          {
            title: "Avg Decision Time", 
            value: performanceMetrics.avgDecisionTime,
            change: "-25%",
            trend: "down",
            icon: Clock
          },
          {
            title: "Efficiency Gain",
            value: performanceMetrics.efficiencyGain,
            change: "+5%", 
            trend: "up",
            icon: TrendingUp
          },
          {
            title: "Delay Reduction",
            value: performanceMetrics.delayReduction,
            change: "-8%",
            trend: "down",
            icon: TrendingDown
          },
          {
            title: "Conflicts Resolved",
            value: performanceMetrics.conflictsResolved,
            change: "+15%",
            trend: "up",
            icon: Train
          },
          {
            title: "Safety Score",
            value: performanceMetrics.safetyScore,
            change: "0%",
            trend: "up",
            icon: Badge
          }
        ].map((metric, index) => (
          <Card key={index} className="shadow-control border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <metric.icon className="h-5 w-5 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {metric.change}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm text-muted-foreground">{metric.title}</h3>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports Table */}
      <Card className="shadow-control border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="h-5 w-5 text-primary" />
              Decision History
            </CardTitle>
            <div className="flex items-center gap-3">
              {/* Period Filter */}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {periods.map(period => (
                  <Button
                    key={period.id}
                    variant={selectedPeriod === period.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(period.id)}
                    className={selectedPeriod === period.id ? "bg-primary" : ""}
                  >
                    {period.label}
                  </Button>
                ))}
              </div>
              
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Train ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Delay</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Reason</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reportsData.map((report, index) => (
                  <tr key={index} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-medium text-foreground">{report.trainId}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={priorityColors[report.priority]}>
                        {report.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={actionColors[report.action]}>
                        {report.action}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${report.delay > 0 ? 'text-warning' : 'text-success'}`}>
                        {report.delay > 0 ? `${report.delay} min` : 'None'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground max-w-xs truncate">
                      {report.reason}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {report.timestamp}
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/30">
            <p className="text-sm text-muted-foreground">
              Showing {reportsData.length} of {reportsData.length} decisions
            </p>
            <Button variant="outline" size="sm">
              Load More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}