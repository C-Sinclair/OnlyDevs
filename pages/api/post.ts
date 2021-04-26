import { Post } from ".prisma/client";
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
  if (req.query.id) {
    const id = parseInt(req.query.id as string);
    const post = await prisma.post.findFirst({ where: { id } });
    return res.json(post);
  }
  if (req.query.saved) {
    const devId = parseInt(req.query.saved as string);
    const result = await prisma.post.findMany({
      where: { savedPost: { every: { devId } } },
      select: { savedPost: { include: { post: { include: { dev: true }} } } },
    });
    const posts = result.flatMap((post) =>
      post.savedPost.map((saved) => saved.post)
    );
    return res.json(posts);
  }
  const posts = await prisma.post.findMany();
  return res.status(200).json(posts);
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { id, ...data } = req.body as PostBody<Post>;
  await prisma.post.update({
    where: { id },
    data,
  });
  return res.status(200);
}

async function put(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body as PutBody<Post>;
  const result = await prisma.post.create({
    data,
  });
  return res.json({ id: result.id });
}

async function del(req: NextApiRequest, res: NextApiResponse) {
  const { id, devId } = req.body as DeleteBody;
  const post = await prisma.post.findFirst({ where: { id } });
  if (post.devId !== devId) {
    return res.status(400);
  }
  await prisma.post.delete({ where: { id } });
  return res.status(200);
}
