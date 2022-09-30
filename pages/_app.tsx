import type { AppProps } from 'next/app'
import { extendTheme, Box, ChakraProvider } from '@chakra-ui/react'
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
      <Box w='full' bgColor='darkBg' style={{ minHeight: '100vh' }} color='gray.200' overflowX='hidden'>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
