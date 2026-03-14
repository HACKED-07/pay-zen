import type { NextConfig } from "next";

const config: NextConfig = {
  serverExternalPackages: [],
  serverActions: {
    allowedOrigins: ["example.com"],
  },
  experimental: {
    serverActions: true
  }
};
