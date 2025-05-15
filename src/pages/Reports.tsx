
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { CategoryDistribution } from "@/components/dashboard/CategoryDistribution";
import DownloadReport from "@/components/reports/DownloadReport";

const Reports = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <p className="text-muted-foreground">
        Generate and analyze expense reports and trends.
      </p>

      <Tabs defaultValue="analytics">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="download">Download Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Expense Trend</CardTitle>
                <CardDescription>
                  Track expense trends over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ExpenseChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>
                  Expense distribution by category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <CategoryDistribution />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Department Spending</CardTitle>
              <CardDescription>
                Expense breakdown by department
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {/* Add department spending chart here */}
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Department spending visualization will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="download" className="space-y-4">
          <DownloadReport />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
