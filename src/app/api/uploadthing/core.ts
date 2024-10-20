import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createUploadthing, FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
  avatar: f({
    image: { maxFileSize: "512KB" },
  })
    .middleware(async () => {
      const { user } = await validateRequest();

      if (!user) throw new UploadThingError("Unauthorized");

      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const imageUrl = file.url
      // const oldAvatarUrl = metadata.user.avatarUrl;

      // if (oldAvatarUrl) {
      //   const key = oldAvatarUrl.split(
      //     `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
      //   )[1];

      //   await new UTApi().deleteFiles(key);
      // }

      // const newAvatarUrl = file.url.replace(
      //   "/f/",
      //   `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
      // );

      console.log('userId,', metadata.user, file)
      await prisma.user.update({
        where: { id: metadata.user.id },
        data: {
          avatarUrl: imageUrl,
        },
      });

      return { avatarUrl: imageUrl };
    }),
} satisfies FileRouter;

export type TAppFileRouter = typeof fileRouter;