/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.uniqlo.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
};
export default nextConfig;
