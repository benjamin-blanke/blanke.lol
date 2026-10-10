import { Icons } from "@/components/icons";
import { HomeIcon, NotebookText, Link2 } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";

export const DATA = {
  name: "Benjamin Blanke",
  initials: "BB",
  url: "https://blanke.lol",
  location: "Lahr, Germany",
  locationLink: "https://www.google.com/maps/place/Lahr%2FSchwarzwald",
  description:
    "Developer from Germany building hosting infrastructure, web experiences and tools. Founder of Opus Host and Web Developer at TBG Media.",
  summary:
    "I'm Benjamin, a developer from Germany who likes turning ideas into real products. I run **[Opus Host](https://opus-host.de)**, work as a **[Web Developer at TBG Media](https://tbg-media.de)** and spend a lot of my time building web apps, infrastructure, APIs and Discord projects. I share my projects on **[GitHub](https://github.com/benjamin-blanke)**. I care about clean design, practical tooling and learning by shipping.",
  avatarUrl: "/me.jpg",
  skills: [
    { name: "Next.js", icon: NextjsIconDark },
    { name: "React", icon: ReactLight },
    { name: "TypeScript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "Python", icon: Python },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Docker", icon: Docker },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "Tailwind CSS", icon: Icons.tailwindcss },
    { name: "Motion", icon: Icons.framermotion },
    { name: "Git & GitHub", icon: Icons.github },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookText, label: "Blog" },
    { href: "/links", icon: Link2, label: "Links" },
  ],
  contact: {
    email: "be.blanke@pm.me",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/benjamin-blanke",
        icon: Icons.github,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://instagram.com/benjaminoliverblanke",
        icon: Icons.instagram,
        navbar: true,
      },
      Discord: {
        name: "Discord",
        url: "https://discord.gg/ZRqXnR5SNS",
        icon: Icons.discord,
        navbar: true,
      },
      Cal: {
        name: "Book a call",
        url: "https://cal.com/benjaminoliverblanke",
        icon: Icons.calendar,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:be.blanke@pm.me",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Opus Host",
      href: "https://opus-host.de",
      badges: ["Founder"],
      location: "Germany / Remote",
      title: "Founder & Managing Director",
      logoUrl: "/opus-work.png",
      start: "2026",
      end: "Present",
      description:
        "Building Opus Host: hosting infrastructure, customer-facing services, APIs, automation and the product experience around them. I work across development, infrastructure, operations and product design.",
    },
    {
      company: "TBG Media",
      href: "https://tbg-media.de",
      badges: ["Web Developer"],
      location: "Germany / Remote",
      title: "Web Developer",
      logoUrl: "/tbg-media.png",
      start: "2026",
      end: "Present",
      description:
        "Working on modern web experiences and development projects for TBG Media, with a focus on clean interfaces, responsive design and reliable implementation.",
    },
    {
      company: "Cosmo Bot",
      href: "#",
      badges: ["Lead Developer"],
      location: "Remote",
      title: "Lead Developer",
      logoUrl: "/cosmo-bot.png",
      start: "2023",
      end: "2023",
      description:
        "Former Lead Developer at Cosmo Bot, working on the bot's development and technical direction.",
    },
  ],
  education: [
    {
      school: "Max-Planck-Gymnasium Lahr",
      href: "https://www.max-planck-gymnasium.de/",
      degree: "Former Student",
      logoUrl: "/max-planck-lahr.svg",
      start: "Formerly attended",
      end: "2026",
    },
  ],
  projects: [
    {
      title: "Opus Host",
      href: "https://opus-host.de",
      dates: "2026 - Present",
      active: true,
      description:
        "My hosting project focused on a modern, fast and reliable experience. I work on the infrastructure, web presence, APIs, automation and internal tooling behind Opus.",
      technologies: ["Next.js", "TypeScript", "Node.js", "Proxmox", "PostgreSQL"],
      links: [
        { type: "Website", href: "https://opus-host.de", icon: <Icons.globe className="size-3" /> },
      ],
      image: "/opus.png",
      video: "",
    },
    {
      title: "HoneyCord",
      href: "https://honeycord.blanke.lol",
      dates: "2026 - Present",
      active: true,
      description:
        "A lightweight open-source Discord security bot that uses honeypot-based detection to catch automated spam bots without bothering real members.",
      technologies: ["Node.js", "TypeScript", "Discord API", "Security"],
      links: [
        { type: "Website", href: "https://honeycord.blanke.lol", icon: <Icons.globe className="size-3" /> },
        { type: "Source", href: "https://github.com/benjamin-blanke/honeycord", icon: <Icons.github className="size-3" /> },
      ],
      image: "/honeycord.jpg",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "EurekaDev 2026",
      dates: "Sep - Oct 2026",
      location: "Online",
      description:
        "Participating in EurekaDev 2026, a global online innovation competition for high school students. Competing in the Coding Track with a new project currently in development.",
      image: "https://www.google.com/s2/favicons?domain=eurekainstitute.xyz&sz=128",
      href: "https://eurekadev.devpost.com/",
      status: "Participating",
      project: "Coming soon",
      track: "Coding Track",
    },
    {
      title: "ForgeHacks Online 2026",
      dates: "Oct 3 - 10, 2026",
      location: "Online",
      description:
        "Participating in ForgeHacks Online 2026, a student-focused hackathon for building practical AI solutions to real-world problems across six specialized tracks.",
      image: "https://www.google.com/s2/favicons?domain=forgehacks.dev&sz=128",
      href: "https://forgehacks-2026.devpost.com/",
      status: "Participating",
      project: "Coming soon",
      track: "AI / Real-World Problems",
    },
  ],
} as const;
