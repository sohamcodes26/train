import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Clock, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Download,
  Filter,
  Eye
} from "lucide-react";

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  trainId: string;
  decision: "approved" | "overridden" | "pending";
  reasoning: string;
  impactMetrics: {
    delayChange: number;
    throughputImpact: number;
    safetyScore: number;
  };
  constraints: string[];
}

const mockAuditData: AuditEntry[] = [
  {
    id: "AUD001",
    timestamp: "2024-01-15T14:30:25Z",
    user: "SC001 - Rajesh Kumar",
    action: "Hold EXP101 for 2 minutes",
    trainId: "EXP101",
    decision: "approved",
    reasoning: "Conflict resolution with LCL301. Express priority maintained while clearing section efficiently.",
    impactMetrics: {
      delayChange: +2,
      throughputImpact: +15,
      safetyScore: 98
    },
    constraints: ["Signal compliance", "Platform availability", "Priority rules"]
  },
  {
    id: "AUD002",
    timestamp: "2024-01-15T14:28:10Z",
    user: "SC001 - Rajesh Kumar",
    action: "Override: Prioritize FRT201",
    trainId: "FRT201",
    decision: "overridden",
    reasoning: "Manual override: Special cargo priority due to perishable goods. Controller judgment applied.",
    impactMetrics: {
      delayChange: -5,
      throughputImpact: -8,
      safetyScore: 96
    },
    constraints: ["Manual override", "Special cargo", "Time-sensitive delivery"]
  },
  {
    id: "AUD003",
    timestamp: "2024-01-15T14:25:45Z",
    user: "SYSTEM",
    action: "Auto-optimization triggered",
    trainId: "LCL301",
    decision: "approved",
    reasoning: "Automatic rescheduling due to platform availability. No conflicts detected.",
    impactMetrics: {
      delayChange: 0,
      throughputImpact: +12,
      safetyScore: 99
    },
    constraints: ["Platform constraint", "Automatic scheduling", "Safety protocols"]
  }
];

export function AuditTrail() {
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>(mockAuditData);
  const [filter, setFilter] = useState<"all" | "approved" | "overridden" | "pending">("all");

  const filteredEntries = auditEntries.filter(entry => 
    filter === "all" || entry.decision === filter
  );

  const getDecisionIcon = (decision: AuditEntry["decision"]) => {
    switch (decision) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "overridden":
        return <XCircle className="h-4 w-4 text-warning" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getDecisionBadge = (decision: AuditEntry["decision"]) => {
    const variants = {
      approved: "bg-success/20 text-success border-success/30",
      overridden: "bg-warning/20 text-warning border-warning/30",
      pending: "bg-muted/20 text-muted-foreground border-muted/30"
    };

    return (
      <Badge variant="secondary" className={variants[decision]}>
        {decision.charAt(0).toUpperCase() + decision.slice(1)}
      </Badge>
    );
  };

  const exportAuditLog = () => {
    const csvContent = [
      ["Timestamp", "User", "Action", "Train ID", "Decision", "Reasoning", "Delay Impact", "Safety Score"].join(","),
      ...filteredEntries.map(entry => [
        entry.timestamp,
        entry.user,
        entry.action,
        entry.trainId,
        entry.decision,
        `"${entry.reasoning}"`,
        entry.impactMetrics.delayChange,
        entry.impactMetrics.safetyScore
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-trail-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="border-border/50 shadow-control">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-railway-blue" />
              Audit Trail & Compliance Log
            </CardTitle>
            <CardDescription>
              Complete record of all system decisions and manual overrides
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1">
              {(["all", "approved", "overridden", "pending"] as const).map((filterType) => (
                <Button
                  key={filterType}
                  variant={filter === filterType ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter(filterType)}
                  className="capitalize"
                >
                  {filterType}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={exportAuditLog}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getDecisionIcon(entry.decision)}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{entry.action}</span>
                        {getDecisionBadge(entry.decision)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(entry.timestamp).toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {entry.user}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-railway-blue/10 text-railway-blue border-railway-blue/30">
                    {entry.trainId}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {entry.reasoning}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-2 rounded bg-muted/30">
                    <div className="text-xs text-muted-foreground">Delay Impact</div>
                    <div className={`font-medium ${
                      entry.impactMetrics.delayChange > 0 ? 'text-warning' : 
                      entry.impactMetrics.delayChange < 0 ? 'text-success' : 'text-foreground'
                    }`}>
                      {entry.impactMetrics.delayChange > 0 ? '+' : ''}{entry.impactMetrics.delayChange} min
                    </div>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/30">
                    <div className="text-xs text-muted-foreground">Throughput</div>
                    <div className={`font-medium ${
                      entry.impactMetrics.throughputImpact > 0 ? 'text-success' : 'text-warning'
                    }`}>
                      {entry.impactMetrics.throughputImpact > 0 ? '+' : ''}{entry.impactMetrics.throughputImpact}%
                    </div>
                  </div>
                  <div className="text-center p-2 rounded bg-muted/30">
                    <div className="text-xs text-muted-foreground">Safety Score</div>
                    <div className="font-medium text-success">
                      {entry.impactMetrics.safetyScore}%
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {entry.constraints.map((constraint, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-muted/50 text-muted-foreground"
                    >
                      {constraint}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}