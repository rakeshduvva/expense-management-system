
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { DateRange } from "react-day-picker";

const reportFormSchema = z.object({
  reportType: z.string({
    required_error: "Please select a report type",
  }),
  dateRange: z.object({
    from: z.date(),
    to: z.date().optional(),
  }).optional(),
  format: z.string({
    required_error: "Please select a format",
  }),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      reportType: "",
      format: "",
    },
  });
  
  const onSubmit = (data: ReportFormValues) => {
    setIsLoading(true);
    
    // Simulate download delay
    setTimeout(() => {
      console.log("Downloading report with data:", data);
      
      // Create a mock CSV content
      const mockData = generateMockData(data.reportType);
      
      // Create and download the file
      const fileName = `${data.reportType}_report_${new Date().toISOString().split('T')[0]}.${data.format === 'csv' ? 'csv' : 'xlsx'}`;
      
      const blob = new Blob([mockData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Report downloaded",
        description: `Your ${data.reportType} report has been downloaded successfully.`,
      });
      
      setIsLoading(false);
    }, 1500);
  };
  
  // Generate mock data based on report type
  const generateMockData = (reportType: string): string => {
    switch (reportType) {
      case "expense":
        return "Date,Employee,Category,Amount,Status\n" +
               "2025-05-01,John Doe,Travel,125.50,Approved\n" +
               "2025-05-02,Jane Smith,Meals,64.25,Pending\n" +
               "2025-05-03,Alex Johnson,Office Supplies,37.80,Approved\n";
      case "approval":
        return "Date,Request ID,Employee,Manager,Status,Amount\n" +
               "2025-05-01,APR-001,John Doe,Sarah Wilson,Approved,125.50\n" +
               "2025-05-02,APR-002,Jane Smith,Michael Brown,Pending,64.25\n" +
               "2025-05-03,APR-003,Alex Johnson,Sarah Wilson,Rejected,37.80\n";
      case "summary":
        return "Department,Total Expenses,Approved,Pending,Rejected\n" +
               "Engineering,5420.75,4200.50,1220.25,0.00\n" +
               "Marketing,3750.00,3000.00,500.00,250.00\n" +
               "Sales,7680.30,6000.00,1680.30,0.00\n";
      default:
        return "No data available";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Download Report</CardTitle>
        <CardDescription>
          Generate and download expense reports in various formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="reportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="expense">Expense Details</SelectItem>
                      <SelectItem value="approval">Approval Status</SelectItem>
                      <SelectItem value="summary">Department Summary</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the type of report you want to generate
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date Range</FormLabel>
                  <DateRangePicker
                    value={field.value as DateRange}
                    onChange={field.onChange}
                  />
                  <FormDescription>
                    Select the date range for your report
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Export Format</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="csv">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          <span>CSV</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="excel">
                        <div className="flex items-center">
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                          <span>Excel</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the file format for your download
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? "Generating..." : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DownloadReport;
