// Site content. Copy here is intentionally easy to edit — tweak freely.

export type Project = {
  slug: string;
  name: string;
  description: string;
  year: string;
  /** Live site URL. */
  url?: string;
  githubUrl?: string;
  appStoreUrl?: string;
  /** Small pill shown next to the name, e.g. current status. */
  badge?: { label: string; tone: "accent" | "muted" };
  /** Public repo stats, shown only when provided. */
  stars?: number;
  forks?: number;
  /** Single letter used for the generated monogram logo. */
  monogram: string;
  /** Surfaced in the homepage Spotlight section. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "kirmizi",
    name: "Kırmızı",
    description: "A focused app for tracking what matters, without the clutter.",
    year: "2025",
    url: "https://kirmizi.app",
    badge: { label: "Live", tone: "accent" },
    monogram: "K",
    featured: true,
  },
  {
    slug: "microhone",
    name: "Microhone",
    description: "A small tool built around a big idea. Fast, simple, shipped.",
    year: "2024",
    url: "https://microhone.com",
    badge: { label: "Live", tone: "accent" },
    monogram: "M",
    featured: true,
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  url?: string;
};

export const experience: Experience[] = [
  {
    company: "Crabs Media",
    role: "Frontend Developer Intern",
    period: "2024 — 2025",
  },
];

export const skills: string[] = [
  "React / Next.js",
  "TypeScript / JavaScript (ES6+)",
  "Tailwind CSS & design systems",
  "Responsive design & accessibility",
  "Motion & interaction (Framer Motion)",
  "Component architecture",
  "REST API integration & data fetching",
  "Node.js fundamentals",
  "Git & collaborative workflows",
];

export const profile = {
  name: "Can Bedir",
  greeting: "Hi, I'm Can",
  tagline: "Self-taught fullstack developer who loves building things from idea to launch.",
  email: "me@husnucan.dev",
  avatar: "/pp.png",
};
