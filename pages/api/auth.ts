import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // try {
  //   switch (req.method) {
  //     case 'POST':
  console.log('/api/auth')
        supabase.auth.api.setAuthCookie(req, res)
  //       res.status(200)
  //     case 'GET':
  //       const token = req.headers.token as string
  //       const { data, error } = await supabase.auth.api.getUser(token)
  //       if (error) return res.status(401).json({ error: error.message })
  //       return res.status(200).json(data)
  //     default:
  //       throw new Error('No route for that method')
  //   }
  // } catch (e) {
  //   console.error('api auth error', e)
  //   res.status(500)
  // }
}