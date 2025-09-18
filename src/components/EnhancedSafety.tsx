import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Gauge,
  Activity,
  Lock,
  Eye
} from "lucide-react";

interface SafetyCheck {
  id: string;
  name: string;
  status: "passed" | "warning" | "failed";
  description: string;
  lastChecked: string;
  details: string;
}

interface ConstraintRule {
  id: string;
  rule: string;
  compliance: number;
  criticality: "high" | "medium" | "low";
  violations: number;
}

const safetyChecks: SafetyCheck[] = [
  {
    id: "signal_compliance",
    name: "Signal Compliance",
    status: "passed",
    description: "All recommendations comply with signaling rules",
    lastChecked: "2024-01-15T14:30:45Z",
    details: "Verified against 47 active signal states. No conflicts detected."
  },
  {
    id: "platform_capacity",
    name: "Platform Capacity",
    status: "warning",
    description: "Platform utilization approaching limits",
    lastChecked: "2024-01-15T14:30:42Z",
    details: "Platform A: 85% utilization. Consider load balancing."
  },
  {
    id: "minimum_headway",
    name: "Minimum Headway",
    status: "passed",
    description: "Safe distances maintained between trains",
    lastChecked: "2024-01-15T14:30:40Z",
    details: "All train intervals exceed 2-minute minimum safety margin."
  },
  {
    id: "priority_rules",
    name: "Priority Hierarchy",
    status: "passed",
    description: "Express trains maintain scheduling priority",
    lastChecked: "2024-01-15T14:30:38Z",
    details: "Priority sequence: Express > Local > Freight maintained."
  },
  {
    id: "emergency_protocols",
    name: "Emergency Protocols",
    status: "passed",
    description: "Emergency override capabilities active",
    lastChecked: "2024-01-15T14:30:35Z",
    details: "Manual override controls verified and accessible."
  }
];

const constraintRules: ConstraintRule[] = [
  {
    id: "safety_distance",
    rule: "Minimum 2-minute headway between trains",
    compliance: 100,
    criticality: "high",
    violations: 0
  },
  {
    id: "signal_authority",
    rule: "No train movement without signal clearance",
    compliance: 100,
    criticality: "high",
    violations: 0
  },
  {
    id: "platform_occupancy",
    rule: "Maximum 1 train per platform simultaneously",
    compliance: 100,
    criticality: "high",
    violations: 0
  },
  {
    id: "priority_sequence",
    rule: "Express trains have scheduling priority",
    compliance: 98,
    criticality: "medium",
    violations: 2
  },
  {
    id: "dwell_time_limits",
    rule: "Platform dwell time limits enforced",
    compliance: 95,
    criticality: "medium",
    violations: 3
  },
  {
    id: "route_conflict",
    rule: "No simultaneous conflicting routes",
    compliance: 100,
    criticality: "high",
    violations: 0
  }
];

export function EnhancedSafety() {
  const [overallSafetyScore, setOverallSafetyScore] = useState(97);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate minor safety score fluctuations
      setOverallSafetyScore(prev => {
        const variation = (Math.random() - 0.5) * 2;
        return Math.max(94, Math.min(100, prev + variation));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: SafetyCheck["status"]) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: SafetyCheck["status"]) => {
    const variants = {
      passed: "bg-success/20 text-success border-success/30",
      warning: "bg-warning/20 text-warning border-warning/30",
      failed: "bg-destructive/20 text-destructive border-destructive/30"
    };

    return (
      <Badge variant="secondary" className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getCriticalityColor = (criticality: ConstraintRule["criticality"]) => {
    const colors = {
      high: "text-destructive",
      medium: "text-warning",
      low: "text-muted-foreground"
    };
    return colors[criticality];
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 98) return "text-success";
    if (compliance >= 95) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Safety Overview */}
      <Card className="border-border/50 shadow-control">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-success" />
            Safety & Constraint Monitoring
          </CardTitle>
          <CardDescription>
            Real-time safety validation and regulatory compliance monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Overall Safety Score */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
                <div className="absolute inset-0 rounded-full bg-success/20 animate-pulse"></div>
                <div className="relative text-2xl font-bold text-success">
                  {Math.round(overallSafetyScore)}%
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Safety Score</h3>
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>

            {/* System Status */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">System Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-success" />
                    Real-time Monitoring
                  </span>
                  <Badge className="bg-success/20 text-success border-success/30">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-railway-blue" />
                    Safety Interlocks
                  </span>
                  <Badge className="bg-success/20 text-success border-success/30">Engaged</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-warning" />
                    Manual Override
                  </span>
                  <Badge className="bg-muted/20 text-muted-foreground border-muted/30">Standby</Badge>
                </div>
              </div>
            </div>

            {/* Critical Alerts */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Critical Alerts</h3>
              <div className="space-y-2">
                {safetyChecks.filter(check => check.status === "warning" || check.status === "failed").length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                    No critical alerts
                  </div>
                ) : (
                  safetyChecks
                    .filter(check => check.status === "warning" || check.status === "failed")
                    .map((alert) => (
                      <Alert key={alert.id} className="border-warning/50 bg-warning/10">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          {alert.description}
                        </AlertDescription>
                      </Alert>
                    ))
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Checks Detail */}
      <Card className="border-border/50 shadow-control">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Safety Validation Checks
          </CardTitle>
          <CardDescription>
            Continuous validation of all safety-critical system constraints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {safetyChecks.map((check) => (
              <div
                key={check.id}
                className="p-4 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(check.status)}
                    <div>
                      <h4 className="font-medium text-foreground">{check.name}</h4>
                      <p className="text-sm text-muted-foreground">{check.description}</p>
                    </div>
                  </div>
                  {getStatusBadge(check.status)}
                </div>
                <div className="ml-7 mt-2 space-y-2">
                  <p className="text-xs text-muted-foreground">{check.details}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Last checked: {new Date(check.lastChecked).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Constraint Compliance */}
      <Card className="border-border/50 shadow-control">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-railway-blue" />
            Constraint Compliance Matrix
          </CardTitle>
          <CardDescription>
            Detailed compliance tracking for all operational constraints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {constraintRules.map((rule) => (
              <div
                key={rule.id}
                className="p-4 rounded-lg border border-border/50 bg-card/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">{rule.rule}</h4>
                      <Badge variant="outline" className={getCriticalityColor(rule.criticality)}>
                        {rule.criticality} priority
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`font-medium ${getComplianceColor(rule.compliance)}`}>
                        {rule.compliance}% compliant
                      </span>
                      {rule.violations > 0 && (
                        <span className="text-warning">
                          {rule.violations} violation{rule.violations > 1 ? 's' : ''} today
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress 
                    value={rule.compliance} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}