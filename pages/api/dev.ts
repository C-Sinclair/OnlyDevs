import { Dev } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";
import prisma from "../../prisma";
import { PostBody } from "../../types/server";
import { getUser } from "./_user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUser(req)
  console.log({ user })

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
  const { user, error } = await supabase.auth.api.getUserByCookie(req)
  console.log({ user, error })
  const { user_id, ...data } = req.body as PostBody<Dev>;
  // TODO check logged in user matches this user
  await prisma.dev.update({
    where: { user_id },
    data,
  });
  return res.status(200);
}
