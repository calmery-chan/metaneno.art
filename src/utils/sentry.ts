import * as Sentry from "@sentry/node";

if (process.env.NEXT_PUBLIC_SENTRY_DSN && process.env.NEXT_PUBLIC_VERCEL_ENV) {
  Sentry.init({
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

export { Sentry };
