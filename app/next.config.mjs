/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const isDev = process.env.NODE_ENV !== "production";
    const baseUrl = isDev
      ? "http://localhost:3000" // Local development URL
      : `https://${process.env.VERCEL_URL}`; // Vercel deployed URL
    return [
      {
        source: "/api",
        destination: baseUrl,
      },
    ];
  },
};

export default nextConfig;
