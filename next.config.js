const { nextI18NextRewrites } = require("next-i18next/rewrites");
const path = require("path");

module.exports = {
  rewrites: async () => nextI18NextRewrites(),
  webpack: (config) => {
    config.resolve.alias["~"] = path.resolve(__dirname, "src");
    return config;
  },
};
