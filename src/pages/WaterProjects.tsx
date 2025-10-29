import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, MapPin, Users, Calendar, Ruler } from "lucide-react";
import { format } from "date-fns";

interface Borehole {
  id: string;
  community_name: string;
  location: string;
  depth_meters: number | null;
  completion_date: string | null;
  beneficiaries_count: number | null;
  photo_url: string | null;
  status: string | null;
  notes: string | null;
}

const WaterProjects = () => {
  const [boreholes, setBoreholes] = useState<Borehole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoreholes();
  }, []);

  const fetchBoreholes = async () => {
    const { data, error } = await supabase
      .from("boreholes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBoreholes(data);
    }
    setLoading(false);
  };

  const totalBeneficiaries = boreholes.reduce((sum, b) => sum + (b.beneficiaries_count || 0), 0);
  const completedProjects = boreholes.filter(b => b.status === "completed").length;

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Water Borehole Projects - Bringing Clean Water to Communities</title>
      <meta
        name="description"
        content="Providing clean, safe water access through borehole projects. Transforming communities with sustainable water solutions and improving lives."
      />

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-primary to-trust overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Droplets className="w-16 h-16 mx-auto mb-6 text-primary-foreground" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
            Water Borehole Projects
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Bringing the gift of clean, safe water to communities. Every borehole transforms lives, improves health, and builds hope.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center border-primary/20">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">{boreholes.length}</div>
                <div className="text-muted-foreground">Total Projects</div>
              </CardContent>
            </Card>
            <Card className="text-center border-compassion/20">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-compassion mb-2">{completedProjects}</div>
                <div className="text-muted-foreground">Completed Boreholes</div>
              </CardContent>
            </Card>
            <Card className="text-center border-hope/20">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-hope mb-2">
                  {totalBeneficiaries.toLocaleString()}
                </div>
                <div className="text-muted-foreground">People Served</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Water Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sustainable water solutions bringing life-changing access to clean water in communities that need it most.
            </p>
          </header>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading projects...</div>
          ) : boreholes.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No water projects available yet.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {boreholes.map((borehole) => (
                <Card key={borehole.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-trust/10 relative">
                    {borehole.photo_url ? (
                      <img
                        src={borehole.photo_url}
                        alt={`${borehole.community_name} water project`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Droplets className="w-24 h-24 text-primary/30" />
                      </div>
                    )}
                    {borehole.status && (
                      <Badge 
                        className="absolute top-4 right-4"
                        variant={borehole.status === 'completed' ? 'default' : 'secondary'}
                      >
                        {borehole.status.charAt(0).toUpperCase() + borehole.status.slice(1)}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">
                      {borehole.community_name}
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{borehole.location}</span>
                      </div>
                      
                      {borehole.beneficiaries_count && (
                        <div className="flex items-center gap-3 text-sm">
                          <Users className="w-5 h-5 text-hope flex-shrink-0" />
                          <span className="text-muted-foreground">
                            <strong className="text-foreground">{borehole.beneficiaries_count.toLocaleString()}</strong> people served
                          </span>
                        </div>
                      )}
                      
                      {borehole.depth_meters && (
                        <div className="flex items-center gap-3 text-sm">
                          <Ruler className="w-5 h-5 text-compassion flex-shrink-0" />
                          <span className="text-muted-foreground">
                            Depth: <strong className="text-foreground">{borehole.depth_meters}m</strong>
                          </span>
                        </div>
                      )}
                      
                      {borehole.completion_date && (
                        <div className="flex items-center gap-3 text-sm">
                          <Calendar className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-muted-foreground">
                            Completed: {format(new Date(borehole.completion_date), "MMMM yyyy")}
                          </span>
                        </div>
                      )}
                    </div>

                    {borehole.notes && (
                      <p className="mt-4 text-sm text-muted-foreground pt-4 border-t">
                        {borehole.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">The Impact of Clean Water</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Access to clean water is fundamental to life, health, and dignity. Our borehole projects create lasting change in communities.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <Card>
              <CardContent className="pt-6">
                <Droplets className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Health Improvement</h3>
                <p className="text-sm text-muted-foreground">
                  Reducing waterborne diseases and improving overall community health
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Users className="w-10 h-10 text-hope mb-4" />
                <h3 className="font-semibold mb-2">Time Savings</h3>
                <p className="text-sm text-muted-foreground">
                  Families save hours daily, allowing children to attend school and parents to work
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Calendar className="w-10 h-10 text-compassion mb-4" />
                <h3 className="font-semibold mb-2">Sustainable Future</h3>
                <p className="text-sm text-muted-foreground">
                  Long-term water access supporting community growth and development
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default WaterProjects;
