/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api", // The path you want to proxy
        destination: "http://localhost:3000", // The target URL
      },
    ];
  },
};

export default nextConfig;
