import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Activities", href: "/activities" },
    { name: "Projects", href: "/projects" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "info@betulablafoundation.org",
      href: "mailto:info@betulablafoundation.org"
    },
    {
      icon: Phone,
      text: "+32 (0) 123 456 789",
      href: "tel:+32123456789"
    },
    {
      icon: MapPin,
      text: "Brussels, Belgium",
      href: "#"
    }
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Foundation Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <Heart className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">Betul Abla Foundation</span>
                <span className="text-sm text-muted-foreground">Serving with Compassion</span>
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              Betul Abla Foundation – Serving humanity with compassion across Europe and West Africa. 
              We are dedicated to supporting orphans, providing clean water access, and strengthening 
              communities through sustainable development programs.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact Info</h3>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <li key={index}>
                    <a
                      href={contact.href}
                      className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200 group"
                    >
                      <IconComponent className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">{contact.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            
            {/* Belgium HQ Address */}
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Headquarters</h4>
              <p className="text-sm text-muted-foreground">
                Betul Abla Foundation<br />
                European Operations Center<br />
                Brussels, Belgium
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025 Betul Abla Foundation. All Rights Reserved.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/transparency" className="text-muted-foreground hover:text-primary transition-colors">
                Transparency
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;