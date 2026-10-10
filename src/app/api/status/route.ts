import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Reads the public LIVCK status page server-side. No API key is exposed to visitors.
export async function GET() {
  try {
    const response = await fetch("https://status.blanke.lol", {
      cache: "no-store",
      headers: { "User-Agent": "BlankeLol-StatusBadge/1.0", Accept: "text/html,application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Status page returned ${response.status}`);
    const contentType = response.headers.get("content-type") ?? "";
    const raw = await response.text();
    const text = (contentType.includes("json") ? raw : raw
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;|&#160;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#x27;|&#39;/gi, "'")).toLowerCase().replace(/[_-]/g, " ").replace(/\s+/g, " ");

    // Evaluate non-operational states first to avoid matching generic words like "operational" in metadata.
    let state: "operational" | "maintenance" | "degraded" | "outage" | "unknown" = "unknown";
    if (/under maintenance|maintenance in progress|scheduled maintenance|wartung|in wartung/.test(text)) state = "maintenance";
    else if (/major outage|major service outage|critical outage|service outage|total outage|kritische störung|ausfall|offline|unavailable/.test(text)) state = "outage";
    else if (/partial outage|degraded performance|degraded|partial disruption|performance issues|beeinträchtigt|eingeschränkt|minor incident/.test(text)) state = "degraded";
    else if (/all systems operational|all services operational|all components operational|alle systeme (laufen|betriebsbereit|funktionsfähig)|alle dienste (laufen|betriebsbereit)|operational/.test(text)) state = "operational";

    return NextResponse.json({ state, checkedAt: new Date().toISOString(), source: "https://status.blanke.lol" }, { headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch {
    return NextResponse.json({ state: "unknown", checkedAt: new Date().toISOString(), source: "https://status.blanke.lol" }, { headers: { "Cache-Control": "no-store, max-age=0" } });
  }
}
