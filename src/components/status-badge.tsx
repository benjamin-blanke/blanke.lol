"use client";

import { useEffect, useState } from "react";

type Status = "operational" | "maintenance" | "degraded" | "outage" | "unknown";
const copy: Record<Status, { label: string; dot: string }> = {
  operational: { label: "All systems operational", dot: "bg-emerald-500" },
  maintenance: { label: "Under maintenance", dot: "bg-amber-400" },
  degraded: { label: "Partial disruption", dot: "bg-amber-400" },
  outage: { label: "Service outage", dot: "bg-red-500" },
  unknown: { label: "Status unavailable", dot: "bg-zinc-500" },
};
export default function StatusBadge() {
  const [status, setStatus] = useState<Status>("unknown");
  useEffect(() => {
    let active = true;
    const check = () => fetch("/api/status", { cache: "no-store" }).then(r => r.json()).then(data => { if (active && data?.state in copy) setStatus(data.state as Status); }).catch(() => { if (active) setStatus("unknown"); });
    check();
    const timer = window.setInterval(check, 30_000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);
  const item = copy[status];
  return <a href="https://status.blanke.lol" target="_blank" rel="noreferrer" aria-label={`LIVCK status: ${item.label}`} title="Open live status page" className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-border/80 bg-muted/30 px-2.5 py-1 text-[11px] leading-4 text-muted-foreground transition hover:border-foreground/25 hover:text-foreground">
    <span className={`size-1.5 shrink-0 rounded-full ${item.dot}`} />
    <span className="font-medium text-foreground/90">{item.label}</span>
    <span className="text-muted-foreground/70">· live</span>
  </a>;
}
