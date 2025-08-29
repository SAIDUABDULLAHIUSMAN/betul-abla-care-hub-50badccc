import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, Camera, MapPin, Calendar } from "lucide-react";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Food Distribution", "Boreholes", "Education", "Community Events"];

  const galleryItems = [
    {
      id: 1,
      title: "Orphan Feeding Program in Lagos",
      category: "Food Distribution",
      location: "Lagos, Nigeria",
      date: "November 2024",
      type: "image",
      description: "Daily meal distribution to over 200 orphaned children in Lagos orphanages.",
      thumbnail: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "New Borehole Completion",
      category: "Boreholes",
      location: "Rural Ghana",
      date: "October 2024",
      type: "video",
      description: "Community celebration as we complete another borehole providing clean water access.",
      thumbnail: "https://images.unsplash.com/photo-1541917372-c41de8c31436?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Back to School Initiative",
      category: "Education",
      location: "Abidjan, Ivory Coast",
      date: "September 2024",
      type: "image",
      description: "Providing school supplies and uniforms to 100+ orphaned children for the new academic year.",
      thumbnail: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Community Eid Celebration",
      category: "Community Events",
      location: "Multi-location",
      date: "June 2024",
      type: "video",
      description: "Celebrating Eid with meat distribution to 500+ families across our operational areas.",
      thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Food Basket Distribution",
      category: "Food Distribution",
      location: "Accra, Ghana",
      date: "October 2024",
      type: "image",
      description: "Monthly food basket distribution reaching 300+ vulnerable families.",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Water Well Drilling Process",
      category: "Boreholes",
      location: "Rural Nigeria",
      date: "August 2024",
      type: "video",
      description: "Documentation of the drilling process for a new community water well.",
      thumbnail: "https://images.unsplash.com/photo-1516237577553-7c4cb489ac63?w=400&h=300&fit=crop"
    },
    {
      id: 7,
      title: "Children's Educational Workshop",
      category: "Education",
      location: "Lagos, Nigeria",
      date: "September 2024",
      type: "image",
      description: "Interactive learning sessions and skill development workshops for orphaned children.",
      thumbnail: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop"
    },
    {
      id: 8,
      title: "Community Health Outreach",
      category: "Community Events",
      location: "Cross-border",
      date: "July 2024",
      type: "image",
      description: "Mobile health clinic providing basic healthcare services to remote communities.",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
    }
  ];

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-accent/10 to-compassion/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Photo & Video Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Witness the impact of our humanitarian work through powerful images and videos 
            that tell the stories of hope, compassion, and positive change.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {item.type === "video" ? (
                    <PlayCircle className="w-12 h-12 text-white" />
                  ) : (
                    <Camera className="w-12 h-12 text-white" />
                  )}
                </div>
                <Badge 
                  className="absolute top-3 right-3" 
                  variant={item.type === "video" ? "default" : "secondary"}
                >
                  {item.type === "video" ? "Video" : "Photo"}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-3">
                  <Badge variant="outline" className="mb-2">
                    {item.category}
                  </Badge>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {item.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {item.date}
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View Full Size
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Load More Section */}
      <section className="pb-16 text-center">
        <Button variant="hero" size="lg">
          Load More Content
        </Button>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-compassion to-hope">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-compassion-foreground mb-6">
            Be Part of Our Story
          </h2>
          <p className="text-xl text-compassion-foreground/90 mb-8">
            Every photo and video represents lives touched by compassion. Join us in making a difference.
          </p>
          <Button variant="secondary" size="lg">
            Get Involved
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;