
import ExpensesTable from "@/components/expenses/ExpensesTable";
import { expenses } from "@/lib/data";

const ExpensesList = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Expenses</h1>
      <ExpensesTable data={expenses} />
    </>
  );
};

export default ExpensesList;
