import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Play, 
  Copy, 
  CheckCircle,
  ArrowRight,
  Database,
  Cpu
} from "lucide-react";

const inputData = {
  trains: [
    { id: "EXP101", priority: "Express", arrival: 0, destination: "Mumbai Central" },
    { id: "LCL301", priority: "Local", arrival: 2, destination: "Andheri" },
    { id: "FRT201", priority: "Freight", arrival: 1, destination: "JNPT Port" }
  ],
  section: {
    id: "BYC-BCT",
    capacity: 4,
    signals: ["S1", "S2", "S3"],
    platforms: ["PF1", "PF2"]
  }
};

const outputData = {
  sequence: ["EXP101", "LCL301", "FRT201"],
  avg_delay: "2.1 min",
  throughput_gain: "18%",
  total_time: "22 min",
  explanations: {
    EXP101: "Allowed first due to highest priority (Express service).",
    LCL301: "Held for 2 minutes to reduce congestion and clear section.",
    FRT201: "Delayed 5 minutes as freight has lower priority, avoids bottleneck."
  },
  optimization_metrics: {
    conflicts_resolved: 2,
    efficiency_score: 94,
    safety_compliance: "100%"
  }
};

export function DemoDataSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10">
            <Code className="w-4 h-4 mr-2" />
            Developer Demo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Interactive Demo Data
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore sample input and output data to understand how our AI engine
            optimizes train traffic for maximum efficiency and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-control border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Input Data
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Train schedules, priorities, and section configuration
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="trains" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="trains">Trains</TabsTrigger>
                  <TabsTrigger value="section">Section</TabsTrigger>
                </TabsList>
                
                <TabsContent value="trains" className="mt-4">
                  <div className="relative">
                    <pre className="bg-muted/30 p-4 rounded-lg text-sm overflow-x-auto border border-border/50">
                      <code className="text-foreground">
{JSON.stringify(inputData.trains, null, 2)}
                      </code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => handleCopy(JSON.stringify(inputData.trains, null, 2), 'trains')}
                    >
                      {copied === 'trains' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="section" className="mt-4">
                  <div className="relative">
                    <pre className="bg-muted/30 p-4 rounded-lg text-sm overflow-x-auto border border-border/50">
                      <code className="text-foreground">
{JSON.stringify(inputData.section, null, 2)}
                      </code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline" 
                      className="absolute top-2 right-2"
                      onClick={() => handleCopy(JSON.stringify(inputData.section, null, 2), 'section')}
                    >
                      {copied === 'section' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="shadow-control border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-success" />
                Output Results
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Optimized sequence and performance metrics
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="results" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="results">Results</TabsTrigger>
                  <TabsTrigger value="explanations">Explanations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="results" className="mt-4">
                  <div className="relative">
                    <pre className="bg-muted/30 p-4 rounded-lg text-sm overflow-x-auto border border-border/50">
                      <code className="text-foreground">
{JSON.stringify({
  sequence: outputData.sequence,
  avg_delay: outputData.avg_delay,
  throughput_gain: outputData.throughput_gain,
  total_time: outputData.total_time,
  optimization_metrics: outputData.optimization_metrics
}, null, 2)}
                      </code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2" 
                      onClick={() => handleCopy(JSON.stringify(outputData, null, 2), 'output')}
                    >
                      {copied === 'output' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="explanations" className="mt-4 space-y-3">
                  {Object.entries(outputData.explanations).map(([train, explanation]) => (
                    <div key={train} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                      <div className="font-medium text-foreground mb-1">{train}</div>
                      <div className="text-sm text-muted-foreground">{explanation}</div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Process Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-primary hover:shadow-glow px-8 py-6"
            onClick={handleProcess}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Run Optimization
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Click to see the AI engine process this data in real-time
          </p>
        </div>
      </div>
    </section>
  );
}