---
sidebar_position: 1
title: Getting Started with Lyra
description: How to get started with Lyra
---

Lyra is an **immutable, runtime-agnostic, edge and in-memory full-text search
engine** capable of working both on client and server.

Through the implementation of an optimized prefix tree and some clever tweaks,
Lyra can perform searches through millions of entries in **microseconds**.

<iframe width="560" height="315" src="https://www.youtube.com/embed/42sMkbGLlh4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Requirements

A JavaScript runtime is the **only** requirement. Lyra has been designed to work
on any runtime and has no dependencies.

## Installation

Lyra can be installed on Node.js, Bun, and Deno.

### Node.js and Bun

Lyra can be installed using either _**npm**_, _**yarn**_, or _**pnpm**_.

<details open><summary>npm</summary>

```bash
npm install @lyrasearch/lyra
```

</details>

<details><summary>yarn</summary>

```bash
yarn add @lyrasearch/lyra
```

</details>

<details><summary>pnpm</summary>

```bash
pnpm add @lyrasearch/lyra
```

</details>

### Deno

<details>
<summary>Deno</summary>

```js
import * as lyra from "https://deno.land/x/lyra@0.0.4/src/lyra.ts";
```

</details>

Please note: from now on, we'll be using Node.js to illustrate how to work with
Lyra, thought the APIs are the same as for Deno.

## Start working with Lyra

Once Lyra is installed, it can easily be imported it in any project.

**esm**

```js
import { create, insert, remove, search } from "@lyrasearch/lyra";
```

**cjs**

```js
const { create, insert, remove, search } = require("@lyrasearch/lyra");
```

> Lyra exposes its own types, ESM modules and CJS modules.
