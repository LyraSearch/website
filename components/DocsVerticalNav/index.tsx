import type { FC } from 'react'
import type { PostsBySection } from '../../utils/docs/server-side'
import Link from 'next/link'
import { Box, Stack, Text } from '@chakra-ui/layout'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'

interface DocsVerticalNavProps {
  posts: PostsBySection
}

export const DocsVerticalNav: FC<DocsVerticalNavProps> = ({ posts }) => {
  const sections = Object.keys(posts)
  console.log(posts)

  return (
    <Box pos='sticky' top='36' borderRight='1px' borderColor='gray.700' pr='10'>
      {sections.map((section) => (
        <Accordion key={section} allowToggle>
          <AccordionItem mb='2' border='none' rounded='md' _hover={{ bg: 'gray.800' }} transition='ease 0.3s'>
            <AccordionButton display='flex' justifyContent='space-between'>
              <Text textTransform='capitalize'> {section} </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Stack>
                {posts[section].map((post) => (
                  <Link href={post.slug} key={post.slug} passHref>
                    <Text as='a' p='2' rounded='md' _hover={{ bg: 'gray.600' }} transition='ease 0.3s'>{post.data.title}</Text>
                  </Link>
                ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  )
}
