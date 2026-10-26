import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { AnalysisDetails } from "@/components/analysis-details";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { securityApi } from "@/services/securityApi";
import type { PayloadAnalysis } from "@/types/security";

export const Route = createFileRoute("/detection")({ validateSearch: (search: Record<string, unknown>) => ({ id: typeof search["id"] === "string" ? search["id"] : undefined }), head: () => ({ meta: [{ title: "Detection Details — SENTINEL AI" }, { name: "description", content: "Detailed security verdict, model analysis, explainability, and threat mapping." }, { property: "og:title", content: "Detection Details — SENTINEL AI" }, { property: "og:description", content: "Review a hybrid WAF inspection and its forensic evidence." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Detection });
function Detection() {
  const { id } = Route.useSearch(); const [analysis, setAnalysis] = useState<PayloadAnalysis>(); const [error, setError] = useState<string>();
  useEffect(() => {
    setAnalysis(undefined);
    setError(undefined);
    if (!id) return;
    void securityApi.getCase(id).then((value) => {
      if (value) setAnalysis(value);
      else setError("Inspection not found. Submit a payload from the inspector or open a saved case.");
    }).catch((cause: unknown) => setError(cause instanceof Error ? cause.message : "Unable to load this inspection."));
  }, [id]);
  return <AppShell title="Detection Details" description="End-to-end evidence for a single inspected request." action={analysis ? <Button asChild><Link to="/reports" search={{ id: analysis.inspectionId }}><FileText />Create report</Link></Button> : undefined}>{analysis ? <AnalysisDetails analysis={analysis} /> : error ? <p className="rounded-md border border-danger-border bg-danger-muted p-4 text-sm text-danger" role="alert">{error}</p> : id ? <div className="h-96 animate-pulse rounded-md bg-muted" /> : <p className="rounded-md border p-4 text-sm text-muted-foreground">Choose an inspection from Cases or analyze a payload to view its result.</p>}</AppShell>;
}