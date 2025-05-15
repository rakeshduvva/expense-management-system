
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import ExpensesList from "./pages/ExpensesList";
import ExpenseForm from "./pages/ExpenseForm";
import ApprovalsList from "./pages/ApprovalsList";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthGuard from "./components/auth/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route element={<AuthGuard />}>
            <Route element={
              <SidebarProvider>
                <AppLayout />
              </SidebarProvider>
            }>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<ExpensesList />} />
              <Route path="/expenses/new" element={<ExpenseForm />} />
              <Route path="/expenses/:id" element={<ExpenseForm />} />
              <Route path="/approvals" element={<ApprovalsList />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
