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
import {
  Check,
  LogOut,
  Monitor,
  Moon,
  MoonIcon,
  Sun,
  UserIcon,
} from "lucide-react";
import { logout } from "@/app/(auth)/actions";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useQueryClient } from "@tanstack/react-query";

export default function UserButton({ className }: { className: string }) {
  const { user } = useSession();
  const { theme, setTheme } = useTheme();
  const queryClient = useQueryClient();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={user.avatarUrl ?? ""} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-sm border bg-card shadow-md"
        align="end"
      >
        <DropdownMenuLabel className="font-bold">
          Logged in as @{user.displayName}
        </DropdownMenuLabel>
        <div className="flex cursor-pointer flex-col gap-2 p-2">
          <DropdownMenuSeparator />
          <Link href={`/users/${user.username}`}>
            <DropdownMenuItem className="flex items-center">
              <UserIcon className="mr-2 size-5" />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={() => {
              queryClient.clear();
              logout();
            }}
            className="flex items-center"
          >
            <LogOut className="mr-2 size-5" />
            Logout
          </DropdownMenuItem>
        </div>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-5" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="cursor-pointer">
              <DropdownMenuItem
                className="flex items-center p-1"
                onClick={() => setTheme("system")}
              >
                <Monitor className="mr-2 size-4" />
                System
                {theme === "system" ? (
                  <Check className="ml-auto size-4" />
                ) : (
                  <></>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center p-1"
                onClick={() => setTheme("light")}
              >
                <Sun className="mr-2 size-4" />
                Light
                {theme === "light" ? (
                  <Check className="ml-auto size-4" />
                ) : (
                  <></>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center p-1"
                onClick={() => setTheme("dark")}
              >
                <Moon className="mr-2 size-4" />
                Dark
                {theme === "dark" ? (
                  <Check className="ml-auto size-4" />
                ) : (
                  <></>
                )}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
