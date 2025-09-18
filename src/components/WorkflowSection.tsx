import { Card, CardContent } from "@/components/ui/card";
import { 
  Database, 
  Cpu, 
  Brain, 
  Radio,
  ArrowRight
} from "lucide-react";

const workflowSteps = [
  {
    step: "01",
    title: "Input Collection",
    description: "Train schedules, priorities, track layout, signals, and platform configurations",
    icon: Database,
    color: "primary"
  },
  {
    step: "02", 
    title: "AI Optimization Engine",
    description: "Advanced algorithms analyze constraints and generate conflict-free scheduling plans",
    icon: Cpu,
    color: "success"
  },
  {
    step: "03",
    title: "Decision Support",
    description: "Controllers receive clear recommendations with detailed reasoning and impact analysis",
    icon: Brain,
    color: "warning"
  },
  {
    step: "04",
    title: "Execution & Monitoring",
    description: "Recommendations transmitted to drivers with override capability and continuous monitoring",
    icon: Radio,
    color: "accent"
  }
];

export function WorkflowSection() {
  const colorClasses = {
    primary: "text-primary border-primary/20 bg-primary/5",
    success: "text-success border-success/20 bg-success/5", 
    warning: "text-warning border-warning/20 bg-warning/5",
    accent: "text-railway-orange border-railway-orange/20 bg-railway-orange/5"
  };

  const stepColors = {
    primary: "bg-gradient-to-r from-primary to-primary/80",
    success: "bg-gradient-to-r from-success to-success/80",
    warning: "bg-gradient-to-r from-warning to-warning/80", 
    accent: "bg-gradient-to-r from-railway-orange to-railway-orange/80"
  };

  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A four-step intelligent workflow that transforms complex railway
            operations into clear, actionable decisions.
          </p>
        </div>

        {/* Desktop Workflow */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-success via-warning to-railway-orange opacity-30 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-4 gap-8 relative">
              {workflowSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="shadow-control hover:shadow-elevated transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 text-center space-y-4">
                      {/* Step Number */}
                      <div className={`w-12 h-12 rounded-full ${stepColors[step.color as keyof typeof stepColors]} flex items-center justify-center text-white font-bold text-lg mx-auto relative z-10`}>
                        {step.step}
                      </div>

                      {/* Icon */}
                      <div className={`p-4 rounded-lg ${colorClasses[step.color as keyof typeof colorClasses]} inline-flex`}>
                        <step.icon className="h-8 w-8" />
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Arrow connector */}
                  {index < workflowSteps.length - 1 && (
                    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Workflow */}
        <div className="lg:hidden space-y-6">
          {workflowSteps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="shadow-control border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Step indicator */}
                    <div className={`w-10 h-10 rounded-full ${stepColors[step.color as keyof typeof stepColors]} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                      {step.step}
                    </div>

                    <div className="space-y-3 flex-1">
                      {/* Icon & Title */}
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${colorClasses[step.color as keyof typeof colorClasses]}`}>
                          <step.icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {step.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Connecting line for mobile */}
              {index < workflowSteps.length - 1 && (
                <div className="flex justify-center py-4">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-muted to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}