
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { FileText, Download, BarChart2, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";
import { expensesByCategory, monthlyExpenses } from "@/lib/data";

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#4CAF50'];

const Reports = () => {
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [reportType, setReportType] = useState("monthly");
  
  // Report data - in a real app this would be dynamic based on reportType
  const reportData = monthlyExpenses;
  const categoryData = expensesByCategory.filter(item => item.amount > 0);
  
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={reportData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip formatter={(value) => [`$${value}`, 'Total']} />
              <Legend />
              <Bar dataKey="amount" name="Expense Amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={reportData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip formatter={(value) => [`$${value}`, 'Total']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="amount" 
                name="Expense Amount"
                stroke="hsl(var(--primary))" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="amount"
                nameKey="category"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ${reportData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
            </p>
            <p className="text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Average Monthly</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ${(reportData.reduce((sum, item) => sum + item.amount, 0) / reportData.length).toLocaleString(undefined, {maximumFractionDigits: 2})}
            </p>
            <p className="text-muted-foreground">Per month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Category</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {categoryData.sort((a, b) => b.amount - a.amount)[0]?.category}
            </p>
            <p className="text-muted-foreground">Highest spend</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">Expense Report</CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className={chartType === "bar" ? "bg-muted" : ""}
              onClick={() => setChartType("bar")}
            >
              <BarChart2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className={chartType === "line" ? "bg-muted" : ""}
              onClick={() => setChartType("line")}
            >
              <LineChartIcon className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className={chartType === "pie" ? "bg-muted" : ""}
              onClick={() => setChartType("pie")}
            >
              <PieChartIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <Select defaultValue={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Report</SelectItem>
                  <SelectItem value="category">Category Report</SelectItem>
                  <SelectItem value="department">Department Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          
          {renderChart()}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["Q1 2023 Report", "Annual 2022 Report", "Department Spending Q4"].map((report, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{report}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["Monthly Summary", "Quarterly Budget", "Department Spending"].map((report, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
                  <div>
                    <p>{report}</p>
                    <p className="text-sm text-muted-foreground">
                      {i === 0 ? "Every month" : i === 1 ? "Every quarter" : "Every week"}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Reports;
