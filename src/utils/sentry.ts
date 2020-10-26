import { RewriteFrames } from "@sentry/integrations";
import * as Sentry from "@sentry/node";
import getConfig from "next/config";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const { serverRuntimeConfig } = getConfig();

  Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    integrations: [
      new RewriteFrames({
        iteratee: (frame) => {
          frame.filename = frame.filename?.replace(
            `${serverRuntimeConfig.rootDir}/.next`,
            "app:///_next"
          );
          return frame;
        },
      }),
    ],
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

export { Sentry };
