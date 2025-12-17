import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";
import { useToast } from "@/hooks/use-toast";
import {
  Settings as SettingsIcon,
  FileText,
  Download,
  Palette,
  User,
  Trash2,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { INTENT_MODES } from "@/lib/mock-data";

interface AppSettings {
  defaultReportMode: "BUSINESS" | "RESEARCH" | "STUDENT";
  autoGenerateInsights: boolean;
  enablePdfExport: boolean;
  enableCsvExport: boolean;
  theme: "dark" | "light";
  compactLayout: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  defaultReportMode: "BUSINESS",
  autoGenerateInsights: true,
  enablePdfExport: false,
  enableCsvExport: true,
  theme: "dark",
  compactLayout: false,
};

export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme: setThemeContext } = useTheme();
  const { toast } = useToast();
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("app_settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        const updatedSettings = { ...DEFAULT_SETTINGS, ...parsed };
        setSettings(updatedSettings);
        // Sync theme with context
        if (parsed.theme && (parsed.theme === "light" || parsed.theme === "dark")) {
          setThemeContext(parsed.theme);
        }
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, [setThemeContext]);

  const saveSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("app_settings", JSON.stringify(updated));
    
    // If theme is being changed, update the theme context
    if (newSettings.theme) {
      setThemeContext(newSettings.theme);
    }
    
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };

  const handleClearCache = () => {
    // Clear custom reports cache
    localStorage.removeItem("custom_reports");
    toast({
      title: "Cache Cleared",
      description: "All locally stored reports have been removed.",
    });
  };

  const InfoTooltip = ({ content }: { content: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight font-serif text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your preferences and application settings.
          </p>
        </div>

        <div className="space-y-6">
          {/* Report Preferences */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Report Preferences</CardTitle>
              </div>
              <CardDescription>
                Configure default settings for new reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="default-mode" className="text-sm font-medium">
                    Default Report Mode
                  </Label>
                  <InfoTooltip content="This mode will be preselected when creating new reports. Choose based on your typical use case." />
                </div>
                <Select
                  value={settings.defaultReportMode}
                  onValueChange={(value: AppSettings["defaultReportMode"]) =>
                    saveSettings({ defaultReportMode: value })
                  }
                >
                  <SelectTrigger id="default-mode" className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(INTENT_MODES).map((mode) => (
                      <SelectItem key={mode.id} value={mode.id}>
                        {mode.label} - {mode.complexity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  The selected mode determines the tone and complexity of generated insights.
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="auto-insights" className="text-sm font-medium">
                      Auto-generate insights after upload
                    </Label>
                    <InfoTooltip content="When enabled, reports will automatically generate insights immediately after CSV upload without requiring manual confirmation." />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automatically start analysis when a CSV file is uploaded
                  </p>
                </div>
                <Switch
                  id="auto-insights"
                  checked={settings.autoGenerateInsights}
                  onCheckedChange={(checked) =>
                    saveSettings({ autoGenerateInsights: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                <CardTitle>Export Options</CardTitle>
              </div>
              <CardDescription>
                Configure export formats and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="pdf-export" className="text-sm font-medium">
                      Enable PDF export
                    </Label>
                    <Badge variant="outline" className="text-xs">
                      Coming Soon
                    </Badge>
                    <InfoTooltip content="PDF export functionality will be available in a future update. This will allow you to download reports as formatted PDF documents." />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Download reports as PDF documents
                  </p>
                </div>
                <Switch
                  id="pdf-export"
                  checked={settings.enablePdfExport}
                  onCheckedChange={(checked) =>
                    saveSettings({ enablePdfExport: checked })
                  }
                  disabled
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="csv-export" className="text-sm font-medium">
                      Enable CSV summary export
                    </Label>
                    <InfoTooltip content="Export report summaries and key metrics as CSV files for further analysis in spreadsheet applications." />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Export report summaries as CSV files
                  </p>
                </div>
                <Switch
                  id="csv-export"
                  checked={settings.enableCsvExport}
                  onCheckedChange={(checked) =>
                    saveSettings({ enableCsvExport: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>
                Customize the look and feel of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="theme" className="text-sm font-medium">
                    Theme
                  </Label>
                  <InfoTooltip content="Switch between dark and light themes. Dark theme is optimized for extended use and reduces eye strain." />
                </div>
                <Select
                  value={theme}
                  onValueChange={(value: "dark" | "light") =>
                    saveSettings({ theme: value })
                  }
                >
                  <SelectTrigger id="theme" className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Switch between dark and light themes. Changes apply immediately.
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="compact-layout" className="text-sm font-medium">
                      Compact report layout
                    </Label>
                    <InfoTooltip content="Reduce spacing and padding in reports to fit more content on screen. Useful for detailed analysis." />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use tighter spacing in report views
                  </p>
                </div>
                <Switch
                  id="compact-layout"
                  checked={settings.compactLayout}
                  onCheckedChange={(checked) =>
                    saveSettings({ compactLayout: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Account */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Account</CardTitle>
              </div>
              <CardDescription>
                Manage your account and local data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={user ? `${user}@example.com` : "Not signed in"}
                    readOnly
                    className="flex h-9 w-full max-w-xs rounded-md border border-input bg-muted px-3 py-1 text-sm text-muted-foreground cursor-not-allowed"
                  />
                  <InfoTooltip content="Your account email. This is read-only and managed by your authentication provider." />
                </div>
                <p className="text-xs text-muted-foreground">
                  Account email is read-only
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">Local Report Cache</Label>
                  <InfoTooltip content="Clear all locally stored reports and data. This action cannot be undone. Your account data will remain intact." />
                </div>
                <Button
                  variant="outline"
                  onClick={handleClearCache}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Local Cache
                </Button>
                <p className="text-xs text-muted-foreground">
                  Remove all locally stored reports and cached data
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

