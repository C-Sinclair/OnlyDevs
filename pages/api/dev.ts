import { Dev } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";
import { PostBody } from "../../types/server";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return get(req, res);
    case "POST":
      return post(req, res);
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.username) {
    const username = req.query.username as string;
    const dev = await prisma.dev.findFirst({ where: { username } });
    return res.json(dev);
  }
  const devs = await prisma.dev.findMany();
  return res.json(devs);
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, ...data } = req.body as PostBody<Dev>;
  // TODO check logged in user matches this user
  await prisma.dev.update({
    where: { user_id },
    data,
  });
  return res.status(200);
}
