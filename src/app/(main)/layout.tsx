import { validateRequest } from "@/auth";
import Navbar from "@/components/cUi/Navbar";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";

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
    <main className="flex min-h-screen flex-col">
        <Navbar />
        <div className="max-w-7xl mx-auto p-5">

        {children}
        </div>
    </main>
      </SessionProvider>
  );
}
