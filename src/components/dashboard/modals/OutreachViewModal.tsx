import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface OutreachActivity {
  id: string;
  title: string;
  activity_type: string;
  location: string;
  date: string;
  beneficiaries_count: number | null;
  description: string | null;
  photo_url: string | null;
  status: string | null;
}

interface OutreachViewModalProps {
  activity: OutreachActivity | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: () => void;
  onReject: () => void;
}

export const OutreachViewModal = ({
  activity,
  isOpen,
  onOpenChange,
  onApprove,
  onReject,
}: OutreachViewModalProps) => {
  if (!activity) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Outreach Activity Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {activity.photo_url && (
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <img 
                src={activity.photo_url} 
                alt={activity.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <Badge variant="secondary">{activity.status}</Badge>
            <Badge>{activity.activity_type}</Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Title</p>
            <p className="text-xl font-semibold">{activity.title}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-semibold">{activity.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-semibold">
                {new Date(activity.date).toLocaleDateString()}
              </p>
            </div>
            {activity.beneficiaries_count && (
              <div>
                <p className="text-sm text-muted-foreground">Beneficiaries</p>
                <p className="font-semibold">{activity.beneficiaries_count} people</p>
              </div>
            )}
          </div>

          {activity.description && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Description</p>
              <p className="text-sm">{activity.description}</p>
            </div>
          )}

          {activity.status === 'pending' && (
            <div className="flex gap-3 pt-4 border-t">
              <Button
                onClick={onApprove}
                className="flex-1"
                variant="default"
              >
                <Check className="h-4 w-4 mr-2" />
                Approve Activity
              </Button>
              <Button
                onClick={onReject}
                variant="destructive"
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Reject Activity
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
