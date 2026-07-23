import { getAllPosts } from "@/lib/blog";

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

  const body = `# Alec Bolingbroke

> Independent builder working at the seam of AI, automation, and systems design. Personal site: who he is, what he does, how to reach him, and a blog written in the open.

Alec builds AI systems and automations that remove busywork: integrations, agents, and the quiet plumbing that lets people skip repetitive work. He builds in the open and writes about it here.

## Pages
- [Home](${BASE}/): Name, what he does, and contact.
- [Blog](${BASE}/blog): Notes from building, in the open.

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
