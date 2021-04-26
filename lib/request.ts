import { Dev } from ".prisma/client"
import axios from "axios"
import { PostResult } from "../types/server"

const BASE_URL = process.env.NODE_ENV === 'production' ? `/api` : `http://localhost:3000/api`

const POSTS_URL = `${BASE_URL}/post`
const DEVS_URL = `${BASE_URL}/dev`

export const PostsApi = {
  async get() {
    try {
      const { data } = await axios.get<PostResult[]>(POSTS_URL)
      return data
    } catch (e) {
      console.error(e)
      return []
    }
  },
  async getById(id: number) {
    try {
      const { data } = await axios.get<PostResult>(`${POSTS_URL}?id=${id}`)
      return data
    } catch (e) {
      console.error(e)
      return null
    }
  }
}

export const DevsApi = {
  async get() {
    try {
      const { data } = await axios.get<Dev[]>(DEVS_URL)
      return data
    } catch (e) {
      console.error(e)
      return []
    }
  },
  async getByUsername(username: string) {
    try {
      const { data } = await axios.get<Dev>(`${DEVS_URL}username=${username}`)
      return data
    } catch (e) {
      console.error(e)
      return null
    }
  }
}