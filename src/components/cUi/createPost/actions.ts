'use server'

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validations"


export async function CreatePostAction(input:string) {
        const session = await validateRequest();
        if(!session.user)throw Error('unauthorized')
        const {content}= createPostSchema.parse({content:input});
        const newPost = await prisma.post.create({
            data:{
                content,
                userId: session.user.id
            },
            include: postDataInclude
        })
        return newPost
    
}