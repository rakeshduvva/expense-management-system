
import { FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recentActivity, categories } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentExpenses() {
  const statusIcons = {
    submitted: <Clock className="h-4 w-4 text-blue-500" />,
    approved: <CheckCircle className="h-4 w-4 text-green-500" />,
    rejected: <XCircle className="h-4 w-4 text-red-500" />,
  };

  const statusColors = {
    submitted: "bg-blue-100 text-blue-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Other';
  };

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
        <FileText className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.slice(0, 5).map((expense) => (
            <div key={expense.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors">
              <Avatar className="h-9 w-9">
                <AvatarImage src={expense.submittedBy.avatar} alt={expense.submittedBy.name} />
                <AvatarFallback>{expense.submittedBy.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="font-medium truncate">{expense.merchant}</p>
                  <p className="font-semibold">
                    {expense.currency} {expense.amount.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{getCategoryName(expense.category)}</span>
                  <span>{formatDate(expense.submittedAt || expense.date)}</span>
                </div>
              </div>
              
              <Badge variant="secondary" className={statusColors[expense.status as keyof typeof statusColors]}>
                <div className="flex items-center gap-1">
                  {statusIcons[expense.status as keyof typeof statusIcons]}
                  <span className="capitalize">{expense.status}</span>
                </div>
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentExpenses;
