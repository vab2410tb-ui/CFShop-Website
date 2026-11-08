
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "8mcghb79-3000.asse.devtunnels.ms",
  ],

  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "8mcghb79-3000.asse.devtunnels.ms",
      ],
    },
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  outputFileTracingIncludes: {
    "/*": [
      "./generated/prisma/**/*",
      "./node_modules/.prisma/client/**/*",
      "./node_modules/@prisma/client/**/*",
    ],
  },
};

export default nextConfig;
