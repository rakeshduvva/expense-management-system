
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, Edit, Trash2 } from "lucide-react";
import { getUsers, addUser, updateUser, deleteUser, User as AuthUser } from "@/lib/auth";

const userFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(1, "Please select a role"),
  department: z.string().min(1, "Please select a department"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const UserManagement = () => {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AuthUser | null>(null);

  // Load users from our auth store
  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      email: "",
      role: "",
      department: "",
      password: "",
    },
  });

  const handleAddUser = () => {
    setEditingUser(null);
    form.reset({
      username: "",
      email: "",
      role: "",
      department: "",
      password: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: AuthUser) => {
    setEditingUser(user);
    form.reset({
      username: user.username,
      email: user.email,
      role: user.role,
      department: user.department,
      password: "", // Don't show the password
    });
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    if (userId === 1) {
      toast({
        title: "Cannot delete admin",
        description: "The admin user cannot be deleted.",
        variant: "destructive",
      });
      return;
    }
    
    const success = deleteUser(userId);
    if (success) {
      setUsers(getUsers()); // Refresh the users list
      toast({
        title: "User deleted",
        description: "The user has been removed successfully.",
      });
    }
  };

  const onSubmit = (data: UserFormValues) => {
    if (editingUser) {
      // Update existing user
      const updatedUser = updateUser(editingUser.id, {
        username: data.username,
        email: data.email,
        role: data.role as AuthUser['role'],
        department: data.department,
        ...(data.password && data.password.length > 0 ? { password: data.password } : {})
      });
      
      if (updatedUser) {
        toast({
          title: "User updated",
          description: `${data.username}'s information has been updated.`,
        });
      }
    } else {
      // Add new user
      if (!data.password) {
        toast({
          title: "Password required",
          description: "Please provide a password for the new user.",
          variant: "destructive",
        });
        return;
      }
      
      addUser({
        username: data.username,
        email: data.email,
        role: data.role as AuthUser['role'],
        department: data.department,
        password: data.password,
      });
      
      toast({
        title: "User added",
        description: `${data.username} has been added to the system.`,
      });
    }
    
    // Refresh the users list and close the dialog
    setUsers(getUsers());
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Management</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddUser}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
              <DialogDescription>
                {editingUser 
                  ? "Edit user details below. Click save when you're done."
                  : "Fill in the user details below. Click save when you're done."
                }
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{editingUser ? "New Password (leave empty to keep current)" : "Password"}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="User">User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Management">Management</SelectItem>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="HR">Human Resources</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">{editingUser ? "Update User" : "Add User"}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
