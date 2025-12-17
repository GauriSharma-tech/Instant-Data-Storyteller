import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "@/context/theme-context";
import Landing from "@/pages/landing";
import AuthPage from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import CreateWizard from "@/pages/create-wizard";
import Templates from "@/pages/templates";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";
import ReportView from "@/pages/report-view";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/create" component={CreateWizard} />
      <Route path="/templates" component={Templates} />
      <Route path="/settings" component={Settings} />
      <Route path="/report/:id" component={ReportView} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;