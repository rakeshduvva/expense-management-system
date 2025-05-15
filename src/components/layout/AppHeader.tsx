
import { useNavigate } from "react-router-dom";
import { Bell, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

export function AppHeader() {
  const navigate = useNavigate();
  
  // Get user data from localStorage or use default
  const userDataString = localStorage.getItem("currentUser");
  const userData = userDataString ? JSON.parse(userDataString) : { username: "admin", role: "Admin" };
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <header className="w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search expenses..." 
              className="w-[260px] pl-9"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={userData.username} />
                  <AvatarFallback>{userData.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userData.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">{userData.role}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
