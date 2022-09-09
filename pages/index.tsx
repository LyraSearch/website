import type { NextPage } from 'next'
import Image from 'next/image'
import { Box, Heading } from '@chakra-ui/layout'
import { ShortDemo } from '../components/ShortDemo'

const Home: NextPage = () => {
  return (
    <>
      <Box minHeight='100vh'>
        <Box pos='relative' w='full' minHeight='100vh'>
          <Image
            src='/images/home-bg-2.jpg'
            layout='fill'
            objectFit='cover'
            quality={100}
          />
          <Box pos='absolute' top='0' w='full' h='full' bgColor='blackAlpha.600' />
        </Box>

        <Box pos='absolute' top='0' h='full' w='full'>
          <Box maxW='container.xl' pt='44' m='auto'>
            <Heading fontFamily='body' fontWeight='extrabold' textAlign='center' fontSize='5xl'>
              THE EDGE SEARCH EXPERIENCE
            </Heading>
            <Box mt='8'>
              <ShortDemo />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Home
