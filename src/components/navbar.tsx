"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, NotebookText, Link2, Mail } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/blog", label: "Blog", icon: NotebookText },
  { href: "/links", label: "Links", icon: Link2 },
  { href: "/newsletter", label: "Newsletter", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation" className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full border border-border/80 bg-background/85 p-1.5 shadow-xl backdrop-blur-2xl sm:bottom-6 sm:gap-1.5 sm:p-2">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href === "/blog" && pathname.startsWith("/blog/"));
        return <Link key={href} href={href} aria-label={label} title={label} className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm transition sm:px-4 ${active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
          <Icon className="size-4 shrink-0" />
          <span className="hidden sm:inline">{label}</span>
        </Link>;
      })}
    </nav>
  );
}
