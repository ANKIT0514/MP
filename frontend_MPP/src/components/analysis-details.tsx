import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { DemoBadge, ProbabilityBars, SectionCard, VerdictBanner } from "@/components/security-ui";
import type { PayloadAnalysis } from "@/types/security";

export function AnalysisDetails({ analysis }: { analysis: PayloadAnalysis }) {
  const features = analysis.shapFeatures.map((item) => ({ ...item, value: Math.abs(item.contribution) }));
  return <div className="space-y-5">
    <VerdictBanner analysis={analysis} />
    <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
      <SectionCard title="Request inspection" action={analysis.demo ? <DemoBadge /> : null}>
        <div className="grid gap-5 sm:grid-cols-2">
          <CodeField label="Original payload" value={analysis.originalPayload} />
          <CodeField label="Normalized payload" value={analysis.normalizedPayload} />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 border-t pt-5 sm:grid-cols-4">
          <Fact label="Classification" value={analysis.classification} /><Fact label="Model confidence" value={`${analysis.confidence.toFixed(2)}%`} /><Fact label="Analysis time" value={`${analysis.analysisTimeMs} ms`} /><Fact label="Inspection ID" value={analysis.inspectionId} mono />
        </div>
      </SectionCard>
      <SectionCard title="Class probabilities" action={<span className="text-[10px] font-semibold uppercase text-muted-foreground">Model prediction</span>}><ProbabilityBars analysis={analysis} /></SectionCard>
    </div>
    <SectionCard title="Circuit-breaker validation" action={analysis.demo ? <DemoBadge label="Validation ring" /> : null}>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <div className="rounded-md border bg-muted/35 p-4"><p className="text-[10px] font-semibold uppercase text-muted-foreground">Model prediction</p><p className="mt-2 text-lg font-bold">{analysis.circuitBreaker.mlPrediction}</p><p className="mt-3 text-xs text-muted-foreground">Statistical classification from the structural model.</p></div>
        <div className="hidden items-center text-muted-foreground md:flex">→</div>
        <div className="rounded-md border border-primary/20 bg-primary-muted p-4"><p className="text-[10px] font-semibold uppercase text-primary">Final security verdict</p><p className="mt-2 text-lg font-bold">{analysis.circuitBreaker.finalVerdict}</p><p className="mt-3 text-xs text-muted-foreground">{analysis.circuitBreaker.reason}</p></div>
      </div>
      <div className="mt-4 grid gap-4 border-t pt-4 sm:grid-cols-2"><Fact label="Rule-based validation" value={analysis.circuitBreaker.ruleBasedValidation} /><Fact label="Validation status" value={analysis.circuitBreaker.status} /></div>
    </SectionCard>
    <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      <SectionCard title="SHAP feature importance" action={analysis.shapFeatures.length ? analysis.demo ? <DemoBadge label="Demo values" /> : null : null}>
        {features.length ? <ChartContainer config={{ value: { label: "SHAP importance", color: "var(--color-primary)" } }} className="h-[300px] w-full">
          <BarChart data={features} layout="vertical" margin={{ left: 10, right: 32 }}><CartesianGrid horizontal={false} /><XAxis type="number" tickLine={false} axisLine={false} /><YAxis dataKey="name" type="category" width={118} tickLine={false} axisLine={false} /><ChartTooltip content={<ChartTooltipContent hideLabel />} /><Bar isAnimationActive={false} dataKey="value" fill="var(--color-primary)" radius={[0, 3, 3, 0]} /></BarChart>
        </ChartContainer> : <p className="py-8 text-center text-sm text-muted-foreground">Feature attribution is unavailable for this inspection. Open a saved inspection again to calculate SHAP values.</p>}
      </SectionCard>
      <SectionCard title="Threat intelligence" action={analysis.demo ? <DemoBadge /> : null}>
        <div className="space-y-4"><Intel label="MITRE ATT&CK technique" title={`${analysis.threatIntelligence.mitreTechnique.id} — ${analysis.threatIntelligence.mitreTechnique.name}`} /><Intel label="CAPEC pattern" title={`${analysis.threatIntelligence.capecPattern.id} — ${analysis.threatIntelligence.capecPattern.name}`} /><Intel label="Detected behavior" title={analysis.threatIntelligence.detectedBehavior} /><div><p className="text-[10px] font-semibold uppercase text-muted-foreground">Mapping rationale</p><p className="mt-1.5 text-sm leading-6">{analysis.threatIntelligence.rationale}</p></div><div className="flex flex-wrap gap-2">{analysis.threatIntelligence.indicators.map((item) => <span key={item} className="rounded-sm border bg-muted/50 px-2 py-1 text-xs">{item}</span>)}</div></div>
      </SectionCard>
    </div>
  </div>;
}

function CodeField({ label, value }: { label: string; value: string }) { return <div><p className="mb-2 text-[10px] font-semibold uppercase text-muted-foreground">{label}</p><pre className="h-32 overflow-auto whitespace-pre-wrap break-all rounded-md border bg-code p-3 font-mono text-xs leading-5 text-code-foreground">{value}</pre></div>; }
function Fact({ label, value, mono }: { label: string; value: string; mono?: boolean }) { return <div><p className="text-[10px] font-semibold uppercase text-muted-foreground">{label}</p><p className={`mt-1.5 text-sm font-semibold ${mono ? "font-mono text-xs" : ""}`}>{value}</p></div>; }
function Intel({ label, title }: { label: string; title: string }) { return <div className="rounded-md border p-3"><p className="text-[10px] font-semibold uppercase text-primary">{label}</p><p className="mt-1 text-sm font-semibold">{title}</p></div>; }
