export type Response<T> = {
  data: T;
};

export const get = <T>(path: string, options?: RequestInit): Promise<T> => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://creamsoda-in-a-dream.herokuapp.com/a/dream/"
      : "http://localhost:5000/";

  return fetch(
    baseUrl + (path.startsWith("/") ? path.slice(1) : path),
    options || {}
  ).then((response) => response.json());
};
