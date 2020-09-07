import * as url from "url";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const resolve = (path: string) => {
  if (path.startsWith("http")) {
    return path;
  }

  return url.resolve(
    process.env.NODE_ENV === "production"
      ? "https://creamsoda.in"
      : "http://localhost:5000",
    "/a/dream" + (path.startsWith("/") ? "" : "/") + path
  );
};

export const get = (url: string) =>
  fetch(resolve(url), {
    credentials: "include",
    headers,
  });

export const post = (url: string, data?: any) =>
  fetch(resolve(url), {
    body: JSON.stringify(data),
    credentials: "include",
    headers,
    method: "POST",
  });

export const put = (url: string, data?: any) =>
  fetch(resolve(url), {
    body: JSON.stringify(data),
    credentials: "include",
    headers,
    method: "PUT",
  });

export const delete_ = (url: string) =>
  fetch(resolve(url), {
    credentials: "include",
    headers,
    method: "DELETE",
  });
