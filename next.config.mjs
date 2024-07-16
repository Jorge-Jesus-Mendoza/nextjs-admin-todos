/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    swcMinify: true,
    images:{
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'tailus.io'
        },
      ]
    },
    webpack: (config, context) => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300
      }
      return config
    }};

export default nextConfig;
