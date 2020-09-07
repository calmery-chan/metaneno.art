import { get, post } from "./fetch";

export const ping = async () => {
  const { status } = await get("http://localhost:5000/a/dream/admin");
  return status === 200;
};

export const signIn = async (body: {
  name: string;
  password: string;
  "g-recaptcha-response": string;
}) => {
  const { status } = await post("http://localhost:5000/a/dream/admin", body);
  return status === 200;
};
