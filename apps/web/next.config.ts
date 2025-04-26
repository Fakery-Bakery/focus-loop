import type { NextConfig } from "next";
import { join } from "path";

// The NextConfig type doesn't include all experimental features, but they work at runtime
const nextConfig: NextConfig = {
  experimental: {
    // @ts-expect-error - transpilePackages exists at runtime but is missing from NextConfig types
    transpilePackages: ["@focus-loop/core-timers"],
  },
  webpack(config) {
    // Alias the core-timers package to its source for Turbopack
    config.resolve.alias["@focus-loop/core-timers"] = join(
      __dirname,
      "../../packages/core-timers/src"
    );
    return config;
  },
};

export default nextConfig;
