import * as Sentry from "@sentry/node";
import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

if (process.env.NODE_ENV === "production") {
  Sentry.init({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN });
}

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  if (request.method !== "POST") {
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
