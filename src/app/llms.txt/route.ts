import { getAllPosts } from "@/lib/blog";
import { BUILDING } from "@/content/building";
import { SHIPPED } from "@/content/shipped";

// Prerender to a static file at build time (served at /llms.txt).
export const dynamic = "force-static";

const BASE = "https://alecbolingbroke.com";

/** https://llmstxt.org/ — a curated, LLM-friendly summary of the site. */
export function GET() {
  const posts = getAllPosts();
  const postLines = posts.length
    ? posts
        .map((p) => `- [${p.title}](${BASE}/blog/${p.slug}): ${p.excerpt}`)
        .join("\n")
    : "- No posts yet.";

  const buildingLines = BUILDING.map(
    (b) => `- ${b.name}: ${b.blurb}`,
  ).join("\n");

  const shippedLines = SHIPPED.map(
    (s) => `- ${s.name}: ${s.blurb}`,
  ).join("\n");

  const body = `# Alec Bolingbroke

> Independent maker working across software, hardware, and automation. Personal site: who he is, what he makes, what he has in progress right now, how to reach him, and a blog written in the open.

Alec takes an idea and makes it run: tools, systems, hardware, and the automation in between. He works in the open, publishes things before they're finished, and writes about them here.

## Pages
- [Home](${BASE}/): Name, what he does, what he has shipped, what he has in progress, and contact.
- [Blog](${BASE}/blog): Notes from building, in the open.

## What I've shipped
${shippedLines}

## What I'm building
${buildingLines}

## Blog posts
${postLines}

## Contact
- Email: alec.bolingbroke35@gmail.com
- [GitHub](https://github.com/alecbolingbroke)
- [LinkedIn](https://www.linkedin.com/in/alec-bolingbroke/)
- [X](https://x.com/AlecBolingbroke)

## Optional
- [Source code](https://github.com/alecbolingbroke/alecbolingbroke): This site's repository.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
