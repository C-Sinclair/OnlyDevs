import { Dev } from '.prisma/client';
import axios from 'axios';
import { GetServerSideProps } from 'next'
import { DevsApi } from '../lib/request';

type DevsProps = {
  devs: Dev[]
}

export default function Devs({ devs }: DevsProps) {
  return (
    <main>
      <h1>All devs</h1>
      <ul>
        {devs.map(({ id, username }, index) => (
          <li key={`${id}-${index}`}>
            {username}
          </li>
        ))}
      </ul>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const devs = await DevsApi.get()
  return {
    props: {
      devs
    }
  }
}