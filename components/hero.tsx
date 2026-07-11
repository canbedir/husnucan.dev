import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/lib/content";

export function Hero() {
  return (
    <section className="pt-12 pb-16 sm:pt-24 sm:pb-20">
      <Reveal>
        <div className="relative size-20 overflow-hidden rounded-full bg-secondary/20 ring-1 ring-border sm:size-24">
          <Image
            src={profile.avatar}
            alt={profile.name}
            fill
            priority
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="mt-7 text-4xl font-bold tracking-tight sm:mt-8 sm:text-5xl">
          {profile.greeting}
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.tagline}
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block font-semibold text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-foreground"
        >
          {profile.email}
        </a>
      </Reveal>
    </section>
  );
}
