import { Post } from ".prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { useQuery } from "react-query";

export default function Home() {
  const { posts } = useFeed();
  const router = useRouter()

  const navigateToPost = (id: number) => () => router.push(`/post/${id}`)
  const navigateToDev = (username: string) => (e: MouseEvent) => {
    e.stopPropagation()
    router.push(`/dev/${username}`)
  }

  return (
    <main>
      <h1>Welcome to OnlyDevs</h1>
      <ul>
      {posts?.map(post => (
        <li key={`post-${post.id}`} onClick={navigateToPost(post.id)}>
          <h1>{post.title}</h1>
          <span>{post.created}</span>
          {post.content}
          <h6 onClick={navigateToDev(post.dev.username)}>{post.dev.username}</h6>
        </li>
      ))}
      </ul>
    </main>
  );
}

function useFeed() {
  const res = useQuery("posts", async () => {
    const { data } = await axios.get(`/api/posts`);
    return data;
  });
  return {
    posts: res.data as Post[],
    ...res,
  };
}
