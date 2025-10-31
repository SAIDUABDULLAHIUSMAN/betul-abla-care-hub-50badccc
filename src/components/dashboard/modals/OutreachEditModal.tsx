import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface OutreachActivity {
  id: string;
  title: string;
  activity_type: string;
  location: string;
  date: string;
  beneficiaries_count?: number;
  description?: string;
  photo_url?: string;
}

interface OutreachEditModalProps {
  activity: OutreachActivity;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const OutreachEditModal = ({ activity, open, onOpenChange, onSuccess }: OutreachEditModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const { register, handleSubmit, reset } = useForm({
    defaultValues: activity
  });

  useEffect(() => {
    reset(activity);
  }, [activity, reset]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      let photoUrl = activity.photo_url;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${activity.id}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('outreach')
          .upload(fileName, imageFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('outreach')
          .getPublicUrl(fileName);
        
        photoUrl = publicUrl;
      }

      const { error } = await supabase
        .from('outreach_activities')
        .update({
          title: data.title,
          activity_type: data.activity_type,
          location: data.location,
          date: data.date,
          beneficiaries_count: data.beneficiaries_count ? parseInt(data.beneficiaries_count) : null,
          description: data.description,
          photo_url: photoUrl,
        })
        .eq('id', activity.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Outreach activity updated successfully",
      });
      
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Outreach Activity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Activity Title *</Label>
            <Input {...register("title", { required: true })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="activity_type">Activity Type *</Label>
              <Input {...register("activity_type", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input type="date" {...register("date", { required: true })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input {...register("location", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="beneficiaries_count">Beneficiaries Count</Label>
              <Input type="number" {...register("beneficiaries_count")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea {...register("description")} rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Update Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Activity"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
