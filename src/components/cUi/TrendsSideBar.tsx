import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { Loader2 } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import React, { Suspense } from "react";
import UserAvatar from "./userAvatar";
import FollowButton from "./FollowButton";
import { TFollowersData } from "@/lib/types";

export default function TrendsSideBar() {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-3 md:block">
      <Suspense fallback={<Loader2 className="h-4 animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
}

async function WhoToFollow() {
  const { user: loggedInUser } = await validateRequest();
  if (!loggedInUser) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: loggedInUser.id,
      },
    },
    select: {
      avatarUrl: true,
      displayName: true,
      id: true,
      followings: {
        where: {
          followerId: loggedInUser.id,
        },
      },
      _count: {
        select: {
          followings: true,
        },
      },
    },
    take: 5,
  });

  const user: TFollowersData = {
    followers: usersToFollow[0]._count.followings,
    isFollowedByUser: !!usersToFollow[0].followings.length,
  };
  return (
    <div className="space-y-5 rounded-xl bg-card p-4 shadow-sm">
      <p className="text-lg font-bold">Who To Follow</p>
      {usersToFollow.map((user) => (
        <div key={user.id} className="flex gap-4">
          <div>
            <UserAvatar avatarUrl={user.avatarUrl || ""} />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">{user.displayName}</p>
            <p className="text-sm text-muted-foreground">@{user.displayName}</p>
          </div>
          {/* <Button className="ms-auto">Follow</Button> */}
          <FollowButton
            className="ms-auto"
            userId={user.id}
            initialState={{
              followers: user._count.followings,
              isFollowedByUser: !!user.followings.length,
            }}
          />
        </div>
      ))}
    </div>
  );
}

const getTrendingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
              SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
              FROM posts
              GROUP BY (hashtag)
              ORDER BY count DESC, hashtag ASC
              LIMIT 5
          `;

    console.log(result, "result");
    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60,
  },
);

async function TrendingTopics() {
  const trendingTopics = await getTrendingTopics();
  if (!trendingTopics.length) return null;
  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Trending topics</div>
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];

        return (
          <Link key={title} href={`/hashtag/${title}`} className="block">
            <p
              className="line-clamp-1 break-all font-semibold hover:underline"
              title={hashtag}
            >
              {hashtag}
            </p>
            <p className="text-sm text-muted-foreground">
              {count} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
