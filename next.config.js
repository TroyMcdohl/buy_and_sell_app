/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["source.unsplash.com", "localhost"],

    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost:8000",
      },
    ],
  },
};

module.exports = nextConfig;
