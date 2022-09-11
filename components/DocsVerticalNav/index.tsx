import type { FC } from 'react'
import Link from 'next/link'
import { Box, Text } from '@chakra-ui/layout'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import { unslugify } from '../../utils'

interface DocsVerticalNavProps {
  paths: string[]
}

interface PathsObject {
  [key: string]: PathsObject | string[]
}

export const DocsVerticalNav: FC<DocsVerticalNavProps> = ({ paths }) => {
  const allPaths = paths.map((path) => path.split('/')).map((p) => p.slice(2, p.length))

  const pathsObject: PathsObject = allPaths.reduce((acc, curr) => {
    const [first, ...rest] = curr
    // @ts-expect-error
    if (acc[first]) {
      const [second, ...rest2] = rest
      // @ts-expect-error
      if (acc[first][second]) {
        // @ts-expect-error
        acc[first][second].push(rest2[0])
      } else {
        // @ts-expect-error
        acc[first][second] = [rest2[0]]
      }
    } else {
      // @ts-expect-error
      acc[first] = { [rest[0]]: [rest[1]] }
    }
    return acc
  }, {})

  return (
    <Box>
      {Object.keys(pathsObject).map((key) => (
        <Accordion allowToggle key={key}>
          <AccordionItem border='none' rounded='md' _hover={{ bg: 'gray.800' }} transition='ease 0.3s'>
            <AccordionButton display='flex' justifyContent='space-between'>
              <Text>
                {unslugify(key)}
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {Object.keys(pathsObject[key]).map((key2) => (
                <Accordion allowToggle key={key2} p='2' rounded='md' _hover={{ bg: 'gray.600' }} transition='ease 0.3s'>
                  <AccordionItem border='none'>
                    {/* @ts-expect-error */}
                    <Link href={`/docs/${key}/${key2}/${pathsObject[key][key2]}`} passHref>
                      <a> {unslugify(key2)} </a>
                    </Link>
                  </AccordionItem>
                </Accordion>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  )
}
