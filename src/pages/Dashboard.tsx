import { DashboardKPIs } from "@/components/DashboardKPIs";
import { TrainTimeline } from "@/components/TrainTimeline";
import { RecommendationPanel } from "@/components/RecommendationPanel";
import { AuditTrail } from "@/components/AuditTrail";
import { WhatIfAnalysis } from "@/components/WhatIfAnalysis";
import { EnhancedSafety } from "@/components/EnhancedSafety";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Control Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time section control and decision support system
        </p>
      </div>

      {/* KPI Cards */}
      <DashboardKPIs />

      {/* Enhanced Dashboard with Tabs */}
      <Tabs defaultValue="control" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="control">Live Control</TabsTrigger>
          <TabsTrigger value="analysis">What-If Analysis</TabsTrigger>
          <TabsTrigger value="safety">Safety Monitor</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="control" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <TrainTimeline />
            </div>
            <div className="xl:col-span-1">
              <RecommendationPanel />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <WhatIfAnalysis />
        </TabsContent>

        <TabsContent value="safety">
          <EnhancedSafety />
        </TabsContent>

        <TabsContent value="audit">
          <AuditTrail />
        </TabsContent>
      </Tabs>
    </div>
  );
}