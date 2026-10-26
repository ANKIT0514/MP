import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Download, FileClock, FileText, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ClassificationBadge, SectionCard } from "@/components/security-ui";
import { Button } from "@/components/ui/button";
import { downloadForensicPdf } from "@/lib/report-pdf";
import { securityApi } from "@/services/securityApi";
import type { ForensicReport, PayloadAnalysis } from "@/types/security";

export const Route = createFileRoute("/reports")({ validateSearch: (search: Record<string, unknown>) => ({ id: typeof search["id"] === "string" ? search["id"] : undefined }), head: () => ({ meta: [{ title: "Forensic Reports — SENTINEL AI" }, { name: "description", content: "Generate and download forensic reports from saved model inspections." }, { property: "og:title", content: "Forensic Reports — SENTINEL AI" }, { property: "og:description", content: "Forensic reports for persisted WAF inspection results." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Reports });

function Reports() {
  const { id } = Route.useSearch();
  const [analysis, setAnalysis] = useState<PayloadAnalysis>();
  const [report, setReport] = useState<ForensicReport>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  useEffect(() => {
    setAnalysis(undefined);
    setReport(undefined);
    setError(undefined);
    if (!id) return;
    void securityApi.getCase(id).then((value) => {
      if (value) setAnalysis(value);
      else setError("Inspection not found. Select a saved case or analyze a payload first.");
    }).catch((cause: unknown) => setError(cause instanceof Error ? cause.message : "Unable to load inspection data."));
  }, [id]);
  async function generate() {
    if (!analysis) return;
    setLoading(true);
    setError(undefined);
    try {
      setReport(await securityApi.generateReport(analysis));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to generate the report.");
    } finally {
      setLoading(false);
    }
  }
  return <AppShell title="Forensic Reports" description="Package persisted inspection evidence into a review-ready incident report.">
    {error && <p className="mb-4 rounded-md border border-danger-border bg-danger-muted p-4 text-sm text-danger" role="alert">{error}</p>}
    <div className="grid gap-5 xl:grid-cols-[360px_1fr]"><div className="space-y-5"><SectionCard title="Report controls">{analysis ? <><div className="rounded-md border bg-muted/30 p-4"><div className="flex items-center justify-between"><ClassificationBadge value={analysis.classification} /><span className="text-xs font-semibold">{analysis.model.confidence.toFixed(2)}% model confidence</span></div><p className="mt-3 truncate font-mono text-xs text-muted-foreground">{analysis.inspectionId}</p></div><Button className="mt-4 w-full" size="lg" disabled={loading} onClick={() => void generate()}>{loading ? <LoaderCircle className="animate-spin" /> : <FileText />}{report ? "Regenerate Report" : "Generate Forensic Report"}</Button>{report && <Button className="mt-2 w-full" variant="outline" size="lg" onClick={() => void downloadForensicPdf(report)}><Download />Download PDF</Button>}</> : <p className="text-sm text-muted-foreground">Open a saved inspection to generate its report.</p>}</SectionCard><SectionCard title="Report specification"><div className="space-y-3 text-sm text-muted-foreground"><p className="flex justify-between"><span>Format</span><strong className="text-foreground">PDF / A4</strong></p><p className="flex justify-between"><span>Pages</span><strong className="text-foreground">4</strong></p><p className="flex justify-between"><span>STIX bundle</span><strong className="text-foreground">Not generated</strong></p><p className="flex justify-between"><span>Classification</span><strong className="text-foreground">Confidential</strong></p></div></SectionCard></div><SectionCard title="Report preview" action={report ? <span className="flex items-center gap-1.5 text-xs font-semibold text-success"><CheckCircle2 className="size-4" />Ready</span> : <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><FileClock className="size-4" />Not generated</span>}>{report ? <ReportPreview report={report} /> : <div className="grid min-h-[620px] place-items-center text-center"><div><div className="mx-auto grid size-14 place-items-center rounded-md bg-muted text-muted-foreground"><FileText /></div><h3 className="mt-4 font-semibold">No report generated</h3><p className="mt-2 max-w-sm text-sm text-muted-foreground">Select a saved inspection and generate a report to preview its evidence.</p></div></div>}</SectionCard></div>
  </AppShell>;
}

function ReportPreview({ report }: { report: ForensicReport }) {
  const analysis = report.analysis;
  const pages = [
    { title: "Executive summary", items: [report.reportId, `Final verdict: ${analysis.classification}`, `Severity: ${analysis.severity}`, `Model confidence: ${analysis.model.confidence.toFixed(2)}%`] },
    { title: "Request & model analysis", items: ["Original and normalized payload", "Four-class model probabilities", "Circuit-breaker validation", `Model prediction: ${analysis.model.classification}`] },
    { title: "Explainability & intelligence", items: [analysis.shapFeatures.length ? "SHAP feature contributions" : "SHAP explanations unavailable", `${analysis.threatIntelligence.mitreTechnique.id} MITRE ATT&CK`, `${analysis.threatIntelligence.capecPattern.id} CAPEC`, analysis.threatIntelligence.rationale] },
    { title: "Forensic evidence", items: [analysis.threatIntelligence.stixBundle ? "STIX bundle available" : "No STIX bundle generated", `Inspection ID: ${analysis.inspectionId}`, ...analysis.threatIntelligence.indicators, `Generated: ${report.generatedAt}`] },
  ];
  return <div className="grid gap-4 md:grid-cols-2">{pages.map((page, index) => <div key={page.title} className="aspect-[0.707] border bg-paper p-5 shadow-sm"><div className="border-b border-paper-border bg-report-header px-3 py-2 text-[9px] font-bold text-report-header-foreground">SENTINEL AI <span className="float-right font-medium">PAGE {index + 1} / 4</span></div><p className="mt-8 text-[9px] font-bold uppercase text-primary">Forensic Threat Intelligence</p><h3 className="mt-2 text-lg font-bold text-report-foreground">{page.title}</h3><div className="mt-5 space-y-3">{page.items.map((item) => <div key={item} className="border-b border-paper-border pb-2 text-[10px] text-report-muted">{item}</div>)}</div><div className="mt-auto" /></div>)}</div>;
}
