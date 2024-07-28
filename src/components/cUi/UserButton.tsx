"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserAvatar from "./userAvatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { useSession } from "@/app/(main)/SessionProvider";
import Link from "next/link";
import { LogOut, UserIcon } from "lucide-react";
import { logout } from "@/app/(auth)/actions";
import { cn } from "@/lib/utils";

export default function UserButton({className}:{className: string}) {
  const { user } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={user.avatarUrl ?? ""} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-sm border shadow-md bg-card" align="end">
       <DropdownMenuLabel className="font-bold">Logged in as @{user.displayName}</DropdownMenuLabel>
       <div className="p-2 cursor-pointer">
        <DropdownMenuSeparator />
        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem className="flex items-center">
            <UserIcon className="mr-2 size-5" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={()=>{logout()}} className="flex items-center">
            <LogOut className="size-5 mr-2"/>
            Log out
        </DropdownMenuItem>
       </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
