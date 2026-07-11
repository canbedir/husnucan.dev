import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Spotlight } from "@/components/spotlight";
import { Stack } from "@/components/stack";
import { Experience } from "@/components/experience";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <Container>
        <Hero />
        <Spotlight />
        <Stack />
        <Experience />
      </Container>
      <SiteFooter />
    </>
  );
}
