const transpileModules = require('next-transpile-modules')
const addTranspileModules = transpileModules([
  'axios'
])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = addTranspileModules(nextConfig)
