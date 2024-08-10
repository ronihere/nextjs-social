"use client";

import { PostData, PostsPage } from "@/lib/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Post from "../cUi/Post";
import { kyInstance } from "@/lib/ky";
import InfiniteLoader from "../cUi/InfiniteLoader";

export default function Foryou() {
  const {
    data,
    status,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts/foryou",
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
        return <Post key={post.id} post={post} />;
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
