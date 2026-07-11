import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Spotify album artwork (now-playing bubble)
      { protocol: "https", hostname: "i.scdn.co" },
    ],
  },
};

export default nextConfig;
