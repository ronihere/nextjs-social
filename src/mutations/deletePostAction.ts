"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { PostData, postDataInclude } from "@/lib/types";

export async function deletePostAction(post: PostData) {
  const { user } = await validateRequest();
  if (!user) throw Error("unauthorized");
  const postToBeDeleted = await prisma.post.findUnique({
    where: {
      id: post.id,
    },
    include: postDataInclude,
  });
  if (postToBeDeleted?.userId !== user.id) throw Error("unauthorized");
  await prisma.post.deleteMany({
    where: {
      id: post.id,
    },
  });
  return postToBeDeleted;
}
