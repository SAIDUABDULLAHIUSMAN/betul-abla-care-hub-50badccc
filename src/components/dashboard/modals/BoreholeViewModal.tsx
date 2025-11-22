import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface Borehole {
  id: string;
  community_name: string;
  location: string;
  depth_meters: number | null;
  beneficiaries_count: number | null;
  completion_date: string | null;
  notes: string | null;
  photo_url: string | null;
  status: string | null;
}

interface BoreholeViewModalProps {
  borehole: Borehole | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: () => void;
  onReject: () => void;
}

export const BoreholeViewModal = ({
  borehole,
  isOpen,
  onOpenChange,
  onApprove,
  onReject,
}: BoreholeViewModalProps) => {
  if (!borehole) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Borehole Project Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {borehole.photo_url && (
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <img 
                src={borehole.photo_url} 
                alt={borehole.community_name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <Badge variant="secondary">{borehole.status}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Community Name</p>
              <p className="font-semibold">{borehole.community_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-semibold">{borehole.location}</p>
            </div>
            {borehole.depth_meters && (
              <div>
                <p className="text-sm text-muted-foreground">Depth</p>
                <p className="font-semibold">{borehole.depth_meters} meters</p>
              </div>
            )}
            {borehole.beneficiaries_count && (
              <div>
                <p className="text-sm text-muted-foreground">Beneficiaries</p>
                <p className="font-semibold">{borehole.beneficiaries_count} people</p>
              </div>
            )}
            {borehole.completion_date && (
              <div>
                <p className="text-sm text-muted-foreground">Completion Date</p>
                <p className="font-semibold">
                  {new Date(borehole.completion_date).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {borehole.notes && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Notes</p>
              <p className="text-sm">{borehole.notes}</p>
            </div>
          )}

          {borehole.status === 'pending' && (
            <div className="flex gap-3 pt-4 border-t">
              <Button
                onClick={onApprove}
                className="flex-1"
                variant="default"
              >
                <Check className="h-4 w-4 mr-2" />
                Approve Project
              </Button>
              <Button
                onClick={onReject}
                variant="destructive"
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Reject Project
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
