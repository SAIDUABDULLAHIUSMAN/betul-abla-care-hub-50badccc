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
  useSidebar,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  userRole: string;
  onLogout: () => void;
  user: any;
}

export const DashboardSidebar = ({ 
  activeSection, 
  setActiveSection, 
  userRole, 
  onLogout,
  user
}: DashboardSidebarProps) => {
  const { state } = useSidebar();
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

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border bg-card" collapsible="icon">
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg">
            <HandHeart className="h-5 w-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-foreground tracking-tight">Betul Abla</h2>
              <p className="text-xs text-muted-foreground font-medium">Foundation</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="px-3 py-4 pt-6">
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2">Main Menu</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className="w-full justify-start h-10 px-3 rounded-lg font-medium transition-all duration-200 hover:bg-accent/50"
                    tooltip={isCollapsed ? item.label : undefined}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span className="text-sm">{item.label}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {userRole === "admin" && (
          <SidebarGroup className="mt-6">
            {!isCollapsed && <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2">Admin</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      isActive={activeSection === item.id}
                      className="w-full justify-start h-10 px-3 rounded-lg font-medium transition-all duration-200 hover:bg-accent/50"
                      tooltip={isCollapsed ? item.label : undefined}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span className="text-sm">{item.label}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup className="mt-auto">
          {!isCollapsed && <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2">Account</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveSection("settings")}
                  isActive={activeSection === "settings"}
                  className="w-full justify-start h-10 px-3 rounded-lg font-medium transition-all duration-200 hover:bg-accent/50"
                  tooltip={isCollapsed ? "Settings" : undefined}
                >
                  <Settings className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span className="text-sm">Settings</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={onLogout}
                  className="w-full justify-start h-10 px-3 rounded-lg font-medium transition-all duration-200 text-destructive hover:text-destructive hover:bg-destructive/10"
                  tooltip={isCollapsed ? "Logout" : undefined}
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span className="text-sm">Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Profile Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border/50 mt-auto">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-semibold text-primary">{user?.email?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{user?.email}</p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  );
};