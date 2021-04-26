import { Post } from ".prisma/client";
import axios from "axios";
import { GetServerSideProps } from "next";

type PostProps = {
  post: Post
}

export default function Post({ post }: PostProps) {
  const { title } = post
  return (
    <main>
      <h1>{title}</h1>
    </main>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params.id
  const { data } = await axios.get<Post>(`/api/dev/${id}`)
  return {
    props: {
      post: data
    }
  }
}