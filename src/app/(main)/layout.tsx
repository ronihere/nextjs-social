import { validateRequest } from "@/auth";
import Navbar from "@/components/cUi/Navbar";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Menubar from "@/components/cUi/Menubar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();
  console.log("session kya hain", session);
  if (!session.user) redirect("/login");
  return (
    <SessionProvider value={session}>
      <main className="flex min-h-screen border border-white flex-col relative">
        <Navbar />
        <div className="mx-auto flex w-full gap-5 min-h-screen px-5 py-2">
          <Menubar className="m-1 flex-none hidden sm:block sticky top-[4rem] h-fit p-4 shadow-lg rounded-2xl bg-card" />
          {children}
        </div>
        <Menubar className="mx-auto gap-4 sticky bottom-0 sm:hidden flex justify-center items-center shadow-lg bg-card rounded-lg"/>
      </main>
    </SessionProvider>
  );
}
