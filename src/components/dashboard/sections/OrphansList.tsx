import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Eye } from "lucide-react";

interface Orphan {
  id: string;
  full_name: string;
  age: number | null;
  location: string | null;
  school_name: string | null;
  grade_level: string | null;
  school_fees_covered: boolean;
  photo_url: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

export const OrphansList = () => {
  const [orphans, setOrphans] = useState<Orphan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrphans();
  }, []);

  const fetchOrphans = async () => {
    try {
      const { data, error } = await supabase
        .from('orphans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrphans(data || []);
    } catch (error) {
      console.error('Error fetching orphans:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orphans. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrphan = async (id: string) => {
    if (!confirm("Are you sure you want to delete this orphan profile?")) return;

    try {
      const { error } = await supabase
        .from('orphans')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setOrphans(orphans.filter(orphan => orphan.id !== id));
      toast({
        title: "Success",
        description: "Orphan profile deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting orphan:', error);
      toast({
        title: "Error",
        description: "Failed to delete orphan profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-hope text-hope-foreground';
      case 'pending':
        return 'bg-secondary text-secondary-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading orphans...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orphans</h2>
          <p className="text-muted-foreground">
            Manage orphan profiles and their information.
          </p>
        </div>
        <Button onClick={fetchOrphans}>Refresh</Button>
      </div>

      {orphans.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-muted-foreground">No orphans found.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Start by adding a new orphan profile.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orphans.map((orphan) => (
            <Card key={orphan.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{orphan.full_name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {orphan.age && `Age ${orphan.age}`} {orphan.age && orphan.location && '•'} {orphan.location}
                    </p>
                  </div>
                  <Badge className={getStatusColor(orphan.status)}>
                    {orphan.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {orphan.photo_url && (
                  <img
                    src={orphan.photo_url}
                    alt={orphan.full_name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                )}
                
                <div className="space-y-2">
                  {orphan.school_name && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">School</p>
                      <p className="text-sm">{orphan.school_name}</p>
                    </div>
                  )}
                  
                  {orphan.grade_level && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Grade</p>
                      <p className="text-sm">{orphan.grade_level}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">School Fees</p>
                    <p className="text-sm">{orphan.school_fees_covered ? 'Covered ✓' : 'Not covered'}</p>
                  </div>
                  
                  {orphan.notes && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Notes</p>
                      <p className="text-sm line-clamp-2">{orphan.notes}</p>
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
                    onClick={() => deleteOrphan(orphan.id)}
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
