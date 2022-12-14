import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Image, keyframes, Show, Tooltip } from '@chakra-ui/react'
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/layout'
import { ShortDemo } from '../components/ShortDemo'
import GitHubButton from 'react-github-btn'

const rotationKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const rotationAnimation = `${rotationKeyframes} 40s linear infinite`

const supportedRuntimes = [
  {
    name: 'AWS Lambda@Edge',
    image: '/misc/runtimes/aws-lambda-edge.svg'
  },
  {
    name: 'Bun',
    image: '/misc/runtimes/bun.svg'
  },
  {
    name: 'Cloudflare Workers',
    image: '/misc/runtimes/cloudflare-workers.svg'
  },
  {
    name: 'Deno',
    image: '/misc/runtimes/deno.svg'
  },
  {
    name: 'Browsers',
    image: '/misc/runtimes/javascript.svg'
  },
  {
    name: 'Netlify Functions',
    image: '/misc/runtimes/netlify-functions.svg'
  },
  {
    name: 'Node.js',
    image: '/misc/runtimes/node-js.svg'
  },
  {
    name: 'React Native',
    image: '/misc/runtimes/react-native.svg'
  }
]

const Home: NextPage = () => {
  const definitions = ['edge', 'offline', 'embedded', 'universal']
  const [definition, setDefinition] = useState(definitions[0])

  useEffect(() => {
    const interval = setInterval(() => {
      const index = definitions.indexOf(definition)
      const nextIndex = index + 1 === definitions.length ? 0 : index + 1
      setDefinition(definitions[nextIndex])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Show above='md'>
        <Box
          pos='absolute'
          top='0'
          right='0'
          w='40%'
          h={{ base: 'container.sm', md: 'container.md' }}
          bg='red'
          zIndex='0'
          bgGradient='linear(to-bl, #FF00E5, #5200FF, #00C8FF)'
          roundedBottomLeft='20%'
        />
      </Show>
      <Box w={{ base: 'full', md: 'container.xl' }} h='container.sm' m='auto' pt={{ base: '28', md: '40' }} display='grid' gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} zIndex='2'>
        <Box display='flex' flexDir='column' w='full' h='full' justifyContent='center' px={{ base: '6', md: '0' }}>
          <Heading fontSize={{ base: '5xl', md: '6xl' }} color='gray.100' lineHeight='1'>
            The <Text as='span' bgGradient='linear(to-l, #08B5FF, #F101E8)' bgClip='text'>{definition}</Text><br />
            search experience
          </Heading>
          <Text as='p' fontSize='xl' color='gray.400' mt='3'>
            Lyra is a fully-featured full-text search engine that runs wherever JavaScript runs, including browsers, servers, React Native, edge networks, and more.
          </Text>
          <Box display='flex' mt='5' w='full'>
            <Box>
              <GitHubButton href='https://github.com/nearform/lyra' data-icon='octicon-star' data-size='large' data-show-count='true' aria-label='Star nearform/lyra on GitHub'>Star</GitHubButton>
            </Box>
            <Box ml='3'>
              <GitHubButton href='https://github.com/nearform/lyra/fork' data-icon='octicon-repo-forked' data-size='large' data-show-count='true' aria-label='Fork nearform/lyra on GitHub'>Fork</GitHubButton>
            </Box>
          </Box>
        </Box>
        <Box zIndex='banner' w='full' h='full' p={{ base: '4', md: '0' }} display='flex' justifyContent='flex-end' alignItems='center'>
          <Image w={{ base: 'full', md: 'container.sm' }} h='auto' shadow='dark-lg' src='/images/code-example.png' alt='Example of running lyra on a JavaScript runtime' rounded='xl' />
        </Box>
      </Box>

      <Box w='full' bgGradient='linear(to-b, #5200FF, #080419)' mt='60'>
        <Box w={{ base: 'full', md: 'container.xl' }} m='auto' px={{ base: '4', md: '0' }} py='20' display='grid' gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} columnGap='16'>
          <Box>
            <Heading> Why Lyra? </Heading>
            <Text mt='10' textAlign='justify'>
              Lyra is a modern, dependency-free full-text search engine written in TypeScript. <br />
              It has been built with speed in mind and completes most search lookups in a few microseconds.<br /><br />

              It implements a very fast, vanilla prefix tree to perform efficient lookups and easy serialization with multiple formats, such as <b>dpack</b>, <b>messagepack</b>, and <b>protocol buffers</b>.<br /><br />

              Its main focus is to be able to run on edge networks, such as <b>AWS Lambda@Edge</b>, <b>Cloudflare Workers</b>, and <b>Netlify Functions</b>, so expect some updates on that.<br /><br />

              Given that it's written in TypeScript, it can be used in <b>any</b> JavaScript runtime, including browsers, servers, React Native, and more.<br /><br />

              It was named after the Lyra constellation due to its distributed and highly scalable nature.
            </Text>
          </Box>

          <Box pt={{ base: '10', md: '0' }}>
            <ShortDemo />
          </Box>
        </Box>
      </Box>

      <Box w='full' mt='20'>
        <Box w={{ base: 'full', md: 'container.xl' }} m='auto' pb='20'>
          <Heading textAlign='center'> Runs everywhere </Heading>

          <Show above='md'>
            <Grid templateColumns='repeat(8, 1fr)' mt='10'>
              {supportedRuntimes.map((runtime) => (
                <Box key={runtime.name}>
                  <Tooltip hasArrow label={runtime.name} placement='top'>
                    <Image
                      src={runtime.image}
                      alt={runtime.name}
                      w='44'
                    />
                  </Tooltip>
                </Box>
              ))}
            </Grid>
          </Show>

          <Show below='md'>
            <Flex pos='relative' justifyContent='center' alignItems='center' minH='80' mt='10'>
              <Image
                src='/misc/supported-runtimes.svg'
                alt='Runtimes supported by Lyra'
                w='full'
                pos='absolute'
                animation={rotationAnimation}
              />
              <Image
                src='/logo/lyra-shadowed.svg'
                alt='Lyra logo'
                w='44'
                pos='absolute'
              />
            </Flex>
          </Show>

          <Text textAlign='center' mt='10'> ...and any other JavaScript runtime. </Text>
        </Box>

      </Box>
    </>
  )
}

export default Home
