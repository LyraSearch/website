import type { ParsedUrlQuery } from 'querystring'
import fs from 'fs'
import path from 'path'
import glob from 'tiny-glob'
import matter from 'gray-matter'

export interface PostWithContent {
  content: string
  data: {
    title: string
    description: string
  }
  slug: string
  section: string
  sidebar_position: number
}

export interface PostsBySection {
  [section: string]: {
    position: number
    title: string
    description: string
    docs: PostWithContent[]
  }
}

export async function getAllPosts () {
  const posts = await glob(path.join(process.cwd(), '/docs/**/*.md'))
  const paths = posts.map((post) => '/' + post.replace(/\.md?/, ''))
  return paths
}

export async function getAllPostsWithContent (): Promise<PostsBySection> {
  const posts = await glob(path.join(process.cwd(), '/docs/**/*.md'))
  const meta = await glob(path.join(process.cwd(), '/docs/**/__meta.json'))

  const data = await Promise.all(posts.map(async (post) => {
    const file = await fs.promises.readFile(post, 'utf8')
    const { data, content } = matter(file)
    const slug = '/' + post.replace(/\.md?/, '')
    const sections = slug.split('/').filter(Boolean)

    return {
      // content,
      data,
      slug,
      section: sections[1]
    }
  }))

  const groupDocsBySection = await data.reduce<any>((acc, doc) => {
    const { section } = doc
    const sectionMeta = meta.find((m) => m.includes(section))
    const sectionMetaContent = fs.readFileSync(path.join(process.cwd(), sectionMeta!), 'utf8')

    if (!acc[section]) {
      acc[section] = {
        ...JSON.parse(sectionMetaContent),
        docs: []
      }
    }

    acc[section].docs.push(doc)
    return acc
  }, {})

  Object.keys(groupDocsBySection).forEach((section) => {
    groupDocsBySection[section].docs.sort((a: any, b: any) => {
      return a.data.sidebar_position - b.data.sidebar_position
    })
  })

  const orderedSections = Object.keys(groupDocsBySection).sort((a, b) => {
    return groupDocsBySection[a].position - groupDocsBySection[b].position
  })

  const orderedSectionsObject = orderedSections.reduce((acc, section) => {
    // @ts-expect-error
    acc[section] = groupDocsBySection[section]
    return acc
  }, {})

  return orderedSectionsObject as PostsBySection
}

export async function getPostContent (params: ParsedUrlQuery) {
  const all = params?.all as string[]
  const filePath = path.join(process.cwd(), '/docs', all.join('/')) + '.md'

  const docContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(docContent)

  return {
    data,
    content
  }
}
