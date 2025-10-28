import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Activity, AlertTriangle, Shield, Wifi } from "lucide-react";
import TrafficTable from "./TrafficTable";
import NetworkStats from "./NetworkStats";
import AlertsPanel from "./AlertsPanel";
import BandwidthChart from "./BandwidthChart";

export interface NetworkData {
  packetsPerSecond: number;
  bandwidth: number;
  activeConnections: number;
  threatsDetected: number;
}

const NetworkDashboard = () => {
  const [networkData, setNetworkData] = useState<NetworkData>({
    packetsPerSecond: 0,
    bandwidth: 0,
    activeConnections: 0,
    threatsDetected: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkData({
        packetsPerSecond: Math.floor(Math.random() * 10000) + 5000,
        bandwidth: Math.floor(Math.random() * 100) + 50,
        activeConnections: Math.floor(Math.random() * 200) + 100,
        threatsDetected: Math.floor(Math.random() * 5),
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Network Traffic Analyzer</h1>
        </header>

        <NetworkStats data={networkData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BandwidthChart />
          </div>
          <div className="lg:col-span-1">
            <AlertsPanel threatsDetected={networkData.threatsDetected} />
          </div>
        </div>

        <TrafficTable />
      </div>
    </div>
  );
};

export default NetworkDashboard;
