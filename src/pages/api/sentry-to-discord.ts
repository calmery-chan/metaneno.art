import * as crypto from "crypto";
import * as Sentry from "@sentry/node";
import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

if (process.env.NODE_ENV === "production") {
  Sentry.init({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN });
}

function checkSecretToken(request: NowRequest, secret = "") {
  if (!process.env.WEBHOOK_SECRET) {
    throw new Error("WEBHOOK_SECRET is not defined");
  }

  if (request.body === undefined) {
    return false;
  }

  const digest = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(request.body), "utf8")
    .digest("hex");

  return digest === request.headers["Sentry-Hook-Signature"];
}

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  if (request.method !== "POST" || !checkSecretToken(request)) {
    response.statusCode = 400;
    response.end();
    return;
  }

  const { body } = request;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await axios.post(process.env.SENTRY_TO_DISCORD_WEBHOOK_URL!, {
    embeds: [
      {
        color: 16711680, // #FF0000
        description: body.culprit,
        footer: { text: body.project_name },
        timestamp: new Date(
          parseFloat(body.event.timestamp) * 1000
        ).toISOString(),
        title: body.message,
        url: body.url,
      },
    ],
  });

  response.statusCode = 200;
  response.end();
};
