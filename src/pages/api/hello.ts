import { NowRequest, NowResponse } from "@vercel/node";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NowRequest, res: NowResponse): void => {
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};
