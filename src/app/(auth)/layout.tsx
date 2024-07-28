import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {user} = await validateRequest();
  if(user) redirect('/')
  return (
    <main className="flex h-screen items-center justify-center p-5">
      {children}
    </main>
  );
}
