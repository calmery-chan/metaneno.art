import * as Sentry from "@sentry/node";
import * as contentful from "contentful";
import { NextApiRequest, NextApiResponse } from "next";

Sentry.init({ dsn: process.env.SENTRY_DSN });

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT!,
  space: process.env.CONTENTFUL_SPACE!,
});

export default async (
  request: NextApiRequest,
  response: NextApiResponse<contentful.ContentType>
) => {
  const { contentType } = request.query as { contentType: string };

  try {
    const contentTypes = await client.getContentType(contentType);
    response.statusCode = 200;
    response.json(contentTypes);
  } catch (error) {
    Sentry.captureException(error);

    const { sys } = error as contentful.ContentType;
    response.statusCode = 429;

    if (sys.id === "NotFound") {
      response.statusCode = 404;
    }

    response.json(error as contentful.ContentType);
  }
};
