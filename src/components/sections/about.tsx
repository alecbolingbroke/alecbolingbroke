import { Reveal } from "../reveal";

export function About() {
  return (
    <section id="about" className="relative px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto w-full max-w-[1500px]">
        <Reveal>
          <p className="max-w-3xl font-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.08] tracking-tight">
            Software, hardware, automation, whatever the idea needs. I take the
            thing that only exists in my head and make it run.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-md text-lg leading-snug text-muted">
            I do it in the open, sharing the work as it happens.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
