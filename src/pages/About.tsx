import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Target, Award, Heart, Droplets, GraduationCap, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import aboutHero from "@/assets/about-hero.jpg";

const About = () => {
  const coordinators = [
    {
      name: "Fatima Betul Korkmaz",
      role: "Founder & Director",
      location: "Belgium",
      description: "Leading humanitarian efforts across West Africa with dedicated focus on orphan care and community development."
    },
    {
      name: "Ibrahim Adebayo",
      role: "Nigeria Coordinator",
      location: "Lagos, Nigeria",
      description: "Overseeing food distribution programs and educational support for orphans across Nigeria."
    },
    {
      name: "Kwame Asante",
      role: "Ghana Coordinator", 
      location: "Accra, Ghana",
      description: "Managing borehole projects and community outreach programs throughout Ghana."
    },
    {
      name: "Aminata Diallo",
      role: "Ivory Coast Coordinator",
      location: "Abidjan, Ivory Coast",
      description: "Coordinating animal slaughter programs and food distribution in Ivory Coast communities."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/70"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Betul Abla Foundation
          </h1>
          <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto mb-8">
            Serving humanity with compassion across Europe and West Africa
          </p>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Founded in Belgium by Fatima Betul Korkmaz, we bring hope and support to vulnerable communities through dedicated humanitarian action.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Betul Abla Foundation was born from a deep commitment to humanitarian service. Founded in Belgium with 
          coordinators across Nigeria, Ghana, and Ivory Coast, we bridge continents to deliver compassionate aid 
          where it's needed most. Our work focuses on feeding the needy, supporting orphans through education, 
          providing clean water access via boreholes, and strengthening communities across West Africa.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide essential support to vulnerable communities, focusing on orphan care, 
                education, and sustainable development across West Africa.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <CardTitle className="text-xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A world where every child has access to basic necessities, education, 
                and the opportunity to build a brighter future for themselves and their communities.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 text-compassion mx-auto mb-4" />
              <CardTitle className="text-xl">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Compassion, integrity, sustainability, and cultural respect guide every 
                decision we make and every project we undertake.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground">
              Dedicated leaders working across multiple countries to make a lasting impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coordinators.map((coordinator, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{coordinator.name}</CardTitle>
                      <Badge variant="secondary" className="mb-2">
                        {coordinator.role}
                      </Badge>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{coordinator.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{coordinator.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl opacity-90">Making a difference across West Africa</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Utensils className="w-8 h-8 mb-2 opacity-90" />
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Meals Distributed</div>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-8 h-8 mb-2 opacity-90" />
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Orphans Supported</div>
            </div>
            <div className="flex flex-col items-center">
              <Droplets className="w-8 h-8 mb-2 opacity-90" />
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-90">Boreholes Built</div>
            </div>
            <div className="flex flex-col items-center">
              <GraduationCap className="w-8 h-8 mb-2 opacity-90" />
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-lg opacity-90">School Fees Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Learn More About Our Work
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Discover our humanitarian projects, browse our gallery, and see how we're making a difference across West Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/activities">View Our Activities</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/gallery">Browse Gallery</Link>
            </Button>
            <Button asChild variant="compassion" size="lg">
              <Link to="/projects">Our Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;