import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO (YYYY-MM-DD)
  excerpt: string;
};

export type Post = PostMeta & { content: string };

/**
 * Minimal frontmatter parser for our own trusted markdown files: flat
 * `key: "value"` pairs between `---` fences. Avoids a YAML dependency (and the
 * vulnerabilities that come with one) since the frontmatter is never anything
 * more complex than a few quoted strings.
 */
function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  content: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line.trim());
    if (m) data[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return { data, content: raw.slice(match[0].length) };
}

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
  const { data, content } = parseFrontmatter(fs.readFileSync(file, "utf8"));
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
