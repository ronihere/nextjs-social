import CreatePost from "@/components/cUi/createPost/createPost";
import Post from "@/components/cUi/Post";
import TrendsSideBar from "@/components/cUi/TrendsSideBar";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="w-full flex gap-4">
      <div className="w-full space-y-5">
        <CreatePost />
        {
          posts.map((post)=>{
            return <Post key={post.id} post={post}/>
          })
        }
      </div>
      <TrendsSideBar/>
    </main>
  );
}
