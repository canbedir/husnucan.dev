import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Spotlight } from "@/components/spotlight";
import { Stack } from "@/components/stack";

export default function Home() {
  return (
    <Container>
      <Hero />
      <Spotlight />
      <Stack />
    </Container>
  );
}
