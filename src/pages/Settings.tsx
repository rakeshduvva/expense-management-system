
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/lib/data";

const profileFormSchema = z.object({
  username: z.string().min(2).max(30),
  email: z.string().email(),
  bio: z.string().max(160).optional(),
  department: z.string(),
});

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  fontSize: z.enum(["sm", "md", "lg"]),
});

const notificationsSchema = z.object({
  emailNotifications: z.boolean(),
  approvalNotifications: z.boolean(),
  expenseReminders: z.boolean(),
  marketingEmails: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;
type NotificationsFormValues = z.infer<typeof notificationsSchema>;

const Settings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: currentUser.name,
      email: currentUser.email,
      bio: "Senior software engineer and team lead",
      department: currentUser.department,
    },
  });

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "light",
      fontSize: "md",
    },
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      emailNotifications: true,
      approvalNotifications: true,
      expenseReminders: false,
      marketingEmails: false,
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated.",
      });
      
      console.log(data);
    }, 1000);
  }

  function onAppearanceSubmit(data: AppearanceFormValues) {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Appearance updated",
        description: "Your appearance settings have been updated.",
      });
      
      console.log(data);
    }, 1000);
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Notification preferences updated",
        description: "Your notification settings have been saved.",
      });
      
      console.log(data);
    }, 1000);
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <Button size="sm" variant="outline">Change Avatar</Button>
                </div>
              </div>
              
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your full name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@company.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your work email address.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Brief description for your profile. Optional.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="HR">Human Resources</SelectItem>
                            <SelectItem value="Product">Product</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Your department within the company.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of the application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...appearanceForm}>
                <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-6">
                  <FormField
                    control={appearanceForm.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Theme</FormLabel>
                        <FormDescription>
                          Select the theme for the dashboard.
                        </FormDescription>
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          {["light", "dark", "system"].map((theme) => (
                            <div key={theme}>
                              <label
                                htmlFor={`theme-${theme}`}
                                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                                  field.value === theme
                                    ? "border-primary bg-muted"
                                    : "border-muted"
                                }`}
                              >
                                <div className="mb-3 rounded-md border bg-[#fff] p-2 dark:bg-[#1a1a1a]">
                                  <div className={`h-6 w-6 rounded-full ${
                                    theme === 'light' ? 'bg-blue-500' : 
                                    theme === 'dark' ? 'bg-slate-700' : 
                                    'bg-gradient-to-r from-blue-500 to-slate-700'
                                  }`}></div>
                                </div>
                                <div className="text-center">
                                  <p className="text-sm font-medium capitalize">
                                    {theme}
                                  </p>
                                </div>
                                <input
                                  type="radio"
                                  id={`theme-${theme}`}
                                  className="sr-only"
                                  value={theme}
                                  checked={field.value === theme}
                                  onChange={() => field.onChange(theme as "light" | "dark" | "system")}
                                />
                              </label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={appearanceForm.control}
                    name="fontSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Font Size</FormLabel>
                        <FormDescription>
                          Set the font size for the interface.
                        </FormDescription>
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          {[
                            { value: "sm", label: "Small" },
                            { value: "md", label: "Medium" },
                            { value: "lg", label: "Large" },
                          ].map((option) => (
                            <div key={option.value}>
                              <label
                                htmlFor={`font-${option.value}`}
                                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                                  field.value === option.value
                                    ? "border-primary bg-muted"
                                    : "border-muted"
                                }`}
                              >
                                <div className={`mb-2 text-${option.value === 'sm' ? 'sm' : option.value === 'lg' ? 'lg' : 'base'}`}>
                                  Aa
                                </div>
                                <div className="text-center">
                                  <p className="text-sm font-medium">
                                    {option.label}
                                  </p>
                                </div>
                                <input
                                  type="radio"
                                  id={`font-${option.value}`}
                                  className="sr-only"
                                  value={option.value}
                                  checked={field.value === option.value}
                                  onChange={() => field.onChange(option.value as "sm" | "md" | "lg")}
                                />
                              </label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationsForm}>
                <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={notificationsForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Email Notifications</FormLabel>
                            <FormDescription>
                              Receive general email notifications about your account.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationsForm.control}
                      name="approvalNotifications"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Approval Requests</FormLabel>
                            <FormDescription>
                              Get notified when an expense requires your approval.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationsForm.control}
                      name="expenseReminders"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Expense Reminders</FormLabel>
                            <FormDescription>
                              Receive weekly reminders about pending expense reports.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationsForm.control}
                      name="marketingEmails"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Marketing Emails</FormLabel>
                            <FormDescription>
                              Receive emails about new features and product updates.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save preferences"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Settings;
