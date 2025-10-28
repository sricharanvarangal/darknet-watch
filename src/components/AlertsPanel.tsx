import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Shield, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Alert {
  id: string;
  type: "dos" | "suspicious" | "blocked";
  message: string;
  timestamp: string;
  severity: "high" | "medium" | "low";
}

interface AlertsPanelProps {
  threatsDetected: number;
}

const AlertsPanel = ({ threatsDetected }: AlertsPanelProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const generateAlert = (): Alert => {
    const alertTypes: Alert["type"][] = ["dos", "suspicious", "blocked"];
    const severities: Alert["severity"][] = ["high", "medium", "low"];
    const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    
    const messages = {
      dos: "Potential DoS attack detected from multiple IPs",
      suspicious: "Unusual traffic pattern detected",
      blocked: "Malicious connection attempt blocked",
    };

    return {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message: messages[type],
      timestamp: new Date().toLocaleTimeString(),
      severity: severities[Math.floor(Math.random() * severities.length)],
    };
  };

  useEffect(() => {
    if (threatsDetected > 0) {
      const newAlert = generateAlert();
      setAlerts((prev) => [newAlert, ...prev].slice(0, 5));
    }
  }, [threatsDetected]);

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "dos":
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case "suspicious":
        return <Shield className="w-5 h-5 text-warning" />;
      case "blocked":
        return <XCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-destructive/20 text-destructive border-destructive/30";
      case "medium":
        return "bg-warning/20 text-warning border-warning/30";
      case "low":
        return "bg-muted text-muted-foreground border-muted-foreground/30";
    }
  };

  return (
    <Card className="p-6 bg-card border-border h-full">
      <h2 className="text-xl font-bold text-destructive mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        Security Alerts
      </h2>
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="w-12 h-12 mx-auto mb-2 text-primary" />
            <p>No active threats detected</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 bg-secondary border border-border rounded-lg hover:border-primary transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm text-foreground mt-2">{alert.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default AlertsPanel;
