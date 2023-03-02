import type { NextApiRequest, NextApiResponse } from "next";

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);

  return res.status(200).json({ success: true, id: req.body.id });
}
