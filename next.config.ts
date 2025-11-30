import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  // For static export with dynamic routes, we need to handle fallback behavior
  // The dynamic routes will work via client-side routing
  trailingSlash: true
}

export default nextConfig
