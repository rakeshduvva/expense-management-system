
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data";
import { addExpense } from "@/lib/expenses";

const formSchema = z.object({
  date: z.date({
    required_error: "Date is required",
  }),
  merchant: z.string().min(2, {
    message: "Merchant name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Category is required",
  }),
  amount: z.coerce.number().positive({
    message: "Amount must be positive",
  }),
  currency: z.string({
    required_error: "Currency is required",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  submissionType: z.enum(["draft", "submit"]),
});

interface ExpenseFormProps {
  expenseId?: string;
}

export function ExpenseForm({ expenseId }: ExpenseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const isEditing = !!expenseId;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      merchant: "",
      category: "",
      amount: undefined,
      currency: "USD",
      description: "",
      submissionType: "submit",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Convert form values to expense data
    const expenseData = {
      date: values.date,
      merchant: values.merchant,
      category: values.category,
      amount: values.amount,
      currency: values.currency,
      description: values.description,
      status: values.submissionType === "submit" ? "submitted" as const : "draft" as const,
    };

    // Add the expense using our store
    const newExpense = addExpense(expenseData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (newExpense) {
        toast({
          title: `Expense ${isEditing ? "updated" : "created"} successfully`,
          description: values.submissionType === "submit" 
            ? "Your expense has been submitted for approval." 
            : "Your expense has been saved as draft.",
        });
        navigate("/expenses");
      } else {
        toast({
          title: "Error",
          description: "Failed to save the expense. Please try again.",
          variant: "destructive"
        });
      }
    }, 500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Date when the expense occurred
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="merchant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Merchant</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Uber, Amazon, etc." {...field} />
                </FormControl>
                <FormDescription>
                  The name of the vendor or merchant
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select expense category</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Add details about this expense" {...field} />
                </FormControl>
                <FormDescription>
                  Provide any additional information about this expense
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6">
          <Label className="text-base">Receipt</Label>
          <div className="mt-2">
            <Input type="file" accept="image/*,.pdf" />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Upload a receipt image or PDF (optional)
          </p>
        </div>
        
        <div className="border-t pt-6 mt-6">
          <FormField
            control={form.control}
            name="submissionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base mb-4 block">Submission Type</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="draft" id="draft" />
                      <Label htmlFor="draft">Save as Draft</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="submit" id="submit" />
                      <Label htmlFor="submit">Submit for Approval</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/expenses")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update Expense" : "Save Expense"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ExpenseForm;
