const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable strict mode to avoid calling useEffect twice in development.
  // The uploader and downloader are both using useEffect to listen for peerjs events
  // which causes the connection to be created twice.
  reactStrictMode: false,
  outputFileTracingRoot: path.join(__dirname, './'),
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig