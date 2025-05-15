
import { FileText, DollarSign, CheckCircle, Clock } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import RecentExpenses from "@/components/dashboard/RecentExpenses";
import CategoryDistribution from "@/components/dashboard/CategoryDistribution";
import { expenses, expensesByStatus } from "@/lib/data";

const Dashboard = () => {
  // Calculate expense statistics
  const totalExpenses = expensesByStatus.approved.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = expensesByStatus.submitted.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingCount = expensesByStatus.submitted.length;
  
  // Calculate month-over-month change (mock data)
  const mockTrend = {
    value: 12.5,
    positive: true
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Approved"
          value={`$${totalExpenses.toLocaleString()}`}
          description="Total approved expenses"
          icon={<DollarSign className="h-5 w-5" />}
          trend={mockTrend}
        />
        
        <StatCard
          title="Pending Expenses"
          value={`$${pendingExpenses.toLocaleString()}`}
          description={`${pendingCount} expense${pendingCount !== 1 ? 's' : ''} awaiting approval`}
          icon={<Clock className="h-5 w-5" />}
        />
        
        <StatCard
          title="Approved Expenses"
          value={expensesByStatus.approved.length}
          description="Number of approved expenses"
          icon={<CheckCircle className="h-5 w-5" />}
        />
        
        <StatCard
          title="Total Expenses"
          value={expenses.length}
          description="Total number of expenses"
          icon={<FileText className="h-5 w-5" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ExpenseChart />
        
        <div className="lg:col-span-1">
          <CategoryDistribution />
        </div>
      </div>
      
      <div className="mt-6">
        <RecentExpenses />
      </div>
    </>
  );
};

export default Dashboard;
