import { Post } from ".prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { useQuery } from "react-query";
import { Logo } from "../components";
import { css, styled } from "../lib/styled";

export default function Home() {
  const { posts } = useFeed();
  const router = useRouter()

  const navigateToPost = (id: number) => () => router.push(`/post/${id}`)
  const navigateToDev = (username: string) => (e: MouseEvent) => {
    e.stopPropagation()
    router.push(`/dev/${username}`)
  }

  return (
    <HomeRoot>
      <header className='welcome'>
        <h1>Welcome to </h1>
        <Logo />
      </header>
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
    </HomeRoot>
  );
}

function useFeed() {
  const res = useQuery("posts", async () => {
    const { data } = await axios.get(`/api/post`);
    return data;
  });
  return {
    posts: res.data as Post[],
    ...res,
  };
}

const HomeRoot = styled.main(({ theme }) => css`

  header.welcome {
    position: relative;

    h1 {
      margin-right: 100px;
    }
    [data-logo] {
      --size: 50px;
      position: absolute;
      top: 10px;
    }
  }
`)