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

      // ✅ NEW: Redirect legacy SEO pages
      {
        source: "/slovak-for-ukrainians",
        destination: "/learn-slovak",
        permanent: true,
      },
      {
        source: "/ru/slovak-for-ukrainians",
        destination: "/learn-slovak",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;