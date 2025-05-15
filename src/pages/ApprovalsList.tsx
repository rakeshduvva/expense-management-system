
import { useState, useEffect } from "react";
import ApprovalCard from "@/components/approvals/ApprovalCard";
import { getExpensesByStatus, updateExpenseStatus, Expense } from "@/lib/expenses";
import { getCurrentUser } from "@/lib/auth";

const ApprovalsList = () => {
  const [pendingExpenses, setPendingExpenses] = useState<Expense[]>([]);
  const currentUser = getCurrentUser();

  // Load submitted expenses when the component mounts
  useEffect(() => {
    setPendingExpenses(getExpensesByStatus("submitted"));
  }, []);

  const handleStatusChange = (id: string, status: "approved" | "rejected") => {
    if (!currentUser) return;
    
    // Convert current user to the approver format
    const approver = {
      id: currentUser.id.toString(),
      name: currentUser.username,
      email: currentUser.email,
      role: currentUser.role.toLowerCase() as "admin" | "employee" | "manager",
      department: currentUser.department
    };
    
    // Update the expense status
    updateExpenseStatus(id, status, approver);
    
    // Update the UI by removing the expense from the list
    setPendingExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Pending Approvals</h1>
      
      {pendingExpenses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingExpenses.map(expense => (
            <ApprovalCard 
              key={expense.id} 
              expense={{
                ...expense,
                submittedBy: {
                  ...expense.submittedBy,
                  role: expense.submittedBy.role.toLowerCase() as "admin" | "employee" | "manager"
                }
              }}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="bg-muted/50 rounded-lg p-12 flex flex-col items-center justify-center text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-xl font-medium mb-2">All caught up!</h3>
          <p className="text-muted-foreground">
            There are no expenses pending your approval at the moment.
          </p>
        </div>
      )}
    </>
  );
};

export default ApprovalsList;
