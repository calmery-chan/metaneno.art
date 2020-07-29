import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { body } = request;

  await axios.post(process.env.SENTRY_TO_DISCORD_WEBHOOK_URL!, {
    embeds: [
      {
        color: 16711680,
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
