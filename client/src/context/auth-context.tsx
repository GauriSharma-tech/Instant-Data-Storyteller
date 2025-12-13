import { createContext, useContext, useState, ReactNode } from "react";
import { DEMO_USERS } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: string | null;
  login: (username: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const { toast } = useToast();

  const login = (username: string) => {
    if (DEMO_USERS.includes(username)) {
      setUser(username);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${username}`,
      });
      return true;
    }
    toast({
      variant: "destructive",
      title: "Access Denied",
      description: "That username is not in the demo list.",
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}