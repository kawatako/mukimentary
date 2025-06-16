// next.config.ts
const nextConfig = {
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

export default nextConfig;
