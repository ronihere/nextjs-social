import { Prisma } from "@prisma/client";

export const postDataInclude ={
    user: {
      select: {
        avatarUrl: true,
        displayName: true,
        id: true,
      },
    },
  } satisfies Prisma.PostInclude

  export type PostData = Prisma.PostGetPayload<{
    include: typeof postDataInclude
  }>

  export type PostsPage = {
    nextCursor: string | undefined,
    posts: PostData[]
  }