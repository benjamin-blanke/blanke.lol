import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NewsletterSignup from "@/components/section/newsletter-signup";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Occasional updates on projects, code, self-hosting and things Benjamin learns along the way.",
};

export default function NewsletterPage() {
  return (
    <main className="flex min-h-[65vh] flex-col justify-center gap-8 py-8">
      <Link href="/" className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"><ArrowLeft className="size-4" /> Back home</Link>
      <NewsletterSignup />
    </main>
  );
}
