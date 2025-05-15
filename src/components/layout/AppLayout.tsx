
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

export function AppLayout() {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <AppHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
