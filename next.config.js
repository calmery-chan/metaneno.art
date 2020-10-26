const path = require("path");
const nextBundleAnalyzer = require("@next/bundle-analyzer");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const nextSourceMaps = require("@zeit/next-source-maps");
const { nextI18NextRewrites } = require("next-i18next/rewrites");

// Environment Variables

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
} = process.env;

//

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: !!process.env.ANALYZE,
});

const withSourceMaps = nextSourceMaps({
  devtool: "hidden-source-map",
});

const localSubpaths = {
  en: "en",
  ja: "ja",
};

module.exports = withBundleAnalyzer(
  withSourceMaps({
    poweredByHeader: false,
    publicRuntimeConfig: { localSubpaths },
    rewrites: async () => nextI18NextRewrites(localSubpaths),
    serverRuntimeConfig: { rootDir: __dirname },
    webpack: (config, options) => {
      config.resolve.alias["~"] = path.resolve(__dirname, "src");

      if (!options.isServer) {
        config.resolve.alias["@sentry/node"] = "@sentry/browser";
      }

      if (
        NODE_ENV === "production" &&
        SENTRY_DSN &&
        SENTRY_ORG &&
        SENTRY_PROJECT &&
        SENTRY_AUTH_TOKEN &&
        VERCEL_GITHUB_COMMIT_SHA
      ) {
        config.plugins.push(
          new SentryWebpackPlugin({
            include: ".next",
            ignore: ["node_modules"],
            stripPrefix: ["webpack://_N_E/"],
            urlPrefix: `~/_next`,
            release: VERCEL_GITHUB_COMMIT_SHA,
          })
        );
      }

      return config;
    },
  })
);
