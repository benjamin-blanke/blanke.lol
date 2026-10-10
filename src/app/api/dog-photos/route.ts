import { readdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const directory = path.join(process.cwd(), "public", "doggy");
    const files = await readdir(directory);
    const photos = files.filter((file) => /\.(avif|gif|jpe?g|png|webp)$/i.test(file)).map((file) => `/doggy/${encodeURIComponent(file)}`);
    return NextResponse.json({ photos }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ photos: [] }, { headers: { "Cache-Control": "no-store" } });
  }
}
