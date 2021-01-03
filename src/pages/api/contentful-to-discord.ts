import * as Sentry from "@sentry/node";
import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

if (process.env.NODE_ENV === "production") {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
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
  await axios.post(process.env.CONTENTFUL_TO_DISCORD_WEBHOOK_URL!, {
    embeds: [
      {
        color: 65280,
        fields: [
          {
            name: "Environment",
            value: body.sys.environment.sys.id,
          },
          {
            name: "ID",
            value: body.sys.id,
          },
          {
            name: "Space ID",
            value: body.sys.space.sys.id,
          },
        ],
        timestamp: new Date(body.sys.updatedAt).toISOString(),
        title: body.sys.type,
        url: `https://app.contentful.com/spaces/${body.sys.space.sys.id}`,
      },
    ],
  });

  response.statusCode = 200;
  response.end();
};
