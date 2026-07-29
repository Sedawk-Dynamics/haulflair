/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Serve modern formats + responsive srcsets. All imagery is self-hosted
    // under /public, so no remotePatterns are needed.
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
