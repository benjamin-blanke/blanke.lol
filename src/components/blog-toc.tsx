"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronRight, List, X } from "lucide-react";

type Heading = { id: string; text: string; level: number };

export function BlogToc() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("article h1, article h2, article h3"));
    const seen = new Map<string, number>();
    const items = nodes.map((el, i) => {
      let base = (el.id || el.textContent || `section-${i}`).toLowerCase().trim()
        .replace(/[^a-z0-9äöüß]+/g, "-").replace(/^-|-$/g, "");
      const count = seen.get(base) || 0;
      seen.set(base, count + 1);
      if (count) base += `-${count + 1}`;
      el.id = base;
      return { id: base, text: el.textContent || "Section", level: Number(el.tagName[1]) };
    });
    setHeadings(items);
    if (items[0]) setActive(items[0].id);

    const onScroll = () => {
      const y = window.scrollY + 180;
      let current = items[0]?.id || "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= y) current = item.id;
      }
      setActive(current);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeTitle = useMemo(() => headings.find(h => h.id === active)?.text || "Contents", [headings, active]);
  if (!headings.length) return null;

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-24 left-1/2 z-[120] -translate-x-1/2 md:bottom-auto md:left-5 md:top-1/2 md:translate-x-0 md:-translate-y-1/2">
      {/* Desktop TOC: stays mounted so opening AND closing animate smoothly. */}
      <div
        className={`absolute left-[72px] top-1/2 hidden w-[390px] -translate-y-1/2 overflow-hidden rounded-[28px] border border-white/10 bg-[#171717]/95 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] md:block ${
          open
            ? "pointer-events-auto translate-x-0 scale-100 opacity-100 blur-0"
            : "pointer-events-none -translate-x-5 scale-[.96] opacity-0 blur-sm"
        }`}
      >
        <div className="flex items-center justify-between px-3 pb-2 pt-1">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            <List className="size-3.5" /> Table of contents
          </div>
          <button onClick={() => setOpen(false)} className="grid size-8 place-items-center rounded-full text-zinc-500 transition hover:bg-white/10 hover:text-white" aria-label="Close table of contents">
            <X className="size-4" />
          </button>
        </div>
        <div className="max-h-[62vh] overflow-y-auto">
          {headings.map((h, index) => (
            <button
              key={h.id}
              onClick={() => jump(h.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-300 ${active === h.id ? "translate-x-1 bg-white/10 text-white" : "text-zinc-400 hover:translate-x-1 hover:bg-white/5 hover:text-white"}`}
              style={{ paddingLeft: `${12 + (h.level - 1) * 14}px`, transitionDelay: open ? `${Math.min(index * 22, 160)}ms` : "0ms" }}
            >
              <span className={`size-2 shrink-0 rounded-full transition-all duration-300 ${active === h.id ? "scale-110 bg-white shadow-[0_0_12px_rgba(255,255,255,.45)]" : "bg-zinc-700"}`} />
              <span className="truncate">{h.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile menu remains a bottom sheet. */}
      <div className={`absolute bottom-[68px] left-1/2 w-[min(92vw,420px)] -translate-x-1/2 overflow-hidden rounded-[28px] border border-white/10 bg-[#171717]/95 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] md:hidden ${open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-[.96] opacity-0"}`}>
        <div className="flex items-center gap-2 px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500"><List className="size-3.5"/> Table of contents</div>
        <div className="max-h-[55vh] overflow-y-auto">
          {headings.map((h) => (
            <button key={h.id} onClick={() => jump(h.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${active === h.id ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`} style={{ paddingLeft: `${12 + (h.level - 1) * 14}px` }}>
              <span className={`size-2 shrink-0 rounded-full ${active === h.id ? "bg-white" : "bg-zinc-700"}`} />
              <span className="truncate">{h.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile compact bubble */}
      <button onClick={() => setOpen(v => !v)} className="flex h-14 w-[min(88vw,360px)] items-center gap-3 rounded-full border border-white/10 bg-[#181818]/95 px-4 text-left shadow-2xl backdrop-blur-xl transition hover:bg-[#202020] md:hidden">
        <span className="size-2.5 shrink-0 rounded-full bg-white" />
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-white">{activeTitle}</span>
        <span className="grid size-9 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(white ${progress}%, #4a4a4a ${progress}% 100%)` }}>
          <span className="grid size-7 place-items-center rounded-full bg-[#181818]"><ChevronRight className={`size-4 text-zinc-300 transition-transform duration-500 ${open ? "rotate-90" : "-rotate-90"}`} /></span>
        </span>
      </button>

      {/* Desktop vertical bubble: centered on the LEFT side. */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={`${open ? "Close" : "Open"} table of contents. Current section: ${activeTitle}`}
        className={`group relative hidden h-[300px] w-14 overflow-hidden rounded-full border border-white/10 bg-[#181818]/95 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:w-[60px] hover:bg-[#202020] md:flex md:flex-col md:items-center md:justify-between md:py-3 ${open ? "scale-[1.03] border-white/20 bg-[#202020]" : "scale-100"}`}
      >
        <span className="relative grid size-9 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(white ${progress}%, #4a4a4a ${progress}% 100%)` }}>
          <span className="grid size-7 place-items-center rounded-full bg-[#181818] transition-colors group-hover:bg-[#202020]">
            <ChevronRight className={`size-4 text-zinc-300 transition-transform duration-500 ${open ? "rotate-180" : "rotate-0"}`} />
          </span>
        </span>

        <span className="flex min-h-0 flex-1 items-center justify-center py-3">
          <span className="max-h-[205px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-white [writing-mode:vertical-rl] rotate-180">
            {activeTitle}
          </span>
        </span>

        <span className={`size-2.5 shrink-0 rounded-full bg-white transition-all duration-500 ${open ? "scale-125 shadow-[0_0_16px_rgba(255,255,255,.6)]" : "scale-100"}`} />
      </button>
    </div>
  );
}
