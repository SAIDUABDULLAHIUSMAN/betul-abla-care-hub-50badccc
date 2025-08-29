import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Users, 
  Droplets,
  MapPin,
  Calendar,
  Target,
  Wrench
} from "lucide-react";

const Projects = () => {
  const projectCategories = [
    {
      id: "orphans",
      title: "Orphan Support Programs",
      icon: Heart,
      description: "Comprehensive care and support for orphaned children across West Africa",
      color: "compassion",
      stats: "500+ children supported",
      projects: [
        {
          name: "Daily Meal Program",
          location: "Lagos, Nigeria",
          status: "Active",
          beneficiaries: 200
        },
        {
          name: "Educational Sponsorship",
          location: "Accra, Ghana", 
          status: "Active",
          beneficiaries: 150
        },
        {
          name: "Healthcare Support",
          location: "Multiple Locations",
          status: "Ongoing",
          beneficiaries: 100
        }
      ]
    },
    {
      id: "boreholes",
      title: "Clean Water Access",
      icon: Droplets,
      description: "Building sustainable water infrastructure for rural communities",
      color: "primary",
      stats: "50+ boreholes completed",
      projects: [
        {
          name: "Rural Community Water Wells",
          location: "Northern Ghana",
          status: "In Progress",
          beneficiaries: 2000
        },
        {
          name: "School Water Systems",
          location: "Ivory Coast",
          status: "Planning",
          beneficiaries: 800
        },
        {
          name: "Health Center Water Supply",
          location: "Nigeria",
          status: "Completed",
          beneficiaries: 1500
        }
      ]
    },
    {
      id: "outreach",
      title: "Community Outreach",
      icon: Users,
      description: "Strengthening communities through various development initiatives",
      color: "hope",
      stats: "10,000+ lives impacted",
      projects: [
        {
          name: "Mobile Health Clinics",
          location: "Cross-Border",
          status: "Active",
          beneficiaries: 5000
        },
        {
          name: "Skill Development Workshops",
          location: "Urban Centers",
          status: "Quarterly",
          beneficiaries: 300
        },
        {
          name: "Emergency Relief Distribution",
          location: "Multiple Locations",
          status: "As Needed",
          beneficiaries: 1000
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": 
      case "Completed": return "bg-compassion text-compassion-foreground";
      case "In Progress": 
      case "Ongoing": return "bg-primary text-primary-foreground";
      case "Planning": 
      case "Quarterly": 
      case "As Needed": return "bg-hope text-hope-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "compassion": return "border-l-compassion text-compassion";
      case "primary": return "border-l-primary text-primary";
      case "hope": return "border-l-hope text-hope";
      default: return "border-l-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-hope/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive humanitarian programs designed to create lasting positive 
            change in communities across West Africa. Each project is carefully planned and 
            executed with local partners to ensure maximum impact.
          </p>
        </div>
      </section>

      {/* Project Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {projectCategories.map((category) => {
            const IconComponent = category.icon;
            const colorClasses = getColorClasses(category.color);
            
            return (
              <div key={category.id} className="space-y-6">
                {/* Category Header */}
                <div className={`border-l-4 ${colorClasses} pl-6`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-${category.color}/10 rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${colorClasses}`} />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        {category.title}
                      </h2>
                      <Badge variant="secondary" className="mt-2">
                        {category.stats}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    {category.description}
                  </p>
                </div>

                {/* Project Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.projects.map((project, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-2" />
                            {project.location}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Users className="w-4 h-4 mr-2" />
                            {project.beneficiaries.toLocaleString()} beneficiaries
                          </div>
                        </div>
                        
                        <Button variant="outline" className="w-full">
                          View Project Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How We Execute Projects
            </h2>
            <p className="text-xl text-muted-foreground">
              Our systematic approach ensures every project creates lasting impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Assessment",
                description: "Community needs assessment and stakeholder consultation"
              },
              {
                icon: Wrench,
                title: "Planning",
                description: "Detailed project planning with local partners and timelines"
              },
              {
                icon: Users,
                title: "Implementation",
                description: "Execution with continuous monitoring and community involvement"
              },
              {
                icon: Calendar,
                title: "Evaluation",
                description: "Impact assessment and sustainability planning for long-term success"
              }
            ].map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-compassion to-hope">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-compassion-foreground mb-6">
            Support Our Mission
          </h2>
          <p className="text-xl text-compassion-foreground/90 mb-8">
            Every project we undertake brings hope and positive change to communities in need. 
            Join us in making a lasting difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              View All Activities
            </Button>
            <Button variant="outline" size="lg" className="border-compassion-foreground text-compassion-foreground hover:bg-compassion-foreground hover:text-compassion">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;