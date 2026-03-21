import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  async redirects() {
    const SITE = "https://flunio.com";

    return [
      // ✅ Redirect old Vercel domain → main domain
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "slovak-study.vercel.app",
          },
        ],
        destination: `${SITE}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;