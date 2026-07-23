import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on building AI systems and automation, in the open.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <section className="relative min-h-[100svh] px-5 pt-32 pb-24 sm:px-6">
      <div className="mx-auto w-full max-w-[1500px]">
        <h1 className="max-w-[14ch] font-display text-[clamp(2.5rem,9vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em]">
          Notes from building
        </h1>

        {posts.length === 0 ? (
          <p className="mt-16 text-lg text-muted">Nothing published yet.</p>
        ) : (
          <ul className="mt-16 max-w-3xl">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={0.04 * i}>
                <li>
                  <Link href={`/blog/${p.slug}`} className="group block py-7">
                    <time className="font-mono text-[11px] uppercase tracking-widest text-muted">
                      {formatDate(p.date)}
                    </time>
                    <h2 className="mt-2 font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
                      {p.title}
                    </h2>
                    <p className="mt-2 max-w-xl leading-snug text-muted">
                      {p.excerpt}
                    </p>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
