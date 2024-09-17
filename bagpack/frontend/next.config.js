/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const analyzeSourceMaps = require("./analyzeSourceMaps");

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  productionBrowserSourceMaps: true,
  optimizeCss: true, // CSS 최적화 활성화
  webpack(config, { dev, isServer }) {
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // 프로덕션 빌드에서만 소스맵 분석 실행
    if (!dev && !isServer) {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.afterEmit.tapPromise(
            "AnalyzeSourceMaps",
            async (compilation) => {
              await analyzeSourceMaps();
            },
          );
        },
      });
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
