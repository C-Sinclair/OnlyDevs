import { Dev, Post } from ".prisma/client";

export type DataType = Dev | Post | Comment;

export type PostBody<T = DataType> = {
  id: number;
} & Partial<T>;

export type PutBody<T = DataType> = Omit<T, "id" | "created">;

export type DeleteBody = Record<"id" | "devId", number>;

export type PostResult = Post & { dev: Dev }