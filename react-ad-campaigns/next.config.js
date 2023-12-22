/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: [
    {
      key: "Cache-Control",
      value: "no-store",
    },
  ],
};

module.exports = nextConfig;
