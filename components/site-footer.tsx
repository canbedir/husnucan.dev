import { ContributionGraph } from "@/components/contribution-graph";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="px-6 pb-20 pt-10 sm:pb-24 sm:pt-12">
      <Reveal className="mx-auto max-w-2xl">
        <ContributionGraph />
        <p className="mt-12 text-center">
          <a
            href={`mailto:${profile.email}`}
            className="font-semibold transition-colors hover:text-muted-foreground"
          >
            {profile.email}
          </a>
        </p>
      </Reveal>
    </footer>
  );
}
