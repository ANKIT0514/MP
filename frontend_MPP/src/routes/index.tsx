import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";
import { Activity, Ban, CheckCircle2, Code2, Network, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ClassificationBadge, MetricCard, SectionCard, SeverityBadge } from "@/components/security-ui";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { securityApi } from "@/services/securityApi";
import type { DashboardData } from "@/types/security";

export const Route = createFileRoute("/")({ head: () => ({ meta: [{ title: "Security Dashboard — SENTINEL AI" }, { name: "description", content: "Model-backed web application firewall security overview." }, { property: "og:title", content: "Security Dashboard — SENTINEL AI" }, { property: "og:description", content: "Model-backed WAF monitoring and detections." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Dashboard });

function Dashboard() {
  const [data, setData] = useState<DashboardData>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    void securityApi.getDashboard().then(setData).catch((cause: unknown) => {
      setError(cause instanceof Error ? cause.message : "Unable to load dashboard data.");
    });
  }, []);
  if (error) return <AppShell title="Security Dashboard" description="Live posture across inspected application traffic."><p className="rounded-md border border-danger-border bg-danger-muted p-4 text-sm text-danger" role="alert">{error}</p></AppShell>;
  if (!data) return <AppShell title="Security Dashboard" description="Live posture across inspected application traffic."><div className="h-96 animate-pulse rounded-md bg-muted" /></AppShell>;
  const t = data.totals;
  return <AppShell title="Security Dashboard" description="Persisted totals from model-backed payload inspections." action={<Button asChild><Link to="/inspector"><ShieldAlert />Inspect payload</Link></Button>}>
    <div className="mb-5 flex items-center gap-2 rounded-md border bg-card px-4 py-3 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-success" /><strong className="text-foreground">Live model data</strong><span>Counts and recent cases reflect inspections stored by the backend.</span></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6"><MetricCard label="Total Requests" value={t.requests.toLocaleString()} icon={Activity} /><MetricCard label="Threats Detected" value={t.threats.toLocaleString()} icon={ShieldAlert} /><MetricCard label="Benign Requests" value={t.benign.toLocaleString()} icon={CheckCircle2} /><MetricCard label="SQL Injection" value={t.sqli.toLocaleString()} icon={Code2} /><MetricCard label="XSS" value={t.xss.toLocaleString()} icon={Ban} /><MetricCard label="SSRF" value={t.ssrf.toLocaleString()} icon={Network} /></div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
      <SectionCard title="Detection statistics" action={<span className="text-xs text-muted-foreground">Last 7 days</span>}><ChartContainer config={{ requests: { label: "Requests", color: "var(--color-primary)" }, threats: { label: "Threats", color: "var(--color-danger)" } }} className="h-[280px] w-full"><AreaChart data={data.weekly}><CartesianGrid vertical={false} /><XAxis dataKey="day" tickLine={false} axisLine={false} /><YAxis tickLine={false} axisLine={false} /><ChartTooltip content={<ChartTooltipContent />} /><Area isAnimationActive={false} dataKey="requests" type="monotone" fill="var(--color-primary-muted)" stroke="var(--color-primary)" strokeWidth={2} /><Area isAnimationActive={false} dataKey="threats" type="monotone" fill="transparent" stroke="var(--color-danger)" strokeWidth={2} /></AreaChart></ChartContainer></SectionCard>
      <SectionCard title="Request distribution"><ChartContainer config={{ Benign: { color: "var(--color-success)" }, "SQL Injection": { color: "var(--color-danger)" }, XSS: { color: "var(--color-warning)" }, SSRF: { color: "var(--color-info)" } }} className="h-[220px] w-full"><PieChart><Pie isAnimationActive={false} data={data.distribution} dataKey="value" nameKey="name" innerRadius={58} outerRadius={84} paddingAngle={2}>{["var(--color-success)", "var(--color-danger)", "var(--color-warning)", "var(--color-info)"].map((color, index) => <Cell key={data.distribution[index]?.name ?? color} fill={color} />)}</Pie><ChartTooltip content={<ChartTooltipContent />} /></PieChart></ChartContainer><div className="grid grid-cols-2 gap-2">{data.distribution.map((item) => <div key={item.name} className="flex justify-between text-xs"><span className="text-muted-foreground">{item.name}</span><strong>{item.value.toLocaleString()}</strong></div>)}</div></SectionCard>
    </div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_310px]"><SectionCard title="Recent inspection activity" action={<Button asChild variant="ghost" size="sm"><Link to="/cases">View all</Link></Button>}>{data.recentCases.length ? <div className="divide-y">{data.recentCases.map((item) => <Link key={item.inspectionId} to="/detection" search={{ id: item.inspectionId }} className="grid grid-cols-[1fr_auto] gap-3 py-3 transition-colors hover:bg-muted/30 sm:grid-cols-[160px_1fr_auto_auto] sm:items-center"><ClassificationBadge value={item.classification} /><span className="truncate font-mono text-xs text-muted-foreground">{item.normalizedPayload}</span><SeverityBadge value={item.severity} /><span className="text-xs font-semibold tabular-nums">{item.confidence.toFixed(2)}%</span></Link>)}</div> : <p className="py-8 text-center text-sm text-muted-foreground">No inspections yet. Analyze a payload to populate this dashboard.</p>}</SectionCard><SectionCard title="System status"><div className="space-y-4"><Status label="Inspection engine" value="Connected" /><Status label="Validation ring" value="Active" /><Status label="SHAP explanations" value={data.shapEnabled ? "Enabled" : "Unavailable"} warning={!data.shapEnabled} /></div></SectionCard></div>
  </AppShell>;
}
function Status({ label, value, warning }: { label: string; value: string; warning?: boolean }) { return <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">{label}</span><span className="flex items-center gap-2 font-medium"><span className={`size-2 rounded-full ${warning ? "bg-warning" : "bg-success"}`} />{value}</span></div>; }
