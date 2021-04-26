import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { useQuery } from "react-query";
import { Logo } from "../components";
import { PostsApi } from "../lib/request";
import { css, styled } from "../lib/styled";
import { supabase } from "../lib/supabase";
import { PostResult } from "../types/server";

type HomeProps = {
  posts: PostResult[]
}

export default function Home(props: HomeProps) {
  const res = useFeed();
  const router = useRouter()

  const navigateToPost = (id: number) => () => router.push(`/post/${id}`)
  const navigateToDev = (username: string) => (e: MouseEvent) => {
    e.stopPropagation()
    router.push(`/dev/${username}`)
  }

  const posts = res.posts || props.posts

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
  const res = useQuery<PostResult[]>("posts", PostsApi.get);
  return {
    posts: res.data,
    ...res,
  };
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const res = await supabase.auth.api.getUserByCookie(req)
  console.log({ res })
  const data = [] // await PostsApi.get() 
  return {
    props: {
      posts: data
    }
  }
}

const HomeRoot = styled.main(({ theme }) => css`

  header.welcome {
    position: relative;
    max-width: 500px;   

    h1 {
      margin-right: 140px;
      font-size: 1.2em;
      color: ${theme.colours.text[4]};
    }
    [data-logo] {
      --size: 50px;
      position: absolute;
      top: -10px;
    }
  }
`)