module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  webpackFinal(config) {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
    });

    return config;
  },
};
