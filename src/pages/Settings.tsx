import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Database,
  Zap,
  User,
  Save,
  RotateCcw
} from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    conflicts: true,
    delays: true,
    maintenance: false,
    reports: true
  });

  const [aiSettings, setAiSettings] = useState({
    autoApprove: false,
    confidence: 85,
    realTime: true,
    learning: true
  });

  const [systemSettings, setSystemSettings] = useState({
    darkMode: true,
    autoRefresh: true,
    soundAlerts: false,
    advancedMode: true
  });

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground">
          Configure AI parameters, notifications, and system preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Configuration */}
        <Card className="shadow-control border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              AI Engine Settings
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Configure AI decision-making parameters and automation levels
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-approve" className="text-sm font-medium">
                    Auto-approve High Confidence Decisions
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically execute decisions above confidence threshold
                  </p>
                </div>
                <Switch 
                  id="auto-approve"
                  checked={aiSettings.autoApprove}
                  onCheckedChange={(checked) => setAiSettings({...aiSettings, autoApprove: checked})}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Confidence Threshold</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-muted/30 rounded-full">
                    <div 
                      className="h-full bg-gradient-primary rounded-full transition-all duration-300"
                      style={{ width: `${aiSettings.confidence}%` }}
                    ></div>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10">
                    {aiSettings.confidence}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Minimum confidence level required for automatic decisions
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="real-time" className="text-sm font-medium">
                    Real-time Processing
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Enable continuous AI analysis and recommendations
                  </p>
                </div>
                <Switch 
                  id="real-time"
                  checked={aiSettings.realTime}
                  onCheckedChange={(checked) => setAiSettings({...aiSettings, realTime: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="learning" className="text-sm font-medium">
                    Adaptive Learning
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Allow AI to learn from controller feedback and decisions
                  </p>
                </div>
                <Switch 
                  id="learning"
                  checked={aiSettings.learning}
                  onCheckedChange={(checked) => setAiSettings({...aiSettings, learning: checked})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-control border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-warning" />
              Notification Preferences
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage alerts and notifications for different system events
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="conflicts" className="text-sm font-medium">
                    Conflict Alerts
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Get notified when train conflicts are detected
                  </p>
                </div>
                <Switch 
                  id="conflicts"
                  checked={notifications.conflicts}
                  onCheckedChange={(checked) => setNotifications({...notifications, conflicts: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="delays" className="text-sm font-medium">
                    Delay Notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Alerts for significant train delays or bottlenecks
                  </p>
                </div>
                <Switch 
                  id="delays"
                  checked={notifications.delays}
                  onCheckedChange={(checked) => setNotifications({...notifications, delays: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="maintenance" className="text-sm font-medium">
                    Maintenance Windows
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Scheduled maintenance and track availability updates
                  </p>
                </div>
                <Switch 
                  id="maintenance"
                  checked={notifications.maintenance}
                  onCheckedChange={(checked) => setNotifications({...notifications, maintenance: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="reports" className="text-sm font-medium">
                    Daily Reports
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Performance summaries and analytics reports
                  </p>
                </div>
                <Switch 
                  id="reports"
                  checked={notifications.reports}
                  onCheckedChange={(checked) => setNotifications({...notifications, reports: checked})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card className="shadow-control border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-accent" />
              System Configuration
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Interface preferences and system behavior settings
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-refresh" className="text-sm font-medium">
                    Auto-refresh Dashboard
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically update dashboard data every 30 seconds
                  </p>
                </div>
                <Switch 
                  id="auto-refresh"
                  checked={systemSettings.autoRefresh}
                  onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoRefresh: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="sound-alerts" className="text-sm font-medium">
                    Sound Alerts
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Enable audio notifications for critical events
                  </p>
                </div>
                <Switch 
                  id="sound-alerts"
                  checked={systemSettings.soundAlerts}
                  onCheckedChange={(checked) => setSystemSettings({...systemSettings, soundAlerts: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="advanced-mode" className="text-sm font-medium">
                    Advanced Controller Mode
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Show detailed technical information and controls
                  </p>
                </div>
                <Switch 
                  id="advanced-mode"
                  checked={systemSettings.advancedMode}
                  onCheckedChange={(checked) => setSystemSettings({...systemSettings, advancedMode: checked})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Profile */}
        <Card className="shadow-control border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-success" />
              Controller Profile
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              User information and authorization levels
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <div className="font-medium text-foreground">Section Controller</div>
                </div>
                <div>
                  <span className="text-muted-foreground">ID:</span>
                  <div className="font-medium text-foreground">SC001</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Section:</span>
                  <div className="font-medium text-foreground">BYC-BCT</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Clearance:</span>
                  <Badge variant="outline" className="text-success border-success/20 bg-success/10">
                    Level 3
                  </Badge>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Authorized Operations</span>
                </div>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Manual Override</span>
                    <Badge variant="outline" className="text-success border-success/20 bg-success/10">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Emergency Stop</span>
                    <Badge variant="outline" className="text-success border-success/20 bg-success/10">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">AI Configuration</span>
                    <Badge variant="outline" className="text-warning border-warning/20 bg-warning/10">
                      Limited
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-border/50">
        <Button variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button className="bg-gradient-primary hover:shadow-glow">
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
}