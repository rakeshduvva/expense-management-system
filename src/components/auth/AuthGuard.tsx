
import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";

// Define which routes are accessible to which roles
const roleBasedRoutes: Record<string, string[]> = {
  User: ["/", "/expenses", "/expenses/new"], // Users can only view and submit expenses
  Manager: ["/", "/expenses", "/expenses/new", "/approvals"], // Managers can approve expenses
  Admin: ["/", "/expenses", "/expenses/new", "/approvals", "/reports", "/settings"], // Admins have full access
};

const AuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = getCurrentUser();
  const isLoggedIn = !!currentUser;
  
  useEffect(() => {
    // Initialize auth store - moved to App component
    
    // Not logged in redirect to login
    if (!isLoggedIn && !location.pathname.includes("/login") && !location.pathname.includes("/signup")) {
      navigate("/login");
      return;
    }
    
    // Check role-based access
    if (isLoggedIn && currentUser) {
      const userRole = currentUser.role;
      const currentPath = location.pathname;
      
      // If the route is not in the allowed routes for this role and it's not the root
      const isRootPath = currentPath === "/";
      const allowedRoutes = roleBasedRoutes[userRole] || [];
      
      const hasAccess = isRootPath || 
                        allowedRoutes.some(route => 
                          currentPath === route || 
                          (route.endsWith('/new') && currentPath.startsWith(route.replace('/new', '/')))
                        );
      
      if (!hasAccess) {
        toast({
          title: "Access Restricted",
          description: "You don't have permission to access this page.",
          variant: "destructive"
        });
        navigate("/");
      }
    }
  }, [isLoggedIn, navigate, location.pathname, currentUser]);
  
  // If not logged in and trying to access protected route, render nothing while redirecting
  if (!isLoggedIn && !location.pathname.includes("/login") && !location.pathname.includes("/signup")) {
    return null;
  }
  
  // For login/signup pages when already logged in
  if (isLoggedIn && (location.pathname === "/login" || location.pathname === "/signup")) {
    navigate("/");
    return null;
  }
  
  return <Outlet />;
};

export default AuthGuard;
