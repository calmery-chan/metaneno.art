const { nextI18NextRewrites } = require("next-i18next/rewrites");
const path = require("path");

const localSubpaths = {
  en: "en",
  ja: "ja",
};

module.exports = {
  publicRuntimeConfig: { localSubpaths },
  rewrites: async () => nextI18NextRewrites(localSubpaths),
  webpack: (config) => {
    config.resolve.alias["~"] = path.resolve(__dirname, "src");
    return config;
  },
};
