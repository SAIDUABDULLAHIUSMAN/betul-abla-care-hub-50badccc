import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Utensils, 
  GraduationCap, 
  Droplets, 
  Users,
  ArrowRight,
  Globe,
  Award,
  Target
} from "lucide-react";
import heroImage from "@/assets/hero-humanitarian.jpg";

const Index = () => {
  const features = [
    {
      icon: Utensils,
      title: "Feeding Programs",
      description: "Daily meals for orphans and vulnerable children across our operational areas.",
      stats: "200+ children fed daily"
    },
    {
      icon: GraduationCap,
      title: "Education Support",
      description: "School fees, uniforms, and educational materials for orphaned children.",
      stats: "150+ students supported"
    },
    {
      icon: Droplets,
      title: "Clean Water Access",
      description: "Building boreholes to provide safe drinking water to rural communities.",
      stats: "50+ boreholes built"
    },
    {
      icon: Heart,
      title: "Healthcare Support",
      description: "Medical assistance and healthcare support for vulnerable community members.",
      stats: "100+ patients helped"
    }
  ];

  const impactStats = [
    { number: "3", label: "Countries", color: "primary" },
    { number: "500+", label: "Orphans Supported", color: "accent" },
    { number: "10K+", label: "Lives Impacted", color: "compassion" },
    { number: "5", label: "Years of Service", color: "hope" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Humanitarian work in West Africa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              Humanitarian NGO • Founded in Belgium
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Bringing Hope to 
              <span className="block text-accent-foreground">West Africa</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Betul Abla Foundation is dedicated to supporting orphans, providing clean water, 
              and strengthening communities across Nigeria, Ghana, and Ivory Coast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/activities">
                  Explore Our Work
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/contact">Get Involved</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To provide essential humanitarian support to vulnerable communities across West Africa, 
              focusing on orphan care, education, clean water access, and sustainable community development. 
              We believe every child deserves a chance to build a brighter future.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How We Make a Difference
            </h2>
            <p className="text-xl text-muted-foreground">
              Our focused approach creates lasting impact in the communities we serve
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <Badge variant="secondary" className="font-semibold">
                      {feature.stats}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Our Impact by Numbers
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Real results in humanitarian aid across West Africa
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-primary-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-primary-foreground/90 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Globe className="w-12 h-12 text-compassion mx-auto mb-4" />
                <CardTitle className="text-xl">Global Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Operating across multiple countries with local coordinators who understand 
                  community needs and cultural contexts.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Focused Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Concentrating our efforts on high-impact areas: orphan care, education, 
                  water access, and food security.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="w-12 h-12 text-hope mx-auto mb-4" />
                <CardTitle className="text-xl">Sustainable Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Building long-term solutions that empower communities and create 
                  lasting positive change for future generations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-compassion/10 to-hope/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Whether you want to learn more about our work, volunteer, or simply stay updated 
            on our humanitarian efforts, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/about">Learn About Us</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
