import * as Sentry from "@sentry/node";
export * from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  debug: process.env.NODE_ENV !== "production",
});
