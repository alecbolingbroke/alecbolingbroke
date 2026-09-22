import type { Metadata } from "next";
import { SHIPPED } from "@/content/shipped";
import { WorkList } from "@/components/work-list";

export const metadata: Metadata = {
  title: "Shipped",
  description: "Things I've built that are done and in use.",
};

export default function ShippedPage() {
  return (
    <WorkList
      title="What I've shipped"
      intro="Done and running for someone. Nothing lands here until it does."
      items={SHIPPED}
    />
  );
}
