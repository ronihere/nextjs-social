import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { TFollowersData } from "@/lib/types";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const usersFollowers = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
      select: {
        followings: {
          where: {
            followerId: loggedInUser.id
          },
          select:{followerId: true}
        },
        _count: {
          select: {
            followings: true,
          },
        },
      },
    });
    const data: TFollowersData = {
      followers:  usersFollowers?._count.followings || 0,
      isFollowedByUser: !!usersFollowers?.followings.length,
    };
    console.log("data",data, usersFollowers);
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function POST(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.follow.upsert({
      where: {
        followerId_followingId: {
          followerId: loggedInUser.id,
          followingId: params.userId,
        },
      },
      create: {
        followerId: loggedInUser.id,
        followingId: params.userId,
      },
      update: {},
    });
    return new Response();
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    await prisma.follow.deleteMany({
      where: {
        followerId: loggedInUser.id,
        followingId: params.userId,
      },
    });
    return new Response();
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
