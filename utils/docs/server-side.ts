import type { ParsedUrlQuery } from 'querystring'
import fs from 'fs'
import path from 'path'
import glob from 'tiny-glob'
import matter from 'gray-matter'

export async function getAllPosts () {
  const posts = await glob(path.join(process.cwd(), '/docs/**/*.md'))
  const paths = posts.map((post) => '/' + post.replace(/\.md?/, ''))
  return paths
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
