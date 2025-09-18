import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  Zap
} from "lucide-react";

interface Recommendation {
  trainId: string;
  action: "Proceed immediately" | "Hold 2 minutes" | "Delay 5 minutes";
  reasoning: string;
  priority: "High" | "Medium" | "Low";
  impact: string;
  confidence: number;
}

const recommendations: Recommendation[] = [
  {
    trainId: "EXP101",
    action: "Proceed immediately",
    reasoning: "High priority express service with fastest clearance time",
    priority: "High",
    impact: "Reduces overall system delay by 12 minutes",
    confidence: 95
  },
  {
    trainId: "LCL301", 
    action: "Hold 2 minutes",
    reasoning: "Brief hold reduces congestion and clears section optimally",
    priority: "Medium",
    impact: "Prevents cascade delays for 3 following trains",
    confidence: 88
  },
  {
    trainId: "FRT201",
    action: "Delay 5 minutes", 
    reasoning: "Low priority freight can accommodate delay to avoid bottleneck",
    priority: "Low", 
    impact: "Improves passenger service punctuality by 8%",
    confidence: 92
  }
];

function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const actionColors = {
    "Proceed immediately": "bg-success/10 text-success border-success/20",
    "Hold 2 minutes": "bg-warning/10 text-warning border-warning/20",
    "Delay 5 minutes": "bg-destructive/10 text-destructive border-destructive/20"
  };

  const actionIcons = {
    "Proceed immediately": CheckCircle,
    "Hold 2 minutes": Clock,
    "Delay 5 minutes": AlertTriangle
  };

  const priorityColors = {
    High: "text-destructive bg-destructive/10 border-destructive/20",
    Medium: "text-warning bg-warning/10 border-warning/20", 
    Low: "text-muted-foreground bg-muted/10 border-muted/20"
  };

  const ActionIcon = actionIcons[recommendation.action];

  return (
    <div className="p-4 rounded-lg border border-border/50 bg-gradient-control hover:shadow-control transition-all duration-200 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h4 className="font-semibold text-foreground text-lg">
            {recommendation.trainId}
          </h4>
          <Badge variant="outline" className={priorityColors[recommendation.priority]}>
            {recommendation.priority}
          </Badge>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Confidence</div>
          <div className="text-lg font-semibold text-foreground">
            {recommendation.confidence}%
          </div>
        </div>
      </div>

      {/* Action */}
      <div className={`flex items-center gap-2 p-3 rounded-lg border ${actionColors[recommendation.action]}`}>
        <ActionIcon className="h-5 w-5" />
        <span className="font-medium">{recommendation.action}</span>
      </div>

      {/* Reasoning */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Reasoning:</span> {recommendation.reasoning}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Impact:</span> {recommendation.impact}
        </p>
      </div>

      {/* Confidence Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>AI Confidence</span>
          <span>{recommendation.confidence}%</span>
        </div>
        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-primary rounded-full transition-all duration-300"
            style={{ width: `${recommendation.confidence}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export function RecommendationPanel() {
  return (
    <Card className="shadow-control border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Recommendations
          </div>
          <Badge variant="outline" className="text-success border-success/20 bg-success/10">
            <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse"></div>
            Live
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Intelligent decision support based on real-time analysis
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <RecommendationCard key={index} recommendation={rec} />
        ))}
        
        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border/50">
          <Button className="flex-1 bg-gradient-primary hover:shadow-glow">
            <CheckCircle className="w-4 h-4 mr-2" />
            Accept All
          </Button>
          <Button variant="outline" className="flex-1 border-railway-orange text-railway-orange hover:bg-railway-orange hover:text-railway-orange-foreground">
            <Zap className="w-4 h-4 mr-2" />
            Run Simulation
          </Button>
        </div>

        {/* Last Updated */}
        <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border/30">
          Last updated: 2 seconds ago
        </div>
      </CardContent>
    </Card>
  );
}