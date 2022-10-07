---
sidebar_position: 1
title: 'Creating a new Lyra instance'
description: 'How to create a new Lyra instance from scratch'
---

Creating a new instance is very simple.

## Create

We create a new instance (from now on database) with an **indexing `schema`**.

The schema represents **the structure** of the document to be inserted.

A database can be as simple as:

```javascript
import { create } from "@lyrasearch/lyra";

const db = create({
  schema: {
    word: "string",
  },
});
```

or more variegated

```javascript
import { create } from "@lyrasearch/lyra";

const movieDB = create({
  schema: {
    title: "string",
    director: "string",
    plot: "string",
    year: "number",
    isFavorite: "boolean",
  },
});
```

### Nested Properties

Lyra now supports nested properties. Simply add a new object as a value to the
schema.

```javascript
const movieDB = create({
  schema: {
    title: "string",
    plot: "string",
    cast: {
      director: "string",
      leading: "string",
    },
    year: "number",
    isFavorite: "boolean",
  },
});
```

## Input Analyzer

By default, Lyra analyzes the input and performs a `stemming` operation, which
allows the engine to perform more optimized queries, as well as saving indexing
space.

**What is stemming?**

> In linguistic morphology and information retrieval, stemming is the process of
> reducing inflected (or sometimes derived) words to their word stem, base or
> root form—generally a written word form. The stem need not be identical to the
> morphological root of the word; it is usually sufficient that related words
> map to the same stem, even if this stem is not in itself a valid root. <br />
> Algorithms for stemming have been studied in computer science since the 1960s.
> Many search engines treat words with the same stem as synonyms as a kind of
> query expansion, a process called conflation.

Read more at <a href="https://en.wikipedia.org/wiki/Stemming">Wikipedia</a>

By default, Lyra uses **the English language analyzer**, but we can override
this behaviour by setting the property `defaultLanguage` at database
initialization.

```javascript
const db = new Lyra({
  schema: {
    word: "string",
  },
  defaultLanguage: "italian",
});
```

Currently the available languages are:

- dutch
- english (default)
- french
- italian
- norwegian
- portuguese
- russian
- spanish
- swedish
