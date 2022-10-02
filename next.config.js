/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  assetPrefix: isProd ? "/dm2350/" : "",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
