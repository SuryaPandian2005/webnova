/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  compress: true,

  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],

    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/(.*)',

        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },

          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },

          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },

          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },

          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },

  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;