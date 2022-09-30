import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Input } from '@chakra-ui/input'
import { Box, Grid, Text } from '@chakra-ui/layout'
import { Show, Flex } from '@chakra-ui/react'
import { create, insertBatch, RetrievedDoc, search, formatNanoseconds } from '@lyrasearch/lyra'
import { Skeleton } from '@chakra-ui/skeleton'

function getDefaultSearchTerm () {
  const defaultSearchTerms = [
    'music',
    'school',
    'avengers',
    'love',
    'nature',
    'blue',
    'dance',
    'sun',
    'christmas',
    'colors',
    'life'
  ]

  return defaultSearchTerms[Math.floor(Math.random() * defaultSearchTerms.length)]
}

const db = create({
  schema: {
    title: 'string',
    description: 'string',
    image: 'string'
  }
})

function trimText (text: string, len: number = 100): string {
  if (text.length > len) {
    return text.substring(0, len) + '...'
  }

  return text
}

export const ShortDemo = () => {
  const [ready, setReady] = useState(false)
  const [term, setTerm] = useState(getDefaultSearchTerm())
  const [results, setResults] = useState<Array<RetrievedDoc<any>>>([])
  const [elapsed, setElapsed] = useState('0')
  const [count, setCount] = useState(0)

  function performSearch (term: string) {
    const searchData = search(db, {
      term,
      limit: 3,
      offset: 0,
      exact: false,
      properties: ['title']
    })

    setResults(searchData.hits)
    setElapsed(formatNanoseconds(searchData.elapsed))
    setCount(searchData.count)
  }

  useEffect(() => {
    if (ready) {
      performSearch(term)
    }
  }, [term])

  useEffect(() => {
    async function populate () {
      const res = await fetch('/data/movies.json')
      const movies = await res.json()
      await insertBatch(db, movies)
      setReady(true)
      setTerm(getDefaultSearchTerm())
    }

    populate()
  }, [])

  return (
    <Box>
      <Box w='full' m='auto'>
        <Input
          disabled={!ready}
          value={term}
          onChange={(ev) => setTerm(ev.target.value)}
          m='auto'
          type='text'
          w='full'
          placeholder='Search for a recent movie'
          bgColor='whiteAlpha.500'
        />
      </Box>

      <Box textAlign='center' mt='4'>
        {count} total results in {elapsed}
      </Box>

      <Box display='grid' gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap='4' mt='4'>

        {!ready && (
          [1, 2, 3].map((i) => (
            <Box key={i} p='4' h='80' rounded='lg' bgColor='white'>
              <Skeleton rounded='md' w='full' h='full' />
            </Box>
          ))
        )}

        {results.map((result) => (
          <Box key={result.id} p='4' rounded='lg' bgColor='white'>
            <Show above='md'>
              <Box pos='relative' w='full' h='40' rounded='xl'>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${result.image}`}
                  layout='fill'
                  objectFit='cover'
                  style={{ borderRadius: '0.5rem' }}
                />
              </Box>

              <Text mt='3' maxW='full' color='gray.900' fontWeight='bold'> <>{result.title}</> </Text>
              <Text color='gray.600' mt='2'> <>{trimText(result.description as string)}</> </Text>
            </Show>
            <Show below='md'>
              <Grid gridTemplateColumns='30% 1fr' columnGap='6'>
                <Box pos='relative' w='full' h='full' rounded='xl'>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${result.image}`}
                    layout='fill'
                    objectFit='cover'
                    style={{ borderRadius: '0.5rem' }}
                  />
                </Box>
                <Box>
                  <Text maxW='full' color='gray.900' fontWeight='bold'> <>{result.title}</> </Text>
                  <Text color='gray.600'> <>{trimText(result.description as string, 50)}</> </Text>
                </Box>
              </Grid>
            </Show>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
