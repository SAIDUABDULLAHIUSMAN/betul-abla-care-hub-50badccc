import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BoreholeFormData {
  community_name: string;
  location: string;
  depth_meters: number;
  completion_date: string;
  beneficiaries_count: number;
  notes: string;
}

export const BoreholeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BoreholeFormData>();
  const { toast } = useToast();

  const onSubmit = async (data: BoreholeFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('boreholes')
        .insert({
          community_name: data.community_name,
          location: data.location,
          depth_meters: data.depth_meters || null,
          completion_date: data.completion_date || null,
          beneficiaries_count: data.beneficiaries_count || null,
          notes: data.notes,
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
                <Label htmlFor="community_name">Community Name</Label>
                <Input
                  id="community_name"
                  {...register("community_name", { required: "Community name is required" })}
                  placeholder="e.g., Alimosho Community"
                />
                {errors.community_name && (
                  <p className="text-sm text-destructive">{errors.community_name.message}</p>
                )}
              </div>

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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="depth_meters">Depth (meters)</Label>
                <Input
                  id="depth_meters"
                  type="number"
                  step="0.1"
                  {...register("depth_meters")}
                  placeholder="e.g., 50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="completion_date">Completion Date</Label>
                <Input
                  id="completion_date"
                  type="date"
                  {...register("completion_date")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="beneficiaries_count">Number of Beneficiaries</Label>
              <Input
                id="beneficiaries_count"
                type="number"
                {...register("beneficiaries_count")}
                placeholder="e.g., 500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Additional information about the borehole project..."
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Borehole Project"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
