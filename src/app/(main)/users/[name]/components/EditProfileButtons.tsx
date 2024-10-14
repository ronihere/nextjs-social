'use client'
import React from 'react'
import EditProfileDialog from './EditProfileDialog';
import { TuserDetails } from '../page';
import { UploadButton } from '@uploadthing/react';

export default function EditProfileButtons({ loggedInUser }: {
    loggedInUser: TuserDetails
}) {
    return (
        <>
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }} />
            <EditProfileDialog loggedInUser={loggedInUser} />
        </>
    )
}
