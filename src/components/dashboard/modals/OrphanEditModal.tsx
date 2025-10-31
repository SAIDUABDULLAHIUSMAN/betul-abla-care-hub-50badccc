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
import { Checkbox } from "@/components/ui/checkbox";

interface Orphan {
  id: string;
  full_name: string;
  age?: number;
  location?: string;
  school_name?: string;
  grade_level?: string;
  school_fees_covered?: boolean;
  notes?: string;
  photo_url?: string;
}

interface OrphanEditModalProps {
  orphan: Orphan;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const OrphanEditModal = ({ orphan, open, onOpenChange, onSuccess }: OrphanEditModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: orphan
  });

  useEffect(() => {
    reset(orphan);
  }, [orphan, reset]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      let photoUrl = orphan.photo_url;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${orphan.id}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('orphans')
          .upload(fileName, imageFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('orphans')
          .getPublicUrl(fileName);
        
        photoUrl = publicUrl;
      }

      const { error } = await supabase
        .from('orphans')
        .update({
          full_name: data.full_name,
          age: data.age ? parseInt(data.age) : null,
          location: data.location,
          school_name: data.school_name,
          grade_level: data.grade_level,
          school_fees_covered: data.school_fees_covered,
          notes: data.notes,
          photo_url: photoUrl,
        })
        .eq('id', orphan.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Orphan profile updated successfully",
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
          <DialogTitle>Edit Orphan Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input {...register("full_name", { required: true })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input type="number" {...register("age")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input {...register("location")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school_name">School Name</Label>
              <Input {...register("school_name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade_level">Grade Level</Label>
              <Input {...register("grade_level")} />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="school_fees_covered"
              checked={watch("school_fees_covered")}
              onCheckedChange={(checked) => setValue("school_fees_covered", checked as boolean)}
            />
            <Label htmlFor="school_fees_covered">School Fees Covered</Label>
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
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
