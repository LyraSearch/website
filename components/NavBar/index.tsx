import Link from 'next/link'
import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Image } from '@chakra-ui/image'
import { Box, Stack, Text } from '@chakra-ui/layout'
import { IconButton, Show, Drawer, DrawerBody, DrawerOverlay, DrawerContent, useDisclosure } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

interface PageLinkProps {
  href: string
  label: string
  sub: boolean
}

export const pages: PageLinkProps[] = [
  {
    href: 'https://docs.lyrasearch.io',
    label: 'Docs',
    sub: true
  },
  {
    href: '/contribute',
    label: 'Contribute',
    sub: false
  }
]

const PageLink: FC<PageLinkProps> = ({ href, label, sub }) => (
  <Link href={href} passHref>
    <Text fontSize='xl' ml='4' _hover={{ textDecor: 'underline' }}>
      {label}
    </Text>
  </Link>
)

const PageLinkMobile: FC<PageLinkProps> = ({ href, label }) => (
  <Link href={href} passHref>
    <Text textTransform='uppercase' _hover={{ textDecor: 'underline' }}>
      {label}
    </Text>
  </Link>
)

export const NavBar: FC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { asPath } = useRouter()

  useEffect(onClose, [asPath])

  return (
    <>
      <Show above='md'>
        <Box width='full' pos='fixed' zIndex='modal' backdropFilter='auto' backdropBlur='8px'>
          <Box maxW='container.xl' m='auto' py='5' display='flex' justifyContent='space-between' alignItems='center'>
            <Link href='/'>
              <Image
                src='/logo/lyra-edge-logo-white.svg'
                alt='Lyra, the edge search experience'
                w='44'
              />
            </Link>

            <Box display='flex' alignItems='center' h='full'>
              {pages.map((page) => <PageLink key={page.href} {...page} />)}
            </Box>
          </Box>
        </Box>
      </Show>

      <Show below='md'>
        <Box width='full' pos='fixed' zIndex='modal' backdropFilter='auto' backdropBlur='8px' px='6'>
          <Box w='full' m='auto' py='5' display='flex' justifyContent='space-between' alignItems='center'>
            <Link href='/' passHref>
              <Image
                src='/logo/lyra-edge-logo-white.svg'
                alt='Lyra, the edge search experience'
                w='28'
              />
            </Link>

            <IconButton aria-label='Open menu' icon={<HamburgerIcon />} colorScheme='whiteAlpha' onClick={onOpen} />
          </Box>
        </Box>
      </Show>

      <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody bgColor='gray.900' color='white'>
            <Stack spacing='4' pt='4'>
              {pages.map((page) => <PageLinkMobile key={page.href} {...page} />)}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
