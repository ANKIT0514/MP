import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, BarChart3, Bell, BrainCircuit, ChevronRight, FileSearch, FileText, LayoutDashboard, Menu, Radar, Search, ShieldCheck, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/cases", label: "Cases", icon: FileSearch },
  { to: "/inspector", label: "Payload Inspector", icon: Search },
  { to: "/detection", label: "Detection Details", icon: Activity },
  { to: "/threat-intelligence", label: "Threat Intelligence", icon: Radar },
  { to: "/model-insights", label: "Model Insights", icon: BrainCircuit },
  { to: "/reports", label: "Reports", icon: FileText },
] as const;

function Sidebar({ close }: { close?: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
    <div className="flex h-20 items-center gap-3 border-b border-sidebar-border px-5">
      <div className="grid size-10 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"><ShieldCheck className="size-5" /></div>
      <div><div className="text-sm font-bold">SENTINEL AI</div><div className="mt-0.5 text-[11px] text-sidebar-foreground/55">Web Application Firewall</div></div>
    </div>
    <div className="px-4 pb-2 pt-6 text-[10px] font-semibold uppercase text-sidebar-foreground/40">Security Operations</div>
    <nav className="space-y-1 px-3">
      {nav.map((item) => { const Icon = item.icon; const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to); return <Link key={item.to} to={item.to} onClick={close} className={cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors", active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/65 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground")}><Icon className={cn("size-4", active && "text-sidebar-primary")} />{item.label}{active && <ChevronRight className="ml-auto size-3.5" />}</Link>; })}
    </nav>
    <div className="mt-auto border-t border-sidebar-border p-4"><div className="rounded-md border border-sidebar-border bg-sidebar-accent/50 p-3"><div className="flex items-center gap-2 text-xs font-semibold"><span className="size-2 rounded-full bg-primary" />Model API</div><p className="mt-1.5 text-[11px] leading-4 text-sidebar-foreground/50">Payload analysis and inspection history.</p></div></div>
  </div>;
}

export function AppShell({ title, description, action, children }: { title: string; description: string; action?: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen bg-background text-foreground">
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block"><Sidebar /></aside>
    {open && <div className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setOpen(false)}><aside className="h-full w-72" onClick={(event) => event.stopPropagation()}><Sidebar close={() => setOpen(false)} /></aside><Button variant="ghost" size="icon" aria-label="Close navigation" className="absolute left-[17.5rem] top-4 bg-background" onClick={() => setOpen(false)}><X /></Button></div>}
    <div className="lg:pl-64">
      <header className="sticky top-0 z-20 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur md:px-7">
        <Button variant="ghost" size="icon" className="mr-3 lg:hidden" aria-label="Open navigation" onClick={() => setOpen(true)}><Menu /></Button>
        <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><ShieldCheck className="size-4 text-primary" /> Security Operations Center <ChevronRight className="size-3" /> <span className="text-foreground">{title}</span></div>
        <div className="ml-auto flex items-center gap-2"><span className="hidden items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs font-medium text-muted-foreground sm:flex"><span className="size-1.5 rounded-full bg-primary" />API: Model-backed</span><Button variant="ghost" size="icon" aria-label="Notifications"><Bell /></Button><div className="grid size-8 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground">SA</div></div>
      </header>
      <main className="mx-auto max-w-[1500px] p-4 md:p-7">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-[11px] font-semibold uppercase text-primary">Sentinel control plane</p><h1 className="text-2xl font-bold md:text-3xl">{title}</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p></div>{action}</div>
        {children}
      </main>
    </div>
  </div>;
}
