import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.query.username) {
      const username = req.query.username as string
      const exists = await prisma.dev.findFirst({ where: { username }})
      return res.json({ exists })
    }
    return res.status(400);
  } catch (e) {
    console.error('api exists error', e)
    res.status(500)
  }
}