import { DashboardKPIs } from "@/components/DashboardKPIs";
import { TrainTimeline } from "@/components/TrainTimeline";
import { RecommendationPanel } from "@/components/RecommendationPanel";

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

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Timeline takes 2 columns */}
        <div className="xl:col-span-2">
          <TrainTimeline />
        </div>
        
        {/* Recommendations takes 1 column */}
        <div className="xl:col-span-1">
          <RecommendationPanel />
        </div>
      </div>
    </div>
  );
}