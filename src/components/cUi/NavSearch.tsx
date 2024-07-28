"use client";
import React from "react";
import { Input, InputProps } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NavSearch(props: InputProps) {
    const router = useRouter()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget
    const q = (form.q as HTMLInputElement).value.trim();
    if(!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };
  return (
    <form onSubmit={handleSubmit} method="GET" action={'/search'}>
      <div className="relative">
        <Input {...props}  name='q'  className="pe-10" />
        <SearchIcon className="absolute right-3 top-1/2 size-4 -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
}
