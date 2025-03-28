/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  // Exclude tempobook directory from the build
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /tempobook/,
    };
    return config;
  },
  // Explicitly exclude tempobook directory from the build
  distDir: ".next",
  output: "standalone",
  experimental: {
    outputFileTracingExcludes: {
      "*": ["**/tempobook/**"],
    },
    // Disable error page generation
    disableOptimizedLoading: true,
  },
  // Ignore tempobook directory during build
  pageExtensions: ["tsx", "ts", "jsx", "js"],
};

if (process.env.NEXT_PUBLIC_TEMPO) {
  // Ensure we don't overwrite existing experimental settings
  nextConfig.experimental = {
    ...nextConfig.experimental,
    // NextJS 14.1.3 to 14.2.11:
    swcPlugins: [[require.resolve("tempo-devtools/swc/0.90"), {}]],
  };
}

module.exports = nextConfig;
