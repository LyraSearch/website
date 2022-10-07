import type { FC } from 'react'
import { Box } from '@chakra-ui/react'

const DocsLayout: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <Box bg='red'>
      {children}
    </Box>
  )
}

export default DocsLayout
