import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { Labs } from "@/components/sections/labs";
import { Marquee } from "@/components/marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Labs />
    </>
  );
}
