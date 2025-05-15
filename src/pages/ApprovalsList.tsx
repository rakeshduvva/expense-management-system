
import { useState } from "react";
import { expensesByStatus } from "@/lib/data";
import ApprovalCard from "@/components/approvals/ApprovalCard";

const ApprovalsList = () => {
  const [pendingExpenses, setPendingExpenses] = useState(expensesByStatus.submitted);

  const handleStatusChange = (id: string, status: "approved" | "rejected") => {
    setPendingExpenses(pendingExpenses.filter(expense => expense.id !== id));
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Pending Approvals</h1>
      
      {pendingExpenses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingExpenses.map(expense => (
            <ApprovalCard 
              key={expense.id} 
              expense={expense} 
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
