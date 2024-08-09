"use client";

import { PostData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Post from "../cUi/Post";

export default function Foryou() {
  const { data, error, isLoading, status } = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: async () => {
      const response = await fetch("/api/posts/for-you");
      if (!response.ok) {
        throw Error(`Request failed with status code: ${response.status}`);
      }
      return response.json();
    },
  });

  if (status === "pending") {
    return(
    <div className="flex justify-center items-center">
      <Loader2 className="size-5 animate-spin" />
    </div>);
  }
  if (status === "error") {
    return <div className="text-red">Something went wrong</div>;
  }
  return (
    <>
      {data.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </>
  );
}
