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

interface BoreholeFormData {
  name: string;
  location: string;
  status: 'planning' | 'in_progress' | 'completed';
  description: string;
  cost: number;
  beneficiaries: number;
}

export const BoreholeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<BoreholeFormData>();
  const { toast } = useToast();

  const onSubmit = async (data: BoreholeFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('boreholes')
        .insert({
          ...data,
          status: 'planning'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Borehole project created successfully.",
      });

      reset();
    } catch (error) {
      console.error('Error creating borehole:', error);
      toast({
        title: "Error",
        description: "Failed to create borehole project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add New Borehole</h2>
        <p className="text-muted-foreground">
          Create a new water borehole project for the community.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Borehole Project Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Project name is required" })}
                  placeholder="e.g., Village Water Project"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  {...register("location", { required: "Location is required" })}
                  placeholder="e.g., Kumasi, Ghana"
                />
                {errors.location && (
                  <p className="text-sm text-destructive">{errors.location.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cost">Estimated Cost ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  {...register("cost", { 
                    required: "Cost is required",
                    min: { value: 1, message: "Cost must be greater than 0" }
                  })}
                  placeholder="Enter cost"
                />
                {errors.cost && (
                  <p className="text-sm text-destructive">{errors.cost.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficiaries">Expected Beneficiaries</Label>
                <Input
                  id="beneficiaries"
                  type="number"
                  {...register("beneficiaries")}
                  placeholder="Number of people who will benefit"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                placeholder="Describe the borehole project, its purpose, and impact"
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Creating..." : "Create Borehole Project"}
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