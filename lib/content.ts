// Site content. Copy here is intentionally easy to edit — tweak freely.

export type Project = {
  slug: string;
  name: string;
  /** One line. Used everywhere, including the homepage Spotlight. */
  description: string;
  /** A second sentence, shown only on the projects page: what makes it worth building. */
  detail?: string;
  /** Notable pieces of the stack, rendered as a plain dot-separated line. */
  tech?: string[];
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
    detail:
      "No account, no upload, no watermark — the file is built on your device and never touches a server.",
    tech: [
      "Next.js",
      "TypeScript",
      "MediaRecorder",
      "Web Audio API",
      "ffmpeg.wasm",
    ],
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
    detail:
      "It feeds a virtual audio device, so any app on the machine can pick it up as a microphone. A Rust host and an Android client speak one shared wire protocol — Opus over UDP, AES-256-GCM, QR pairing.",
    tech: ["Rust", "Tauri", "Kotlin", "Jetpack Compose", "Opus", "mDNS"],
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
    description: "A desktop media client in the vein of Stremio.",
    detail:
      "It speaks the Stremio addon protocol, so the addons you already use just work. A neutral player: it hosts and indexes nothing itself.",
    tech: ["Rust", "Tauri", "React", "mpv"],
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
