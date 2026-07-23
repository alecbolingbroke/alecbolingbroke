import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPost, getPostSlugs, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="relative px-5 pt-32 pb-24 sm:px-6">
      <div className="mx-auto w-full max-w-[720px]">
        <Link
          href="/blog"
          className="font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-accent"
        >
          ← Blog
        </Link>

        <time className="mt-12 block font-mono text-[11px] uppercase tracking-widest text-muted">
          {formatDate(post.date)}
        </time>
        <h1 className="mt-3 font-display text-[clamp(2rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          {post.title}
        </h1>

        <div className="prose mt-12">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
