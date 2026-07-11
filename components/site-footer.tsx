import { ContributionGraph } from "@/components/contribution-graph";
import { Reveal } from "@/components/motion/reveal";
import { getContributions } from "@/lib/github";
import { profile } from "@/lib/content";

export async function SiteFooter() {
  const contributions = await getContributions();

  return (
    <footer className="px-6 pb-24 pt-12">
      <Reveal className="mx-auto max-w-4xl">
        <ContributionGraph data={contributions} />
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
