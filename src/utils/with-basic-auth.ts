import { GetServerSideProps } from "next";
import { ServerResponse } from "http";

const unauthorized = (response: ServerResponse) => {
  response.writeHead(401, { "WWW-Authenticate": "Basic" });
  response.end();
};

export const withBasicAuth = (
  getServerSideProps?: GetServerSideProps
): GetServerSideProps => async (context) => {
  const { BASIC_AUTH_CREDENTIALS } = process.env;

  if (!BASIC_AUTH_CREDENTIALS) {
    throw new Error("Environment variable not defined");
  }

  const props = getServerSideProps?.(context) || { props: {} };
  const { headers } = context.req!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  const response = context.res!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  const authorization = headers["authorization"];

  if (authorization === undefined) {
    unauthorized(response);
    return props;
  }

  const matched = authorization.match(/[^\s]+$/);

  if (matched === null) {
    unauthorized(response);
    return props;
  }

  const credentials = Buffer.from(matched[0], "base64").toString();

  if (BASIC_AUTH_CREDENTIALS !== credentials) {
    unauthorized(response);
    return props;
  }

  return props;
};
