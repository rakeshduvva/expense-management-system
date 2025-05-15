
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ExpenseForm as ExpenseFormComponent } from "@/components/expenses/ExpenseForm";
import { expenses } from "@/lib/data";

const ExpenseForm = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(!!id);
  
  useEffect(() => {
    if (id) {
      // Simulate loading delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-lg">Loading expense details...</div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        {id ? "Edit Expense" : "New Expense"}
      </h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <ExpenseFormComponent expenseId={id} />
      </div>
    </>
  );
};

export default ExpenseForm;
