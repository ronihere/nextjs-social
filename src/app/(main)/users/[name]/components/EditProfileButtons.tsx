'use client'
import React from 'react'
import EditProfileDialog from './EditProfileDialog';
import { TuserDetails } from '../page';
// import { UploadButton } from '@uploadthing/react';

export default function EditProfileButtons({ loggedInUser }: {
    loggedInUser: TuserDetails
}) {
    return (
            <EditProfileDialog loggedInUser={loggedInUser} />
    )
}
