import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }
      
      setUser(session.user);
      
      // Get user role from user_roles table
      const { data: userRoles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .limit(1)
        .single();
        
      if (userRoles) {
        setUserRole(userRoles.role);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    } else {
      navigate("/");
    }
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-col w-full bg-background">
        <header className="lg:hidden sticky top-0 z-50 h-14 flex items-center border-b border-border bg-card px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="ml-3 text-lg font-semibold text-foreground">Dashboard</h1>
        </header>
        <div className="flex flex-1 w-full">
          <DashboardSidebar 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            userRole={userRole}
            onLogout={handleLogout}
            user={user}
          />
          <main className="flex-1 overflow-auto">
            <DashboardContent 
              activeSection={activeSection} 
              userRole={userRole}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;