---
title: Why static site generation fits Arweave
date: 2026-05-05
summary: A quick argument for why SSG (not SSR, not pure SPA) is the natural way to ship content on Arweave.
tags: ["post", "arweave", "ssg"]
---

There are roughly four ways to ship a website on Arweave:

1. **Multiple HTML files** -- file-based routing. Zero tooling.
2. **Static Site Generation (SSG)** -- pages pre-rendered at build time.
3. **Client-Side Rendering (CSR)** -- a single HTML file plus a JS bundle.
4. **Hash-based SPA** -- CSR variant that keeps routes after the `#`.

Each has trade-offs. For a **blog** or **docs site**, SSG is the sweet spot.

## SSG gives you the best of both worlds

| | File-based | SSG (Eleventy/Hexo) | CSR (React/Vue) |
|---|---|---|---|
| Initial load speed | Fast | **Fastest** | Slow |
| SEO | OK | **Great** | Poor without prerender |
| Authoring content | Painful | **Markdown** | Painful |
| Works on AR.IO gateway | Yes | **Yes** | Yes (with tricks) |
| Shared layout | Copy-paste | **Templates** | Components |

With Eleventy I can write posts in Markdown, reuse the same `base.njk`
layout across every page, and still ship plain HTML. No client JS, no
hydration, no runtime cost for readers.

## And you only pay once

Because Arweave is pay-once-store-forever, an SSG blog on Arweave is
effectively **free hosting for life** after the first upload. No renewals,
no DNS fees (unless you opt into an ArNS name), no DDoS worries.

That changes how I think about posts. This is not a tweet that disappears
when the company pivots -- it is a permanent artifact. Worth writing
carefully.
