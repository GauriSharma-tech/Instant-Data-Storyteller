import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import generatedImage from '@assets/generated_images/clean_abstract_data_visualization_hero_image.png';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Navbar */}
      <nav className="border-b bg-background/80 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold font-serif tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-sans">S</span>
            Instant Data Storyteller
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="ghost" className="font-medium">Sign In</Button>
            </Link>
            <Link href="/auth">
              <Button className="font-medium shadow-md">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 pt-24 pb-12 px-6">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-left-8 duration-700 fade-in">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight font-serif text-foreground">
              Turn CSVs into <br/>
              <span className="text-primary italic">compelling stories</span>
              <br/> instantly.
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Stop presenting boring spreadsheets. Upload your data and let our AI-powered engine generate beautiful, narrative-driven reports tailored to your audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth">
                <Button size="lg" className="text-lg px-8 h-14 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all rounded-full">
                  Create Free Report
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 h-14 rounded-full border-2">
                View Demo
              </Button>
            </div>
            
            <div className="pt-8 flex items-center gap-8 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                No account needed for demo
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Instant Generation
              </div>
            </div>
          </div>

          <div className="relative group animate-in slide-in-from-right-8 duration-700 fade-in delay-200">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border bg-card aspect-[4/3]">
               <img 
                 src={generatedImage} 
                 alt="App Screenshot" 
                 className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
               />
               
               {/* Floating Cards Mockup */}
               <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                  </div>
                  <div className="h-2 w-3/4 bg-slate-200 rounded mb-2" />
                  <div className="h-2 w-1/2 bg-slate-200 rounded" />
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-slate-50">
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
          &copy; 2024 Instant Data Storyteller. Built for the Mockup Challenge.
        </div>
      </footer>
    </div>
  );
}