import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Utensils, 
  GraduationCap, 
  Droplets, 
  Gift,
  MapPin,
  Calendar,
  Users
} from "lucide-react";

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: "Orphan Feeding Program",
      icon: Utensils,
      category: "Nutrition",
      location: "Lagos, Nigeria",
      date: "Ongoing",
      beneficiaries: "200+ children",
      description: "Regular food distribution ensuring orphans receive nutritious meals daily. Our program covers breakfast, lunch, and dinner for children in our care across multiple orphanages.",
      status: "Active",
      color: "compassion"
    },
    {
      id: 2,
      title: "Educational Support Initiative",
      icon: GraduationCap,
      category: "Education",
      location: "Accra, Ghana",
      date: "September 2024",
      beneficiaries: "150 students",
      description: "Covering school fees, uniforms, and educational materials for orphaned children. We believe education is the foundation for breaking the cycle of poverty.",
      status: "Active",
      color: "primary"
    },
    {
      id: 3,
      title: "Community Borehole Project",
      icon: Droplets,
      category: "Water Access",
      location: "Rural Ivory Coast",
      date: "October 2024",
      beneficiaries: "2,000+ people",
      description: "Construction of clean water boreholes in underserved communities, providing safe drinking water and improving overall health outcomes.",
      status: "In Progress",
      color: "accent"
    },
    {
      id: 4,
      title: "Animal Slaughter Distribution",
      icon: Gift,
      category: "Food Security",
      location: "Multiple Locations",
      date: "Religious Holidays",
      beneficiaries: "500+ families",
      description: "Providing fresh meat to orphans and poor families during religious celebrations, ensuring no one is left behind during times of giving.",
      status: "Seasonal",
      color: "hope"
    },
    {
      id: 5,
      title: "Food Basket Distribution",
      icon: Heart,
      category: "Emergency Relief",
      location: "Cross-Border",
      date: "Monthly",
      beneficiaries: "300+ families",
      description: "Regular distribution of essential food items including rice, beans, oil, and other necessities to vulnerable families across our operational areas.",
      status: "Active",
      color: "compassion"
    },
    {
      id: 6,
      title: "Healthcare Support Program",
      icon: Heart,
      category: "Healthcare",
      location: "Nigeria & Ghana",
      date: "Quarterly",
      beneficiaries: "100+ patients",
      description: "Providing medical assistance and healthcare support to orphans and vulnerable community members who cannot afford basic medical care.",
      status: "Active",
      color: "primary"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-compassion text-compassion-foreground";
      case "In Progress": return "bg-accent text-accent-foreground";
      case "Seasonal": return "bg-hope text-hope-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Activities & Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming lives through targeted humanitarian interventions across West Africa. 
            Each project is designed to create lasting impact in the communities we serve.
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <Card key={activity.id} className="hover:shadow-lg transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <Icon className={`w-10 h-10 md:w-12 md:h-12 text-${activity.color}`} />
                    <Badge className={`${getStatusColor(activity.status)} text-xs`}>
                      {activity.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl md:text-2xl mb-2">{activity.title}</CardTitle>
                  <Badge variant="secondary" className="w-fit mb-3 text-xs">
                    {activity.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 line-clamp-3">
                    {activity.description}
                  </p>
                  <div className="space-y-2 md:space-y-3 text-sm md:text-base mb-4 md:mb-6">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{activity.location}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{activity.date}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 md:w-5 md:h-5 text-compassion mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{activity.beneficiaries}</span>
                    </div>
                  </div>
                  <Link to="/gallery">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-xs md:text-sm">
                      View in Gallery
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Want to Learn More About Our Work?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Discover the stories behind our projects and see the direct impact of our humanitarian efforts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/gallery">View Photo Gallery</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activities;