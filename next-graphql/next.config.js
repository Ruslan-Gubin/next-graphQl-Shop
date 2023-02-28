/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental: {
  //   appDir: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloudinary://847751578644239:aMWtBm5IqyfkhEryXFSbEbMt0Q4@ds289tkqj',
        port: '',
        pathname: '/ds289tkqj/aMWtBm5IqyfkhEryXFSbEbMt0Q4',
      },
    ],
  },
}
///catalog/kantstovary/(https://res.cloudinary.com/ds289tkqj/image/upload/v1676059111/Hits/1655981923937913643_vgxnrp.webp)
module.exports = nextConfig
