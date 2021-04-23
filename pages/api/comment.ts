import { Comment } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";
import { DeleteBody, PostBody, PutBody } from "../../types/server";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return get(req, res);
    case "POST":
      return post(req, res);
    case "PUT":
      return put(req, res);
    case "DELETE":
      return del(req, res);
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.postId) {
    const postId = parseInt(req.query.postId as string);
    const posts = await prisma.comment.findMany({ where: { postId } });
    return res.json(posts);
  }
  if (req.query.devId) {
    const devId = parseInt(req.query.devId as string);
    const posts = await prisma.comment.findMany({ where: { devId } });
    return res.json(posts);
  }
  return res.status(400);
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { id, ...data } = req.body as PostBody<Comment>;
  await prisma.comment.update({
    where: { id },
    data,
  });
  return res.status(200);
}

async function put(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body as PutBody<Comment>;
  const result = await prisma.comment.create({
    data,
  });
  return res.json({ id: result.id });
}

async function del(req: NextApiRequest, res: NextApiResponse) {
  const { id, devId } = req.body as DeleteBody;
  const comment = await prisma.comment.findFirst({ where: { id } });
  if (comment.devId !== devId) {
    return res.status(400);
  }
  await prisma.comment.delete({ where: { id } });
  return res.status(200);
}
