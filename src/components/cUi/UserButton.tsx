"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserAvatar from "./userAvatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
} from "@radix-ui/react-dropdown-menu";
import { useSession } from "@/app/(main)/SessionProvider";
import Link from "next/link";
import { Check, LogOut, Monitor, Moon, MoonIcon, Sun, UserIcon } from "lucide-react";
import { logout } from "@/app/(auth)/actions";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function UserButton({className}:{className: string}) {
  const { user } = useSession();
  const {theme , setTheme} = useTheme()
  console.log('theme hain', theme)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={user.avatarUrl ?? ""} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-sm border shadow-md bg-card" align="end">
       <DropdownMenuLabel className="font-bold">Logged in as @{user.displayName}</DropdownMenuLabel>
       <div className="p-2 cursor-pointer flex flex-col gap-2 ">
        <DropdownMenuSeparator />
        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem className="flex items-center">
            <UserIcon className="mr-2 size-5" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={()=>{logout()}} className="flex items-center">
            <LogOut className="size-5 mr-2"/>
            Logout
        </DropdownMenuItem>
       </div>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="size-5 mr-2"/>
              Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="cursor-pointer">
              <DropdownMenuItem className="flex items-center p-1" onClick={()=>setTheme('system')}>
                <Monitor className="size-4 mr-2"/>
                System
                {theme==='system' ? <Check className="size-4 ml-auto"/> : <></>}
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center p-1" onClick={()=>setTheme('light')}>
                <Sun className="size-4 mr-2"/>
                Light 
                {theme==='light' ? <Check className="size-4 ml-auto"/> : <></>}
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center p-1" onClick={()=>setTheme('dark')}>
                <Moon className="size-4 mr-2"/>
                Dark
                {theme==='dark' ? <Check className="size-4 ml-auto"/> : <></>}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
