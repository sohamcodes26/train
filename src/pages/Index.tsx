import { HeroSection } from "@/components/HeroSection";
import { WorkflowSection } from "@/components/WorkflowSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { DemoDataSection } from "@/components/DemoDataSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <WorkflowSection />
      <BenefitsSection />
      <DemoDataSection />
    </div>
  );
};

export default Index;
