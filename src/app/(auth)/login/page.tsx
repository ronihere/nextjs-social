

import Image from "next/image";
import loginImage from '@/assets/login-image.jpg'
import Link from "next/link";
import LoginForm from "./LoginForm";

export default function page() {
  return (
    <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
      <div className="flex w-full flex-col gap-2 overflow-y-auto p-4 text-center md:w-1/2">
        <h1 className="text-3xl font-bold">Log in to bugbook</h1>
        <p className="text-sm font-thin text-muted-foreground">
          A place where even <span className="italic">you</span> can find a
          friend.
        </p>
        <LoginForm />
        <p className="text-sm font-thin">
          Don&apos;t have an account?{" "}
          <Link
            href={"/signup"}
            className="hover:cursor-pointer hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
      <Image
        src={loginImage}
        alt="signup form image"
        className="w-0 object-cover md:w-1/2"
      />
    </div>
  )
}
