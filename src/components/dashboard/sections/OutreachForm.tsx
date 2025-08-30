import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OutreachFormData {
  title: string;
  description: string;
  location: string;
  event_date: string;
  participants: number;
}

export const OutreachForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<OutreachFormData>();
  const { toast } = useToast();

  const onSubmit = async (data: OutreachFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('outreach_activities')
        .insert({
          ...data,
          status: 'planned'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Outreach activity created successfully.",
      });

      reset();
    } catch (error) {
      console.error('Error creating outreach activity:', error);
      toast({
        title: "Error",
        description: "Failed to create outreach activity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add New Outreach Activity</h2>
        <p className="text-muted-foreground">
          Plan a new community outreach event or program.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Outreach Activity Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Activity Title</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                placeholder="e.g., Food Distribution Drive"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  {...register("location", { required: "Location is required" })}
                  placeholder="e.g., Abidjan, Ivory Coast"
                />
                {errors.location && (
                  <p className="text-sm text-destructive">{errors.location.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="event_date">Event Date</Label>
                <Input
                  id="event_date"
                  type="date"
                  {...register("event_date", { required: "Event date is required" })}
                />
                {errors.event_date && (
                  <p className="text-sm text-destructive">{errors.event_date.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants">Expected Participants</Label>
              <Input
                id="participants"
                type="number"
                {...register("participants")}
                placeholder="Estimated number of participants"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Activity Description</Label>
              <Textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                placeholder="Describe the outreach activity, its goals, and expected impact"
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Creating..." : "Create Outreach Activity"}
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