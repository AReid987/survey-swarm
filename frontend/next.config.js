/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Configure transpilation for node_modules that need it
  transpilePackages: [
    'd3',
    'recharts',
    'date-fns',
    'socket.io-client',
  ],

  // Configure image domains - updated to use remotePatterns
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
    ],
  },

  // Configure webpack for specific modules
  webpack: (config) => {
    // Handle specific module resolutions
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './app',
      '@/components': './app/components',
      '@/constants': './app/constants',
      '@/utils': './app/utils',
      '@/types': './app/types',
      '@/store': './app/store',
      '@/api': './app/api',
      '@/assets': './app/assets',
    };

    return config;
  },

  // Configure Turbopack
  turbopack: {
    // Empty config to silence the warning
  },

  // Configure proxy for API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
      {
        source: '/socket.io/:path*',
        destination: 'http://localhost:8000/socket.io/:path*',
      },
    ];
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;