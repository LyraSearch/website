import Link from 'next/link'
import { Box, Flex, Grid, GridItem, Image, Stack, StackItem, Text } from '@chakra-ui/react'
import { FaTwitter, FaGithub } from 'react-icons/fa'

const guideLinks = [
  {
    label: 'Getting started',
    href: '/docs/introduction/getting-started-with-lyra'
  },
  {
    label: 'Creating a new instance',
    href: '/docs/usage/creating-a-new-lyra-instance'
  },
  {
    label: 'Insert data',
    href: '/docs/usage/insert-data'
  },
  {
    label: 'Search data',
    href: '/docs/usage/search-data'
  }
]

const aboutLinks = [
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Contributing',
    href: '/contribute'
  }
]

const social = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/lyra_search',
    icon: FaTwitter
  },
  {
    label: 'Github',
    href: 'https://github.com/LyraSearch',
    icon: FaGithub
  }
]

export function Footer () {
  return (
    <Box w='full' bg='#5200FF'>
      <Grid w='container.xl' m='auto' py='10' px={{ base: '6', md: '0' }} gridTemplateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap='10'>
        <GridItem>
          <Image src='/logo/lyra-edge-logo-white.svg' w='40' />
        </GridItem>
        <GridItem>
          <Grid gridTemplateColumns='1fr 1fr'>
            <GridItem>
              <Stack spacing='2'>
                <StackItem>
                  <Text fontWeight='bold' fontSize='xl'> Documentation </Text>
                </StackItem>
                {guideLinks.map((link) => (
                  <StackItem key={link.label}>
                    <Link href={link.href} passHref>
                      <Text as='a' _hover={{ textDecor: 'underline' }}>{link.label}</Text>
                    </Link>
                  </StackItem>
                ))}
              </Stack>
            </GridItem>
            <GridItem>
              <Stack spacing='2'>
                <StackItem>
                  <Text fontWeight='bold' fontSize='xl'> About Lyra </Text>
                </StackItem>
                {aboutLinks.map((link) => (
                  <StackItem key={link.label}>
                    <Link href={link.href} passHref>
                      <Text as='a' _hover={{ textDecor: 'underline' }}>{link.label}</Text>
                    </Link>
                  </StackItem>
                ))}
              </Stack>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem>
          <Text fontWeight='bold' fontSize='xl'> The edge search experience </Text>
          <Text mt='2'> Developed and sponsored by <Text as='a' href='https://nearform.com' fontWeight='bold' _hover={{ textDecor: 'underline' }}> NearForm </Text> </Text>
          <Text> Licensed under the Apache 2.0 license </Text>
          <Flex mt={{ base: '4', md: '2' }}>
            {social.map((link) => (
              <Link href={link.href} key={link.label}>
                <a target='_blank' rel='noopener noreferrer'>
                  <Box as={link.icon} size='20' color='white' mr='4' />
                </a>
              </Link>
            ))}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  )
}
