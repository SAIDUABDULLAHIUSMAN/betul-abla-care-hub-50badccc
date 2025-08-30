import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Droplets, HandHeart, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const DashboardOverview = () => {
  const [stats, setStats] = useState({
    orphans: 0,
    boreholes: 0,
    outreach: 0,
    pending: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [orphansResult, boreholesResult, outreachResult, pendingResult] = await Promise.all([
          supabase.from('orphans').select('id', { count: 'exact', head: true }),
          supabase.from('boreholes').select('id', { count: 'exact', head: true }),
          supabase.from('outreach_activities').select('id', { count: 'exact', head: true }),
          supabase.from('orphans').select('id', { count: 'exact', head: true }).eq('status', 'pending')
        ]);

        setStats({
          orphans: orphansResult.count || 0,
          boreholes: boreholesResult.count || 0,
          outreach: outreachResult.count || 0,
          pending: pendingResult.count || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Orphans",
      value: stats.orphans,
      icon: Users,
      color: "text-compassion"
    },
    {
      title: "Boreholes",
      value: stats.boreholes,
      icon: Droplets,
      color: "text-primary"
    },
    {
      title: "Outreach Activities",
      value: stats.outreach,
      icon: HandHeart,
      color: "text-hope"
    },
    {
      title: "Pending Approval",
      value: stats.pending,
      icon: FileText,
      color: "text-destructive"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Welcome to the Betul Abla Foundation management dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-compassion rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New orphan profile created</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Borehole project updated</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-hope rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Community outreach event completed</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="font-medium">Add New Orphan</div>
                <div className="text-sm text-muted-foreground">Register a new orphan profile</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="font-medium">Create Borehole Project</div>
                <div className="text-sm text-muted-foreground">Start a new water project</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="font-medium">Plan Outreach Activity</div>
                <div className="text-sm text-muted-foreground">Organize community events</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};