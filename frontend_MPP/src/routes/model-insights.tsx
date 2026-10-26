import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, BrainCircuit, Database, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/security-ui";

export const Route = createFileRoute("/model-insights")({ head: () => ({ meta: [{ title: "Model Insights — SENTINEL AI" }, { name: "description", content: "Documented architecture and measured model information." }, { property: "og:title", content: "Model Insights — SENTINEL AI" }, { property: "og:description", content: "Review the structural hybrid detection model." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Insights });

function Insights() {
  return <AppShell title="Model Insights" description="Architecture and evaluation information for the deployed hybrid detection pipeline.">
    <div className="mb-4 rounded-md border border-warning-border bg-warning-muted px-4 py-3 text-xs text-warning-foreground"><strong>Evaluation data unavailable:</strong> The repository does not contain a verified evaluation report. No precision, recall, F1, or confusion-matrix values are presented.</div>
    <div className="grid gap-5 xl:grid-cols-2">
      <SectionCard title="Hybrid model architecture"><div className="grid gap-3"><Node label="Character-level tokenizer · max length 250" icon={Database} /><ArrowDown className="mx-auto text-muted-foreground" /><div className="grid grid-cols-2 gap-3"><Node label="Bidirectional LSTM sequence stream" icon={BrainCircuit} /><Node label="42 structural feature stream" icon={Database} /></div><ArrowDown className="mx-auto text-muted-foreground" /><Node label="Late fusion · dense classification layers" icon={BrainCircuit} /><ArrowDown className="mx-auto text-muted-foreground" /><Node label="Four-class softmax output" icon={ShieldCheck} /></div></SectionCard>
      <SectionCard title="Inference and validation"><div className="space-y-4 text-sm leading-6 text-muted-foreground"><p>The backend canonicalizes submitted payloads, creates character sequences and structural features, then runs the saved Keras model and tokenizer.</p><p>Model probabilities are retained separately from the final verdict. A deterministic validation ring may override a model prediction; both values are returned for inspection.</p><p className="rounded-md border bg-muted/40 p-3"><strong className="text-foreground">Output classes:</strong> Benign, XSS, SQL Injection, and SSRF.</p><p>Kernel SHAP estimates how the 42 engineered structural features contribute to the model's predicted class. The character-sequence input is held fixed, and the approximate explanation uses a bounded sample budget for interactive response times.</p></div></SectionCard>
    </div>
  </AppShell>;
}

function Node({ label, icon: Icon }: { label: string; icon: React.ComponentType<{ className?: string }> }) { return <div className="rounded-md border bg-card p-4 text-center shadow-xs"><Icon className="mx-auto mb-2 size-4 text-primary" /><p className="text-xs font-semibold">{label}</p></div>; }
