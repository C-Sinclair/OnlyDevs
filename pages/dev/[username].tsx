import { Dev } from ".prisma/client";
import { GetServerSideProps } from "next";
import { DevsApi } from "../../lib/request";

type DevProps = {
  dev: Dev
}

export default function Dev({ dev }: DevProps) {
  const { username } = dev
  return (
    <main>
      <h1>{username}</h1>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.params.username as string
  const dev = await DevsApi.getByUsername(username)
  return {
    props: {
      dev
    }
  }
}