import type { Metadata } from "next";
import { BUILT } from "@/content/built";
import { WorkList } from "@/components/work-list";

export const metadata: Metadata = {
  title: "Built",
  description: "Things I've built that are done and in use.",
};

export default function BuiltPage() {
  return (
    <WorkList
      title="What I've built"
      items={BUILT}
    />
  );
}
