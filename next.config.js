const path = require("path");
const nextBundleAnalyzer = require("@next/bundle-analyzer");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const nextSourceMaps = require("@zeit/next-source-maps");

// Environment Variables

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  NEXT_PUBLIC_VERCEL_ENV: VERCEL_ENV,
  SENTRY_AUTH_TOKEN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  VERCEL_GITHUB_COMMIT_ORG,
  VERCEL_GITHUB_COMMIT_REPO,
  VERCEL_GITHUB_COMMIT_SHA,
} = process.env;

process.env.SENTRY_DSN = SENTRY_DSN;

//

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: !!process.env.ANALYZE,
});

const withSourceMaps = nextSourceMaps({
  devtool: "hidden-source-map",
});

module.exports = withBundleAnalyzer(
  withSourceMaps({
    poweredByHeader: false,
    webpack: (config, options) => {
      config.resolve.alias["~"] = path.resolve(__dirname, "src");

      if (!options.isServer) {
        config.resolve.alias["@sentry/node"] = "@sentry/browser";
      }

      if (
        SENTRY_AUTH_TOKEN &&
        SENTRY_DSN &&
        SENTRY_ORG &&
        SENTRY_PROJECT &&
        VERCEL_ENV &&
        VERCEL_GITHUB_COMMIT_ORG &&
        VERCEL_GITHUB_COMMIT_REPO &&
        VERCEL_GITHUB_COMMIT_SHA
      ) {
        config.plugins.push(
          new SentryWebpackPlugin({
            deploy: {
              env: VERCEL_ENV,
            },
            ignore: ["node_modules"],
            include: ".next",
            release: VERCEL_GITHUB_COMMIT_SHA,
            setCommits: {
              // Sentry にある Vercel の Integration で追加される SENTRY_AUTH_TOKEN だとスコープの設定でデプロイに失敗してしまう
              // error: API request failed
              //   caused by: sentry reported an error: You do not have permission to perform this action. (http status: 403)
              // https://sentry.io/settings/account/api/auth-tokens/ で認証トークンを作成、Vercel に登録する必要がある
              // `event:read` と `event:write`、`org:integrations`、`org:read`、`org:write`、`project:read`、`project:releases`、`project:write` を追加した
              commit: VERCEL_GITHUB_COMMIT_SHA,
              repo: `${VERCEL_GITHUB_COMMIT_ORG}/${VERCEL_GITHUB_COMMIT_REPO}`,
            },
            stripPrefix: ["webpack://_N_E/"],
            urlPrefix: `~/_next`,
          })
        );
      }

      return config;
    },
  })
);
