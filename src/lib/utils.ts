import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {formatDistanceToNowStrict, formatDate} from 'date-fns'
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { TAppFileRouter } from "@/app/api/uploadthing/core";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatedRelativeTime(from : Date){
  const currentDate = new Date();
  if(currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000 ){
    return formatDistanceToNowStrict(from , {addSuffix: true})
  }else{
    if(currentDate.getFullYear() === from.getFullYear()){
      return formatDate(from, "MMM d")
    }else return formatDate(from, 'MMM d YYYY')
  }
}




export const UploadButton = generateUploadButton<TAppFileRouter>();
export const UploadDropzone = generateUploadDropzone<TAppFileRouter>();


