/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["source.unsplash.com", "localhost"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "buy-and-sell-app-api.vercel.app",
      },
      {
        protocol: "http",
        hostname: "localhost:8000",
      },
    ],
  },
};

module.exports = nextConfig;
