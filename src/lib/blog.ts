import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO (YYYY-MM-DD)
  excerpt: string;
};

export type Post = PostMeta & { content: string };

/** Slugs for every `.md` file in the blog content dir. */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Read + parse a single post, or null if it doesn't exist. */
export function getPost(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    content,
  };
}

/** All posts, newest first (metadata only). */
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map(getPost)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      excerpt: p.excerpt,
    }));
}

/** Format a YYYY-MM-DD date for display. */
export function formatDate(date: string): string {
  if (!date) return "";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
