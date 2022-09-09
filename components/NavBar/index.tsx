import type { FC } from 'react'
import Link from 'next/link'
import { Image } from '@chakra-ui/image'
import { Box, Text } from '@chakra-ui/layout'

interface PageLinkProps {
  href: string
  label: string
}

const pages: PageLinkProps[] = [
  {
    href: '/docs',
    label: 'Docs'
  },
  {
    href: '/about',
    label: 'About'
  },
  {
    href: '/team',
    label: 'Team'
  }
]

const PageLink: FC<PageLinkProps> = ({ href, label }) => (
  <Link href={href} passHref>
    <Text as='a' textTransform='uppercase' ml='4' _hover={{ color: 'gray.400' }}>
      {label}
    </Text>
  </Link>
)

export const NavBar: FC<{}> = () => {
  return (
    <Box width='full' pos='fixed' zIndex='banner'>
      <Box maxW='container.xl' m='auto' py='5' display='flex' justifyContent='space-between' alignItems='center'>
        <Link href='/' passHref>
          <a>
            <Image
              src='/logo/lyra-edge-logo-white.svg'
              alt='Lyra, the edge search experience'
              w='44'
            />
          </a>
        </Link>

        <Box>
          {pages.map((page) => <PageLink key={page.href} {...page} />)}
        </Box>
      </Box>
    </Box>
  )
}
