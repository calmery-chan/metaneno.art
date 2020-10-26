const path = require("path");
const nextBundleAnaluzer = require("@next/bundle-analyzer");
const withSourceMaps = require("@zeit/next-source-maps");
const { nextI18NextRewrites } = require("next-i18next/rewrites");

const localSubpaths = {
  en: "en",
  ja: "ja",
};

const withBundleAnalyzer = nextBundleAnaluzer({
  enabled: !!process.env.ANALYZE,
});

module.exports = withBundleAnalyzer(
  withSourceMaps({
    poweredByHeader: false,
    publicRuntimeConfig: { localSubpaths },
    rewrites: async () => nextI18NextRewrites(localSubpaths),
    webpack: (config) => {
      config.resolve.alias["~"] = path.resolve(__dirname, "src");
      return config;
    },
  })
);
