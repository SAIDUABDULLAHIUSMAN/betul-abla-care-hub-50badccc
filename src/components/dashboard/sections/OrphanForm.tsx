import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface OrphanFormData {
  name: string;
  age: number;
  location: string;
  education_status: string;
  description: string;
  needs: string;
}

export const OrphanForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<OrphanFormData>();
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
          ...data,
          photo_url: imageUrl,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Orphan profile created successfully and is pending approval.",
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
          Create a new orphan profile for the foundation's care program.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orphan Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  {...register("age", { 
                    required: "Age is required",
                    min: { value: 1, message: "Age must be at least 1" },
                    max: { value: 18, message: "Age must be 18 or under" }
                  })}
                  placeholder="Enter age"
                />
                {errors.age && (
                  <p className="text-sm text-destructive">{errors.age.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  {...register("location", { required: "Location is required" })}
                  placeholder="e.g., Lagos, Nigeria"
                />
                {errors.location && (
                  <p className="text-sm text-destructive">{errors.location.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="education_status">Education Status</Label>
                <Select onValueChange={(value) => setValue("education_status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not_enrolled">Not Enrolled</SelectItem>
                    <SelectItem value="primary">Primary School</SelectItem>
                    <SelectItem value="secondary">Secondary School</SelectItem>
                    <SelectItem value="completed">Completed Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                placeholder="Brief description about the orphan's background and situation"
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="needs">Specific Needs</Label>
              <Textarea
                id="needs"
                {...register("needs")}
                placeholder="List specific needs (e.g., medical care, school supplies, etc.)"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Label
                  htmlFor="photo"
                  className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-muted"
                >
                  <Upload className="h-4 w-4" />
                  Choose Photo
                </Label>
                {imageFile && (
                  <span className="text-sm text-muted-foreground">{imageFile.name}</span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Creating..." : "Create Orphan Profile"}
              </Button>
              <Button type="button" variant="outline" onClick={() => reset()}>
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};