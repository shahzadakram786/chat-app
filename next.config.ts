import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  async redirects() {
    
    return [
      {
        source: '/',
        destination: '/conversations',
        permanent: true,
      },
      // {
      //   source: '/friends',
      //   destination: '/friends',
      //   permanent: false,
      // },
    ];
    
  }
};

export default nextConfig;
