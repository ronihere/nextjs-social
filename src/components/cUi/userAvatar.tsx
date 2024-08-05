import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import defaultAvatar from "@/assets/avatar-placeholder.png";

type TUserAvatarProps = {
  size?: number;
  className?: string;
  avatarUrl?: string;
};
export default function UserAvatar({
  size,
  avatarUrl,
  className,
}: TUserAvatarProps) {
  return (
    <Image
      src={avatarUrl || defaultAvatar}
      height={size ?? 48}
      width={size ?? 48}
      alt="avatar image"
      className={cn(`aspect-square rounded-full object-cover flex-none`, className)}
    />
  );
}
