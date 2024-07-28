import signUpImage from "@/assets/signup-image.jpg";
import Image from "next/image";
import SignUpForm from "./SignUpForm";
import Link from "next/link";
export default async function page() {
  // dshjd = await
  return (
    <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
      <div className="flex w-full flex-col gap-2 overflow-y-auto p-4 text-center md:w-1/2">
        <h1 className="text-3xl font-bold">Sign up to bugbook</h1>
        <p className="text-sm font-thin text-muted-foreground">
          A place where even <span className="italic">you</span> can find a
          friend.
        </p>
        <SignUpForm />
        <p className="text-sm font-thin">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="hover:cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <Image
        src={signUpImage}
        alt="signup form image"
        className="w-0 object-cover md:w-1/2"
      />
    </div>
  );
}
