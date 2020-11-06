const path = require("path");
const nextBundleAnalyzer = require("@next/bundle-analyzer");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const nextSourceMaps = require("@zeit/next-source-maps");
const { nextI18NextRewrites } = require("next-i18next/rewrites");
const withLinaria = require("next-linaria");

// Environment Variables

const {
  GITHUB_RELEASE_TAG_NAME,
  GITHUB_REPOSITORY,
  GITHUB_SHA,
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  NEXT_PUBLIC_VERCEL_ENV: VERCEL_ENV,
  SENTRY_AUTH_TOKEN,
  SENTRY_ORG,
  SENTRY_PROJECT,
} = process.env;

process.env.SENTRY_DSN = SENTRY_DSN;

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
  withLinaria(
    withSourceMaps({
      poweredByHeader: false,
      publicRuntimeConfig: { localSubpaths },
      rewrites: async () => nextI18NextRewrites(localSubpaths),
      webpack: (config, options) => {
        config.resolve.alias["~"] = path.resolve(__dirname, "src");

        if (!options.isServer) {
          config.resolve.alias["@sentry/node"] = "@sentry/browser";
        }

        if (
          GITHUB_REPOSITORY &&
          GITHUB_SHA &&
          SENTRY_AUTH_TOKEN &&
          SENTRY_DSN &&
          SENTRY_ORG &&
          SENTRY_PROJECT &&
          VERCEL_ENV
        ) {
          config.plugins.push(
            new SentryWebpackPlugin({
              deploy: {
                env: VERCEL_ENV,
              },
              ignore: ["node_modules"],
              include: ".next",
              release: GITHUB_RELEASE_TAG_NAME || GITHUB_SHA,
              setCommits: {
                // Sentry にある Vercel の Integration で追加される SENTRY_AUTH_TOKEN だとスコープの設定でデプロイに失敗してしまう
                // error: API request failed
                //   caused by: sentry reported an error: You do not have permission to perform this action. (http status: 403)
                // https://sentry.io/settings/account/api/auth-tokens/ で認証トークンを作成、Vercel に登録する必要がある
                // `event:read` と `event:write`、`org:integrations`、`org:read`、`org:write`、`project:read`、`project:releases`、`project:write` を追加した
                commit: GITHUB_SHA,
                repo: GITHUB_REPOSITORY,
              },
              stripPrefix: ["webpack://_N_E/"],
              urlPrefix: `~/_next`,
            })
          );
        }

        return config;
      },
    })
  )
);
