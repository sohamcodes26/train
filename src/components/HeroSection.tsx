import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/railway-hero-bg.jpg";

export function HeroSection() {
  const navigate = useNavigate();

  const handleOpenDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Railway Lines Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-railway-orange/30 bg-railway-orange/10 text-railway-orange text-sm font-medium">
            <Zap className="w-4 h-4" />
            AI-Powered Railway Control
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            AI-Powered Train Traffic
            <span className="text-transparent bg-gradient-primary bg-clip-text block">
              Control System
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real-time decision support for section controllers – maximizing throughput, 
            minimizing delays, ensuring safety through intelligent automation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 min-w-[200px]"
              onClick={handleOpenDashboard}
            >
              Open Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-railway-orange text-railway-orange hover:bg-railway-orange hover:text-railway-orange-foreground text-lg px-8 py-6 min-w-[200px]"
            >
              View Demo
            </Button>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: "20% Higher Efficiency",
                description: "Optimize train throughput with AI-powered scheduling"
              },
              {
                icon: Zap,
                title: "< 10 Second Decisions",
                description: "Real-time conflict resolution and priority handling"
              },
              {
                icon: Shield,
                title: "Safety Compliant",
                description: "Adheres to all railway signalling and safety protocols"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50 hover:bg-card/50 transition-all duration-300 hover:shadow-control"
              >
                <div className="p-3 rounded-full bg-primary/20 mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Railway Signal Animation */}
      <div className="absolute bottom-10 right-10 opacity-20">
        <div className="flex flex-col gap-2">
          <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-warning animate-pulse delay-300"></div>
          <div className="w-3 h-3 rounded-full bg-destructive animate-pulse delay-700"></div>
        </div>
      </div>
    </section>
  );
}