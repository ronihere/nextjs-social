import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const cursor = req.nextUrl.searchParams.get('cursor') || undefined;
    const pageSize = 10;
    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? {id: cursor} : undefined
    });
    console.log('post', posts);
    const nextCursor = posts.length > pageSize ? posts[pageSize].id : undefined;

    const data : PostsPage = {
      nextCursor,
      posts: posts.slice(0,pageSize) || [],
    }

    return Response.json(data);
    // return Response.json(posts);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
