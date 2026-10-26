import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, LoaderCircle, ScanSearch } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { DemoBadge, SectionCard } from "@/components/security-ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SAMPLE_PAYLOADS, securityApi } from "@/services/securityApi";
import type { Classification } from "@/types/security";

export const Route = createFileRoute("/inspector")({ head: () => ({ meta: [{ title: "Payload Inspector — SENTINEL AI" }, { name: "description", content: "Analyze HTTP requests with hybrid model and rule validation." }, { property: "og:title", content: "Payload Inspector — SENTINEL AI" }, { property: "og:description", content: "Inspect application traffic using explainable hybrid detection." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Inspector });
function Inspector() {
  const [payload, setPayload] = useState(SAMPLE_PAYLOADS["SQL Injection"]); const [loading, setLoading] = useState(false); const [error, setError] = useState<string>(); const navigate = useNavigate();
  async function analyze() {
    if (!payload.trim()) return;
    setLoading(true);
    setError(undefined);
    try {
      const result = await securityApi.analyzePayload(payload);
      sessionStorage.setItem("sentinel-latest-analysis", JSON.stringify(result));
      await navigate({ to: "/detection", search: { id: "latest" } });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The model API request failed.");
    } finally {
      setLoading(false);
    }
  }
  return <AppShell title="Payload Inspector" description="Analyze HTTP traffic through structural classification, canonicalization, and deterministic security validation." action={<Badge variant="outline" className="border-success-border bg-success-muted text-success">Live model API</Badge>}>
    <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
      <SectionCard title="HTTP request or payload" action={<span className="text-xs text-muted-foreground">Plain text · max 10 KB</span>}><Textarea value={payload} onChange={(event) => setPayload(event.target.value)} maxLength={10 * 1024} className="min-h-[360px] resize-y bg-code font-mono text-sm leading-6 text-code-foreground" aria-label="Payload input" /><div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-muted-foreground">{payload.length.toLocaleString()} characters</p><Button size="lg" disabled={loading || !payload.trim()} onClick={() => void analyze()}>{loading ? <><LoaderCircle className="animate-spin" />Analyzing request…</> : <><ScanSearch />Analyze Payload</>}</Button></div>{error && <p className="mt-3 text-sm text-danger" role="alert">{error}</p>}</SectionCard>
      <div className="space-y-5"><SectionCard title="Sample payloads"><div className="space-y-2">{(Object.keys(SAMPLE_PAYLOADS) as Classification[]).map((name) => <Button key={name} variant={payload === SAMPLE_PAYLOADS[name] ? "secondary" : "outline"} className="h-auto w-full justify-start py-3 text-left" onClick={() => setPayload(SAMPLE_PAYLOADS[name])}><span className="grid size-6 shrink-0 place-items-center rounded-sm bg-primary-muted text-primary"><CheckCircle2 className="size-3.5" /></span>{name}</Button>)}</div></SectionCard><SectionCard title="Inspection pipeline"><ol className="space-y-4">{["Recursive canonicalization", "42 structural features", "Four-class model inference", "Circuit-breaker validation", "Persist prediction to history"].map((step, index) => <li key={step} className="flex gap-3 text-sm"><span className="grid size-6 shrink-0 place-items-center rounded-full border text-[10px] font-bold text-primary">{index + 1}</span><span className="pt-0.5">{step}</span></li>)}</ol></SectionCard></div>
    </div>
    {loading && <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/20 backdrop-blur-sm"><div className="w-[min(90vw,420px)] rounded-md border bg-card p-7 shadow-xl"><LoaderCircle className="size-7 animate-spin text-primary" /><h2 className="mt-4 text-lg font-bold">Inspecting payload</h2><p className="mt-2 text-sm text-muted-foreground">Canonicalizing input and validating the model verdict.</p><div className="mt-5 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full w-3/4 animate-pulse bg-primary" /></div></div></div>}
  </AppShell>;
}