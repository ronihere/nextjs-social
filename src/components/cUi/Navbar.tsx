import Link from "next/link";
import React from "react";
import UserButton from "./UserButton";
import NavSearch from "./NavSearch";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-screen bg-card shadow-sm py-2">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4">
        <Link className="text-2xl font-bold text-primary" href="/">
          Bugbook
        </Link>
        <NavSearch/>
        <UserButton className="sm:ms-auto"/>
      </div>
    </header>
  );
}
