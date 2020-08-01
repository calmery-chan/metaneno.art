import { NextApiRequest, NextApiResponse } from "next";
import { getWorksCollection } from "~/utils/contentful";
import * as Sentry from "~/utils/sentry";

export default async (_: NextApiRequest, response: NextApiResponse) => {
  try {
    const result = await getWorksCollection();

    response.statusCode = 200;
    response.json(result);
  } catch (error) {
    Sentry.captureException(error);

    response.statusCode = 500;
    response.end();
  }
};
