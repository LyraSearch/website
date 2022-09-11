import type { AppProps } from 'next/app'
import { extendTheme, Box, ChakraProvider } from '@chakra-ui/react'
import { NavBar } from '../components/NavBar'

import '@fontsource/roboto/100.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/900.css'

const theme = extendTheme({
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
      <Box w='full' bgColor='darkBg' style={{ minHeight: '100vh' }} color='gray.200'>
        <NavBar />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
