import { getAllPosts } from "@/lib/blog";
import { BUILDING } from "@/content/building";
import { BUILT } from "@/content/built";

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

  const builtLines = BUILT.map(
    (s) => `- ${s.name}: ${s.blurb}`,
  ).join("\n");

  const body = `# Alec Bolingbroke

> Builder working across software, hardware, and automation. Personal site: who he is, what he makes, what he has in progress right now, how to reach him, and a blog written in the open.

Alec builds things: tools, systems, hardware, and the automation in between. He shares the work as he goes.

## Pages
- [Home](${BASE}/): Name, what he does, and contact.\n- [Built](${BASE}/built): Things he has built that are done and in use.\n- [Building](${BASE}/building): What he has in progress right now, finished or not.
- [Blog](${BASE}/blog): Notes from building, in the open.

## What I've built
${builtLines}

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
