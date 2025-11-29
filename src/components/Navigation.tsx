import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Heart, ChevronDown, Facebook, Instagram, Twitter, Youtube, Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Activities", href: "/activities" },
    { 
      name: "Projects", 
      href: "/projects",
      dropdown: [
        { name: "Orphan Support", href: "/projects/orphans" },
        { name: "Boreholes", href: "/projects/boreholes" },
        { name: "Community Outreach", href: "/projects/outreach" }
      ]
    },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">Betul Abla Foundation</span>
              <span className="text-xs text-muted-foreground">Serving with Compassion</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              item.dropdown ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50">
                    {item.name}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background border border-border shadow-lg z-50 min-w-[200px]">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link 
                          to={subItem.href}
                          className="w-full px-3 py-2 text-sm hover:bg-muted transition-colors cursor-pointer"
                        >
                          {subItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Social Media & Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-2 mr-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-full hover:bg-muted"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>
            
            {/* Auth Buttons */}
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navigation.map((item) => (
              item.dropdown ? (
                <div key={item.name} className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground px-3 py-2">
                    {item.name}
                  </div>
                  <div className="pl-4 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            
            {/* Mobile Social Links & Theme Toggle */}
            <div className="flex justify-center items-center space-x-4 pt-4 pb-2 border-t border-border">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
              
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-10 h-10 rounded-full hover:bg-muted"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
            </div>
            
            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="w-full" asChild onClick={() => setIsOpen(false)}>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="hero" className="w-full" asChild onClick={() => setIsOpen(false)}>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;