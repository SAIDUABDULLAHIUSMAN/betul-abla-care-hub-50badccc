import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 to-hope/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Our Projects
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Comprehensive humanitarian initiatives transforming lives across West Africa
          </p>
        </div>
      </section>

      {/* Project Categories */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 md:space-y-16">
          {projectCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className={`border-l-4 ${getColorClasses(category.color)} pl-6 md:pl-8`}>
                <div className="mb-6 md:mb-8">
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <Icon className="w-8 h-8 md:w-10 md:h-10" />
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                      {category.title}
                    </h2>
                  </div>
                  <p className="text-base md:text-lg text-muted-foreground mb-2 md:mb-3">
                    {category.description}
                  </p>
                  <Badge variant="secondary" className="text-xs md:text-sm">
                    {category.stats}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {category.projects.map((project, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3 md:pb-4">
                        <CardTitle className="text-lg md:text-xl mb-2">{project.name}</CardTitle>
                        <Badge className={`${getStatusColor(project.status)} w-fit text-xs`}>
                          {project.status}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 md:space-y-3 text-sm md:text-base">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{project.location}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Users className="w-4 h-4 md:w-5 md:h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {project.beneficiaries.toLocaleString()} beneficiaries
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full mt-4 md:mt-6 text-xs md:text-sm">
                          View Details
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

      {/* How We Execute Projects */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
              How We Execute Projects
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Our systematic approach ensures every project delivers maximum impact
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                icon: Target,
                title: "Assessment",
                description: "Identifying community needs and priorities through direct engagement",
                step: "01"
              },
              {
                icon: Calendar,
                title: "Planning", 
                description: "Developing detailed project roadmaps with clear timelines and goals",
                step: "02"
              },
              {
                icon: Wrench,
                title: "Implementation",
                description: "Executing projects with local coordinators and community involvement",
                step: "03"
              },
              {
                icon: Target,
                title: "Evaluation",
                description: "Measuring impact and gathering feedback for continuous improvement",
                step: "04"
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="text-center relative overflow-hidden">
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 text-5xl md:text-6xl font-bold text-muted/10">
                    {step.step}
                  </div>
                  <CardHeader className="pb-3 md:pb-4">
                    <Icon className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-3 md:mb-4" />
                    <CardTitle className="text-lg md:text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm md:text-base text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;