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
      name: "Aminu Usman",
      role: "Nigeria Coordinator",
      location: "Kano, Nigeria",
      description: "Overseeing food distribution programs and educational support for orphans across Nigeria."
    },
    {
      name: "Ahmad Mahmud",
      role: "Ghana Coordinator", 
      location: "Accra, Ghana",
      description: "Managing borehole projects and community outreach programs throughout Ghana."
    },
    {
      name: "Aminatu sani",
      role: "Ivory Coast Coordinator",
      location: "Abidjan, Ivory Coast",
      description: "Coordinating animal slaughter programs and food distribution in Ivory Coast communities."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/70"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6">
            About Betul Abla Foundation
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-95 max-w-3xl mx-auto mb-6 md:mb-8">
            Serving humanity with compassion across Europe and West Africa
          </p>
          <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto">
            Founded in Belgium by Fatima Betul Korkmaz, we bring hope and support to vulnerable communities through dedicated humanitarian action.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">Our Story</h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Betul Abla Foundation is an NGO based in Belgium whci was born from a deep commitment to humanitarian service. With heart in Belgium with 
          coordinators across Nigeria, Ghana, and Ivory Coast, we bridge continents to deliver compassionate aid 
          where it's needed most. Our work focuses on feeding the needy, supporting orphans through education, 
          providing clean water access via boreholes, and strengthening communities across West Africa.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <Card className="text-center">
            <CardHeader>
              <Target className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-3 md:mb-4" />
              <CardTitle className="text-lg md:text-xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base text-muted-foreground">
                To provide essential support to vulnerable communities, focusing on orphan care, 
                education, and sustainable development across West Africa.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Award className="w-10 h-10 md:w-12 md:h-12 text-accent mx-auto mb-3 md:mb-4" />
              <CardTitle className="text-lg md:text-xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base text-muted-foreground">
                A world where every child has access to education, clean water, nutritious food, 
                and the opportunity to thrive in healthy communities.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Heart className="w-10 h-10 md:w-12 md:h-12 text-compassion mx-auto mb-3 md:mb-4" />
              <CardTitle className="text-lg md:text-xl">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base text-muted-foreground">
                Compassion, integrity, and accountability guide every project we undertake, 
                ensuring dignity and respect for all those we serve.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Focus Areas */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Our Focus Areas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Heart, title: "Orphan Support", desc: "Comprehensive care and education for vulnerable children" },
              { icon: Droplets, title: "Clean Water", desc: "Sustainable borehole projects for rural communities" },
              { icon: GraduationCap, title: "Education", desc: "Scholarships and educational resources for children" },
              { icon: Utensils, title: "Food Security", desc: "Regular feeding programs and food distribution" }
            ].map((area, index) => {
              const Icon = area.icon;
              return (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <Icon className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-3 md:mb-4" />
                    <h3 className="font-semibold text-base md:text-lg mb-2">{area.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{area.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {coordinators.map((coordinator, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardHeader>
                  <Users className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-3 md:mb-4" />
                  <CardTitle className="text-lg md:text-xl mb-1">{coordinator.name}</CardTitle>
                  <Badge variant="secondary" className="mx-auto mb-2 text-xs">{coordinator.role}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-3 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{coordinator.location}</span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">{coordinator.description}</p>
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