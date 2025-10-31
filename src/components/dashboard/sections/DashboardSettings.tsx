import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const DashboardSettings = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) {
        setEmailNotifications(data.email_notifications ?? true);
        setPushNotifications(data.push_notifications ?? true);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = async (field: string, value: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          [field]: value
        }, {
          onConflict: 'user_id'
        });

      toast({
        title: "Settings updated",
        description: "Your preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      });
    }
  };

  const handleEmailNotificationsToggle = async () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);
    await updatePreference('email_notifications', newValue);
  };

  const handlePushNotificationsToggle = async () => {
    const newValue = !pushNotifications;
    setPushNotifications(newValue);
    await updatePreference('push_notifications', newValue);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    toast({
      title: "Theme updated",
      description: `Switched to ${theme === "light" ? "dark" : "light"} mode`,
    });
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email updates about activities</p>
              </div>
              <Switch 
                checked={emailNotifications}
                onCheckedChange={handleEmailNotificationsToggle}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive push notifications for urgent updates</p>
              </div>
              <Switch 
                checked={pushNotifications}
                onCheckedChange={handlePushNotificationsToggle}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">Choose light or dark mode</p>
              </div>
              <Button variant="outline" size="sm" onClick={toggleTheme}>
                {theme === "light" ? "Light" : "Dark"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};