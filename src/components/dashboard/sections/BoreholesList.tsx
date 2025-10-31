import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Eye } from "lucide-react";
import { BoreholeEditModal } from "../modals/BoreholeEditModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Borehole {
  id: string;
  location: string;
  community_name: string;
  depth_meters: number | null;
  completion_date: string | null;
  beneficiaries_count: number | null;
  photo_url: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

export const BoreholesList = () => {
  const [boreholes, setBoreholes] = useState<Borehole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBorehole, setSelectedBorehole] = useState<Borehole | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
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

  const deleteBorehole = async (id: string) => {
    if (!confirm("Are you sure you want to delete this borehole project?")) return;

    try {
      const { error } = await supabase
        .from('boreholes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBoreholes(boreholes.filter(borehole => borehole.id !== id));
      toast({
        title: "Success",
        description: "Borehole project deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting borehole:', error);
      toast({
        title: "Error",
        description: "Failed to delete borehole project. Please try again.",
        variant: "destructive",
      });
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
            Manage water borehole projects across communities.
          </p>
        </div>
        <Button onClick={fetchBoreholes}>Refresh</Button>
      </div>

      {boreholes.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-muted-foreground">No borehole projects found.</p>
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
                  <CardTitle className="text-lg">{borehole.community_name}</CardTitle>
                  <Badge variant="secondary">{borehole.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{borehole.location}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {borehole.depth_meters && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Depth</p>
                      <p className="text-sm">{borehole.depth_meters}m</p>
                    </div>
                  )}
                  
                  {borehole.beneficiaries_count && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Beneficiaries</p>
                      <p className="text-sm">{borehole.beneficiaries_count} people</p>
                    </div>
                  )}
                  
                  {borehole.completion_date && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Completed</p>
                      <p className="text-sm">{new Date(borehole.completion_date).toLocaleDateString()}</p>
                    </div>
                  )}

                  {borehole.notes && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Notes</p>
                      <p className="text-sm line-clamp-2">{borehole.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedBorehole(borehole);
                      setIsViewModalOpen(true);
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedBorehole(borehole);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => deleteBorehole(borehole.id)}
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

      {selectedBorehole && (
        <>
          <BoreholeEditModal
            borehole={selectedBorehole}
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            onSuccess={fetchBoreholes}
          />
          
          <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedBorehole.community_name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {selectedBorehole.photo_url && (
                  <img 
                    src={selectedBorehole.photo_url} 
                    alt={selectedBorehole.community_name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{selectedBorehole.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={selectedBorehole.status === 'approved' ? 'default' : 'secondary'}>
                      {selectedBorehole.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Depth</p>
                    <p className="font-medium">{selectedBorehole.depth_meters ? `${selectedBorehole.depth_meters}m` : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Beneficiaries</p>
                    <p className="font-medium">{selectedBorehole.beneficiaries_count || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completion Date</p>
                    <p className="font-medium">
                      {selectedBorehole.completion_date 
                        ? new Date(selectedBorehole.completion_date).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>
                {selectedBorehole.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="font-medium">{selectedBorehole.notes}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};
