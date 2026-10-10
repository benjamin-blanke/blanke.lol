import Navbar from "@/components/navbar";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Github, Instagram, ArrowUpRight, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import StatusBadge from "@/components/status-badge";

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased relative">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative z-10 mx-auto max-w-2xl px-6 pb-24 pt-20 sm:pb-24 sm:pt-24">
              {children}
              <footer className="mt-24 border-t border-border/70 pt-8 pb-5 sm:mt-28 sm:pt-10">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-xs">
                    <Link href="/" aria-label="Benjamin Blanke — home" className="group inline-flex items-center gap-3">
                      <Image src="/me.jpg" alt="Coco, my dog" width={48} height={48} className="size-11 rounded-full border object-cover transition-transform duration-200 group-hover:rotate-3 group-hover:scale-105" />
                      <span className="font-semibold tracking-tight">Benjamin Blanke<span className="ml-1 text-muted-foreground">↗</span></span>
                    </Link>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">Developer from Germany. Building useful things for the web, hosting and open source.</p>
                    <div className="mt-4 flex items-center gap-2">
                      <a aria-label="GitHub" href="https://github.com/benjamin-blanke" target="_blank" rel="noreferrer" className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition hover:bg-muted hover:text-foreground"><Github className="size-4" /></a>
                      <a aria-label="Instagram" href="https://instagram.com/benjaminoliverblanke" target="_blank" rel="noreferrer" className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition hover:bg-muted hover:text-foreground"><Instagram className="size-4" /></a>
                      <a aria-label="Email" href="mailto:be.blanke@pm.me" className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition hover:bg-muted hover:text-foreground"><Mail className="size-4" /></a>
                    </div>
                    <div className="mt-3">
                      <StatusBadge />
                    </div>
                  </div>
                  <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-12 gap-y-7 sm:gap-x-14">
                    <div><h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Explore</h2><ul className="mt-3 space-y-2.5 text-sm"><li><Link href="/blog" className="text-muted-foreground transition hover:text-foreground">Blog</Link></li><li><Link href="/links" className="text-muted-foreground transition hover:text-foreground">Links</Link></li><li><Link href="/newsletter" className="text-muted-foreground transition hover:text-foreground">Newsletter</Link></li><li><a href="https://github.com/benjamin-blanke" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted-foreground transition hover:text-foreground">GitHub <ArrowUpRight className="size-3" /></a></li></ul></div>
                    <div><h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Information</h2><ul className="mt-3 space-y-2.5 text-sm"><li><a href="https://legal.blanke.lol/imprint" target="_blank" rel="noreferrer" className="text-muted-foreground transition hover:text-foreground">Imprint</a></li><li><a href="https://legal.blanke.lol/karin/datenschutz" target="_blank" rel="noreferrer" className="text-muted-foreground transition hover:text-foreground">Privacy</a></li><li><a href="mailto:be.blanke@pm.me" className="text-muted-foreground transition hover:text-foreground">Contact</a></li></ul></div>
                  </nav>
                </div>
                <div className="mt-8 border-t border-border/70 pt-5">
                  <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Benjamin Blanke</p><p className="inline-flex items-center gap-1">Hosted, made and maintained by Benjamin <ArrowRight className="size-3" /></p></div>
                </div>
              </footer>
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
