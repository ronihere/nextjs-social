'use client'
import { Session, User } from "lucia";
import { createContext, useContext } from "react";
type TSessionContext = {
  session: Session;
  user: User;
};
const SessionContext = createContext<TSessionContext | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: TSessionContext }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export const useSession= ()=>{
    const session = useContext(SessionContext);
    if(!session){
        throw new Error('session must be used within a session provider')
    }
    return session;
}
