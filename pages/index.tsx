import { Post } from ".prisma/client";
import axios from "axios";
import { useQuery } from "react-query";

export default function Home() {
  const { posts } = useFeed();
  return (
    <main>
      <h1>Welcome to OnlyDevs</h1>
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
