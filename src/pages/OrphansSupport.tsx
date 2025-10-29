import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, MapPin, GraduationCap, Heart } from "lucide-react";

interface Orphan {
  id: string;
  full_name: string;
  age: number | null;
  location: string | null;
  school_name: string | null;
  grade_level: string | null;
  school_fees_covered: boolean | null;
  photo_url: string | null;
  status: string | null;
  notes: string | null;
}

const OrphansSupport = () => {
  const [orphans, setOrphans] = useState<Orphan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrphans();
  }, []);

  const fetchOrphans = async () => {
    const { data, error } = await supabase
      .from("orphans")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrphans(data);
    }
    setLoading(false);
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Orphans Support Program - Transforming Lives Through Education</title>
      <meta
        name="description"
        content="Supporting orphaned children with education, school fees, and care. Join us in giving hope and building futures for vulnerable children in our community."
      />

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-hope to-compassion overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Heart className="w-16 h-16 mx-auto mb-6 text-hope-foreground" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-hope-foreground">
            Orphans Support Program
          </h1>
          <p className="text-xl text-hope-foreground/90 max-w-2xl mx-auto">
            Providing education, care, and hope to vulnerable children. Together, we're building brighter futures one child at a time.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center border-hope/20">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-hope mb-2">{orphans.length}</div>
                <div className="text-muted-foreground">Children Supported</div>
              </CardContent>
            </Card>
            <Card className="text-center border-compassion/20">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-compassion mb-2">
                  {orphans.filter(o => o.school_fees_covered).length}
                </div>
                <div className="text-muted-foreground">School Fees Covered</div>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  {new Set(orphans.map(o => o.school_name)).size}
                </div>
                <div className="text-muted-foreground">Partner Schools</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Children Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Children</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the incredible young minds we support. Each child has a unique story and dreams for the future.
            </p>
          </header>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading children profiles...</div>
          ) : orphans.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No children profiles available yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orphans.map((orphan) => (
                <Card key={orphan.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gradient-to-br from-hope/10 to-compassion/10 relative">
                    {orphan.photo_url ? (
                      <img
                        src={orphan.photo_url}
                        alt={orphan.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Heart className="w-20 h-20 text-hope/30" />
                      </div>
                    )}
                    {orphan.school_fees_covered && (
                      <Badge className="absolute top-4 right-4 bg-compassion text-compassion-foreground">
                        <GraduationCap className="w-3 h-3 mr-1" />
                        Sponsored
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{orphan.full_name}</h3>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {orphan.age && (
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-hope" />
                          <span>{orphan.age} years old</span>
                        </div>
                      )}
                      {orphan.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{orphan.location}</span>
                        </div>
                      )}
                      {orphan.school_name && (
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-compassion" />
                          <span>{orphan.school_name}</span>
                        </div>
                      )}
                      {orphan.grade_level && (
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-accent" />
                          <span>Grade {orphan.grade_level}</span>
                        </div>
                      )}
                    </div>

                    {orphan.notes && (
                      <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                        {orphan.notes}
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
          <h2 className="text-3xl font-bold mb-6 text-foreground">Making a Difference</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Through education and care, we're empowering children to break the cycle of poverty and build meaningful futures. Every child deserves the opportunity to learn, grow, and thrive.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <Card>
              <CardContent className="pt-6">
                <BookOpen className="w-10 h-10 text-hope mb-4" />
                <h3 className="font-semibold mb-2">Education Access</h3>
                <p className="text-sm text-muted-foreground">
                  Providing school fees, uniforms, and learning materials for quality education
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Heart className="w-10 h-10 text-compassion mb-4" />
                <h3 className="font-semibold mb-2">Holistic Care</h3>
                <p className="text-sm text-muted-foreground">
                  Supporting emotional, physical, and social development through mentorship
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <GraduationCap className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Future Building</h3>
                <p className="text-sm text-muted-foreground">
                  Empowering children with skills and opportunities for a brighter tomorrow
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrphansSupport;
