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
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
        <p className="text-base text-muted-foreground mt-2">
          Welcome to the Betul Abla Foundation management dashboard.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title} className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {card.title}
              </CardTitle>
              <div className={`h-10 w-10 rounded-xl ${card.color} bg-opacity-10 flex items-center justify-center`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-compassion rounded-full mt-2 shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">New orphan profile created</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">Borehole project updated</p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-hope rounded-full mt-2 shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">Community outreach event completed</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full text-left p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors duration-200">
                <div className="font-semibold text-foreground">Add New Orphan</div>
                <div className="text-sm text-muted-foreground mt-1">Register a new orphan profile</div>
              </button>
              <button className="w-full text-left p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors duration-200">
                <div className="font-semibold text-foreground">Create Borehole Project</div>
                <div className="text-sm text-muted-foreground mt-1">Start a new water project</div>
              </button>
              <button className="w-full text-left p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors duration-200">
                <div className="font-semibold text-foreground">Plan Outreach Activity</div>
                <div className="text-sm text-muted-foreground mt-1">Organize community events</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};