/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.notion.so" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
