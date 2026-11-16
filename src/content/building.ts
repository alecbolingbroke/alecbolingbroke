/**
 * What I'm building — the list rendered on /building and in /llms.txt.
 *
 * In flight only. Once something actually runs for someone it moves to
 * BUILT in ./built.ts.
 *
 * Deliberately present tense and deliberately unfinished: this is the public
 * face of building in the open, so things belong here before they're done.
 * Edit this array and both surfaces update.
 */
export type BuildingItem = {
  name: string;
  blurb: string;
  /** Where to try it, when there is something live. */
  href?: string;
};

export const BUILDING: BuildingItem[] = [
  {
    name: "The mirror",
    blurb:
      "A discontinued workout mirror, torn down and rebuilt into a screen that shows my calendar and whatever else I decide belongs on it.",
  },
  {
    name: "Sal",
    blurb:
      "A booking agent for a made-up home services company, with a face that tells the truth. It shows when it's sure, when it's guessing, and when it's handing you to a person.",
  },
  {
    name: "Live sketch",
    blurb:
      "Type a word or drop in a photo and a pattern grows out of it like coral. Turn on the mic and it moves with the music.",
    href: "/live-sketch",
  },
  {
    name: "Hum",
    blurb:
      "Operational alerts for field service teams, so a problem shows up in Slack the moment it happens instead of in a report nobody opens.",
  },
  {
    name: "Atelier",
    blurb: "A finance tool for creative people with irregular income.",
  },
  {
    name: "A marketing engine for a photography business",
    blurb: "The site, the ads, and all the follow up in between.",
  },
  {
    name: "HDRify",
    blurb:
      "A converter that makes ordinary images light up on HDR screens, which most of the web still ignores.",
  },
];
