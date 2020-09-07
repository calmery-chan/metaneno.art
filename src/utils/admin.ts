import { get, post } from "./fetch";

export const ping = async () => {
  const { status } = await get("/admin");
  return status === 200;
};

export const signIn = async (body: {
  name: string;
  password: string;
  "g-recaptcha-response": string;
}) => {
  const { status } = await post("/admin", body);
  return status === 200;
};
