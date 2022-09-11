import type { GetStaticPaths, GetStaticProps } from 'next'
import { FC, useEffect } from 'react'
import { Box, Grid, GridItem, Text } from '@chakra-ui/layout'
import Link from 'next/link'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import ReactMarkdown from 'react-markdown'
import slugify from 'slugify'
import { getAllPosts, getPostContent } from '../../utils/docs/server-side'
import { DocsVerticalNav } from '../../components/DocsVerticalNav'

interface DocsProps {
  data: { [key: string]: string }
  content: string
  paths: string[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPosts()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data, content } = await getPostContent(params!)
  const paths = await getAllPosts()
  return {
    props: {
      data,
      content,
      paths
    }
  }
}

function createLink ({ props, size }: any) {
  const { children } = props
  const [text] = children

  // @ts-expect-error
  const fontSizes = {
    h1: '4xl',
    h2: '3xl',
    h3: '2xl',
    h4: 'xl',
    h5: 'lg',
    h6: 'md'
  }[size]

  return (
    <Box display='flex' mb='5' fontSize={fontSizes}>
      <Link href={`#${slugify(text, { lower: true })}`} passHref>
        <Text fontWeight='light' as='a' _hover={{ color: 'pink.500' }} transition='ease 0.3s'>#</Text>
      </Link>
      <Text fontWeight='bold' ml='3' as={size} {...props} />
    </Box>
  )
}

const Docs: FC<DocsProps> = ({ data, content, paths }) => {
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript)
    hljs.highlightAll()
  }, [])

  return (
    <Box w='container.xl' m='auto' pt='40'>
      <Grid gridTemplateColumns='20% 1fr 20%' gridGap='16'>
        <GridItem>
          <DocsVerticalNav paths={paths} />
        </GridItem>
        <GridItem>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => createLink({ props, size: 'h1' }),
              h2: ({ node, ...props }) => createLink({ props, size: 'h2' }),
              h3: ({ node, ...props }) => createLink({ props, size: 'h3' }),
              h4: ({ node, ...props }) => createLink({ props, size: 'h4' }),
              h5: ({ node, ...props }) => createLink({ props, size: 'h5' }),
              h6: ({ node, ...props }) => createLink({ props, size: 'h6' }),
              p: ({ node, ...props }) => <Text fontSize='md' mb='3' color='gray.300' {...props} />,
              b: ({ node, ...props }) => <Text as='b' fontWeight='bold' fontSize='md' {...props} />,
              br: () => <Box dangerouslySetInnerHTML={{ __html: '<br />' }} />,
              i: ({ node, ...props }) => <Text as='i' fontSize='md' {...props} />,
              iframe: ({ node, ...props }) => <Box dangerouslySetInnerHTML={{ __html: node.children[0] }} />,
              a: ({ node, ...props }) => {
                console.log(node)
                if ((props.href)?.startsWith('/')) {
                  return <Link href={props.href} passHref> <a {...props} /></Link>
                } else {
                  return <a {...props} />
                }
              },
              hr: () => <Box w='100%' h='1px' bg='gray.700' my='5' />,
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && (match != null)
                  ? (
                    <Box
                      as='pre'
                      bg='gray.800'
                      p='3'
                      borderRadius='md'
                      maxW='container.md'
                      overflowX='auto'
                      m='auto'
                      mb='4'
                      {...props}
                    >
                      <Box
                        as='code'
                        overflowX='auto'
                        className={className}
                        dangerouslySetInnerHTML={{
                          __html: hljs.highlight(children.toString(), {
                            language: match[1]
                          }).value
                        }}
                      />
                    </Box>
                    )
                  : (
                    <code className={className} {...props} />
                    )
              }
            }}
            children={content}
          />;
        </GridItem>
        <GridItem />
      </Grid>
    </Box>
  )
}

export default Docs
