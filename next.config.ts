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

      // Old Russian URLs used Ukrainian transliteration.
      // Redirect them to the clean Russian landing pages.
      {
        source: "/ru/vyvchennia-slovatskoi-movy-online",
        destination: "/ru/learn-slovak",
        permanent: true,
      },
      {
        source: "/ru/vyvchennia-cheskoi-movy-online",
        destination: "/ru/learn-czech",
        permanent: true,
      },
      {
        source: "/ru/vyvchennia-polskoi-movy-online",
        destination: "/ru/learn-polish",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;