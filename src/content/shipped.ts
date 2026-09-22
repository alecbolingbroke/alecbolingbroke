/**
 * What I've shipped — things that are done and in use, rendered on the home
 * page and in /llms.txt.
 *
 * The counterpart to BUILDING. That list is deliberately unfinished; this one
 * is the opposite, so nothing belongs here until it actually runs for someone.
 * Employers stay generic on purpose.
 */
export type ShippedItem = {
  name: string;
  blurb: string;
};

export const SHIPPED: ShippedItem[] = [
  {
    name: "A personal AI operating system",
    blurb:
      "A markdown vault and a rulebook that tells any agent how to work in it. It ingests and synthesizes what I feed it, runs my task system, writes my journal, sweeps my inbox, and keeps an audit log of everything it did. Model-agnostic by design, because the rules and the corpus are the part worth keeping.",
  },
  {
    name: "An AI assistant for 1,500 field reps",
    blurb:
      "Answers, deal guidance, and stagnation alerts in Slack, wired to the systems that actually hold the data. Measured against a labeled evaluation set rather than vibes, which is how we found out the ceiling was the knowledge base and not the model.",
  },
  {
    name: "A lead-to-revenue pipeline",
    blurb:
      "Ads, call tracking, a contact center, and a field CRM wired into one measured path from click to booked revenue, including the offline conversions everyone forgets.",
  },
  {
    name: "A searchable API reference",
    blurb:
      "A browser-testable explorer for an API with famously thin docs, published so agents can read the spec too. An operator community adopted it as their shared reference.",
  },
  {
    name: "Identity automation",
    blurb:
      "Accounts created and deactivated from employment status across four systems that disagreed with each other, plus the audit that found the people each one had quietly lost.",
  },
  {
    name: "A monthly builders meetup",
    blurb:
      "Started it and host it. A call for operators and developers building on the same field service API, now the group's standing forum for shared tooling.",
  },
];
