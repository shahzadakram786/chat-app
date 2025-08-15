import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/conversations',
        permanent: true,
      },
      {
        source: '/friends',
        destination: '/friends/page',
        permanent: true,
      },
    ];
    
  }
};

export default nextConfig;
