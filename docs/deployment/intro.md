---
sidebar_position: 1
title: Deploying Lyra
description: How to get deploy Lyra
---

Lyra is a runtime-agnostic full-text search engine. That means that it can run
wherever JavaScript runs, and gets tested on the following environments:

- Node.js
- Bun
- Deno
- V8 Isolates
- Browsers
  - Chrome
  - Firefox
  - Safari
  - Edge

That means that after you install Lyra in your local environment, you can easily
deploy it to any of these environments.

To make things easier, there is a build system called
[Nebula](/category/using-nebula) that builds a tiny, self-contained, indexed
Lyra database into a single JavaScript file, making it possible to deploy it on
many different environments with no other build step, such as Cloudflare
Workers, AWS Lambda @Edge, etc.
