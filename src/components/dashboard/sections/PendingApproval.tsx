import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Eye } from "lucide-react";

export const PendingApproval = () => {
  const [pendingItems, setPendingItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingItems();
  }, []);

  const fetchPendingItems = async () => {
    try {
      const { data: orphans, error: orphansError } = await supabase
        .from('orphans')
        .select('*')
        .eq('status', 'pending');

      if (orphansError) throw orphansError;

      const items = (orphans || []).map(item => ({
        ...item,
        type: 'orphan'
      }));

      setPendingItems(items);
    } catch (error) {
      console.error('Error fetching pending items:', error);
      toast({
        title: "Error",
        description: "Failed to fetch pending items. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproval = async (id: string, type: string, action: 'approve' | 'reject') => {
    try {
      const status = action === 'approve' ? 'approved' : 'rejected';
      
      const { error } = await supabase
        .from(type === 'orphan' ? 'orphans' : 'boreholes')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setPendingItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Success",
        description: `Item ${action}d successfully.`,
      });
    } catch (error) {
      console.error(`Error ${action}ing item:`, error);
      toast({
        title: "Error",
        description: `Failed to ${action} item. Please try again.`,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading pending items...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pending Approval</h2>
        <p className="text-muted-foreground">
          Review and approve or reject submitted content.
        </p>
      </div>

      {pendingItems.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-muted-foreground">No items pending approval.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingItems.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {item.name || item.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.location} • {item.type}
                    </p>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4 line-clamp-2">{item.description}</p>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleApproval(item.id, item.type, 'approve')}
                    className="text-hope hover:text-hope"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleApproval(item.id, item.type, 'reject')}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Reject
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