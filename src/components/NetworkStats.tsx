import { Card } from "@/components/ui/card";
import { Activity, Wifi, TrendingUp, Shield } from "lucide-react";
import { NetworkData } from "./NetworkDashboard";

interface NetworkStatsProps {
  data: NetworkData;
}

const NetworkStats = ({ data }: NetworkStatsProps) => {
  const stats = [
    {
      icon: Activity,
      label: "Packets/sec",
      value: data.packetsPerSecond.toLocaleString(),
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      label: "Bandwidth",
      value: `${data.bandwidth} Mbps`,
      color: "text-accent",
    },
    {
      icon: Wifi,
      label: "Active Connections",
      value: data.activeConnections.toLocaleString(),
      color: "text-info",
    },
    {
      icon: Shield,
      label: "Threats Detected",
      value: data.threatsDetected,
      color: "text-destructive",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6 bg-card border-border hover:border-primary transition-all duration-300 cyber-glow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NetworkStats;
