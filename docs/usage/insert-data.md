---
sidebar_position: 2
title: 'Insert Data'
metaTitle: 'How to insert data into a new Lyra instance'
---

Whenever we create a database with Lyra we must specify a `Schema`, which
represents the entry we are going to insert.

Our database and schema look like this:

```js
import { create, insert } from "@lyrasearch/lyra";

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

> Notice that we are now also **importing** the `insert` method to do our
> insertions.

## Insert

Data insertion in Lyra is quick and intuitive:

```js title="lyra.js"
const { id: thePrestige } = insert(movieDB, {
  title: 'The prestige',
  director: 'Christopher Nolan',
  plot: 'Two friends and fellow magicians become bitter enemies after a sudden tragedy. As they devote themselves to this rivalry, they make sacrifices that bring them fame but with terrible consequences.',
  year: 2006,
  isFavorite: true
});

const { id: bigFish } = insert(movieDB, {
  title: 'Big Fish',
  director: 'Tim Burton',
  plot: 'Will Bloom returns home to care for his dying father, who had a penchant for telling unbelievable stories. After he passes away, Will tries to find out if his tales were really true.',
  year: 2004,
  isFavorite: true
});

const { id: harryPotter } = insert(movieDB, {
  title: 'Harry Potter and the Philosopher\'s Stone',
  director: 'Chris Columbus',
  plot: 'Harry Potter, an eleven-year-old orphan, discovers that he is a wizard and is invited to study at Hogwarts. Even as he escapes a dreary life and enters a world of magic, he finds trouble awaiting him.',
  year: 2001,
  isFavorite: false
});
```

### Parameters

The **insert** method takes two mandatory parameters:

1. the `database` in which we want the insertion to occur
2. the `document` to insert (which must abide to the specified **schema**)

The optional parameters can be configuration properties (e.g.
<a href="/docs/usage/creating-a-new-lyra-instance#input-analyzer">the
override</a> of the default language for the given document).

```js title="lyra.js"
insert(movieDB, myDocument, { language: 'spanish' });
```

<hr/>

### Doc IDs

The **insert** method returns a unique `id` for the inserted document.

```js
console.log(harryPotter); // 79741872-5
```

### Batch insertion

The `insert` function is synchronous, so inserting a large number of documents
in a loop could potentially block the event loop. If you have a lot of records,
we suggest using the `batchInsert` function.

You can pass a third, optional, parameter to change the batch size (default:
`1000`). We recommend keeping this number as low as possible to avoid blocking
the event loop. The `batchSize` refers to the maximum number of `insert`
operations to perform before yielding the event loop.

```js title="lyra.js"
const docs = [
  {
    title: 'The prestige',
    director: 'Christopher Nolan',
    plot: 'Two friends and fellow magicians become bitter enemies after a sudden tragedy. As they devote themselves to this rivalry, they make sacrifices that bring them fame but with terrible consequences.',
    year: 2006,
    isFavorite: true
  },
  {
    title: 'Big Fish',
    director: 'Tim Burton',
    plot: 'Will Bloom returns home to care for his dying father, who had a penchant for telling unbelievable stories. After he passes away, Will tries to find out if his tales were really true.',
    year: 2004,
    isFavorite: true
  },
  {
    title: 'Harry Potter and the Philosopher\'s Stone',
    director: 'Chris Columbus',
    plot: 'Harry Potter, an eleven-year-old orphan, discovers that he is a wizard and is invited to study at Hogwarts. Even as he escapes a dreary life and enters a world of magic, he finds trouble awaiting him.',
    year: 2001,
    isFavorite: false
  }
];

await insertBatch(movieDB, docs, { batchSize: 500 });
```
