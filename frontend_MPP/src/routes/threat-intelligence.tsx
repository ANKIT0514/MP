import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Radar } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ClassificationBadge, SectionCard } from "@/components/security-ui";
import { Button } from "@/components/ui/button";
import { securityApi } from "@/services/securityApi";
import type { SecurityCase } from "@/types/security";

export const Route = createFileRoute("/threat-intelligence")({ head: () => ({ meta: [{ title: "Threat Intelligence — SENTINEL AI" }, { name: "description", content: "MITRE ATT&CK and CAPEC mappings for model-backed detections." }, { property: "og:title", content: "Threat Intelligence — SENTINEL AI" }, { property: "og:description", content: "Threat mappings for inspected web traffic." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Threats });

function Threats() {
  const [items, setItems] = useState<SecurityCase[]>([]);
  const [error, setError] = useState<string>();
  useEffect(() => {
    void securityApi.getThreats().then(setItems).catch((cause: unknown) => {
      setError(cause instanceof Error ? cause.message : "Unable to load threat mappings.");
    });
  }, []);
  const techniqueCount = useMemo(() => new Set(items.map((item) => item.threatIntelligence.mitreTechnique.id)).size, [items]);
  const patternCount = useMemo(() => new Set(items.map((item) => item.threatIntelligence.capecPattern.id)).size, [items]);
  return <AppShell title="Threat Intelligence" description="Review MITRE ATT&CK and CAPEC context returned for persisted threat detections."><div className="grid gap-5 lg:grid-cols-3">
    <SectionCard title="Mapped detections" className="lg:col-span-2">
      {error ? <p className="text-sm text-danger" role="alert">{error}</p> : items.length ? <div className="space-y-3">{items.map((item) => <Link key={item.inspectionId} to="/detection" search={{ id: item.inspectionId }} className="block rounded-md border p-4 transition-all hover:border-primary/30 hover:shadow-sm"><div className="flex flex-wrap items-start justify-between gap-3"><div><ClassificationBadge value={item.classification} /><h3 className="mt-3 font-semibold">{item.threatIntelligence.mitreTechnique.id} — {item.threatIntelligence.mitreTechnique.name}</h3><p className="mt-1 text-xs text-muted-foreground">{item.threatIntelligence.capecPattern.id} · {item.threatIntelligence.capecPattern.name}</p></div><ArrowUpRight className="size-4 text-muted-foreground" /></div><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.threatIntelligence.rationale}</p></Link>)}</div> : <p className="py-8 text-center text-sm text-muted-foreground">No threat detections have been recorded.</p>}
    </SectionCard>
    <div className="space-y-5"><SectionCard title="Recorded coverage"><div className="space-y-4"><Stat label="Threat detections" value={items.length.toLocaleString()} /><Stat label="MITRE techniques" value={techniqueCount.toLocaleString()} /><Stat label="CAPEC patterns" value={patternCount.toLocaleString()} /></div></SectionCard><SectionCard title="STIX export"><div className="grid size-10 place-items-center rounded-md bg-primary-muted text-primary"><Radar /></div><p className="mt-4 text-sm leading-6 text-muted-foreground">The live inspection API returns MITRE and CAPEC mappings. STIX bundle generation is not enabled by this API.</p><Button asChild variant="outline" className="mt-4 w-full"><Link to="/cases"><Radar />View inspection history</Link></Button></SectionCard></div>
  </div></AppShell>;
}

function Stat({ label, value }: { label: string; value: string }) { return <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"><span className="text-sm text-muted-foreground">{label}</span><strong className="text-lg">{value}</strong></div>; }
