'use server'

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createPostSchema } from "@/lib/validations"


export async function CreatePostAction(input:string) {
    try {
        const session = await validateRequest();
        if(!session.user)throw Error('unauthorized')
        const {content}= createPostSchema.parse({content:input});
        await prisma.post.create({
            data:{
                content,
                userId: session.user.id
            }
        })
        return {
            error: false
        }
    } catch (error) {
        return {
            error: JSON.stringify(error)
        }
    }
}