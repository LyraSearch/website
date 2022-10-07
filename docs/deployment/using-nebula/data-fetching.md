---
sidebar_position: 4
title: Data Fetching
description: How to fetch dynamic data with Nebula
---

In our `lyra.yml` file, we specified the following data:

```yaml title='lyra.yml'
schema:
  num: string
  name: string
  img: string
  type: string
  height: string
  weight: string
  weaknesses: string

target:
  platform: cloudflare

data:
  source: ./get-data.js
```

That means that we **must** have a `get-data.js` file exposing an asyncronous
function that returns the data we want to index.

<alert title='Attention' status='warning'>
The data returned from the get-data.js file&nbsp;<b>must</b>&nbsp;follow the schema's
shape.
</alert>

In a [previous section](/deployment/nebula/configuration), we've seen that we
have an array of Pokèmon, and we want to extract only specific properties for
each one of them.

In this example, let's say we have a `pokedex.json` file, but the data could
arrive from any data source (a database, a file, a web service, etc).

In out `get-data.js` file, we will need to export a function to return only the
desired data, and we can do that as follows:

```js title='get-data.js'
module.exports = async function () {
  return require('./dataset.json').pokemon.map((pokemon) => ({
    num: pokemon.num,
    name: pokemon.name,
    img: pokemon.img,
    type: pokemon.type.join(', '),
    height: pokemon.height,
    weight: pokemon.weight,
    weaknesses: pokemon.weaknesses.join(', ')
  }))
}
```

Once we're done writing our `get-data.js` file, we can run **Nebula**.
