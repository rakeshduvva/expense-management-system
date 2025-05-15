
import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  useEffect(() => {
    if (!isLoggedIn && !location.pathname.includes("/login") && !location.pathname.includes("/signup")) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate, location.pathname]);
  
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
