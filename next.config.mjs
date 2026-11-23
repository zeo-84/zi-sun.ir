/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow the sandboxed live-preview host (and any deployment origin) in dev.
  allowedDevOrigins: ['*.e2b.app', 'localhost'],
  devIndicators: false,
  images: {
    // Local assets only; sharp is installed so the optimizer works out of the box.
    formats: ['image/webp'],
  },
};

export default nextConfig;
