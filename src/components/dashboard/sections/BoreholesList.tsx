import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Eye } from "lucide-react";

interface Borehole {
  id: string;
  name: string;
  location: string;
  status: 'planning' | 'in_progress' | 'completed';
  description: string;
  cost: number;
  created_at: string;
}

export const BoreholesList = () => {
  const [boreholes, setBoreholes] = useState<Borehole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBoreholes();
  }, []);

  const fetchBoreholes = async () => {
    try {
      const { data, error } = await supabase
        .from('boreholes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBoreholes(data || []);
    } catch (error) {
      console.error('Error fetching boreholes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch boreholes. Please try again.",
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
      case 'in_progress':
        return 'bg-primary text-primary-foreground';
      case 'planning':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading boreholes...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Boreholes</h2>
          <p className="text-muted-foreground">
            Manage water projects and their progress.
          </p>
        </div>
        <Button onClick={fetchBoreholes}>Refresh</Button>
      </div>

      {boreholes.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-muted-foreground">No boreholes found.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Start by adding a new borehole project.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {boreholes.map((borehole) => (
            <Card key={borehole.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{borehole.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{borehole.location}</p>
                  </div>
                  <Badge className={getStatusColor(borehole.status)}>
                    {borehole.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Cost</p>
                    <p className="text-sm">${borehole.cost?.toLocaleString() || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Description</p>
                    <p className="text-sm line-clamp-3">{borehole.description}</p>
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