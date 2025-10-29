import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  generateOrphansReport,
  generateBoreholesReport,
  generateOutreachReport,
  generateComprehensiveReport,
} from "@/lib/pdfGenerator";

export const ReportsList = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    orphans: 0,
    boreholes: 0,
    outreach: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [orphansResult, boreholesResult, outreachResult] = await Promise.all([
      supabase.from("orphans").select("id", { count: "exact", head: true }),
      supabase.from("boreholes").select("id", { count: "exact", head: true }),
      supabase.from("outreach_activities").select("id", { count: "exact", head: true }),
    ]);

    setStats({
      orphans: orphansResult.count || 0,
      boreholes: boreholesResult.count || 0,
      outreach: outreachResult.count || 0,
    });
  };

  const handleGenerateOrphansReport = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("orphans").select("*").order("created_at", { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        toast({
          title: "No data",
          description: "No orphans data available to generate report.",
          variant: "destructive",
        });
        return;
      }

      generateOrphansReport(data);
      toast({
        title: "Report generated",
        description: "Orphans report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate orphans report.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBoreholesReport = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("boreholes").select("*").order("created_at", { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        toast({
          title: "No data",
          description: "No boreholes data available to generate report.",
          variant: "destructive",
        });
        return;
      }

      generateBoreholesReport(data);
      toast({
        title: "Report generated",
        description: "Boreholes report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate boreholes report.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateOutreachReport = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("outreach_activities")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        toast({
          title: "No data",
          description: "No outreach activities data available to generate report.",
          variant: "destructive",
        });
        return;
      }

      generateOutreachReport(data);
      toast({
        title: "Report generated",
        description: "Outreach activities report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate outreach report.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateComprehensiveReport = async () => {
    setLoading(true);
    try {
      const [orphansResult, boreholesResult, outreachResult] = await Promise.all([
        supabase.from("orphans").select("*").order("created_at", { ascending: false }),
        supabase.from("boreholes").select("*").order("created_at", { ascending: false }),
        supabase.from("outreach_activities").select("*").order("date", { ascending: false }),
      ]);

      if (orphansResult.error) throw orphansResult.error;
      if (boreholesResult.error) throw boreholesResult.error;
      if (outreachResult.error) throw outreachResult.error;

      generateComprehensiveReport(
        orphansResult.data || [],
        boreholesResult.data || [],
        outreachResult.data || []
      );

      toast({
        title: "Report generated",
        description: "Comprehensive report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate comprehensive report.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">
          Generate and download PDF reports for your activities and programs.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card className="border-hope/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-hope" />
              Orphans Support Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Detailed report on orphan support activities, sponsored children, and program progress.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground">
                {stats.orphans} children in database
              </span>
            </div>
            <Button
              size="sm"
              className="w-full bg-hope hover:bg-hope/90"
              onClick={handleGenerateOrphansReport}
              disabled={loading || stats.orphans === 0}
            >
              <Download className="h-3 w-3 mr-2" />
              Download PDF
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Borehole Projects Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Progress report on water borehole projects, communities served, and project impact.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground">
                {stats.boreholes} projects in database
              </span>
            </div>
            <Button
              size="sm"
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleGenerateBoreholesReport}
              disabled={loading || stats.boreholes === 0}
            >
              <Download className="h-3 w-3 mr-2" />
              Download PDF
            </Button>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              Outreach Activities Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive report on community outreach events, beneficiaries, and activity types.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground">
                {stats.outreach} activities in database
              </span>
            </div>
            <Button
              size="sm"
              className="w-full bg-accent hover:bg-accent/90"
              onClick={handleGenerateOutreachReport}
              disabled={loading || stats.outreach === 0}
            >
              <Download className="h-3 w-3 mr-2" />
              Download PDF
            </Button>
          </CardContent>
        </Card>

        <Card className="border-compassion/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-compassion" />
              Comprehensive Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              All-inclusive report covering orphans, boreholes, and outreach activities with summary statistics.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground">
                Complete organizational overview
              </span>
            </div>
            <Button
              size="sm"
              className="w-full bg-compassion hover:bg-compassion/90"
              onClick={handleGenerateComprehensiveReport}
              disabled={loading}
            >
              <Download className="h-3 w-3 mr-2" />
              Download PDF
            </Button>
          </CardContent>
        </Card>
      </div>

      {loading && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">Generating report, please wait...</p>
        </div>
      )}
    </div>
  );
};