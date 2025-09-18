import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings as SettingsIcon,
  Zap,
  Clock,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { DashboardKPIs } from "@/components/DashboardKPIs";

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  trains: number;
  conflicts: number;
}

const scenarios: SimulationScenario[] = [
  {
    id: "rush_hour",
    name: "Rush Hour Peak",
    description: "High-density traffic with mixed priority trains during peak hours",
    difficulty: "Hard",
    trains: 12,
    conflicts: 8
  },
  {
    id: "freight_heavy", 
    name: "Freight Heavy Day",
    description: "Multiple freight trains with passenger service interruptions",
    difficulty: "Medium",
    trains: 8,
    conflicts: 4
  },
  {
    id: "maintenance_window",
    name: "Maintenance Window",
    description: "Limited track availability with scheduled maintenance",
    difficulty: "Easy",
    trains: 6,
    conflicts: 2
  }
];

export default function Simulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleRunSimulation = () => {
    if (!selectedScenario) return;
    
    setIsRunning(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsRunning(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const difficultyColors = {
    Easy: "text-success bg-success/10 border-success/20",
    Medium: "text-warning bg-warning/10 border-warning/20",
    Hard: "text-destructive bg-destructive/10 border-destructive/20"
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Traffic Simulation</h1>
        <p className="text-muted-foreground">
          Run AI-powered simulations to test different scenarios and optimize decision making
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Selection */}
        <Card className="shadow-control border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              Select Scenario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scenarios.map(scenario => (
              <div
                key={scenario.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedScenario === scenario.id 
                    ? "border-primary bg-primary/5" 
                    : "border-border/50 hover:border-border hover:bg-muted/30"
                }`}
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-foreground">{scenario.name}</h3>
                  <Badge variant="outline" className={difficultyColors[scenario.difficulty]}>
                    {scenario.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{scenario.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{scenario.trains} trains</span>
                  <span>{scenario.conflicts} conflicts</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Simulation Controls */}
        <Card className="shadow-control border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-warning" />
              Simulation Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedScenario && (
              <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                <h4 className="font-medium text-foreground mb-2">
                  {scenarios.find(s => s.id === selectedScenario)?.name}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Trains:</span>
                    <span className="ml-2 font-medium text-foreground">
                      {scenarios.find(s => s.id === selectedScenario)?.trains}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Conflicts:</span>
                    <span className="ml-2 font-medium text-foreground">
                      {scenarios.find(s => s.id === selectedScenario)?.conflicts}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-primary hover:shadow-glow"
                onClick={handleRunSimulation}
                disabled={!selectedScenario || isRunning}
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Simulation
                  </>
                )}
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" disabled={!isRunning}>
                  <Pause className="w-4 h-4 mr-1" />
                  Pause
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => {setProgress(0); setIsRunning(false)}}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </div>
            </div>

            {progress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-medium">{progress}%</span>
                </div>
                <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Results */}
        <Card className="shadow-control border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Simulation Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {progress === 100 ? (
              <div className="space-y-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-success">Simulation Complete</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All conflicts resolved successfully with optimal efficiency
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="text-muted-foreground">Efficiency Gain</div>
                    <div className="text-lg font-semibold text-success">+22%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-muted-foreground">Avg Delay</div>
                    <div className="text-lg font-semibold text-warning">1.8 min</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-muted-foreground">Conflicts</div>
                    <div className="text-lg font-semibold text-success">0</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-muted-foreground">Safety Score</div>
                    <div className="text-lg font-semibold text-foreground">100%</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {progress > 0 ? (
                  <>
                    <Clock className="h-8 w-8 mx-auto mb-2 animate-spin" />
                    <p>Analyzing scenario...</p>
                  </>
                ) : (
                  <>
                    <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Select a scenario to begin simulation</p>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Current KPIs for comparison */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Current System Performance</h2>
        <DashboardKPIs />
      </div>
    </div>
  );
}