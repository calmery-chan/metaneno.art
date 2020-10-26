const path = require("path");
const nextBundleAnalyzer = require("@next/bundle-analyzer");
const { nextI18NextRewrites } = require("next-i18next/rewrites");

const localSubpaths = {
  en: "en",
  ja: "ja",
};

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: !!process.env.ANALYZE,
});

module.exports = withBundleAnalyzer({
  publicRuntimeConfig: { localSubpaths },
  rewrites: async () => nextI18NextRewrites(localSubpaths),
  webpack: (config) => {
    config.resolve.alias["~"] = path.resolve(__dirname, "src");
    return config;
  },
});
