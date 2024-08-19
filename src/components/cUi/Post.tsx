import { PostData } from "@/lib/types";
import React from "react";
import UserAvatar from "./userAvatar";
import Link from "next/link";
import { formatedRelativeTime } from "@/lib/utils";
import MoreButton from "./MoreButton";
import { User } from "lucia";
type TPostProps = {
  post: PostData;
  loggedInUser: User;
};
export default function Post({ post, loggedInUser }: TPostProps) {
  return (
    <article className="space-y-3 rounded-2xl bg-card p-4 shadow-md">
      <div className="flex w-full gap-2">
        <Link href={`/users/${post.userId}`}>
          <UserAvatar avatarUrl={post.user.avatarUrl || ""} />
        </Link>
        <div>
          <Link
            href={`/users/${post.userId}`}
            className="block font-medium hover:underline"
          >
            {post.user.displayName}
          </Link>
          <Link
            href={`/post/${post.id}`}
            className="block text-sm text-muted-foreground hover:underline"
          >
            {formatedRelativeTime(post.createdAt)}
          </Link>
        </div>
        {/* <div className="ml-auto"> */}
        {post.userId === loggedInUser.id && (
          <MoreButton className="ml-auto" post={post} />
        )}
        {/* </div> */}
      </div>
      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
}
