const path = require("path");
const nextBundleAnalyzer = require("@next/bundle-analyzer");
const nextSourceMaps = require("@zeit/next-source-maps");
const { nextI18NextRewrites } = require("next-i18next/rewrites");

const localSubpaths = {
  en: "en",
  ja: "ja",
};

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: !!process.env.ANALYZE,
});

const withSourceMaps = nextSourceMaps({
  devtool: "hidden-source-map",
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
