"use client";

import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Post from "../cUi/Post";
import { kyInstance } from "@/lib/ky";
import InfiniteLoader from "../cUi/InfiniteLoader";
import { useSession } from "@/app/(main)/SessionProvider";

export default function UserPosts({ userId }: { userId: string }) {
  const { user } = useSession();
  const { data, status, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["user-page", userId],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/posts/${userId}`,
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="size-5 animate-spin" />
      </div>
    );
  }
  if (status === "error") {
    return <div className="text-red">Something went wrong</div>;
  }
  return (
    <InfiniteLoader reachedBottomHandler={fetchNextPage} className="space-y-4">
      {posts.map((post) => {
        return <Post key={post.id} post={post} loggedInUser={user} />;
      })}
      <div>
        {isFetchingNextPage && (
          <div className="flex items-center justify-center">
            <Loader2 className="size-5 animate-spin" />
          </div>
        )}
      </div>
    </InfiniteLoader>
  );
}
