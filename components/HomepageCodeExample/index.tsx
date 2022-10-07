import { Box } from '@chakra-ui/react'

const code = `import { create, insert, search } from '@nearform/lyra'

const db = create({
  schema: {
    quote: 'string',
    author: 'string',
  },
})

insert(db, {
  quote: 'Everything you can imagine is real',
  author: 'Pablo Picasso',
})

search(db, {
  term: 'imagine is real',
  limit: 10,
  offset: 0,
  properties: ['quote']
})`

export function HomepageCodeExample () {
  return (
    <Box>
      <pre>
        <code className='js' style={{ borderRadius: '10px' }}>{code}</code>
      </pre>
    </Box>
  )
}
