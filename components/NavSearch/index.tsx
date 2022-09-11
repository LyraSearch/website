import { useEffect, useState } from 'react'
import { search, SearchResult, formatNanoseconds } from '@lyrasearch/lyra'
import { Box, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import Link from 'next/link'

const db = require('../../lyra/db.json')

export const NavSearch = () => {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState<Array<SearchResult<any>>>([])
  const [elapsed, setElapsed] = useState('')
  const [number, setNumber] = useState(0)

  useEffect(() => {
    const searchResults = search(db, {
      term,
      limit: 5,
      tolerance: 1,
      properties: ['title', 'description', 'content']
    })

    // @ts-expect-error
    setResults(searchResults.hits)
    setElapsed(formatNanoseconds(searchResults.elapsed))
    setNumber(searchResults.count)
  }, [term])

  const readyResults = results.map((result) => {
    const { content, ...rest } = (result as any)

    return {
      ...rest,
      content: content.slice(content.indexOf(term), content.indexOf(term) + 100)
    }
  })

  return (
    <Box pos='relative'>
      <InputGroup ml='4'>
        <InputLeftElement
          pointerEvents='none'
          children={<SearchIcon color='gray.200' />}
        />
        <Input
          size='sm'
          placeholder='Search'
          rounded='md'
          _placeholder={{
            color: 'whiteAlpha.700'
          }}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </InputGroup>

      {results.length > 0 && (
        <Box pos='absolute' top='10' right='0' w='container.sm' bg='gray.900' p='4' rounded='md' shadow='dark-lg'>
          {readyResults.map((result: any) => (
            <Link href={result.slug} passHref key={result.id}>
              <a>
                <Box mb='2' bg='gray.800' p='2' rounded='md' _hover={{ bg: 'gray.700' }} transition='ease 0.3s'>
                  <Text fontWeight='semibold'>{result.title}</Text>
                  <Text>...<Text as='span' dangerouslySetInnerHTML={{ __html: result.content }} />...</Text>
                </Box>
              </a>
            </Link>
          ))}

          <Box textAlign='center' fontSize='sm'>
            {number} total results in {elapsed} thanks to Lyra
          </Box>
        </Box>
      )}
    </Box>
  )
}
