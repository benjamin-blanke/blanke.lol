"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Linkedin, Share2, X } from "lucide-react";

export function ShareDialog({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.href), []);
  const copy = async () => { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return <>
    <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:bg-accent"><Share2 className="size-4"/> Share</button>
    {open && <div className="fixed inset-0 z-[90] grid place-items-center bg-black/55 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="w-full max-w-xl rounded-2xl border border-border bg-background p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200" onClick={e=>e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-semibold">Share this post</h2><p className="mt-1 text-muted-foreground">“{title}”</p></div><button onClick={()=>setOpen(false)} className="rounded-full bg-muted p-2 hover:bg-accent"><X className="size-5"/></button></div>
        <p className="mt-6 mb-2 font-semibold">Copy link</p><div className="flex gap-2"><div className="min-w-0 flex-1 truncate rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm">{url}</div><button onClick={copy} className="rounded-lg border border-border px-3 hover:bg-accent">{copied?<Check className="size-4"/>:<Copy className="size-4"/>}</button></div>
        <p className="mt-5 mb-2 font-semibold">Share on</p><div className="flex flex-wrap gap-2"><a target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-accent">𝕏 Twitter / X</a><a target="_blank" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-accent"><Linkedin className="size-4"/> LinkedIn</a></div>
      </div>
    </div>}
  </>;
}
