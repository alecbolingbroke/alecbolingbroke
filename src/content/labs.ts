export type Lab = {
  title: string;
  note: string;
  tag: string;
};

/**
 * Experiments — smaller, rougher, build-in-public pieces. This is where the
 * WebGL / interactive one-offs will live as you make them.
 */
export const labs: Lab[] = [
  {
    title: "Field Notes",
    note: "Short write-ups on what I'm learning building automation systems.",
    tag: "writing",
  },
  {
    title: "Prompt Kit",
    note: "Reusable prompt scaffolds for agent workflows I actually run.",
    tag: "tools",
  },
  {
    title: "Motion Studies",
    note: "Interaction sketches — the ones that survive graduate to this site.",
    tag: "interaction",
  },
  {
    title: "Signal",
    note: "A tiny dashboard turning noisy ops data into one honest number.",
    tag: "data",
  },
];
