// @ts-check

const transpileModules = require('next-transpile-modules')
const WithTMInitializer = transpileModules([
  'axios'
])

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = WithTMInitializer(nextConfig)
