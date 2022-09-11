---
title: Token relevance plugin (TF-IDF)
metaTitle: Lyra plugin to get TF-IDF scores from indexes
badges:
  - label: npm
    url: https://www.npmjs.com/package/@lyrasearch/plugin-token-relevance
    image: https://img.shields.io/npm/v/@lyrasearch/plugin-token-relevance?color=brightgreen
  - label: Tests
    url: https://github.com/LyraSearch/plugin-token-relevance/actions/workflows/tests.yml
    image: https://github.com/LyraSearch/plugin-token-relevance/actions/workflows/tests.yml/badge.svg
  - label: GitHub stars
    url: https://github.com/lyrasearch/plugin-token-relevance
    image: https://img.shields.io/github/stars/lyrasearch/plugin-token-relevance?style=social
---

<alert title="Beware!" status="error">
This plugin is still in its Alpha stage and it's highly experimental.
</alert>

The `plugin-token-relevance` plugin provides an easy way to get TF-IDF scores
from Lyra indexes. <br /> This allows Lyra to:

1. Perform relevance-based search
2. Customize a given word/document relevance

The plugin is currently available on the following runtimes:

| Runtime        | Status            |
| -------------- | ----------------- |
| Node.js        | ✅ &nbsp;available |
| Bun            | ✅ &nbsp;available |
| V8 isolates    | ✅ &nbsp;available |
| Major browsers | ✅ &nbsp;available |
| Deno           | ✅ &nbsp;available |

## Installation

You can install the plugin using any major Node.js/Bun package manager:

```bash
npm install --save @lyrasearch/plugin-token-relevance
```

```bash
yarn add @lyrasearch/plugin-token-relevance
```

```bash
pnpm add @lyrasearch/plugin-token-relevance
```

## Usage

Consider the following Lyra instance:

```js title="Lyra instance"
import { create, insert } from '@lyrasearch/lyra'

const db = create({
  schema: {
    author: 'string',
    quote: 'string'
  }
})

insert(db, {
  quote: 'The quick brown fox jumps over the lazy dog',
  author: 'John Doe'
})

insert(db, {
  quote: 'This quick brown fox is so quick! How can it be so quick?',
  author: 'Jane Doe'
})

insert(db, {
  quote: 'I have a pair of red shoes.',
  author: 'Jimmy Does'
})
```

If we want to calculate the individual tokens relevance, we can use the
`plugin-token-relevance` plugin as follows:

```js title="Calculate token relevance"
import { generateScores } from 'plugin-token-relevance'

const scores = generateScores(db)

console.log(scores)
```

We will see the following output in the console:

```bash title="Results"
{
  quote: {
    '76465079-2': {
      the: 0.24413606414846878,
      quick: 0.04505167867868493,
      brown: 0.04505167867868493,
      fox: 0.04505167867868493,
      jumps: 0.12206803207423439,
      over: 0.12206803207423439,
      lazy: 0.12206803207423439,
      dog: 0.12206803207423439
    },
    '76465079-42': {
      this: 0.08450863758985458,
      quick: 0.0935688711018841,
      brown: 0.03118962370062803,
      fox: 0.03118962370062803,
      is: 0.08450863758985458,
      so: 0.16901727517970916,
      how: 0.08450863758985458,
      can: 0.08450863758985458,
      it: 0.08450863758985458,
      be: 0.08450863758985458
    },
    '76465079-60': {
      i: 0.1569446126668728,
      have: 0.1569446126668728,
      a: 0.1569446126668728,
      pair: 0.1569446126668728,
      of: 0.1569446126668728,
      red: 0.1569446126668728,
      shoes: 0.1569446126668728
    }
  },
  author: {
    '76465079-2': { john: 0.5493061443340548, doe: 0.2027325540540822 },
    '76465079-42': { jane: 0.5493061443340548, doe: 0.2027325540540822 },
    '76465079-60': { jimmy: 0.5493061443340548, does: 0.5493061443340548 }
  }
}
```

We can use then these tokens to calculate the relevance of a given word/document
when performing search.

## License

This plugin is licensed under the
[Apache License 2.0](https://github.com/LyraSearch/plugin-token-relevance/blob/main/LICENSE.md).
