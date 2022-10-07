const path = require('path')
const fs = require('fs')
const { create, insert } = require('@lyrasearch/lyra')
const { persistToFile } = require('@lyrasearch/plugin-data-persistence')
const glob = require('tiny-glob')
const matter = require('gray-matter')
const { marked } = require('marked')

function parseMarkdown (text) {
  const lexer = marked.lexer(text)
  let tks = ''

  for (const { type, text } of lexer) {
    const validTokens = ['heading', 'paragraph', 'list', 'blockquote']
    if (validTokens.includes(type)) {
      tks += text?.replaceAll('`', '') + ' '
    }
  }

  return tks ?? ''
}

async function createDatabase () {
  const db = create({
    schema: {
      title: 'string',
      description: 'string',
      slug: 'string',
      content: 'string'
    }
  })

  const docs = await glob(path.join(__dirname, '../docs/**/*.md'))

  const data = await Promise.all(
    docs.map(async (doc) => {
      const file = fs.readFileSync(doc, 'utf8')
      const { data, content } = matter(file)
      parseMarkdown(content)
      return {
        slug: doc.replace(/\.md$/, ''),
        ...data,
        content: parseMarkdown(content)
      }
    }
    ))

  for (const doc of data) {
    insert(db, {
      title: doc.title,
      description: doc.description,
      slug: doc.slug,
      content: doc.content
    })
  }

  persistToFile(db, 'json', path.join(__dirname, 'db.json'))
}

createDatabase()
