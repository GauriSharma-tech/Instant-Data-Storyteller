import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  CHART_DATA_SURVIVAL_BY_CLASS, 
  CHART_DATA_AGE_DIST, 
  CHART_DATA_EMBARKED,
  CHART_DATA_FARE_BY_CLASS,
  INSIGHTS,
  MOCK_DATASET_SUMMARY,
  INTENT_MODES,
  MOCK_REPORTS
} from "@/lib/mock-data";
import { Download, Share2, Info, AlertTriangle, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRoute } from "wouter";

type DetailMode = "QUICK" | "ANALYST" | "TEXT";
type IntentMode = "STUDENT" | "BUSINESS" | "RESEARCH";

export default function ReportView() {
  const [detailMode, setDetailMode] = useState<DetailMode>("ANALYST");
  const { toast } = useToast();
  const [match, params] = useRoute("/report/:id");
  const contentRef = useRef<HTMLDivElement>(null);

  // Determine Intent based on Report ID
  const reportId = params?.id;
  const report = MOCK_REPORTS.find(r => r.id === reportId);
  // Default to BUSINESS if new or not found, but if it's one of our mock reports, use that intent
  const currentIntentKey = (report?.intent || "BUSINESS") as IntentMode;
  
  const currentInsights = INSIGHTS[currentIntentKey];
  const currentIntentMode = INTENT_MODES[currentIntentKey];

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Generating PDF report...",
    });
    setTimeout(() => {
      toast({
        title: "Download Ready",
        description: `Report_${report?.title || "Analysis"}.pdf has been downloaded.`,
      });
    }, 2000);
  };

  const COLORS = ['#6366f1', '#14b8a6', '#0ea5e9', '#fbbf24'];

  const InsightCard = ({ title, children, icon: Icon = Lightbulb }: { title: string, children: React.ReactNode, icon?: any }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-2 text-primary font-semibold">
        <Icon className="h-4 w-4" />
        <span className="text-sm uppercase tracking-wide">{title}</span>
      </div>
      <p className="text-slate-700 leading-relaxed text-sm">
        {children}
      </p>
    </div>
  );

  return (
    <Layout>
      {/* Top Bar - Report Controls */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b pb-4 mb-8 -mx-4 px-4 md:-mx-8 md:px-8 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <div className="flex items-center gap-3 mb-1">
             <h1 className="text-2xl font-bold font-serif text-slate-900">{report?.title || "New Data Analysis"}</h1>
             <Badge variant="secondary" className="font-mono text-xs">v1.0</Badge>
           </div>
           <div className="flex items-center gap-2 text-sm text-muted-foreground">
             <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
               {currentIntentMode.label} Mode
             </Badge>
             <span>•</span>
             <span>Generated {report?.createdAt || "just now"}</span>
           </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 mr-4">
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">Detail Level:</span>
            <Select value={detailMode} onValueChange={(v: DetailMode) => setDetailMode(v)}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="QUICK">Quick Story</SelectItem>
                <SelectItem value="ANALYST">Analyst Mode</SelectItem>
                <SelectItem value="TEXT">Text Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8" ref={contentRef}>
        {/* Navigation Sidebar (Desktop) */}
        <div className="hidden lg:block col-span-2 sticky top-32 h-[calc(100vh-8rem)]">
          <nav className="space-y-1">
            {["Overview", "Distributions", "Relationships", "Key Findings", "Conclusion"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-md transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="col-span-12 lg:col-span-10 space-y-8">
          
          {/* Section 1: Overview */}
          <section id="overview" className="space-y-4">
            <h2 className="text-xl font-bold font-serif border-l-4 border-primary pl-4">Dataset Overview</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
               <Card>
                 <CardContent className="pt-6">
                   <div className="text-2xl font-bold font-mono text-primary">{MOCK_DATASET_SUMMARY.rows}</div>
                   <p className="text-xs text-muted-foreground uppercase font-semibold mt-1">Total Rows</p>
                 </CardContent>
               </Card>
               <Card>
                 <CardContent className="pt-6">
                   <div className="text-2xl font-bold font-mono text-primary">{MOCK_DATASET_SUMMARY.columns}</div>
                   <p className="text-xs text-muted-foreground uppercase font-semibold mt-1">Columns</p>
                 </CardContent>
               </Card>
               <Card>
                 <CardContent className="pt-6">
                   <div className="text-2xl font-bold font-mono text-primary">38%</div>
                   <p className="text-xs text-muted-foreground uppercase font-semibold mt-1">Avg Survival</p>
                 </CardContent>
               </Card>
               <Card>
                 <CardContent className="pt-6">
                   <div className="text-2xl font-bold font-mono text-primary">29.7</div>
                   <p className="text-xs text-muted-foreground uppercase font-semibold mt-1">Avg Age</p>
                 </CardContent>
               </Card>
            </div>
          </section>

          {detailMode !== "TEXT" && (
            <>
              {/* Section 2: Distributions */}
              <section id="distributions" className="space-y-6">
                <h2 className="text-xl font-bold font-serif border-l-4 border-primary pl-4">Distributions</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Chart 1: Survival by Class */}
                  <Card className="overflow-hidden border-slate-200">
                    <CardHeader className="bg-slate-50/50 pb-4 border-b">
                      <CardTitle className="text-base font-medium">Survival Rate by Passenger Class</CardTitle>
                      <CardDescription>Breakdown of survival probability across socio-economic classes</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="h-[250px] w-full mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={CHART_DATA_SURVIVAL_BY_CLASS} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                            <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={12} />
                            <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} width={80} />
                            <Tooltip 
                              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                              cursor={{fill: '#f1f5f9'}}
                            />
                            <Bar dataKey="survivalRate" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={32} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-3">
                        <InsightCard title="What this shows" icon={Info}>
                           First class passengers had the highest survival rate at 63%, while 3rd class dropped significantly to 24%.
                        </InsightCard>
                        {detailMode === "ANALYST" && (
                           <InsightCard title="Why it matters" icon={AlertTriangle}>
                             {currentInsights.survival}
                           </InsightCard>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Chart 2: Age Distribution */}
                  <Card className="overflow-hidden border-slate-200">
                    <CardHeader className="bg-slate-50/50 pb-4 border-b">
                      <CardTitle className="text-base font-medium">Age Demographics</CardTitle>
                      <CardDescription>Distribution of passenger ages on board</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="h-[250px] w-full mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={CHART_DATA_AGE_DIST}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="range" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip 
                              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                              cursor={{fill: '#f1f5f9'}}
                            />
                            <Bar dataKey="count" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-3">
                         <InsightCard title="What this shows" icon={Info}>
                           The majority of passengers were between 20-30 years old, creating a right-skewed distribution.
                        </InsightCard>
                        {detailMode === "ANALYST" && (
                           <InsightCard title="Why it matters" icon={AlertTriangle}>
                             {currentInsights.age}
                           </InsightCard>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Section 3: Extra Charts (Only in Analyst Mode) */}
              {detailMode === "ANALYST" && (
                <section id="relationships" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-xl font-bold font-serif border-l-4 border-primary pl-4">Advanced Relationships</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                     {/* Chart 3: Embarkation (Pie) */}
                     <Card className="overflow-hidden border-slate-200">
                        <CardHeader className="bg-slate-50/50 pb-4 border-b">
                          <CardTitle className="text-base font-medium">Embarkation Ports</CardTitle>
                          <CardDescription>Where passengers boarded the ship</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="h-[250px] w-full mb-6 flex justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={CHART_DATA_EMBARKED}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={80}
                                  paddingAngle={5}
                                  dataKey="value"
                                >
                                  {CHART_DATA_EMBARKED.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <InsightCard title="Analysis" icon={Info}>
                             {currentInsights.embarked}
                          </InsightCard>
                        </CardContent>
                      </Card>

                      {/* Chart 4: Average Fare (Bar) */}
                      <Card className="overflow-hidden border-slate-200">
                        <CardHeader className="bg-slate-50/50 pb-4 border-b">
                          <CardTitle className="text-base font-medium">Average Fare by Class</CardTitle>
                          <CardDescription>Economic segmentation analysis</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="h-[250px] w-full mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={CHART_DATA_FARE_BY_CLASS}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip 
                                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                  cursor={{fill: '#f1f5f9'}}
                                />
                                <Bar dataKey="avgFare" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                          <InsightCard title="Analysis" icon={Info}>
                             {currentInsights.fare}
                          </InsightCard>
                        </CardContent>
                      </Card>
                  </div>
                </section>
              )}
            </>
          )}

          {/* Section 4: Conclusion (Text Heavy) */}
          <section id="conclusion" className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <h2 className="text-2xl font-bold font-serif text-primary mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6" />
              Strategic Conclusion
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg leading-relaxed text-slate-800 font-medium">
                {currentInsights.conclusion}
              </p>
              
              {detailMode === "ANALYST" && (
                <div className="mt-6 grid sm:grid-cols-2 gap-4 not-prose animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-2">Primary Driver</h4>
                    <p className="text-sm text-slate-600">Socio-economic status (Ticket Class) was the single strongest predictor of survival.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-2">Secondary Factor</h4>
                    <p className="text-sm text-slate-600">Age and Gender played significant roles, with "Women and Children first" protocol evident in data.</p>
                  </div>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
}