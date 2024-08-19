'use client'
import { TFollowersData } from "@/lib/types";
import useFollowQuery from "@/query/useFollowQuery";
type TFollowButtonProps = {
    className?: string;
    userId: string;
    initialState: TFollowersData;
  };
export default function FollowersCount({className, userId , initialState}: TFollowButtonProps) {
  const { data } = useFollowQuery(userId, initialState);

  return (
    <p className={className}>
      Followers : {data.followers}
    </p>
  )
}
