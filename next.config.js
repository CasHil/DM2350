/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  basePath: isProd ? "/DM2350" : "",
  assetPrefix: isProd ? "/DM2350/" : "/",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
