import { createContext, useContext, useState, ReactNode } from "react";
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
    // Allow any username (including numbers) to sign in for now.
    setUser(username);
    toast({
      title: "Welcome!",
      description: `Logged in as ${username}`,
    });
    return true;
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