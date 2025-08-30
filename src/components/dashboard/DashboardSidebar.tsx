import { 
  LayoutDashboard, 
  Users, 
  Droplets, 
  HandHeart, 
  FileText, 
  Settings, 
  LogOut,
  Plus,
  Eye
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  userRole: string;
  onLogout: () => void;
}

export const DashboardSidebar = ({ 
  activeSection, 
  setActiveSection, 
  userRole, 
  onLogout 
}: DashboardSidebarProps) => {
  const menuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "orphans", label: "Orphans", icon: Users },
    { id: "orphans-create", label: "Add Orphan", icon: Plus },
    { id: "boreholes", label: "Boreholes", icon: Droplets },
    { id: "boreholes-create", label: "Add Borehole", icon: Plus },
    { id: "outreach", label: "Outreach", icon: HandHeart },
    { id: "outreach-create", label: "Add Outreach", icon: Plus },
    { id: "reports", label: "Reports", icon: FileText },
  ];

  const adminItems = [
    { id: "pending-approval", label: "Pending Approval", icon: Eye },
    { id: "user-management", label: "User Management", icon: Settings },
  ];

  return (
    <Sidebar className="border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <HandHeart className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-sidebar-foreground">Betul Abla Foundation</h2>
            <p className="text-xs text-sidebar-foreground/60">Admin Dashboard</p>
          </div>
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {userRole === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      isActive={activeSection === item.id}
                      className="w-full justify-start"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("settings")}
                  isActive={activeSection === "settings"}
                  className="w-full justify-start"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={onLogout}
                  className="w-full justify-start text-destructive hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};