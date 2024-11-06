/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ysywtbtwtqaejftbjpet.supabase.co'],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://*.cal.com",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 