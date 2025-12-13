import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INTENT_MODES, MOCK_DATASET_SUMMARY } from "@/lib/mock-data";
import { useLocation } from "wouter";
import { UploadCloud, FileSpreadsheet, GraduationCap, Briefcase, Microscope, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  GraduationCap,
  Briefcase,
  Microscope
};

export default function CreateWizard() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [intent, setIntent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerate = () => {
    setLoading(true);
    // Simulate processing
    setTimeout(() => {
      setLoading(false);
      setLocation("/report/new");
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold font-serif mb-4">Create New Data Story</h1>
          <div className="flex items-center justify-center gap-4 text-sm font-medium text-muted-foreground">
            <span className={cn("flex items-center gap-2", step >= 1 ? "text-primary" : "")}>
              <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center border-current">1</span>
              Upload Data
            </span>
            <div className="w-12 h-px bg-border" />
            <span className={cn("flex items-center gap-2", step >= 2 ? "text-primary" : "")}>
              <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center border-current">2</span>
              Select Intent
            </span>
          </div>
        </div>

        <div className="min-h-[400px]">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <Card className="border-dashed border-2 border-slate-300 shadow-none bg-slate-50/50">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  {!file ? (
                    <>
                      <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                        <UploadCloud className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Upload your CSV file</h3>
                      <p className="text-muted-foreground mb-8 max-w-sm">
                        Drag and drop your file here, or click to browse. 
                        Max size 10MB.
                      </p>
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <div className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-md flex items-center justify-center font-medium transition-colors shadow-lg shadow-primary/20">
                          Select File
                        </div>
                        <Input 
                          id="file-upload" 
                          type="file" 
                          accept=".csv" 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                      </Label>
                    </>
                  ) : (
                    <div className="w-full max-w-md">
                       <div className="bg-white p-6 rounded-xl shadow-lg border mb-8 flex items-center gap-4">
                          <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                            <FileSpreadsheet className="h-6 w-6" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-lg">{file.name}</p>
                            <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB • {MOCK_DATASET_SUMMARY.rows} rows detected</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            ✕
                          </Button>
                       </div>

                       <div className="space-y-4 text-left bg-white p-6 rounded-xl border">
                          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Data Preview</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                             <div>
                               <span className="text-muted-foreground">Columns:</span>
                               <span className="font-mono ml-2 font-medium">{MOCK_DATASET_SUMMARY.columns}</span>
                             </div>
                             <div>
                               <span className="text-muted-foreground">Types:</span>
                               <span className="font-mono ml-2 font-medium">int64, float64, object</span>
                             </div>
                          </div>
                       </div>
                       
                       <Button onClick={() => setStep(2)} className="w-full mt-8 h-12 text-lg shadow-md">
                         Continue to Intent <ArrowRight className="ml-2 h-5 w-5" />
                       </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <h2 className="text-2xl font-bold font-serif mb-6 text-center">Who is this story for?</h2>
               <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {Object.values(INTENT_MODES).map((mode) => {
                    const Icon = ICONS[mode.icon as keyof typeof ICONS];
                    const isSelected = intent === mode.id;
                    return (
                      <div 
                        key={mode.id}
                        onClick={() => setIntent(mode.id)}
                        className={cn(
                          "relative group cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-xl",
                          isSelected 
                            ? "border-primary bg-primary/5 shadow-lg ring-1 ring-primary" 
                            : "border-slate-200 bg-white hover:border-primary/50"
                        )}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4 text-primary animate-in zoom-in duration-300">
                            <CheckCircle2 className="h-6 w-6 fill-current" />
                          </div>
                        )}
                        <div className={cn(
                          "h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-colors",
                          isSelected ? "bg-primary text-primary-foreground" : "bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary"
                        )}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{mode.label}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 min-h-[60px]">
                          {mode.description}
                        </p>
                        <div className="space-y-2">
                           <div className="flex items-center text-xs gap-2">
                             <span className="font-semibold text-slate-700">Tone:</span>
                             <span className="text-slate-500">{mode.tone}</span>
                           </div>
                           <div className="flex items-center text-xs gap-2">
                             <span className="font-semibold text-slate-700">Level:</span>
                             <span className="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{mode.complexity}</span>
                           </div>
                        </div>
                      </div>
                    )
                  })}
               </div>
               
               <div className="flex justify-between items-center max-w-2xl mx-auto">
                 <Button variant="ghost" onClick={() => setStep(1)}>
                   Back
                 </Button>
                 <Button 
                   onClick={handleGenerate} 
                   disabled={!intent || loading}
                   size="lg"
                   className="min-w-[200px] h-12 text-lg shadow-lg shadow-primary/25"
                 >
                   {loading ? (
                     <>
                       <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                       Generating Story...
                     </>
                   ) : (
                     "Generate Story"
                   )}
                 </Button>
               </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}