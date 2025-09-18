import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FlaskConical, 
  Plus, 
  Minus, 
  Play, 
  RotateCcw, 
  AlertCircle,
  TrendingUp,
  Clock,
  Shield
} from "lucide-react";

interface ScenarioTrain {
  id: string;
  type: "Express" | "Local" | "Freight" | "Special";
  priority: number;
  arrivalTime: string;
  duration: number;
  platform?: string;
}

interface ScenarioResult {
  avgDelay: number;
  throughput: number;
  conflicts: number;
  safetyScore: number;
  recommendations: string[];
  timeline: Array<{
    trainId: string;
    startTime: string;
    endTime: string;
    delay: number;
  }>;
}

const baseScenario: ScenarioTrain[] = [
  { id: "EXP101", type: "Express", priority: 1, arrivalTime: "14:30", duration: 5, platform: "A" },
  { id: "LCL301", type: "Local", priority: 2, arrivalTime: "14:32", duration: 8, platform: "B" },
  { id: "FRT201", type: "Freight", priority: 3, arrivalTime: "14:35", duration: 12 }
];

export function WhatIfAnalysis() {
  const [currentScenario, setCurrentScenario] = useState<ScenarioTrain[]>(baseScenario);
  const [scenarioResults, setScenarioResults] = useState<ScenarioResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [newTrain, setNewTrain] = useState({
    id: "",
    type: "Local" as const,
    priority: 2,
    arrivalTime: "",
    duration: 8,
    platform: ""
  });

  const [savedScenarios] = useState([
    { name: "Rush Hour Peak", trains: 8, avgDelay: 4.2 },
    { name: "Freight Priority", trains: 6, avgDelay: 2.8 },
    { name: "Platform Maintenance", trains: 5, avgDelay: 6.1 }
  ]);

  const runSimulation = async () => {
    setIsRunning(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock sophisticated analysis
    const conflicts = currentScenario.length > 5 ? Math.floor(Math.random() * 3) + 1 : 0;
    const avgDelay = conflicts > 0 ? 2.5 + (conflicts * 1.2) : 1.8;
    const throughput = Math.max(85, 98 - (conflicts * 4) - (currentScenario.length * 0.5));
    const safetyScore = Math.max(92, 99 - conflicts);
    
    const mockResult: ScenarioResult = {
      avgDelay,
      throughput,
      conflicts,
      safetyScore,
      recommendations: [
        conflicts > 0 ? "Consider staggering freight arrivals by 5-minute intervals" : "Current schedule optimized",
        currentScenario.length > 6 ? "Platform utilization at capacity - monitor closely" : "Platform capacity adequate",
        "Express trains maintain priority sequence",
        safetyScore < 95 ? "Review signal timing for enhanced safety margins" : "All safety constraints satisfied"
      ],
      timeline: currentScenario.map((train, index) => ({
        trainId: train.id,
        startTime: train.arrivalTime,
        endTime: new Date(new Date(`2024-01-01T${train.arrivalTime}`).getTime() + train.duration * 60000).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        delay: conflicts > 0 && index > 2 ? Math.floor(Math.random() * 3) + 1 : 0
      }))
    };
    
    setScenarioResults(mockResult);
    setIsRunning(false);
  };

  const addTrain = () => {
    if (newTrain.id && newTrain.arrivalTime) {
      setCurrentScenario(prev => [...prev, { ...newTrain, priority: Number(newTrain.priority) }]);
      setNewTrain({
        id: "",
        type: "Local",
        priority: 2,
        arrivalTime: "",
        duration: 8,
        platform: ""
      });
      setScenarioResults(null);
    }
  };

  const removeTrain = (trainId: string) => {
    setCurrentScenario(prev => prev.filter(train => train.id !== trainId));
    setScenarioResults(null);
  };

  const resetScenario = () => {
    setCurrentScenario(baseScenario);
    setScenarioResults(null);
  };

  const getTypeColor = (type: string) => {
    const colors = {
      Express: "bg-success/20 text-success border-success/30",
      Local: "bg-railway-blue/20 text-railway-blue border-railway-blue/30",
      Freight: "bg-warning/20 text-warning border-warning/30",
      Special: "bg-accent/20 text-accent-foreground border-accent/30"
    };
    return colors[type as keyof typeof colors] || colors.Local;
  };

  return (
    <Card className="border-border/50 shadow-control">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-railway-blue" />
          What-If Scenario Analysis
        </CardTitle>
        <CardDescription>
          Test different train configurations and constraints to optimize section performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="builder">Scenario Builder</TabsTrigger>
            <TabsTrigger value="results">Analysis Results</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-6">
            {/* Current Scenario */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Current Scenario</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetScenario}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                  <Button
                    onClick={runSimulation}
                    disabled={isRunning}
                    className="flex items-center gap-2 bg-railway-blue hover:bg-railway-blue/90"
                  >
                    <Play className="h-4 w-4" />
                    {isRunning ? "Running..." : "Run Analysis"}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {currentScenario.map((train) => (
                  <div
                    key={train.id}
                    className="p-3 rounded-lg border border-border/50 bg-card/30 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{train.id}</span>
                        <Badge className={getTypeColor(train.type)}>
                          {train.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {train.arrivalTime} • {train.duration}min • P{train.priority}
                        {train.platform && ` • Platform ${train.platform}`}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTrain(train.id)}
                      className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add New Train */}
              <div className="p-4 rounded-lg border border-border/50 bg-muted/30">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Train
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  <div>
                    <Label htmlFor="trainId" className="text-xs">Train ID</Label>
                    <Input
                      id="trainId"
                      placeholder="EXP102"
                      value={newTrain.id}
                      onChange={(e) => setNewTrain(prev => ({ ...prev, id: e.target.value }))}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="trainType" className="text-xs">Type</Label>
                    <Select value={newTrain.type} onValueChange={(value: any) => setNewTrain(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Express">Express</SelectItem>
                        <SelectItem value="Local">Local</SelectItem>
                        <SelectItem value="Freight">Freight</SelectItem>
                        <SelectItem value="Special">Special</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="arrivalTime" className="text-xs">Arrival</Label>
                    <Input
                      id="arrivalTime"
                      type="time"
                      value={newTrain.arrivalTime}
                      onChange={(e) => setNewTrain(prev => ({ ...prev, arrivalTime: e.target.value }))}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration" className="text-xs">Duration (min)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newTrain.duration}
                      onChange={(e) => setNewTrain(prev => ({ ...prev, duration: Number(e.target.value) }))}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="platform" className="text-xs">Platform</Label>
                    <Input
                      id="platform"
                      placeholder="A"
                      value={newTrain.platform}
                      onChange={(e) => setNewTrain(prev => ({ ...prev, platform: e.target.value }))}
                      className="h-8"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={addTrain}
                      disabled={!newTrain.id || !newTrain.arrivalTime}
                      className="h-8 bg-success hover:bg-success/90"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {scenarioResults ? (
              <div className="space-y-6">
                {/* KPI Results */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg border border-border/50 bg-card/30 text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-warning" />
                    <div className="text-2xl font-bold text-foreground">{scenarioResults.avgDelay}</div>
                    <div className="text-xs text-muted-foreground">Avg Delay (min)</div>
                  </div>
                  <div className="p-4 rounded-lg border border-border/50 bg-card/30 text-center">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-success" />
                    <div className="text-2xl font-bold text-foreground">{scenarioResults.throughput}%</div>
                    <div className="text-xs text-muted-foreground">Throughput</div>
                  </div>
                  <div className="p-4 rounded-lg border border-border/50 bg-card/30 text-center">
                    <AlertCircle className={`h-6 w-6 mx-auto mb-2 ${scenarioResults.conflicts > 0 ? 'text-warning' : 'text-success'}`} />
                    <div className="text-2xl font-bold text-foreground">{scenarioResults.conflicts}</div>
                    <div className="text-xs text-muted-foreground">Conflicts</div>
                  </div>
                  <div className="p-4 rounded-lg border border-border/50 bg-card/30 text-center">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-success" />
                    <div className="text-2xl font-bold text-foreground">{scenarioResults.safetyScore}%</div>
                    <div className="text-xs text-muted-foreground">Safety Score</div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">AI Recommendations</h3>
                  <div className="space-y-2">
                    {scenarioResults.recommendations.map((rec, index) => (
                      <div key={index} className="p-3 rounded-lg border border-border/50 bg-card/30">
                        <p className="text-sm text-foreground">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Optimized Timeline</h3>
                  <div className="space-y-2">
                    {scenarioResults.timeline.map((entry) => (
                      <div key={entry.trainId} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/30">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="bg-railway-blue/10 text-railway-blue border-railway-blue/30">
                            {entry.trainId}
                          </Badge>
                          <span className="text-sm">
                            {entry.startTime} - {entry.endTime}
                          </span>
                        </div>
                        {entry.delay > 0 && (
                          <Badge className="bg-warning/20 text-warning border-warning/30">
                            +{entry.delay}min delay
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FlaskConical className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Run analysis to see results</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Saved Scenarios</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {savedScenarios.map((scenario, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border/50 bg-card/30">
                    <h4 className="font-medium mb-2">{scenario.name}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>{scenario.trains} trains</p>
                      <p>Avg delay: {scenario.avgDelay}min</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Load Scenario
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}