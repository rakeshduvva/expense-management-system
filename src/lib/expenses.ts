
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid'; 
import { getCurrentUser } from "./auth";

// Define the expense type
export interface Expense {
  id: string;
  date: Date;
  category: string;
  merchant: string;
  amount: number;
  currency: string;
  description: string;
  receipt?: string;
  status: "draft" | "submitted" | "approved" | "rejected";
  submittedBy: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "employee" | "manager";
    avatar?: string;
    department: string;
  };
  approvedBy?: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "employee" | "manager";
    avatar?: string;
    department: string;
  };
  submittedAt?: Date;
  approvedAt?: Date;
}

// Get expenses from localStorage or use empty array
export const getExpenses = (): Expense[] => {
  const storedExpenses = localStorage.getItem("expenses");
  if (storedExpenses) {
    const expenses = JSON.parse(storedExpenses);
    // Convert date strings back to Date objects
    return expenses.map((expense: any) => ({
      ...expense,
      date: new Date(expense.date),
      submittedAt: expense.submittedAt ? new Date(expense.submittedAt) : undefined,
      approvedAt: expense.approvedAt ? new Date(expense.approvedAt) : undefined,
      submittedBy: {
        ...expense.submittedBy,
        role: expense.submittedBy.role.toLowerCase() as "admin" | "employee" | "manager"
      },
      approvedBy: expense.approvedBy ? {
        ...expense.approvedBy,
        role: expense.approvedBy.role.toLowerCase() as "admin" | "employee" | "manager"
      } : undefined
    }));
  }
  return [];
};

// Save expenses to localStorage
export const saveExpenses = (expenses: Expense[]): void => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

// Add a new expense
export const addExpense = (expenseData: {
  date: Date;
  merchant: string;
  category: string;
  amount: number;
  currency: string;
  description: string;
  status: "draft" | "submitted";
}): Expense | null => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const expenses = getExpenses();
  
  // Convert current user to the submittedBy format with lowercase role
  const submittedBy = {
    id: currentUser.id.toString(),
    name: currentUser.username,
    email: currentUser.email,
    role: currentUser.role.toLowerCase() as "admin" | "employee" | "manager",
    department: currentUser.department
  };
  
  const newExpense: Expense = {
    id: uuidv4(),
    ...expenseData,
    submittedBy,
    submittedAt: expenseData.status === "submitted" ? new Date() : undefined
  };
  
  expenses.push(newExpense);
  saveExpenses(expenses);
  return newExpense;
};

// Get expenses by status
export const getExpensesByStatus = (status: "draft" | "submitted" | "approved" | "rejected"): Expense[] => {
  const expenses = getExpenses();
  return expenses.filter(expense => expense.status === status);
};

// Update expense status
export const updateExpenseStatus = (
  id: string,
  status: "approved" | "rejected",
  approver?: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "employee" | "manager";
    department: string;
  }
): Expense | null => {
  const expenses = getExpenses();
  const expenseIndex = expenses.findIndex(exp => exp.id === id);
  
  if (expenseIndex === -1) return null;
  
  const updatedExpense = { 
    ...expenses[expenseIndex], 
    status, 
    approvedBy: approver,
    approvedAt: new Date()
  };
  
  expenses[expenseIndex] = updatedExpense;
  saveExpenses(expenses);
  return updatedExpense;
};
