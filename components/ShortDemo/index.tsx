import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Input } from '@chakra-ui/input'
import { Box, Text } from '@chakra-ui/layout'
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
    'colors'
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

function trimText (text: string): string {
  if (text.length > 100) {
    return text.substring(0, 100) + '...'
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
      limit: 4,
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
      <Box w='xl' m='auto'>
        <Input
          disabled={!ready}
          value={term}
          onChange={(ev) => setTerm(ev.target.value)}
          m='auto'
          type='text'
          w='xl'
          placeholder='Search for a recent movie'
          bgColor='whiteAlpha.500'
        />
      </Box>

      <Box textAlign='center' mt='4'>
        {count} total results in {elapsed}
      </Box>

      <Box display='grid' gridTemplateColumns='repeat(4, 1fr)' gap='4' mt='4'>

        {!ready && (
          [1, 2, 3, 4].map((i) => (
            <Box key={i} p='4' h='80' rounded='lg' bgColor='white'>
              <Skeleton rounded='md' w='full' h='full' />
            </Box>
          ))
        )}

        {results.map((result) => (
          <Box key={result.id} p='4' rounded='lg' bgColor='white'>
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
          </Box>
        ))}
      </Box>
    </Box>
  )
}
