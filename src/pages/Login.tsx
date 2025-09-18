import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Train, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [credentials, setCredentials] = useState({
    employeeId: "",
    password: "",
    section: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      // Demo credentials
      if (credentials.employeeId === "SC001" && credentials.password === "railway123") {
        localStorage.setItem("railwayAuth", JSON.stringify({
          employeeId: credentials.employeeId,
          name: "Rajesh Kumar",
          designation: "Section Controller",
          section: credentials.section || "Delhi-Gurgaon Section",
          zone: "Northern Railway",
          loginTime: new Date().toISOString()
        }));
        
        toast({
          title: "Login Successful",
          description: "Welcome back, Section Controller",
        });
        
        navigate("/dashboard");
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid credentials. Use SC001 / railway123",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-control flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-railway-blue/20 border border-railway-blue/30">
              <Train className="h-12 w-12 text-railway-blue" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Railway Traffic Control System
          </h1>
          <p className="text-muted-foreground">
            Secure access for authorized personnel only
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-border/50 shadow-elevated">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-railway-blue" />
              <CardTitle className="text-xl">Section Controller Login</CardTitle>
            </div>
            <CardDescription>
              Enter your railway credentials to access the control system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Employee ID
                </Label>
                <Input
                  id="employeeId"
                  type="text"
                  placeholder="SC001"
                  value={credentials.employeeId}
                  onChange={(e) => setCredentials(prev => ({ ...prev, employeeId: e.target.value }))}
                  className="border-border/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="border-border/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="section">Assigned Section</Label>
                <Input
                  id="section"
                  type="text"
                  placeholder="Delhi-Gurgaon Section"
                  value={credentials.section}
                  onChange={(e) => setCredentials(prev => ({ ...prev, section: e.target.value }))}
                  className="border-border/50"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-railway-blue hover:bg-railway-blue/90"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Access Control System"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-sm font-medium text-foreground mb-2">Demo Credentials:</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Employee ID:</strong> SC001</p>
                <p><strong>Password:</strong> railway123</p>
                <p><strong>Section:</strong> Any section name</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>This system is for authorized railway personnel only.</p>
          <p>All activities are monitored and logged for security purposes.</p>
        </div>
      </div>
    </div>
  );
}