import type { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import { Box, Code, Grid, GridItem, Text, Heading, Divider } from '@chakra-ui/layout'
import { anOldHope as ColorScheme } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import slugify from 'slugify'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPostContent, getAllPostsWithContent, PostsBySection } from '../../utils/docs/server-side'
import { DocsVerticalNav } from '../../components/DocsVerticalNav'
import { Alert, AlertIcon } from '@chakra-ui/react'
interface DocsProps {
  data: { [key: string]: string }
  content: string
  paths: string[]
  posts: PostsBySection
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
  const posts = await getAllPostsWithContent()
  const paths = await getAllPosts()
  return {
    props: {
      data,
      content,
      paths,
      posts
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

  const id = `${slugify(text, { lower: true })}`

  return (
    <Box display='flex' mb='5' mt={size === 'h1' ? '0' : '5'} fontSize={fontSizes}>
      <Link href={`#${id}`} passHref>
        <Text fontWeight='light' as='a' _hover={{ color: 'pink.500' }} transition='ease 0.3s'>#</Text>
      </Link>
      <Text id={id} fontWeight='bold' ml='3' as={size} {...props} />
    </Box>
  )
}

const Docs: FC<DocsProps> = ({ data, content, posts }) => {
  return (
    <Box w='container.xl' m='auto' pt='36'>
      <Grid gridTemplateColumns='30% 1fr' gridGap='10'>
        <GridItem>
          <DocsVerticalNav posts={posts} />
        </GridItem>
        <GridItem maxW='full'>
          <Heading as='h1' mb='3'> {data.title} </Heading>
          {data.badges?.length && (
            <Box display='flex' mb='10'>
              {(data.badges as unknown as any[]).map((badge) => (
                <Text key={badge.url} as='a' mr='4' href={badge.url} target='_blank'>
                  <img src={badge.image} alt={badge.label} />
                </Text>
              ))}
            </Box>
          )}
          <ReactMarkdown
            components={{
              // @ts-expect-error
              alert: ({ children = '', title = '', status = 'info' }) => {
                return (
                  // @ts-expect-error
                  <Alert status={status} title={title} my='5' rounded='md' variant='solid'>
                    <AlertIcon />
                    {children}
                  </Alert>
                )
              },
              h1: ({ node, ...props }) => createLink({ props, size: 'h1' }),
              h2: ({ node, ...props }) => createLink({ props, size: 'h2' }),
              h3: ({ node, ...props }) => createLink({ props, size: 'h3' }),
              h4: ({ node, ...props }) => createLink({ props, size: 'h4' }),
              h5: ({ node, ...props }) => createLink({ props, size: 'h5' }),
              h6: ({ node, ...props }) => createLink({ props, size: 'h6' }),
              p: ({ node, ...props }) => <Text fontSize='md' mb='4' color='gray.300' {...props} />,
              b: ({ node, ...props }) => <Text as='b' fontWeight='bold' fontSize='md' {...props} />,
              br: () => <Box dangerouslySetInnerHTML={{ __html: '<br />' }} />,
              i: ({ node, ...props }) => <Text as='i' fontSize='md' {...props} />,
              iframe: ({ node, ...props }) => {
                return (
                  <Box display='flex' justifyContent='center' my='10'>
                    <iframe {...props} />
                  </Box>
                )
              },
              blockquote: ({ node, ...props }) => {
                return <Box as='blockquote' borderLeft='4px solid #e2e8f0' pl='4' children={<Box as='i' children={props.children} />} />
              },
              a: ({ node, ...props }) => {
                if ((props.href)?.startsWith('/') || (props.href)?.startsWith('#')) {
                  return <Link href={props.href} passHref><Text as='a' href={props.href}>{props.children[0]}</Text></Link>
                } else {
                  return <Text as='a' href={props.href} target='_blank' color='pink.500' _hover={{ textDecor: 'underline' }} transition='ease 0.3s'> {props.href} </Text>
                }
              },
              hr: () => <Divider my='10' />,
              code: ({ inline, children }) => {
                if (inline) {
                  return <Code bgColor='gray.700' color='whiteAlpha.800'> {children} </Code>
                }

                return (
                  <Box maxW='container.md' m='auto' my='8' overflowX='auto'>
                    <SyntaxHighlighter wrapLines language='javascript' style={ColorScheme} customStyle={{ borderRadius: '5px' }}>
                      {children[0]!.toString()}
                    </SyntaxHighlighter>
                  </Box>
                )
              },
              ul: ({ node, ...props }) => <Box as='ul' listStyleType='disc' ml='5' children={props.children} />,
              li: ({ node, ...props }) => <Box as='li' mb='2' children={props.children} />,
              ol: ({ node, ...props }) => <Box as='ol' listStyleType='decimal' ml='5' children={props.children} />,
              table: ({ node, ...props }) => <Box as='table' w='100%' my='4' children={props.children} />
            }}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            children={content}
          />
        </GridItem>
        <GridItem />
      </Grid>
    </Box>
  )
}

export default Docs
