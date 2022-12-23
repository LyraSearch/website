import type { AppProps } from 'next/app'
import { extendTheme, Box, ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'

import '@fontsource/roboto/100.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/900.css'

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  fonts: {
    heading: '\'Roboto\', sans-serif',
    body: '\'Roboto\', sans-serif'
  },
  colors: {
    darkBg: '#08041A'
  }
})

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo
        defaultTitle='Lyra'
        titleTemplate='Lyra | %s'
        twitter={{
          handle: '@lyra_search',
          cardType: 'summary_large_image'
        }}
        openGraph={{
          type: 'website',
          locale: 'en_EN',
          images: [
            {
              url: 'https://lyrasearch.io/images/og-image.png',
              alt: 'Lyra, the edge search experience',
              height: 1080,
              width: 1920
            }
          ]
        }}
      />
      <Box w='full' bgColor='darkBg' style={{ minHeight: '100vh' }} color='gray.200' overflowX='hidden'>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
