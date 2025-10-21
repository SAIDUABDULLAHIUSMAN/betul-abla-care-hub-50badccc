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
  activity_type: string;
  location: string;
  date: string;
  beneficiaries_count: number | null;
  description: string | null;
  photo_url: string | null;
  status: string;
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
        .order('date', { ascending: false });

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

  const deleteActivity = async (id: string) => {
    if (!confirm("Are you sure you want to delete this outreach activity?")) return;

    try {
      const { error } = await supabase
        .from('outreach_activities')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setActivities(activities.filter(activity => activity.id !== id));
      toast({
        title: "Success",
        description: "Outreach activity deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting outreach activity:', error);
      toast({
        title: "Error",
        description: "Failed to delete outreach activity. Please try again.",
        variant: "destructive",
      });
    }
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
            Manage community outreach programs and events.
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
                Start by adding a new outreach activity.
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
                  <CardTitle className="text-lg line-clamp-1">{activity.title}</CardTitle>
                  <Badge variant="secondary">{activity.status}</Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(activity.date).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Type</p>
                    <p className="text-sm capitalize">{activity.activity_type.replace('_', ' ')}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Location</p>
                    <p className="text-sm">{activity.location}</p>
                  </div>
                  
                  {activity.beneficiaries_count && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Beneficiaries</p>
                      <p className="text-sm">{activity.beneficiaries_count} people</p>
                    </div>
                  )}
                  
                  {activity.description && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Description</p>
                      <p className="text-sm line-clamp-2">{activity.description}</p>
                    </div>
                  )}
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
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => deleteActivity(activity.id)}
                    className="text-destructive hover:text-destructive"
                  >
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
