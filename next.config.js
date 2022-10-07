/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
})

const nextConfig = withMDX({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.tmdb.org']
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']
})

module.exports = nextConfig
