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

interface OutreachFormData {
  title: string;
  activity_type: string;
  location: string;
  date: string;
  beneficiaries_count: number;
  description: string;
}

export const OutreachForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<OutreachFormData>();
  const { toast } = useToast();

  const onSubmit = async (data: OutreachFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('outreach_activities')
        .insert({
          title: data.title,
          activity_type: data.activity_type,
          location: data.location,
          date: data.date,
          beneficiaries_count: data.beneficiaries_count || null,
          description: data.description,
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

            <div className="space-y-2">
              <Label htmlFor="activity_type">Activity Type</Label>
              <Select onValueChange={(value) => setValue("activity_type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food_distribution">Food Distribution</SelectItem>
                  <SelectItem value="medical_outreach">Medical Outreach</SelectItem>
                  <SelectItem value="education">Education Support</SelectItem>
                  <SelectItem value="clothing_distribution">Clothing Distribution</SelectItem>
                  <SelectItem value="community_visit">Community Visit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.activity_type && (
                <p className="text-sm text-destructive">{errors.activity_type.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  {...register("location", { required: "Location is required" })}
                  placeholder="e.g., Accra, Ghana"
                />
                {errors.location && (
                  <p className="text-sm text-destructive">{errors.location.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Event Date</Label>
                <Input
                  id="date"
                  type="date"
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && (
                  <p className="text-sm text-destructive">{errors.date.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="beneficiaries_count">Number of Beneficiaries</Label>
              <Input
                id="beneficiaries_count"
                type="number"
                {...register("beneficiaries_count")}
                placeholder="e.g., 200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Describe the outreach activity..."
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Outreach Activity"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
