---
title: Data Persistence Plugin
metaTitle: Persisting data in JSON, dpack, messagepack with Lyra
---

import GithubStarsButton from '../../src/components/Button/GithubStars';

# Data persistence plugin

[![Tests](https://github.com/LyraSearch/plugin-data-persistence/actions/workflows/tests.yml/badge.svg)](https://github.com/LyraSearch/plugin-disk-persistence/actions/workflows/tests.yml)
[![GitHub Repo stars](https://img.shields.io/github/stars/lyrasearch/plugin-data-persistence?style=social)](https://github.com/lyrasearch/plugin-data-persistence)

The `plugin-data-persistence` plugin allows Lyra to bump the entire database and
restore it in three different formats.

The plugin is currently available on the following runtimes:

| Runtime        | Status                     |
| -------------- | -------------------------- |
| Node.js        | ✅ &nbsp;available          |
| Bun            | ✅ &nbsp;available          |
| V8 isolates    | ✅ &nbsp;available          |
| Major browsers | ✅ &nbsp;available          |
| Deno           | 🚧 &nbsp;under construction |

## Index

- [Installation](#installation)
- [Usage](#usage)
- [Disk persistence](#persisting-the-database-to-disk)
- [Restoring from disk](#restoring-the-database-from-disk)
- [In-memory persistence](#in-memory-persistence)

## Installation

You can install the plugin using any major Node.js/Bun package manager:

```bash title="Install with npm"
npm install --save @lyrasearch/plugin-data-persistence
```

```bash title="Install with yarn"
yarn add @lyrasearch/plugin-data-persistence
```

```bash title="Install with pnpm"
pnpm add @lyrasearch/plugin-data-persistence
```

Deno installation guide will be available soon.

## Usage

Plugin usage depends on the runtime that you are using, even though the goal is
to expose the exact same APIs for browsers, Deno, and all the other JavaScript
engines.

Let's consider the following Lyra instance as a common database source for both
browsers and JavaScript engines:

```js title="Lyra instance"
import { create, insert } from '@lyrasearch/lyra'

const originalInstance = create({
  schema: {
    author: 'string',
    quote: 'string'
  }
})

insert(originalInstance, {
  quote: 'He who is brave is free',
  author: 'Seneca'
})

insert(originalInstance, {
  quote: 'Make each day your masterpiece',
  author: 'John Wooden'
})

insert(originalInstance, {
  quote: 'You must be the change you wish to see in the world',
  author: 'Mahatma Gandhi'
})
```

## Persisting the database to disk

Now we have a Lyra instance containing three quotes. We can use the
`plugin-data-persistence` plugin to save the database to a file:

```js title="Save database to file"
import { persistToFile } from '@lyrasearch/plugin-data-persistence'

const filePath = persistToFile(originalInstance, 'binary', './quotes.msp')
```

When bumping the database to disk, the `persistToFile` method will return the
path of the file that was created.

The `persistToFile` method accepts three parameters:

- `instance`: the Lyra instance to persist
- `format`: the format to use when persisting the database, one of:
  - `binary`: the database will be saved in a binary format using the
    `messagepack` algorithm (**recommended**)
  - `dpack`: the database will be saved in a binary format using the `dpack`
    algorithm
  - `json`: the database will be saved in a JSON format
- `path`: the path of the file to save the database to. If omitted, the database
  will be saved to a file with a random name such as `89817239_bump.msp` in the
  current working directory.

## Restoring the database from disk

Once a file has been saved to disk, you can restore the database using the
`restoreFromFile` method:

```js title="Restore database from file"
import { restoreFromFile } from '@lyrasearch/plugin-data-persistence'

const restoredInstance = restoreFromFile('binary', './quotes.msp')

// You can now perform search on the newly restored database
search(restoredInstance, {
  term: 'free'
})
```

The `restoreFromFile` method accepts two parameter:

- `format`: the format used to serialize and compress the database, one of:
  - `binary`
  - `dpack`
  - `json`
- `path`: the path of the file to restore the database from.

## In-memory persistence

The `plugin-data-persistence` plugin also provides an in-memory persistence
mode.

The APIs are the same as the ones above:

```js title="In-memory persistence"
import { exportInstance } from '@lyrasearch/plugin-data-persistence'

const serializedData = exportInstance(originalInstance, 'binary')
```

One difference to notice is that while the `exportInstance` method, when used in
a runtime such as Node.js or Bun, returns the path of the saved file, on the
browser the `exportInstance` method returns the serialized data.

You can save this data wherever you want and later restore it using the
`importInstance` method:

```js title="Restore in-memory database"
import { importInstance } from '@lyrasearch/plugin-data-persistence'

const restoredInstance = importInstance('binary', serializedData)

search(restoredInstance, {
  term: 'free'
})
```

# License

This plugin is licensed under the
[Apache License 2.0](https://github.com/LyraSearch/plugin-data-persistence/blob/main/LICENSE.md).
