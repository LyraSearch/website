const UnoCSS = require('@unocss/webpack').default

// https://github.com/unocss/unocss/tree/main/examples/next
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // Disable the cache to make unocss webpack plugin work with HMR
    config.cache = false
    config.plugins.push(
      UnoCSS(), // <--
    )
    return config
  },
}

module.exports = nextConfig
