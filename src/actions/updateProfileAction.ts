"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { updateUserProfileSchema, UpdateUserProfileValues } from "@/lib/validations";


export default async function updateProfileAction(values: UpdateUserProfileValues) {
    const {user} = await validateRequest();
    if(!user)throw Error('unauthorized')
        console.log('server action invoked')
    const validatedValues= updateUserProfileSchema.parse(values);
    const updatedUserDetails = await prisma.user.update({
       where:{
        id: user.id
       },
       data:{
        displayName: validatedValues.displayName,
        bio: validatedValues.bio
       },
       select: {
        id: true,
        bio: true,
        avatarUrl: true , 
        displayName: true,
        username: true
       }
    })
    return updatedUserDetails
}
