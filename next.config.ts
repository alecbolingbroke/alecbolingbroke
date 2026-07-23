import type { NextConfig } from "next";

/**
 * Routes that serve HTML. Hashed assets under `/_next/static` are deliberately
 * absent — Next marks those immutable and that must stay.
 */
const HTML_ROUTES = ["/", "/blog", "/blog/:slug", "/llms.txt"];

const nextConfig: NextConfig = {
  /**
   * Next tags prerendered pages with `s-maxage=31536000` and expects the CDN to
   * honour its `x-nextjs-stale-time` hint. Hostinger's CDN honours the year and
   * ignores the hint, so after a redeploy it kept serving the *previous* build's
   * HTML — which references that build's hashed chunk filenames. Those chunks no
   * longer exist, so every `/_next/static/*` request 404'd and the page rendered
   * with no CSS and no JS: an unsized 300x150 nav logo, and the load-in blur
   * stuck on forever because the script that clears it never ran.
   *
   * A short shared TTL means a deploy heals itself within a minute instead of a
   * year. No stale-while-revalidate on purpose: stale HTML here isn't a
   * slightly-old copy, it's a page pointing at chunks that 404.
   */
  async headers() {
    return HTML_ROUTES.map((source) => ({
      source,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=0, s-maxage=60, must-revalidate",
        },
      ],
    }));
  },
};

export default nextConfig;
