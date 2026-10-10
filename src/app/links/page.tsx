import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Globe, Github, Instagram, MessageCircle, Mail, CalendarDays, Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Links",
  description: "All of Benjamin Blanke's links in one place — socials, projects and more.",
};

const links = [
  { title: "My Website", description: "Projects, notes and everything about me.", href: "https://blanke.lol", icon: Globe, label: "Website" },
  { title: "Opus Host", description: "Hosting for projects and communities.", href: "https://opus-host.de", icon: Globe, label: "Hosting" },
  { title: "GitHub", description: "Open-source projects and things I'm building.", href: "https://github.com/benjamin-blanke", icon: Github, label: "Code" },
  { title: "Instagram", description: "A little more from my day-to-day.", href: "https://instagram.com/benjaminoliverblanke", icon: Instagram, label: "Social" },
  { title: "Discord", description: "Find me and join the community.", href: "https://discord.gg/ZRqXnR5SNS", icon: MessageCircle, label: "Community" },
  { title: "Book a call", description: "Find a time to talk.", href: "https://cal.com/benjaminoliverblanke", icon: CalendarDays, label: "Contact" },
  { title: "Newsletter", description: "Occasional updates on projects, code and self-hosting.", href: "/newsletter", icon: Newspaper, label: "Updates" },
  { title: "Email me", description: "Have a question or want to work together?", href: "mailto:be.blanke@pm.me", icon: Mail, label: "Email" },
];

export default function LinksPage() {
  return (
    <main className="flex flex-col gap-8">
      <header className="flex flex-col items-center text-center pt-5 sm:pt-10">
        <Image src="/me.jpg" alt="Coco, Benjamin's dog" width={92} height={92} className="size-24 rounded-full border-4 border-background object-cover shadow-lg" priority />
        <p className="mt-5 text-sm text-muted-foreground">@benjaminoliverblanke</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Benjamin Blanke</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">Developer from Germany building hosting infrastructure, web experiences and tools. Here are my important links.</p>
      </header>
      <section aria-label="All links" className="mx-auto flex w-full max-w-xl flex-col gap-3">
        {links.map(({ title, description, href, icon: Icon, label }) => {
          const content = <><span className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-background text-foreground"><Icon className="size-5" /></span><span className="min-w-0 flex-1"><span className="block font-semibold tracking-tight">{title}</span><span className="mt-1 block text-sm leading-5 text-muted-foreground">{description}</span></span><span className="hidden rounded-full border px-2.5 py-1 text-[11px] text-muted-foreground sm:inline-flex">{label}</span><ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></>;
          const className = "group flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md";
          return href.startsWith("/") ? <Link key={title} href={href} className={className}>{content}</Link> : <a key={title} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"} className={className}>{content}</a>;
        })}
      </section>
      <p className="pb-2 text-center text-xs text-muted-foreground">Made with care · <Link href="/" className="underline underline-offset-4 hover:text-foreground">blanke.lol</Link></p>
    </main>
  );
}
