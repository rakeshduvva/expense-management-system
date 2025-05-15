
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  fontSize: z.enum(["sm", "md", "lg"]),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

const AppearanceSettings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "light",
      fontSize: "md",
    },
  });

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

  return (
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
  );
};

export default AppearanceSettings;
