import { ContributionGraph } from "@/components/contribution-graph";
import { Reveal } from "@/components/motion/reveal";

export function Activity() {
  return (
    <section className="pt-4 pb-16 sm:pb-20">
      <Reveal>
        <ContributionGraph />
      </Reveal>
    </section>
  );
}
