
import { NavLink } from "react-router-dom";
import { 
  Briefcase, 
  FileText, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  Menu, 
  User
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
  useSidebar,
} from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const navItems = [
  { title: "Dashboard", icon: Briefcase, path: "/" },
  { title: "Expenses", icon: FileText, path: "/expenses" },
  { title: "Approvals", icon: CheckSquare, path: "/approvals" },
  { title: "Reports", icon: BarChart3, path: "/reports" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const getNavStyles = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50";

  // If no user is found, we don't show anything
  if (!currentUser) return null;

  return (
    <Sidebar
      className={`${isCollapsed ? "w-20" : "w-64"} flex flex-col transition-all duration-300 ease-in-out shadow-lg`}
      collapsible="icon"
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-sidebar-foreground" />
            <span className="text-lg font-semibold text-sidebar-foreground">ExpenseHub</span>
          </div>
        )}
        <SidebarTrigger>
          <Button variant="ghost" size="icon" className="text-sidebar-foreground">
            <Menu className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
      </div>

      <SidebarContent className="p-2 flex-1">
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title} className="mb-1">
                <SidebarMenuButton asChild>
                  <NavLink to={item.path} end className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md ${getNavStyles({ isActive })}`}>
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <div className={`p-4 border-t border-sidebar-border flex ${isCollapsed ? "justify-center" : "items-center gap-3"}`}>
        {isCollapsed ? (
          <Avatar>
            <AvatarFallback>{currentUser.username ? currentUser.username.charAt(0) : "U"}</AvatarFallback>
          </Avatar>
        ) : (
          <>
            <Avatar>
              <AvatarFallback>{currentUser.username ? currentUser.username.charAt(0) : "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sidebar-foreground">
              <span className="font-medium text-sm">{currentUser.username}</span>
              <span className="text-xs opacity-75">{currentUser.role}</span>
            </div>
          </>
        )}
      </div>
    </Sidebar>
  );
}

export default AppSidebar;
