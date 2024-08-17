import { kyInstance } from "@/lib/ky";
import { TFollowersData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFollowQuery(
  userId: string,
  initialState: TFollowersData,
) {
  const query = useQuery({
    queryKey: ["follower-info", userId],
    queryFn: () =>
      kyInstance.get(`/api/users/${userId}/followers`).json<TFollowersData>(),
    initialData: initialState,
    staleTime: Infinity,
  });
  return query;
}
