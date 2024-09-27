/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const withTM = require('next-transpile-modules')([
  'clsx', 'tailwind-merge', 'framer-motion', '@tanstack/query-core', 'embla-carousel-reactive-utils',
  '@tanstack/virtual-core', '@tanstack/react-virtual', 'core-js', 'react-router', '@castlabs/prestoplay',
  'react-loading-skeleton', '@remix-run/router', 'embla-carousel', 'html-to-react', 'zustand', 'chalk',
  '@tanstack/react-query', 'compute-scroll-into-view', 'scroll-into-view-if-needed', 'react-toastify',
  'usehooks-ts', 'rc-util', 'classnames', 'util', 'react', 'antd', '@ant-design/colors'
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*).[svg|png|jpg|jpeg|gif|webp|css]',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=1200, s-maxage=1200, stale-while-revalidate=86400, stale-if-error=86400, must-revalidate',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=600, s-maxage=600, stale-while-revalidate=86400, stale-if-error=86400',
          },
        ],
      }
    ];
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      loader: '@svgr/webpack',
      options: {
        prettier: false,
        svgo: false,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  // disable plugins
                  removeViewBox: false,
                },
              },
            },
          ],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });

    config.optimization.minimize = false;
    // config.target = 'es5';
    config.output.pathinfo = true;

    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: "> 0.3%, defaults, supports es5",
              useBuiltIns: "usage",
              corejs: 3
            }],
            '@babel/preset-react', // Для JSX
            '@babel/preset-typescript', // Для TypeScript
          ],
          plugins: [
            ['@babel/plugin-transform-react-jsx', { 
              runtime: 'automatic' // Для автоматического импорта React, где нужно
            }]
          ]
        },
      },
    });

    return config;
  },
  sassOptions: {
    includePaths: [
      path.join(__dirname, '../../packages/ui/src/styles/abstracts'),
    ],
  },
};

module.exports = withTM(nextConfig);
