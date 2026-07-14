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
  /** Single letter used as a fallback when no logo image is set. */
  monogram: string;
  /** Logo image in /public. */
  logo?: string;
  /**
   * How the logo should sit in its box:
   * - "icon": a full-bleed app icon with its own background (fills the box)
   * - "mark": a transparent mark that needs a surface and padding behind it
   */
  logoStyle?: "icon" | "mark";
  /** Surfaced in the homepage Spotlight section. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "kirmizi",
    name: "Kırmızı",
    description: "Record your screen entirely in the browser.",
    year: "2025",
    url: "https://kirmizi.app",
    githubUrl: "https://github.com/canbedir/kirmizi",
    badge: { label: "Live", tone: "accent" },
    monogram: "K",
    logo: "/kirmizi-logo.webp",
    logoStyle: "mark",
    featured: true,
  },
  {
    slug: "microhone",
    name: "Microhone",
    description:
      "Use your phone as a microphone for your computer over Wi-Fi or USB.",
    year: "2024",
    url: "https://microhone.com",
    githubUrl: "https://github.com/microhone/microhone",
    badge: { label: "Live", tone: "accent" },
    monogram: "M",
    logo: "/microhone.png",
    logoStyle: "icon",
    featured: true,
  },
  {
    slug: "walltch",
    name: "Walltch",
    description:
      "An addon-based media client for the desktop.",
    year: "2024",
    /* url: "https://walltch.com", */
    githubUrl: "https://github.com/walltch-app/walltch",
    badge: { label: "Live", tone: "accent" },
    monogram: "W",
    logo: "/walltch.png",
    logoStyle: "mark",
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
    url: "https://crabsmedia.com",
  },
];

export const availability = {
  period: "Now",
  status: "Available for work",
  detail: "Open to freelance and full-time roles.",
};

export const profile = {
  name: "Can Bedir",
  shortName: "Can",
  greeting: "Hi, I'm Can",
  // Split so the middle phrase can carry the hand-drawn underline.
  tagline: {
    before: "Self-taught ",
    highlight: "fullstack developer",
    after: " who loves building things from idea to launch.",
  },
  email: "me@husnucan.dev",
  avatar: "/pp.png",
  // Repo shown as "Source on GitHub" in the footer — update if it differs.
  sourceUrl: "https://github.com/canbedir/husnucan.dev",
};
