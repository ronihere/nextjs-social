'use server'

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { PostData, postDataInclude } from "@/lib/types";

export async  function deletePostAction(post : PostData){
    const session = await validateRequest();
        if(!session.user)throw Error('unauthorized')
        const newPost = await prisma.post.delete({
           where:{
            id: post.id
           },
            include: postDataInclude
        })
        return newPost;
}