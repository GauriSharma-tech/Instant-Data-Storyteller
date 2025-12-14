import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_REPORTS } from "@/lib/mock-data";
import { FileText, Calendar, ArrowRight, MoreVertical } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const [reports, setReports] = useState(MOCK_REPORTS);

  useEffect(() => {
    // Check for any locally saved reports from the wizard
    const savedReports = localStorage.getItem("custom_reports");
    if (savedReports) {
      try {
        const parsed = JSON.parse(savedReports);
        setReports([...MOCK_REPORTS, ...parsed]);
      } catch (e) {
        console.error("Failed to parse saved reports", e);
      }
    }
  }, []);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-serif text-slate-900">My Reports</h1>
          <p className="text-muted-foreground mt-1">Manage and view your generated data stories.</p>
        </div>
        <Link href="/create">
          <Button size="lg" className="shadow-md">Create New Report</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-primary/50 cursor-pointer animate-in fade-in zoom-in-95 duration-300">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <FileText className="h-5 w-5" />
                </div>
                <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors">{report.title}</CardTitle>
              <CardDescription className="line-clamp-1">{report.dataset}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar className="h-3.5 w-3.5" />
                <span>{report.createdAt}</span>
              </div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 capitalize">
                {report.intent?.toLowerCase()} Mode
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href={`/report/${report.id}?title=${encodeURIComponent(report.title)}&intent=${report.intent}`} className="w-full">
                <Button variant="outline" className="w-full group-hover:bg-primary/5 group-hover:border-primary/20">
                  Open Report <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  );
}