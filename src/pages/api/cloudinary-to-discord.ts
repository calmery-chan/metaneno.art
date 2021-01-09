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

  if (body.notification_type !== "upload") {
    response.statusCode = 200;
    response.end();
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await axios.post(process.env.CLOUDINARY_TO_DISCORD_WEBHOOK_URL!, {
    embeds: [
      {
        color: 65280,
        embeds: [
          {
            image: {
              url: body.secure_url,
            },
          },
        ],
        fields: [
          {
            name: "Public ID",
            value: body.public_id,
          },
        ],
        timestamp: new Date(body.created_at).toISOString(),
        title: "Image Uploaded",
        url: body.url,
      },
    ],
  });

  response.statusCode = 200;
  response.end();
};
