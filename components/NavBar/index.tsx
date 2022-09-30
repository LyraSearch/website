import type { FC } from 'react'
import Link from 'next/link'
import { Image } from '@chakra-ui/image'
import { Box, Text } from '@chakra-ui/layout'
import { NavSearch } from '../NavSearch'

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
    href: '/contribute',
    label: 'Contribute'
  }
]

const PageLink: FC<PageLinkProps> = ({ href, label }) => (
  <Link href={href} passHref>
    <Text as='a' textTransform='uppercase' ml='4' _hover={{ textDecor: 'underline' }}>
      {label}
    </Text>
  </Link>
)

export const NavBar: FC<{}> = () => {
  return (
    <Box width='full' pos='fixed' zIndex='modal' backdropFilter='auto' backdropBlur='8px'>
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

        <Box display='flex' alignItems='center' h='full'>
          {pages.map((page) => <PageLink key={page.href} {...page} />)}
          <NavSearch />
        </Box>
      </Box>
    </Box>
  )
}
