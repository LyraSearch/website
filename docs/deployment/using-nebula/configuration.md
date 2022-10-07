---
sidebar_position: 3
title: Configuring Nebula
description: How to configure Nebula
---

Once Nebula is properly installed, you can start writing the configuration file.

To do that, simply create a new file called `lyra.yml`

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

Let's break the configuration file down a bit. Considering a database filled
with Pokèmon details, where the data looks like this:

```json title='pokedex.json'
[
  {
    "id": 1,
    "num": "001",
    "name": "Bulbasaur",
    "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
    "type": [
      "Grass",
      "Poison"
    ],
    "height": "0.71 m",
    "weight": "6.9 kg",
    "candy": "Bulbasaur Candy",
    "candy_count": 25,
    "egg": "2 km",
    "spawn_chance": 0.69,
    "avg_spawns": 69,
    "spawn_time": "20:00",
    "multipliers": [1.58],
    "weaknesses": [
      "Fire",
      "Ice",
      "Flying",
      "Psychic"
    ],
    "next_evolution": [
      {
        "num": "002",
        "name": "Ivysaur"
      }, {
        "num": "003",
        "name": "Venusaur"
      }
    ]
  }
]
```

### Schema

Let's say we only care about the following data: `num`, `name`, `img`, `type`,
`height`, `weight`, and `weaknesses`.

Therefore, we will need the following schema:

```yaml title='lyra.yml'
schema:
  num: string
  name: string
  img: string
  type: string
  height: string
  weight: string
  weaknesses: string
```

### Target Platform

We also need to specify for which environment we want to build the database. At
the moment, **Cloudflare Workers** are the only runtime supported by Nebula, so
we need to configure as follows:

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
```

### Data Fetching

We also need to specify the data source. We can point to a JavaScript file that
returns the data we want to index.

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

The `get-data.js` file **must** export an async functiom returning an array of
objects following the schema's shape.

We'll see that in the [next section](/deployment/nebula/data-fetching).
