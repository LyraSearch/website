import type { AppProps } from 'next/app'
import { extendTheme, Box, ChakraProvider } from '@chakra-ui/react'
import { NavBar } from '../components/NavBar'

import '@fontsource/inter/100.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'

const theme = extendTheme({
  fonts: {
    heading: '\'Engravers Gothic\', sans-serif',
    body: '\'Inter\', sans-serif'
  },
  colors: {
    darkBg: '#01010B'
  }
})

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box w='full' bgColor='darkBg' style={{ minHeight: '100vh' }} color='gray.200'>
        <NavBar />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
