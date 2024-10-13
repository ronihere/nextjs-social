import { validateRequest } from "@/auth";
import FollowButton from "@/components/cUi/FollowButton";
import FollowersCount from "@/components/cUi/FollowersCount";
import TrendsSideBar from "@/components/cUi/TrendsSideBar";
import UserAvatar from "@/components/cUi/userAvatar";
import UserPosts from "@/components/dataClient/UsersPosts";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { User } from "lucia";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const getUserDetails = cache(async (name: string) => {
  console.log('name', name)
  if(!name){
    console.log('rmpty bhai')
  }
  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        // id: userId,
        username: name
      },
      select: {
        followings: true,
        avatarUrl: true,
        bio: true,
        createdAt: true,
        displayName: true,
        username: true,
        id: true,
        posts: true,
        _count: {
          select: {
            posts: true,
            followings: true,
          },
        },
      },
    });
    return userDetails;
  } catch (error) {
    console.log(error);
  }
});

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const userDetails = await getUserDetails(params.name);
  return {
    title: `${userDetails?.username}  @${userDetails?.displayName}`,
  };
}
export default async function page({ params }: { params: { name: string } }) {
  const userDetails = await getUserDetails(params.name);
  const { user } = await validateRequest();
  if (!userDetails || !user) return notFound();
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full space-y-5">
        <UserDetailsCard userDetails={userDetails} loggedInUser={user} />
        <h2 className="rounded-md bg-card p-4 text-center text-3xl font-bold">
          {userDetails?.username}&apos;s posts
        </h2>
        <UserPosts userId={userDetails?.id} />
      </div>
      <TrendsSideBar />
    </main>
  );
}

const UserDetailsCard = ({
  userDetails,
  loggedInUser,
}: {
  userDetails: Awaited<ReturnType<typeof getUserDetails>>;
  loggedInUser: User;
}) => {
  return (
    <article className="w-full space-y-5 rounded-md bg-card p-4 shadow-sm">
      {/* {JSON.stringify(userDetails)} */}
      <UserAvatar
        avatarUrl={userDetails?.avatarUrl || ""}
        size={250}
        className="mx-auto"
      />
      <div className="flex">
        <div>
          <h1 className="text-3xl font-bold">{userDetails?.displayName}</h1>
          <p className="text-muted-foreground">@{userDetails?.username}</p>
        </div>
        <FollowButton
          userId={userDetails?.id as string}
          className="ms-auto"
          initialState={{
            followers: userDetails?._count.followings || 0,
            isFollowedByUser: !!userDetails?.followings.filter(
              (user) => user.followerId === loggedInUser.id,
            ),
          }}
        />
      </div>
      <div className="text-sm text-muted-foreground">
        <p>
          Member since {format(userDetails?.createdAt as Date, "MMM d, yyyy")}
        </p>
        <p>
          Posts: {userDetails?._count.posts || 0} &nbsp;
        </p>

        <FollowersCount
          initialState={{
            followers: userDetails?._count.followings || 0,
            isFollowedByUser: !!userDetails?.followings.filter(
              (user) => user.followerId === loggedInUser.id,
            ),
          }}
          userId={userDetails?.id as string}
        />
      </div>
      {userDetails?.bio && (
        <div className="border-t pt-4 text-muted-foreground">
          {userDetails?.bio || "Hey I am Roni, Whats'up?"}
        </div>
      )}
    </article>
  );
};