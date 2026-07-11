import Link from "next/link";
import { SiNextdotjs, SiGithub } from "react-icons/si";
import { Container } from "@/components/container";
import { profile } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-50 border-t border-border bg-background">
      <Container className="flex h-16 items-center justify-between text-xs text-muted-foreground sm:text-sm">
        <span>
          © {year} {profile.shortName}
        </span>

        <div className="flex items-center gap-5">
          <Link
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            Built with
            <SiNextdotjs className="size-4" aria-label="Next.js" />
          </Link>
          <Link
            href={profile.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            Source on
            <SiGithub className="size-4" aria-label="GitHub" />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
