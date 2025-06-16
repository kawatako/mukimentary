// frontend/app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mukimentary",
    short_name: "Mukimen",
    start_url: "/",
    display: "standalone",
    background_color: "#f9fafb",
    theme_color: "#ff6b81",
    description: "筋肉と掛け声のSNS",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
