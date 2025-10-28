import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TrafficEntry {
  id: string;
  timestamp: string;
  sourceIp: string;
  destIp: string;
  protocol: string;
  port: number;
  status: "normal" | "suspicious" | "blocked";
}

const TrafficTable = () => {
  const [traffic, setTraffic] = useState<TrafficEntry[]>([]);

  const generateTrafficEntry = (): TrafficEntry => {
    const protocols = ["TCP", "UDP", "HTTP", "HTTPS", "DNS"];
    const statuses: TrafficEntry["status"][] = ["normal", "normal", "normal", "suspicious", "blocked"];
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      sourceIp: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      destIp: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      protocol: protocols[Math.floor(Math.random() * protocols.length)],
      port: Math.floor(Math.random() * 65535),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTraffic((prev) => {
        const newEntry = generateTrafficEntry();
        return [newEntry, ...prev].slice(0, 10);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: TrafficEntry["status"]) => {
    switch (status) {
      case "normal":
        return "bg-primary/20 text-primary border-primary/30";
      case "suspicious":
        return "bg-warning/20 text-warning border-warning/30";
      case "blocked":
        return "bg-destructive/20 text-destructive border-destructive/30";
    }
  };

  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-bold text-primary mb-4">Live Traffic Feed</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Time</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Source IP</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Dest IP</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Protocol</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Port</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {traffic.map((entry) => (
              <tr key={entry.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                <td className="py-3 px-4 text-foreground">{entry.timestamp}</td>
                <td className="py-3 px-4 text-foreground">{entry.sourceIp}</td>
                <td className="py-3 px-4 text-foreground">{entry.destIp}</td>
                <td className="py-3 px-4 text-accent">{entry.protocol}</td>
                <td className="py-3 px-4 text-foreground">{entry.port}</td>
                <td className="py-3 px-4">
                  <Badge variant="outline" className={getStatusColor(entry.status)}>
                    {entry.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TrafficTable;
