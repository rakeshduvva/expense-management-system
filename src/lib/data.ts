
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
  submittedBy: User;
  approvedBy?: User;
  submittedAt?: Date;
  approvedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "employee" | "manager" | "admin";
  avatar?: string;
  department: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const currentUser: User = {
  id: "user-1",
  name: "John Smith",
  email: "john.smith@company.com",
  role: "employee",
  avatar: "/placeholder.svg",
  department: "Engineering",
};

export const categories: Category[] = [
  { id: "cat-1", name: "Food & Dining", icon: "🍔" },
  { id: "cat-2", name: "Travel", icon: "✈️" },
  { id: "cat-3", name: "Accommodation", icon: "🏨" },
  { id: "cat-4", name: "Office Supplies", icon: "📦" },
  { id: "cat-5", name: "Transportation", icon: "🚕" },
  { id: "cat-6", name: "Client Entertainment", icon: "🎭" },
  { id: "cat-7", name: "Software & Subscriptions", icon: "💻" },
  { id: "cat-8", name: "Other", icon: "📌" },
];

export const users: User[] = [
  currentUser,
  {
    id: "user-2",
    name: "Amanda Wilson",
    email: "amanda.wilson@company.com",
    role: "manager",
    avatar: "/placeholder.svg",
    department: "Engineering",
  },
  {
    id: "user-3",
    name: "Robert Johnson",
    email: "robert.johnson@company.com",
    role: "employee",
    avatar: "/placeholder.svg",
    department: "Marketing",
  },
  {
    id: "user-4",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "manager",
    avatar: "/placeholder.svg",
    department: "Marketing",
  },
];

// Generate mock expenses data
const generateMockExpenses = (): Expense[] => {
  const statuses: Expense["status"][] = ["draft", "submitted", "approved", "rejected"];
  const currencies = ["USD", "EUR", "GBP"];
  const merchants = [
    "Uber", "Lyft", "American Airlines", "Hilton Hotels", 
    "Starbucks", "Office Depot", "Amazon", "Dell Computers",
    "Microsoft", "Apple", "WeWork", "Marriott Hotels"
  ];
  
  const expenses: Expense[] = [];
  
  for (let i = 1; i <= 25; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const submittedBy = users[Math.floor(Math.random() * users.length)];
    const approvedBy = status === "approved" ? users.find(user => user.role === "manager") : undefined;
    
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    const submittedAt = status !== "draft" ? new Date(date.getTime() + 1000 * 60 * 60 * 24) : undefined;
    const approvedAt = status === "approved" ? new Date(date.getTime() + 1000 * 60 * 60 * 48) : undefined;
    
    expenses.push({
      id: `exp-${i}`,
      date,
      category: categories[Math.floor(Math.random() * categories.length)].id,
      merchant: merchants[Math.floor(Math.random() * merchants.length)],
      amount: Math.floor(Math.random() * 2000) + 10,
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      description: `Expense ${i} description`,
      status,
      submittedBy,
      approvedBy,
      submittedAt,
      approvedAt,
    });
  }
  
  return expenses;
};

export const expenses = generateMockExpenses();

// Sum all expenses by status
export const expensesByStatus = {
  draft: expenses.filter(expense => expense.status === "draft"),
  submitted: expenses.filter(expense => expense.status === "submitted"),
  approved: expenses.filter(expense => expense.status === "approved"),
  rejected: expenses.filter(expense => expense.status === "rejected"),
};

// Sum by category
export const expensesByCategory = categories.map(category => {
  const categoryExpenses = expenses.filter(
    expense => expense.category === category.id && expense.status === "approved"
  );
  
  return {
    category: category.name,
    amount: categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0),
  };
});

// Recent activity
export const recentActivity = expenses
  .filter(expense => expense.status !== "draft")
  .sort((a, b) => {
    const dateA = a.approvedAt || a.submittedAt || a.date;
    const dateB = b.approvedAt || b.submittedAt || b.date;
    return dateB.getTime() - dateA.getTime();
  })
  .slice(0, 10);

// Monthly expenses
export const monthlyExpenses = Array.from({ length: 6 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - i);
  
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
  const monthExpenses = expenses.filter(expense => {
    return expense.date >= monthStart && 
           expense.date <= monthEnd && 
           expense.status === "approved";
  });
  
  const totalAmount = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  return {
    month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    amount: totalAmount,
  };
}).reverse();
