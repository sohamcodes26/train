import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Cpu, 
  Database, 
  Network, 
  Shield, 
  Zap, 
  GitBranch,
  Clock,
  Gauge,
  Brain,
  Settings
} from "lucide-react";

const architectureComponents = [
  {
    layer: "Presentation Layer",
    components: [
      { name: "Controller Dashboard", tech: "React + TypeScript", status: "active" },
      { name: "Real-time Updates", tech: "WebSocket", status: "active" },
      { name: "What-If Analysis", tech: "Interactive Simulation", status: "active" }
    ]
  },
  {
    layer: "AI Decision Engine",
    components: [
      { name: "Constraint Solver", tech: "Mixed Integer Linear Programming (MILP)", status: "active" },
      { name: "Heuristic Optimizer", tech: "Priority-based Greedy Algorithm", status: "active" },
      { name: "Machine Learning", tech: "Reinforcement Learning (Future)", status: "planned" }
    ]
  },
  {
    layer: "Data Processing",
    components: [
      { name: "Train Position API", tech: "REST/GraphQL", status: "mock" },
      { name: "Signal Integration", tech: "Railway Interlocking Protocol", status: "planned" },
      { name: "Timetable Manager", tech: "JSON/XML Processing", status: "active" }
    ]
  },
  {
    layer: "Infrastructure",
    components: [
      { name: "Railway TMS", tech: "Thales ARAMIS / Alstom Iconis", status: "integration" },
      { name: "Section Control", tech: "Signaling Systems", status: "integration" },
      { name: "Audit Database", tech: "PostgreSQL + Blockchain", status: "active" }
    ]
  }
];

const performanceMetrics = [
  { metric: "Decision Time", current: "< 3 seconds", target: "< 1 second", icon: Clock },
  { metric: "Throughput Gain", current: "+15%", target: "+25%", icon: Gauge },
  { metric: "Constraint Compliance", current: "100%", target: "100%", icon: Shield },
  { metric: "Model Accuracy", current: "94%", target: "98%", icon: Brain }
];

const algorithmFlow = [
  {
    step: 1,
    name: "Data Ingestion",
    description: "Real-time train positions, timetables, track status, signal states",
    tech: "WebSocket + REST APIs"
  },
  {
    step: 2,
    name: "Constraint Modeling",
    description: "Safety rules, platform capacity, signal timing, priority hierarchy",
    tech: "Mathematical Optimization"
  },
  {
    step: 3,
    name: "Hybrid Optimization",
    description: "Fast heuristics for real-time + MILP verification for accuracy",
    tech: "OR-Tools + Custom Algorithms"
  },
  {
    step: 4,
    name: "Safety Validation",
    description: "Verify all recommendations comply with railway safety protocols",
    tech: "Rule Engine + Constraint Checking"
  },
  {
    step: 5,
    name: "Human Interface",
    description: "Present actionable recommendations with clear explanations",
    tech: "Interactive Dashboard"
  }
];

export function TechnicalArchitecture() {
  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-success/20 text-success border-success/30",
      planned: "bg-warning/20 text-warning border-warning/30",
      mock: "bg-railway-blue/20 text-railway-blue border-railway-blue/30",
      integration: "bg-accent/20 text-accent-foreground border-accent/30"
    };
    return colors[status as keyof typeof colors] || colors.active;
  };

  return (
    <Card className="border-border/50 shadow-control">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-railway-blue" />
          Technical Architecture & Integration
        </CardTitle>
        <CardDescription>
          Hybrid OR+AI system architecture for real-time railway traffic optimization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="architecture" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="architecture" className="space-y-6">
            <div className="space-y-6">
              {architectureComponents.map((layer, layerIndex) => (
                <div key={layerIndex} className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-railway-blue/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-railway-blue">{layerIndex + 1}</span>
                    </div>
                    {layer.layer}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ml-10">
                    {layer.components.map((component, compIndex) => (
                      <div
                        key={compIndex}
                        className="p-4 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-foreground">{component.name}</h4>
                          <Badge className={getStatusColor(component.status)}>
                            {component.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{component.tech}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="algorithms" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-railway-blue" />
                Hybrid Optimization Pipeline
              </h3>
              <div className="space-y-4">
                {algorithmFlow.map((step) => (
                  <div key={step.step} className="flex gap-4 p-4 rounded-lg border border-border/50 bg-card/30">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-railway-blue flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{step.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      <Badge variant="outline" className="bg-muted/30 text-muted-foreground">
                        {step.tech}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Algorithms */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Core Algorithms</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border/50 bg-card/30">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-warning" />
                    Fast Heuristic (Real-time)
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Priority-based greedy algorithm for instant recommendations (&lt;1 second response)
                  </p>
                  <div className="text-xs font-mono bg-muted/30 p-2 rounded">
                    <div>1. Sort trains by priority & arrival</div>
                    <div>2. Check platform/signal constraints</div>
                    <div>3. Resolve conflicts with minimal delay</div>
                    <div>4. Generate human-readable actions</div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border/50 bg-card/30">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Settings className="h-4 w-4 text-railway-blue" />
                    MILP Optimizer (Verification)
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Mixed Integer Linear Programming for optimal solutions with safety verification
                  </p>
                  <div className="text-xs font-mono bg-muted/30 p-2 rounded">
                    <div>Minimize: Σ(delays + conflicts)</div>
                    <div>Subject to: safety constraints</div>
                    <div>Variables: binary routing decisions</div>
                    <div>Solver: OR-Tools CBC/Gurobi</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Performance Benchmarks</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {performanceMetrics.map((perf, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border/50 bg-card/30 text-center">
                    <perf.icon className="h-6 w-6 mx-auto mb-2 text-railway-blue" />
                    <div className="text-sm text-muted-foreground mb-1">{perf.metric}</div>
                    <div className="text-lg font-bold text-success">{perf.current}</div>
                    <div className="text-xs text-muted-foreground">Target: {perf.target}</div>
                  </div>
                ))}
              </div>

              {/* Scalability Matrix */}
              <div>
                <h4 className="font-medium mb-3">Scalability Analysis</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left p-2 font-medium text-foreground">Trains per Hour</th>
                        <th className="text-left p-2 font-medium text-foreground">Response Time</th>
                        <th className="text-left p-2 font-medium text-foreground">Memory Usage</th>
                        <th className="text-left p-2 font-medium text-foreground">Accuracy</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/30">
                        <td className="p-2">≤ 20</td>
                        <td className="p-2 text-success">&lt; 0.5s</td>
                        <td className="p-2">&lt; 256MB</td>
                        <td className="p-2 text-success">98%</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="p-2">21-50</td>
                        <td className="p-2 text-success">&lt; 1s</td>
                        <td className="p-2">&lt; 512MB</td>
                        <td className="p-2 text-success">96%</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="p-2">51-100</td>
                        <td className="p-2 text-warning">&lt; 3s</td>
                        <td className="p-2">&lt; 1GB</td>
                        <td className="p-2 text-success">94%</td>
                      </tr>
                      <tr>
                        <td className="p-2">100+</td>
                        <td className="p-2 text-warning">&lt; 5s</td>
                        <td className="p-2">&lt; 2GB</td>
                        <td className="p-2 text-warning">90%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Network className="h-5 w-5 text-railway-blue" />
                Integration Roadmap
              </h3>

              {/* Current Integrations */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3 text-success">✓ Currently Implemented</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border border-success/30 bg-success/10">
                      <h5 className="font-medium text-success">Mock Data Simulation</h5>
                      <p className="text-sm text-muted-foreground">Real-time train data simulation for demonstration</p>
                    </div>
                    <div className="p-3 rounded-lg border border-success/30 bg-success/10">
                      <h5 className="font-medium text-success">Audit Trail System</h5>
                      <p className="text-sm text-muted-foreground">Complete logging of all decisions and overrides</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-warning">⏳ Phase 1 (3-6 months)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border border-warning/30 bg-warning/10">
                      <h5 className="font-medium text-warning">TMS API Integration</h5>
                      <p className="text-sm text-muted-foreground">Connect with existing Thales/Alstom systems</p>
                    </div>
                    <div className="p-3 rounded-lg border border-warning/30 bg-warning/10">
                      <h5 className="font-medium text-warning">Signal System Bridge</h5>
                      <p className="text-sm text-muted-foreground">Read-only integration with interlocking systems</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-railway-blue">🔮 Phase 2 (6-12 months)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border border-railway-blue/30 bg-railway-blue/10">
                      <h5 className="font-medium text-railway-blue">ML Model Deployment</h5>
                      <p className="text-sm text-muted-foreground">Reinforcement learning for adaptive optimization</p>
                    </div>
                    <div className="p-3 rounded-lg border border-railway-blue/30 bg-railway-blue/10">
                      <h5 className="font-medium text-railway-blue">Multi-Section Coordination</h5>
                      <p className="text-sm text-muted-foreground">Cross-section optimization and handoffs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Contracts */}
              <div>
                <h4 className="font-medium mb-3">API Integration Specifications</h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-border/50 bg-card/30">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Train Position API</h5>
                      <Badge variant="outline">GET /api/trains/positions</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Real-time train locations, speeds, and ETA updates</p>
                  </div>
                  <div className="p-3 rounded-lg border border-border/50 bg-card/30">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Decision Recommendations</h5>
                      <Badge variant="outline">POST /api/recommendations</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Send optimized actions to TMS with audit trail</p>
                  </div>
                  <div className="p-3 rounded-lg border border-border/50 bg-card/30">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Signal Status Monitor</h5>
                      <Badge variant="outline">WebSocket /ws/signals</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Live signal states and constraint updates</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}