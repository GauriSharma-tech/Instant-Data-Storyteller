import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DEMO_USERS } from "@/lib/mock-data";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const success = login(username.toLowerCase());
      setLoading(false);
      if (success) {
        setLocation("/dashboard");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-in zoom-in-95 duration-500 fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to access your reports</p>
        </div>

        <Card className="shadow-xl border-slate-200">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your username to continue.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="e.g. gauri, kritika, user1" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11"
                  required
                />
              </div>
              <div className="bg-slate-100 p-3 rounded-md text-xs text-slate-600 border border-slate-200">
                <p className="font-semibold mb-1">Demo Users:</p>
                <div className="flex flex-wrap gap-2">
                  {DEMO_USERS.map(u => (
                    <code key={u} className="bg-white px-1.5 py-0.5 rounded border border-slate-300">{u}</code>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}