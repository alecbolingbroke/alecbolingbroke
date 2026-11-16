import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Alec Bolingbroke — Solutions Engineer building AI, automation, and revenue systems.",
};

export default function ResumePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-20 pt-32 sm:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
        Resume
      </p>
      <h1 className="mt-5 text-5xl leading-[0.95] sm:text-7xl">
        Alec Bolingbroke
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
        Solutions Engineer building AI, automation, and revenue systems that help teams move faster.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 font-mono text-sm uppercase tracking-wider">
        <a
          href="/alec-bolingbroke-resume.pdf"
          download
          className="border-b border-fg pb-1 text-fg transition-colors hover:border-accent hover:text-accent"
        >
          Download PDF ↓
        </a>
        <a
          href="mailto:alec.bolingbroke35@gmail.com"
          className="border-b border-line pb-1 text-muted transition-colors hover:border-accent hover:text-accent"
        >
          Get in touch ↗
        </a>
        <a
          href="https://www.linkedin.com/in/alec-bolingbroke"
          target="_blank"
          rel="noreferrer"
          className="border-b border-line pb-1 text-muted transition-colors hover:border-accent hover:text-accent"
        >
          LinkedIn ↗
        </a>
      </div>

      <div className="mt-16 space-y-12 border-t border-line pt-10">
        <ResumeSection title="Focus">
          AI and LLM applications · automation and integrations · GTM and revenue systems · data systems · JavaScript, Python, Node.js, React, GCP, and SQL
        </ResumeSection>

        <ResumeSection title="Experience">
          <Role
            company="Grit Companies"
            title="Solutions Engineer"
            dates="May 2025 – Present"
          >
            Build AI and automation systems across revenue, operations, and support. Partner with teams to identify friction, ship practical tools, and make the work repeatable through training and self-service workflows.
          </Role>
          <Role
            company="R.R. Donnelley"
            title="Composition Programmer"
            dates="Nov. 2024 – May 2025"
          >
            Developed and optimized Python and Perl tooling for XML print composition, led a production COBOL-to-Python refactor, and piloted AI-assisted development workflows.
          </Role>
          <Role
            company="Kite Media"
            title="Digital Marketing Specialist"
            dates="Aug. 2022 – Nov. 2024"
          >
            Managed web, SEO, and paid-media programs for home-service clients; built websites and automated reporting and campaign workflows across the client book.
          </Role>
        </ResumeSection>

        <ResumeSection title="Selected projects">
          <Role company="Hum" title="Founder" dates="2026 – Present">
            An AI operations product for home-service operators that connects service systems to Slack and surfaces cancellations, new leads, and field events.
          </Role>
          <Role company="Leverage" title="Co-Founder" dates="2024">
            LLM search-visibility platform. Led demos, technical validation, and onboarding to $25K ARR.
          </Role>
        </ResumeSection>

        <ResumeSection title="Education">
          <Role company="Utah State University, Jon M. Huntsman School of Business" title="M.S., Management Information Systems" dates="May 2025">
            GPA 4.0 · Sandbox Tech Accelerator Cohort Member
          </Role>
          <Role company="Utah State University" title="B.S., Information Systems · Minor in Web Development" dates="May 2024">
            GPA 3.70 · Dean&apos;s Scholarship Recipient
          </Role>
        </ResumeSection>
      </div>

      <p className="mt-16 max-w-2xl border-t border-line pt-6 text-sm leading-relaxed text-muted">
        For recent work and experiments, see <a className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent" href="/built">Built</a> and <a className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent" href="/building">Building</a>.
      </p>
    </section>
  );
}

function ResumeSection({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <section>
      <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{title}</h2>
      <div className="mt-5 space-y-7 text-base leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function Role({
  company,
  title,
  dates,
  children,
}: Readonly<{ company: string; title: string; dates: string; children: React.ReactNode }>) {
  return (
    <div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="font-sans text-lg font-semibold tracking-[-0.02em] text-fg">{company}</h3>
        <p className="font-mono text-xs uppercase tracking-wider text-muted">{dates}</p>
      </div>
      <p className="mt-1 font-medium text-fg">{title}</p>
      <p className="mt-2">{children}</p>
    </div>
  );
}
