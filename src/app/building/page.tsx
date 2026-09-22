import type { Metadata } from "next";
import { BUILDING } from "@/content/building";
import { WorkList } from "@/components/work-list";

export const metadata: Metadata = {
  title: "Building",
  description: "What I have in progress right now, finished or not.",
};

export default function BuildingPage() {
  return (
    <WorkList
      title="What I'm building"
      intro="In progress, present tense, deliberately unfinished. Things belong here before they're done."
      items={BUILDING}
    />
  );
}
