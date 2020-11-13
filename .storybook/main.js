const path = require("path");

module.exports = {
  addons: ["@storybook/addon-actions"],
  stories: ["../src/**/*.stories.tsx"],
  webpackFinal(config) {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
    });

    config.module.rules.push({
      test: /\.tsx$/,
      use: "linaria/loader",
    });

    config.resolve.alias["~"] = path.resolve(__dirname, "../src");

    return config;
  },
};
