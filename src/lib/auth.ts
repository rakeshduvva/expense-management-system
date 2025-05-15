
// Store for users and authentication
import { z } from "zod";

// Define a shared user type
export interface User {
  id: number;
  username: string;
  email: string;
  password: string; // In real app, would be hashed
  role: "Admin" | "Manager" | "User";
  department: string;
}

// Initial admin user
const initialUsers: User[] = [
  { 
    id: 1, 
    username: "admin", 
    email: "admin@example.com", 
    password: "admin", 
    role: "Admin",
    department: "Management"
  },
];

// Get users from localStorage or use initial state
export const getUsers = (): User[] => {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  return initialUsers;
};

// Update users in localStorage
export const saveUsers = (users: User[]): void => {
  localStorage.setItem("users", JSON.stringify(users));
};

// Add a new user
export const addUser = (user: Omit<User, "id">): User => {
  const users = getUsers();
  const newUser = {
    ...user,
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
  };
  
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

// Check login credentials
export const checkLogin = (username: string, password: string): User | null => {
  const users = getUsers();
  return users.find(user => user.username === username && user.password === password) || null;
};

// Get current logged in user
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem("currentUser");
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson);
  } catch (e) {
    return null;
  }
};

// Set current user
export const setCurrentUser = (user: User): void => {
  localStorage.setItem("currentUser", JSON.stringify(user));
  localStorage.setItem("isLoggedIn", "true");
};

// Logout current user
export const logout = (): void => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("isLoggedIn");
};

// Update a user
export const updateUser = (id: number, userData: Partial<User>): User | null => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) return null;
  
  const updatedUser = { ...users[userIndex], ...userData };
  users[userIndex] = updatedUser;
  saveUsers(users);
  
  // If this is the current user, update the current user data too
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === id) {
    setCurrentUser(updatedUser);
  }
  
  return updatedUser;
};

// Delete a user
export const deleteUser = (id: number): boolean => {
  const users = getUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  
  if (filteredUsers.length === users.length) return false;
  
  saveUsers(filteredUsers);
  return true;
};

// Initialize the store with default users if needed
export const initializeAuthStore = () => {
  if (!localStorage.getItem("users")) {
    saveUsers(initialUsers);
  }
};
