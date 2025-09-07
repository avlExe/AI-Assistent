/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Для Netlify
  trailingSlash: true,
  distDir: 'out',
  output: 'export'
}

module.exports = nextConfig
