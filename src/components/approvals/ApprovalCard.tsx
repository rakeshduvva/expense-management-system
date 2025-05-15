
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Expense, categories, users } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

interface ApprovalCardProps {
  expense: Expense;
  onStatusChange: (id: string, status: "approved" | "rejected") => void;
}

export function ApprovalCard({ expense, onStatusChange }: ApprovalCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = () => {
    setIsLoading(true);
    setTimeout(() => {
      onStatusChange(expense.id, "approved");
      setIsLoading(false);
      toast({
        title: "Expense approved",
        description: `You have approved the expense for ${expense.merchant}.`,
      });
    }, 500);
  };

  const handleReject = () => {
    setIsLoading(true);
    setTimeout(() => {
      onStatusChange(expense.id, "rejected");
      setIsLoading(false);
      toast({
        title: "Expense rejected",
        description: `You have rejected the expense for ${expense.merchant}.`,
      });
    }, 500);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Other";
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-muted/50 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={expense.submittedBy.avatar} />
              <AvatarFallback>
                {expense.submittedBy.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{expense.submittedBy.name}</p>
              <p className="text-sm text-muted-foreground">
                {expense.submittedBy.department}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Pending
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-semibold text-lg">{expense.merchant}</h3>
            <p className="text-xl font-bold">
              {expense.currency} {expense.amount.toFixed(2)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Date</p>
              <p>{formatDate(expense.date)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Category</p>
              <p>{getCategoryName(expense.category)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Description</p>
              <p>{expense.description}</p>
            </div>
          </div>

          {expense.receipt && (
            <div className="mt-4">
              <p className="text-muted-foreground text-sm mb-2">Receipt</p>
              <div className="bg-muted rounded-md p-2 text-sm flex items-center justify-center">
                <a href="#" className="text-primary hover:underline">
                  View Receipt
                </a>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t bg-muted/30 p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReject}
          disabled={isLoading}
          className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <XCircle className="h-4 w-4 mr-2" />
          Reject
        </Button>
        <Button
          size="sm"
          onClick={handleApprove}
          disabled={isLoading}
          className="bg-green-600 text-white hover:bg-green-700"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Approve
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ApprovalCard;
