/**
 * What I've built — things that are done and in use, rendered on /built and
 * in /llms.txt.
 *
 * The counterpart to BUILDING. That list is deliberately unfinished; this one
 * is the opposite, so nothing belongs here until it actually runs for someone.
 * Employers stay generic on purpose.
 */
export type BuiltItem = {
  name: string;
  blurb: string;
};

export const BUILT: BuiltItem[] = [
  {
    name: "A personal AI operating system",
    blurb:
      "A folder of notes plus a set of rules any AI agent can follow. It takes in what I give it, keeps my tasks and journal, sweeps my inbox, and logs everything it does. It works with any model, because the rules and the notes are the part worth keeping.",
  },
  {
    name: "An AI assistant for 1,500 field reps",
    blurb:
      "Answers, deal guidance, and a heads up when a deal stalls, all in Slack and connected to the systems that hold the data. We tested it against a set of real questions, which showed the limit was the knowledge base, not the model.",
  },
  {
    name: "A lead-to-revenue pipeline",
    blurb:
      "Ads, call tracking, a call center, and a field CRM connected into one path from first click to booked revenue, offline sales included.",
  },
  {
    name: "A searchable API reference",
    blurb:
      "A reference for an API with thin docs, where you can try calls right in the browser. AI agents can read it too, and a community of operators now uses it as their shared reference.",
  },
  {
    name: "Identity automation",
    blurb:
      "Accounts that open and close on their own when someone joins or leaves, across four systems that didn't agree. Lining them up also found people each system had lost track of.",
  },
  {
    name: "A monthly builders meetup",
    blurb:
      "A monthly call I started and host, for operators and developers building on the same field service API. It's become the group's regular place to share tools.",
  },
];
