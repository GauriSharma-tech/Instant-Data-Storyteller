import { useState } from "react";
import { Layout } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import {
  Briefcase,
  Microscope,
  GraduationCap,
  ArrowRight,
  FileText,
  Sparkles,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { INTENT_MODES } from "@/lib/mock-data";

const TEMPLATES = [
  {
    id: "business-kpi",
    name: "Business KPI Dashboard",
    description: "Track revenue, growth metrics, and business performance indicators with executive-ready insights.",
    datasetType: "Sales, Revenue, Customer Data",
    mode: "BUSINESS",
    icon: Briefcase,
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  {
    id: "research-exploration",
    name: "Research Data Exploration",
    description: "Deep statistical analysis with correlations, significance testing, and academic rigor.",
    datasetType: "Scientific, Survey, Experimental Data",
    mode: "RESEARCH",
    icon: Microscope,
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
  },
  {
    id: "student-assignment",
    name: "Student Assignment Report",
    description: "Learn data analysis fundamentals with clear explanations and educational insights.",
    datasetType: "Academic, Learning Datasets",
    mode: "STUDENT",
    icon: GraduationCap,
    color: "bg-green-500/10 text-green-600 border-green-200",
  },
];

export default function Templates() {
  const [, setLocation] = useLocation();
  const [templates] = useState(TEMPLATES);

  const handleUseTemplate = (template: typeof TEMPLATES[0]) => {
    // Store the preselected mode in localStorage to be read by CreateWizard
    localStorage.setItem("preselectedIntent", template.mode);
    setLocation("/create");
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight font-serif text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] mb-2">
            Templates
          </h1>
          <p className="text-muted-foreground text-lg">
            Templates help you turn raw data into structured stories in one click.
          </p>
        </div>

        {/* Templates Grid */}
        {templates.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => {
              const Icon = template.icon;
              const modeInfo = INTENT_MODES[template.mode as keyof typeof INTENT_MODES];

              return (
                <Card
                  key={template.id}
                  className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-primary/50 animate-in fade-in zoom-in-95 duration-300"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`h-12 w-12 rounded-lg ${template.color} flex items-center justify-center border`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-help">
                              <Info className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="font-semibold mb-1">{modeInfo.label} Mode</p>
                            <p className="text-xs">{modeInfo.description}</p>
                            <p className="text-xs mt-2 text-muted-foreground">
                              Tone: {modeInfo.tone} • Level: {modeInfo.complexity}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors">
                      {template.name}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Best for:</span>
                      <span className="font-medium">{template.datasetType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/5 text-primary border-primary/20 capitalize"
                      >
                        {modeInfo.label} Mode
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      onClick={() => handleUseTemplate(template)}
                      className="w-full transform transition-all duration-200 group-hover:bg-primary group-hover:text-black group-hover:shadow-lg group-hover:scale-[1.01]"
                    >
                      Use Template
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </Layout>
  );
}

function EmptyState() {
  return (
    <Card className="border-dashed border-2 border-slate-300 shadow-none bg-slate-50/50">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Templates Available</h3>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Templates are currently being prepared. Create a new report to get started.
        </p>
        <Link href="/create">
          <Button size="lg" className="shadow-md">
            Create a New Report
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

