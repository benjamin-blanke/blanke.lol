import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Newsletter signups are not configured yet. Please try again later." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { email, consent } = (body && typeof body === "object" ? body : {}) as { email?: unknown; consent?: unknown };
  if (typeof email !== "string" || email.length > 254 || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (consent !== true) {
    return NextResponse.json({ error: "Please confirm your newsletter subscription." }, { status: 400 });
  }

  try {
    const response = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        subscribed: true,
        source: "blanke.lol newsletter",
      }),
      cache: "no-store",
    });

    const result = await response.json().catch(() => null);
    if (!response.ok) {
      console.error("Loops subscription failed", response.status, result);
      return NextResponse.json({ error: "We couldn't complete your signup. Please try again in a moment." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Loops request failed", error);
    return NextResponse.json({ error: "The newsletter service is temporarily unavailable." }, { status: 502 });
  }
}
