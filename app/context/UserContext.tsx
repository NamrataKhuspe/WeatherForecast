"use client"; // Add this at the top of the file


// context/UserContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";

// Define the User type
interface User {
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component that provides the user state
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Default user state is null

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
