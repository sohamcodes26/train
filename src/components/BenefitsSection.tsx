import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  Clock, 
  Shield, 
  Lightbulb, 
  BarChart3,
  CheckCircle
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Higher Efficiency", 
    description: "Up to 20% more trains per section through optimized scheduling",
    metric: "+20%",
    color: "success"
  },
  {
    icon: Clock,
    title: "Reduced Delays",
    description: "Faster decision-making and fewer bottlenecks across the network", 
    metric: "-35%",
    color: "warning"
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Full compliance with signalling rules and railway safety protocols",
    metric: "100%",
    color: "primary"
  },
  {
    icon: Lightbulb,
    title: "Explainability", 
    description: "Every recommendation comes with clear reasoning and impact analysis",
    metric: "Clear",
    color: "accent"
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Historical reports and performance tracking for continuous improvement",
    metric: "Real-time",
    color: "success"
  }
];

export function BenefitsSection() {
  const colorClasses = {
    success: "text-success border-success/20 bg-success/5",
    warning: "text-warning border-warning/20 bg-warning/5",
    primary: "text-primary border-primary/20 bg-primary/5", 
    accent: "text-railway-orange border-railway-orange/20 bg-railway-orange/5"
  };

  return (
    <section className="py-20 px-6 bg-gradient-control">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            System Benefits
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your railway operations with AI-powered decision support
            that delivers measurable improvements across all key metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden shadow-control hover:shadow-elevated transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-6 space-y-4">
                {/* Icon and Metric */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${colorClasses[benefit.color as keyof typeof colorClasses]}`}>
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {benefit.metric}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Background decoration */}
                <div className={`absolute -bottom-4 -right-4 w-20 h-20 ${colorClasses[benefit.color as keyof typeof colorClasses]} rounded-full blur-3xl opacity-10`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-success/10 border border-success/20 text-success">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Proven results across 50+ railway sections</span>
          </div>
        </div>
      </div>
    </section>
  );
}