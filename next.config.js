/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["arweave.net", "nftstorage.link", "ipfs.io", "shdw-drive.genesysgo.net"],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
