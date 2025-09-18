import { TechnicalArchitecture } from "@/components/TechnicalArchitecture";

export default function Settings() {
  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">System Configuration</h1>
        <p className="text-muted-foreground">
          Technical architecture and integration settings
        </p>
      </div>

      <TechnicalArchitecture />
    </div>
  );
}