import { NextApiRequest } from "next";
import { supabase } from "../../lib/supabase";

export async function getUser(req: NextApiRequest) {
  const token = req.headers.token as string
  const { data, error } = await supabase.auth.api.getUser(token)
  if (error) {
    return null
  }
  return data
}