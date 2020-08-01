import {
  WorkCollection,
  ContentfulErrorResponse,
  ContentfulResponse,
} from "../types/contentful";

const isContentfulErrorResponse = (
  response: Record<string, unknown>
): response is ContentfulErrorResponse => !!response.errors;

const getByQuery = async (query: string) => {
  const {
    CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_ENVIRONMENT,
    CONTENTFUL_SPACE,
  } = process.env;

  if (
    !CONTENTFUL_ACCESS_TOKEN ||
    !CONTENTFUL_ENVIRONMENT ||
    !CONTENTFUL_SPACE
  ) {
    throw new Error("Environment variable not defined");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: ContentfulResponse<any> | ContentfulErrorResponse = await (
    await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE}/environments/${CONTENTFUL_ENVIRONMENT}`,
      {
        body: JSON.stringify({ query, variables: {} }),
        headers: {
          Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    )
  ).json();

  if (isContentfulErrorResponse(response)) {
    throw new Error(JSON.stringify(response));
  }

  return response;
};

export const getWorkCollection = (): Promise<WorkCollection> =>
  getByQuery(`{ worksCollection { total } }`);
