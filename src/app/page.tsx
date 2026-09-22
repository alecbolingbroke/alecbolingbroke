import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Shipped } from "@/components/sections/shipped";
import { Building } from "@/components/sections/building";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Shipped />
      <Building />
    </>
  );
}
