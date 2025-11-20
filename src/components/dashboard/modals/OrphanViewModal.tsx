import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface Orphan {
  id: string;
  full_name: string;
  age: number | null;
  location: string | null;
  school_name: string | null;
  grade_level: string | null;
  school_fees_covered: boolean | null;
  notes: string | null;
  photo_url: string | null;
  status: string | null;
}

interface OrphanViewModalProps {
  orphan: Orphan | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: () => void;
  onReject: () => void;
}

export const OrphanViewModal = ({
  orphan,
  isOpen,
  onOpenChange,
  onApprove,
  onReject,
}: OrphanViewModalProps) => {
  if (!orphan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Review Orphan Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {orphan.photo_url && (
            <div className="flex justify-center">
              <img
                src={orphan.photo_url}
                alt={orphan.full_name}
                className="w-48 h-48 object-cover rounded-lg border-2 border-border"
              />
            </div>
          )}

          <div className="grid gap-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-sm font-medium text-muted-foreground">Status</span>
              <Badge variant="secondary" className="capitalize">
                {orphan.status || 'Pending'}
              </Badge>
            </div>

            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-sm font-medium text-muted-foreground">Full Name</span>
              <span className="text-sm font-semibold">{orphan.full_name}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-sm font-medium text-muted-foreground">Age</span>
              <span className="text-sm">{orphan.age || 'N/A'}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-sm font-medium text-muted-foreground">Location</span>
              <span className="text-sm">{orphan.location || 'N/A'}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-sm font-medium text-muted-foreground">School Name</span>
              <span className="text-sm">{orphan.school_name || 'N/A'}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-sm font-medium text-muted-foreground">Grade Level</span>
              <span className="text-sm">{orphan.grade_level || 'N/A'}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-sm font-medium text-muted-foreground">School Fees Covered</span>
              <Badge variant={orphan.school_fees_covered ? "default" : "secondary"}>
                {orphan.school_fees_covered ? 'Yes' : 'No'}
              </Badge>
            </div>

            {orphan.notes && (
              <div className="space-y-2 pb-2 border-b">
                <span className="text-sm font-medium text-muted-foreground">Notes</span>
                <p className="text-sm text-foreground/80 leading-relaxed">{orphan.notes}</p>
              </div>
            )}
          </div>

          {orphan.status === 'pending' && (
            <div className="flex gap-3 pt-4">
              <Button
                onClick={onReject}
                variant="outline"
                className="flex-1 text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button
                onClick={onApprove}
                className="flex-1"
              >
                <Check className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
