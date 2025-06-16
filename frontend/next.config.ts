// next.config.js
import withPWA from "next-pwa";
import type { NextConfig } from "next";

const baseConfig: NextConfig = {
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
};
//PWAの設定
export default withPWA({
  ...baseConfig,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});

