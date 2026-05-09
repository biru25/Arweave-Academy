---
title: Hello, permaweb
date: 2026-05-01
summary: Kicking off this blog with a quick intro to what the permaweb is and why I'm excited about it.
tags: ["post", "arweave"]
---

Welcome! This is the very first post of `biru25 // permaweb notes`, a small
static blog I'm spinning up as part of
[Arweave Academy Challenge 2](https://github.com/ArweaveOasis/Arweave-Academy/blob/main/practice/challenge2.md).

## What is the permaweb?

The **permaweb** is the set of websites and apps built on top of
[Arweave](https://www.arweave.org/). Unlike the regular web, where content
lives on rented servers that can disappear at any time, the permaweb stores
content on Arweave's endowment-funded, pay-once-store-forever network. Once
a file is confirmed on Arweave, it is replicated across thousands of miners
and is accessible through any [AR.IO gateway](https://ar.io/).

## Why static?

AR.IO gateways are wonderful but they do not execute server-side code. That
is why static sites and SPAs are a perfect fit: the gateway just serves
bytes. Anything dynamic has to run in the user's browser or on AO.

This blog is built with [Eleventy](https://www.11ty.dev), which turns
Markdown and Nunjucks templates into a plain `dist/` folder of HTML and CSS.
I then upload that folder to Arweave through the free Turbo SDK and publish
a path manifest so pretty URLs like `/blog/hello-permaweb/` work out of the
box.

## What to expect next

- Short notes on running nodes
- Walkthroughs of Arweave tooling (Turbo, ArNS, ArConnect)
- AO experiments as I learn the compute side

If that sounds interesting, stick around. Everything I publish here is
permanent -- even if I change my mind tomorrow, this post is on-chain
forever.
