export type Project = {
  slug: string;
  title: string;
  blurb: string;
  role: string;
  stack: string[];
  year: string;
  status: "live" | "in progress" | "archived";
  href?: string;
};

/**
 * Selected work. Edit freely — this is the single source of truth for the
 * Work section. Add a `href` to make a row link out.
 */
export const projects: Project[] = [
  {
    slug: "blast",
    title: "Blast",
    blurb:
      "Internal SMS / email / Slack broadcast tool. One composer, many channels, real delivery reporting.",
    role: "Design + build",
    stack: ["Next.js", "Twilio", "Vercel"],
    year: "2026",
    status: "in progress",
  },
  {
    slug: "proactivexs-bridge",
    title: "ProactiveXS Bridge",
    blurb:
      "A push pipeline connecting field service records into NICE ProactiveXS calling lists — the plumbing that keeps outreach in sync.",
    role: "Systems + integration",
    stack: ["Node", "REST", "Cloud Functions"],
    year: "2026",
    status: "in progress",
  },
  {
    slug: "automation-core",
    title: "Automation Core",
    blurb:
      "A shared foundation for a fleet of field-service automations — one auth layer, one webhook spine, no more copy-paste drift.",
    role: "Architecture",
    stack: ["TypeScript", "Monorepo", "GCP"],
    year: "2026",
    status: "in progress",
  },
  {
    slug: "second-brain",
    title: "Second Brain",
    blurb:
      "A personal knowledge system that plans, remembers, and drafts — an operating layer for how I think and work.",
    role: "R&D",
    stack: ["Claude", "MCP", "Obsidian"],
    year: "2026",
    status: "live",
  },
];
