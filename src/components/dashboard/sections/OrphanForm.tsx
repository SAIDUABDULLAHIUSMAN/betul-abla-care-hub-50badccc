import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface OrphanFormData {
  full_name: string;
  age: number;
  location: string;
  school_name: string;
  grade_level: string;
  school_fees_covered: boolean;
  notes: string;
}

export const OrphanForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<OrphanFormData>({
    defaultValues: {
      school_fees_covered: false
    }
  });
  const { toast } = useToast();

  const onSubmit = async (data: OrphanFormData) => {
    setIsLoading(true);
    try {
      let imageUrl = null;

      // Upload image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('orphan-photos')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('orphan-photos')
          .getPublicUrl(fileName);
        
        imageUrl = publicUrl;
      }

      // Create orphan record
      const { error } = await supabase
        .from('orphans')
        .insert({
          full_name: data.full_name,
          age: data.age || null,
          location: data.location,
          school_name: data.school_name,
          grade_level: data.grade_level,
          school_fees_covered: data.school_fees_covered,
          notes: data.notes,
          photo_url: imageUrl,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Orphan profile created successfully.",
      });

      reset();
      setImageFile(null);
    } catch (error) {
      console.error('Error creating orphan:', error);
      toast({
        title: "Error",
        description: "Failed to create orphan profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add New Orphan</h2>
        <p className="text-muted-foreground">
          Create a new orphan profile and sponsorship information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orphan Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  {...register("full_name", { required: "Full name is required" })}
                  placeholder="e.g., John Doe"
                />
                {errors.full_name && (
                  <p className="text-sm text-destructive">{errors.full_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  {...register("age")}
                  placeholder="e.g., 12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="e.g., Lagos, Nigeria"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="school_name">School Name</Label>
                <Input
                  id="school_name"
                  {...register("school_name")}
                  placeholder="e.g., Community Primary School"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade_level">Grade Level</Label>
                <Input
                  id="grade_level"
                  {...register("grade_level")}
                  placeholder="e.g., Grade 5"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="school_fees_covered"
                checked={watch("school_fees_covered")}
                onCheckedChange={(checked) => setValue("school_fees_covered", checked === true)}
              />
              <Label htmlFor="school_fees_covered" className="cursor-pointer">
                School fees covered
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Additional information about the orphan..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                {imageFile && (
                  <span className="text-sm text-muted-foreground">{imageFile.name}</span>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Orphan Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
