import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com",
       "ui-avatars.com",
      ],
      remotePatterns: [{
        hostname: 'res.cloudinary.com'

      }]
  },
};

export default nextConfig;
