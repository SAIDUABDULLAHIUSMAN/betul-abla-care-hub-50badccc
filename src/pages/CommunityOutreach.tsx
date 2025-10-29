import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Sparkles } from "lucide-react";
import { format } from "date-fns";

interface OutreachActivity {
  id: string;
  title: string;
  activity_type: string;
  date: string;
  location: string;
  beneficiaries_count: number | null;
  description: string | null;
  photo_url: string | null;
  status: string | null;
}

const CommunityOutreach = () => {
  const [activities, setActivities] = useState<OutreachActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const { data, error } = await supabase
      .from("outreach_activities")
      .select("*")
      .order("date", { ascending: false });

    if (!error && data) {
      setActivities(data);
    }
    setLoading(false);
  };

  const totalBeneficiaries = activities.reduce((sum, a) => sum + (a.beneficiaries_count || 0), 0);
  const activityTypes = new Set(activities.map(a => a.activity_type)).size;

  const getActivityColor = (type: string) => {
    const colors: Record<string, string> = {
      'feeding': 'bg-hope text-hope-foreground',
      'medical': 'bg-compassion text-compassion-foreground',
      'education': 'bg-primary text-primary-foreground',
      'construction': 'bg-accent text-accent-foreground',
      'default': 'bg-secondary text-secondary-foreground'
    };
    return colors[type.toLowerCase()] || colors.default;
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Community Outreach - Building, Serving & Transforming Lives</title>
      <meta
        name="description"
        content="Community outreach programs including feeding initiatives, medical camps, education support, and construction projects. Making a tangible difference in communities."
      />

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-accent to-hope overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-accent-foreground" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-accent-foreground">
            Community Outreach
          </h1>
          <p className="text-xl text-accent-foreground/90 max-w-2xl mx-auto">
            Building communities through service. From feeding programs to construction projects, we're making tangible differences in people's lives.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center border-accent/20">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-accent mb-2">{activities.length}</div>
                <div className="text-muted-foreground">Total Events</div>
              </CardContent>
            </Card>
            <Card className="text-center border-hope/20">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-hope mb-2">
                  {totalBeneficiaries.toLocaleString()}
                </div>
                <div className="text-muted-foreground">Lives Touched</div>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">{activityTypes}</div>
                <div className="text-muted-foreground">Activity Types</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Outreach Activities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From feeding programs to building projects, each event is an opportunity to serve and transform our community.
            </p>
          </header>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading activities...</div>
          ) : activities.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No outreach activities available yet.</div>
          ) : (
            <div className="space-y-6">
              {activities.map((activity) => (
                <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Image Section */}
                    <div className="aspect-video md:aspect-square bg-gradient-to-br from-accent/10 to-hope/10 relative">
                      {activity.photo_url ? (
                        <img
                          src={activity.photo_url}
                          alt={activity.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Sparkles className="w-16 h-16 text-accent/30" />
                        </div>
                      )}
                      <Badge className={`absolute top-4 left-4 ${getActivityColor(activity.activity_type)}`}>
                        {activity.activity_type}
                      </Badge>
                      {activity.status && (
                        <Badge 
                          className="absolute top-4 right-4"
                          variant={activity.status === 'completed' ? 'default' : 'secondary'}
                        >
                          {activity.status}
                        </Badge>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="md:col-span-2 p-6">
                      <h3 className="text-2xl font-semibold mb-4 text-foreground">
                        {activity.title}
                      </h3>
                      
                      <div className="grid sm:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {format(new Date(activity.date), "MMM dd, yyyy")}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-compassion flex-shrink-0" />
                          <span className="text-muted-foreground truncate">
                            {activity.location}
                          </span>
                        </div>
                        
                        {activity.beneficiaries_count && (
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-hope flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {activity.beneficiaries_count} people
                            </span>
                          </div>
                        )}
                      </div>

                      {activity.description && (
                        <p className="text-muted-foreground leading-relaxed">
                          {activity.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Impact Areas Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Our Impact Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-hope/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-hope" />
                </div>
                <h3 className="font-semibold mb-2">Feeding Programs</h3>
                <p className="text-sm text-muted-foreground">
                  Providing nutritious meals to families and children in need
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-compassion/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-compassion" />
                </div>
                <h3 className="font-semibold mb-2">Medical Outreach</h3>
                <p className="text-sm text-muted-foreground">
                  Free health screenings and medical care for underserved communities
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Educational Support</h3>
                <p className="text-sm text-muted-foreground">
                  Workshops, tutoring, and resources for students and families
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Building Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Construction and renovation of community facilities and homes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommunityOutreach;
