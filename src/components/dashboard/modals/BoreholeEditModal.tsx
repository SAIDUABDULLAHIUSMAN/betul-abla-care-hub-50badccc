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

interface Borehole {
  id: string;
  community_name: string;
  location: string;
  depth_meters?: number;
  completion_date?: string;
  beneficiaries_count?: number;
  notes?: string;
  photo_url?: string;
}

interface BoreholeEditModalProps {
  borehole: Borehole;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const BoreholeEditModal = ({ borehole, open, onOpenChange, onSuccess }: BoreholeEditModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const { register, handleSubmit, reset } = useForm({
    defaultValues: borehole
  });

  useEffect(() => {
    reset(borehole);
  }, [borehole, reset]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      let photoUrl = borehole.photo_url;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${borehole.id}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('boreholes')
          .upload(fileName, imageFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('boreholes')
          .getPublicUrl(fileName);
        
        photoUrl = publicUrl;
      }

      const { error } = await supabase
        .from('boreholes')
        .update({
          community_name: data.community_name,
          location: data.location,
          depth_meters: data.depth_meters ? parseFloat(data.depth_meters) : null,
          completion_date: data.completion_date || null,
          beneficiaries_count: data.beneficiaries_count ? parseInt(data.beneficiaries_count) : null,
          notes: data.notes,
          photo_url: photoUrl,
        })
        .eq('id', borehole.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Borehole updated successfully",
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
          <DialogTitle>Edit Borehole Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="community_name">Community Name *</Label>
            <Input {...register("community_name", { required: true })} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input {...register("location", { required: true })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="depth_meters">Depth (meters)</Label>
              <Input type="number" step="0.1" {...register("depth_meters")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="beneficiaries_count">Beneficiaries Count</Label>
              <Input type="number" {...register("beneficiaries_count")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="completion_date">Completion Date</Label>
            <Input type="date" {...register("completion_date")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea {...register("notes")} rows={3} />
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
              {isLoading ? "Updating..." : "Update Borehole"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
