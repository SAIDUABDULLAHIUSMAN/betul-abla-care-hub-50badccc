import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  MessageCircle,
  Building
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Building,
      title: "Headquarters",
      details: ["Brussels, Belgium", "European Operations Center"],
      color: "primary"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@betulablafoundation.org", "support@betulablafoundation.org"],
      color: "accent"
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+32 (0) 123 456 789", "+234 (0) 801 234 5678"],
      color: "compassion"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM CET", "Emergency support available 24/7"],
      color: "hope"
    }
  ];

  const offices = [
    {
      country: "Belgium",
      city: "Brussels",
      contact: "Fatima Betul Korkmaz",
      role: "Founder & Director",
      email: "fatima@betulablafoundation.org"
    },
    {
      country: "Nigeria",
      city: "Lagos",
      contact: "Ibrahim Adebayo",
      role: "Nigeria Coordinator",
      email: "nigeria@betulablafoundation.org"
    },
    {
      country: "Ghana",
      city: "Accra",
      contact: "Kwame Asante",
      role: "Ghana Coordinator",
      email: "ghana@betulablafoundation.org"
    },
    {
      country: "Ivory Coast",
      city: "Abidjan",
      contact: "Aminata Diallo",
      role: "Ivory Coast Coordinator",
      email: "ivorycoast@betulablafoundation.org"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 to-compassion/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Contact Us
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our team. We're here to answer your questions, 
            discuss partnerships, or provide information about our humanitarian work.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl flex items-center">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 mr-2 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-sm md:text-base">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm md:text-base">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-sm md:text-base">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                      className="text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm md:text-base">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                      className="text-sm md:text-base"
                    />
                  </div>
                  <Button type="submit" className="w-full text-sm md:text-base">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base md:text-lg flex items-center gap-2">
                        <Icon className={`w-5 h-5 md:w-6 md:h-6 text-${info.color}`} />
                        {info.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm md:text-base text-muted-foreground mb-1">
                          {detail}
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Regional Offices */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Regional Offices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {offices.map((office, index) => (
                  <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                    <h3 className="font-semibold text-base md:text-lg mb-1">{office.country}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">{office.city}</p>
                    <p className="text-sm md:text-base font-medium">{office.contact}</p>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">{office.role}</p>
                    <p className="text-xs md:text-sm text-primary">{office.email}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>

      {/* Map Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
            Our Presence
          </h2>
          <p className="text-base md:text-lg text-muted-foreground text-center mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            With operations spanning from Belgium to West Africa, we're connected across continents to serve communities where they need us most.
          </p>
          <div className="bg-muted rounded-lg p-6 md:p-8 text-center">
            <MapPin className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-4" />
            <p className="text-sm md:text-lg text-muted-foreground">
              Interactive map showing our offices in Belgium, Nigeria, Ghana, and Ivory Coast
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;