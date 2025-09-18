import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";

interface TrainData {
  id: string;
  type: "Express" | "Local" | "Freight";
  priority: "High" | "Medium" | "Low";
  status: "cleared" | "held" | "delayed";
  duration: number;
  delay?: number;
  startTime: string;
}

const trainData: TrainData[] = [
  {
    id: "EXP101",
    type: "Express",
    priority: "High",
    status: "cleared",
    duration: 30,
    startTime: "14:00",
  },
  {
    id: "LCL301", 
    type: "Local",
    priority: "Medium",
    status: "held",
    duration: 25,
    delay: 2,
    startTime: "14:15",
  },
  {
    id: "FRT201",
    type: "Freight", 
    priority: "Low",
    status: "delayed",
    duration: 45,
    delay: 5,
    startTime: "14:30",
  }
];

function TrainBar({ train }: { train: TrainData }) {
  const statusColors = {
    cleared: "bg-success border-success/30",
    held: "bg-warning border-warning/30", 
    delayed: "bg-destructive border-destructive/30"
  };

  const statusIcons = {
    cleared: CheckCircle,
    held: Clock,
    delayed: AlertTriangle
  };

  const priorityColors = {
    High: "text-destructive border-destructive/20 bg-destructive/10",
    Medium: "text-warning border-warning/20 bg-warning/10",
    Low: "text-muted-foreground border-muted/20 bg-muted/10"
  };

  const StatusIcon = statusIcons[train.status];
  
  return (
    <div className="space-y-3 p-4 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-all duration-200">
      {/* Train Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h4 className="font-semibold text-foreground text-lg">{train.id}</h4>
          <Badge variant="outline" className={priorityColors[train.priority]}>
            {train.priority} Priority
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <StatusIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {train.startTime}
          </span>
        </div>
      </div>

      {/* Timeline Bar */}
      <div className="relative">
        <div className="h-8 bg-muted/30 rounded-full overflow-hidden relative">
          {/* Progress Bar */}
          <div 
            className={`h-full rounded-full border-2 ${statusColors[train.status]} relative overflow-hidden`}
            style={{ width: "100%" }}
          >
            {/* Animated Progress */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
          
          {/* Train Type Label */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <span className="text-xs font-medium text-foreground">
              {train.type}
            </span>
          </div>
          
          {/* Duration */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="text-xs text-muted-foreground">
              {train.duration}min
            </span>
          </div>
        </div>
        
        {/* Signal Markers */}
        <div className="flex justify-between mt-2 px-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <span className="text-xs text-muted-foreground">Entry</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-warning"></div>
            <span className="text-xs text-muted-foreground">Platform</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <span className="text-xs text-muted-foreground">Exit</span>
          </div>
        </div>
      </div>

      {/* Status Info */}
      {train.delay && (
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-warning" />
          <span className="text-muted-foreground">
            {train.status === "held" ? "Held for" : "Delayed by"} {train.delay} minutes
          </span>
        </div>
      )}
    </div>
  );
}

export function TrainTimeline() {
  return (
    <Card className="shadow-control border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Train Timeline Visualization
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Real-time section occupancy and train movements
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {trainData.map((train) => (
          <TrainBar key={train.id} train={train} />
        ))}
        
        {/* Timeline Legend */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-success"></div>
            <span className="text-xs text-muted-foreground">Cleared</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-warning"></div>
            <span className="text-xs text-muted-foreground">Held</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-destructive"></div>
            <span className="text-xs text-muted-foreground">Delayed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}