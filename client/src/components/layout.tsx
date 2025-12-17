import { useAuth } from "@/context/auth-context";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Menu,
  PlusCircle
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  const NavItem = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
    <Link href={href}>
      <Button
        variant={isActive(href) ? "secondary" : "ghost"}
        className="w-full justify-start gap-3 mb-1 font-medium text-sm h-10"
      >
        <Icon className="h-4 w-4" />
        {label}
      </Button>
    </Link>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight font-serif flex items-center gap-2">
          <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-sans text-xs">DS</span>
          Data Storyteller
        </h1>
      </div>
      
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          <Link href="/create">
            <Button className="w-full justify-start gap-2 mb-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
              <PlusCircle className="h-4 w-4" />
              New Report
            </Button>
          </Link>

          <NavItem href="/dashboard" icon={LayoutDashboard} label="My Reports" />
          <NavItem href="/templates" icon={FileText} label="Templates" />
          <NavItem href="/settings" icon={Settings} label="Settings" />
        </div>
      </div>

      <div className="p-4 mt-auto">
        <Separator className="mb-4 opacity-50" />
        <div className="flex items-center gap-3 px-2 mb-4">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user}`} />
            <AvatarFallback>{user?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate capitalize">{user}</p>
            <p className="text-xs text-muted-foreground truncate">Free Plan</p>
          </div>
        </div>
        <Link href="/">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-muted-foreground"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 transition-all duration-300 ease-in-out">
        <div className="container max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}