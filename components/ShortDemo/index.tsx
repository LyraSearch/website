import type { RetrievedDoc } from '@lyrasearch/lyra'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Input } from '@chakra-ui/input'
import { Box, Grid, Text } from '@chakra-ui/layout'
import { Show } from '@chakra-ui/react'
import { useThrottle } from '../../utils/hooks/useThrottle'

function getDefaultSearchTerm () {
  const defaultSearchTerms = [
    'Pulp Fiction',
    'Avengers',
    'Star Wars',
    'Midnight',
    'The Matrix'
  ]

  return defaultSearchTerms[Math.floor(Math.random() * defaultSearchTerms.length)]
}

function trimText (text: string, len: number = 100): string {
  if (text?.length > len) {
    return text?.substring(0, len) + '...'
  }

  return text
}

export const ShortDemo = () => {
  const [term, setTerm] = useState(getDefaultSearchTerm())
  const [results, setResults] = useState<Array<RetrievedDoc<any>>>([])
  const [elapsed, setElapsed] = useState('0')
  const [count, setCount] = useState(0)

  function performSearch (term: string) {
    const queryTerm = encodeURIComponent(term)
    fetch(`https://movies.lyrasearch.io/v1/search?term=${queryTerm}&limit=3&properties=title,overview`)
      .then(async (data) => await data.json())
      .then((data) => {
        setResults(data.hits)
        setElapsed(data.elapsed)
        setCount(data.count)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const throttledSearch = useThrottle(performSearch, 200)

  useEffect(() => {
    throttledSearch(term)
  }, [term])

  return (
    <Box>
      <Box w='full' m='auto'>
        <Input
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

        {results?.map((result) => (
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
              <Text color='gray.600' mt='2'> <>{trimText(result.overview as string)}</> </Text>
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
