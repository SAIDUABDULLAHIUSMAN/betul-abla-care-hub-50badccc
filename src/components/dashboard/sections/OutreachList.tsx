import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Eye, Calendar } from "lucide-react";

interface OutreachActivity {
  id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  status: 'planned' | 'ongoing' | 'completed';
  participants: number;
  created_at: string;
}

export const OutreachList = () => {
  const [activities, setActivities] = useState<OutreachActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('outreach_activities')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching outreach activities:', error);
      toast({
        title: "Error",
        description: "Failed to fetch outreach activities. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-hope text-hope-foreground';
      case 'ongoing':
        return 'bg-primary text-primary-foreground';
      case 'planned':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading outreach activities...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Outreach Activities</h2>
          <p className="text-muted-foreground">
            Manage community outreach events and programs.
          </p>
        </div>
        <Button onClick={fetchActivities}>Refresh</Button>
      </div>

      {activities.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-muted-foreground">No outreach activities found.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Start by planning a new outreach event.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Card key={activity.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{activity.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{activity.location}</p>
                  </div>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {formatDate(activity.event_date)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Participants</p>
                    <p className="text-sm">{activity.participants || 'TBD'}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Description</p>
                    <p className="text-sm line-clamp-3">{activity.description}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};