// next.config.ts
import withPWA from "next-pwa";

const config = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4566",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "uploads-mukimentary.s3.ap-northeast-3.amazonaws.com",
        pathname: "/uploads/**",
      },
    ],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});

export default config;
