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
  // console.log("session kya hain", session);
  if (!session.user) redirect("/login");
  return (
    <SessionProvider value={session}>
      <main className="flex min-h-screen border border-white flex-col relative">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <Menubar className="sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />
          {children}
        </div>
        <Menubar className="mx-auto gap-4 sticky bottom-0 sm:hidden flex justify-center items-center shadow-lg bg-card rounded-lg"/>
      </main>
    </SessionProvider>
  );
}
