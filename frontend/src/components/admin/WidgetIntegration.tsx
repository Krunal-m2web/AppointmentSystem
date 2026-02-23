import { useState, useMemo, ChangeEvent, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Settings, Layout, Code, Play } from "lucide-react";
import { BookingForm } from "../BookingForm";
import { getMyCompany } from "@/services/CompanyService";

export function WidgetIntegration() {
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [companySlug, setCompanySlug] = useState<string>("");
  const [loading, setLoading] = useState(true);
  
  // Dynamic config
  const apiUrl = window.location.origin;

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const company = await getMyCompany();
        setCompanySlug(company.slug || "");
        setGbCompany(company.slug || "");
      } catch (err) {
        console.error("Failed to fetch company slug:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, []);

  // --- SHORTCODE GENERATOR ---
  const wpShortcode = `[mybooking-form company="${companySlug}" theme="${theme}"]`;
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  // --- PLAYGROUND STATE ---
  // Gutenberg
  const [gbCompany, setGbCompany] = useState(companySlug);
  const [gbTheme, setGbTheme] = useState<'light'|'dark'>('light');

  // Shortcode Preview
  const [scInput, setScInput] = useState(`[mybooking-form company="${companySlug}"]`);
  
  // Update scInput when companySlug is fetched
  useEffect(() => {
    if (companySlug) {
      setScInput(`[mybooking-form company="${companySlug}"]`);
    }
  }, [companySlug]);

  const parsedSc = useMemo(() => {
     // rudimentary parser
     const companyMatch = scInput.match(/company="([^"]+)"/);
     const themeMatch = scInput.match(/theme="([^"]+)"/);
     return {
         company: companyMatch ? companyMatch[1] : '',
         theme: themeMatch ? themeMatch[1] : 'light'
     };
  }, [scInput]);

  const handleDemoComplete = () => {
    toast.success("Booking Completed (Demo)");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h3 className="text-2xl font-bold tracking-tight">Widget Integration & Playground</h3>
            <p className="text-muted-foreground">
            Get embed codes or simulate the WordPress Plugin experience.
            </p>
        </div>
      </div>

      <Tabs defaultValue="playground" className="w-full">
        <TabsList className="mb-4 w-full justify-start overflow-x-auto">
          <TabsTrigger value="playground" className="gap-2"><Play className="h-4 w-4"/> Live Playground (WordPress)</TabsTrigger>
          <TabsTrigger value="codes" className="gap-2"><Code className="h-4 w-4"/> Embed Codes</TabsTrigger>
        </TabsList>

        {/* --- PLAYGROUND TAB --- */}
        <TabsContent value="playground" className="space-y-8">
            
            {/* 1. GUTENBERG SIMULATOR */}
            <Card className="border-indigo-100 shadow-sm overflow-hidden">
                <CardHeader className="bg-indigo-50/50 border-b border-indigo-100">
                    <div className="flex items-center gap-2">
                        <Layout className="h-5 w-5 text-indigo-600" />
                        <CardTitle>1. Gutenberg Block Simulator</CardTitle>
                    </div>
                    <CardDescription>
                        Visual Block Editor experience. Changes in the sidebar update the preview instantly.
                    </CardDescription>
                </CardHeader>
                <div className="grid grid-cols-1 lg:grid-cols-4 h-[600px]">
                    {/* Simplified Editor Canvas */}
                    <div className="lg:col-span-3 bg-gray-100 p-8 overflow-y-auto border-r relative">
                        <div className="max-w-3xl mx-auto bg-white min-h-[500px] shadow-sm p-8 rounded-sm">
                            <h1 className="text-4xl font-serif mb-6 text-gray-800 border-b pb-4">Services Page</h1>
                            <p className="mb-6 text-lg text-gray-600">This is standard page content. The booking widget block is rendered below:</p>
                            
                            {/* The Block */}
                            <div className="border border-dashed border-indigo-300 rounded mx-auto p-1 relative group">
                                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    MyBooking Block
                                </div>
                                
                                {/* Live Widget Preview */}
                                <div className={gbTheme === 'dark' ? 'dark bg-slate-900 p-4 rounded' : 'bg-white p-4'}>
                                   <BookingForm 
                                        companySlug={gbCompany} 
                                        onComplete={handleDemoComplete} 
                                   />
                                </div>
                            </div>

                            <p className="mt-6 text-gray-600">More content after the widget...</p>
                        </div>
                    </div>

                    {/* Sidebar Settings (Inspector Controls) */}
                    <div className="bg-white p-4 border-l space-y-6">
                        <div className="flex items-center gap-2 pb-4 border-b">
                            <Settings className="h-4 w-4" />
                            <span className="font-semibold text-sm">Block Settings</span>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Company Slug</Label>
                                <Input 
                                    value={gbCompany} 
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setGbCompany(e.target.value)} 
                                />
                                <p className="text-xs text-muted-foreground">
                                    This is your unique company identifier.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>Theme</Label>
                                <div className="flex gap-2">
                                    <Button 
                                        size="sm" 
                                        variant={gbTheme === 'light' ? 'default' : 'outline'}
                                        onClick={() => setGbTheme('light')}
                                        className="flex-1"
                                    >Light</Button>
                                    <Button 
                                        size="sm" 
                                        variant={gbTheme === 'dark' ? 'default' : 'outline'}
                                        onClick={() => setGbTheme('dark')}
                                        className="flex-1"
                                    >Dark</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* 3. SHORTCODE PREVIEW */}
            <Card className="border-indigo-100 shadow-sm">
                <CardHeader className="bg-indigo-50/50 border-b border-indigo-100">
                    <div className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-indigo-600" />
                        <CardTitle>2. Shortcode Support</CardTitle>
                    </div>
                    <CardDescription>
                        Test manual shortcode entry. Type below to see it render live.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 grid md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <Label>Content / Shortcode</Label>
                        <textarea 
                            className="w-full h-32 p-3 rounded-md border text-sm font-mono"
                            value={scInput}
                            onChange={(e) => setScInput(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                            Try changing the theme to "dark" or company slug.
                        </p>
                     </div>

                     <div className="border rounded-lg bg-gray-50 p-4 min-h-[200px] flex flex-col">
                        <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Live Render</div>
                        {parsedSc.company ? (
                             <div className={parsedSc.theme === 'dark' ? 'dark bg-slate-900 p-2 rounded' : ''}>
                                <BookingForm 
                                    companySlug={parsedSc.company} 
                                    onComplete={handleDemoComplete} 
                                />
                             </div>
                        ) : (
                            <div className="text-red-500 text-sm">Error: Company slug required</div>
                        )}
                     </div>
                </CardContent>
            </Card>

        </TabsContent>


        {/* --- CODES TAB (Existing Content) --- */}
        <TabsContent value="codes">
             <Card>
            <CardHeader>
              <CardTitle>Classic Embed Options</CardTitle>
              <CardDescription>
                Copy these codes to use on your website.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                
                <div className="space-y-4">
                    <h4 className="font-medium text-sm">HTML Embed</h4>
                    <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">{`<div id="booking-widget"></div>
<script src="${apiUrl}/widget/embed.js" data-company="${companySlug}"></script>`}</pre>
                     <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => handleCopy(`<div id="booking-widget"></div>\n<script src="${apiUrl}/widget/embed.js" data-company="${companySlug}"></script>`)}
                    >
                        <Copy className="h-4 w-4 mr-2" /> Copy HTML
                    </Button>
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium text-sm">WordPress Shortcode</h4>
                     <code className="bg-muted px-2 py-1 rounded text-xs select-all block">
                       {wpShortcode}
                    </code>
                     <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => handleCopy(wpShortcode)}
                    >
                        <Copy className="h-4 w-4 mr-2" /> Copy Shortcode
                    </Button>
                </div>

                 <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium text-sm">Plugin Location (Server)</h4>
                     <code className="bg-muted px-2 py-1 rounded text-xs select-all block">
                        backend/wwwroot/plugins/mybooking-plugin/
                    </code>
                </div>

            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Theme Toggles (kept for demo within the page context itself if needed, but redundant with the playground) */}
      <div className="flex items-center gap-4 p-4 border rounded-lg bg-white mt-8">
        <span className="text-sm font-medium">Global Widget Theme Preview:</span>
        <div className="flex gap-2">
            <Button 
                variant={theme === 'light' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTheme('light')}
            >
                Light
            </Button>
            <Button 
                variant={theme === 'dark' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTheme('dark')}
            >
                Dark
            </Button>
        </div>
      </div>
    </div>
  );
}
