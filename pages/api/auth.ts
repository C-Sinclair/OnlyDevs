import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      supabase.auth.api.setAuthCookie(req, res)
    case 'GET':
      const token = req.headers.token as string
      const { data, error } = await supabase.auth.api.getUser(token)
      if (error) return res.status(401).json({ error: error.message })
      return res.status(200).json(data)
    default:
      console.error('Unhandled error')
      res.status(500)
  }
}