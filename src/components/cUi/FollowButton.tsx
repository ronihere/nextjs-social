"use client";
import {
  QueryClient,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Button } from "../ui/button";
import { kyInstance } from "@/lib/ky";
import { TFollowersData } from "@/lib/types";
import useFollowQuery from "@/query/useFollowQuery";
import { useToast } from "../ui/use-toast";
type TFollowButtonProps = {
  className: string;
  userId: string;
  initialState: TFollowersData;
};

export default function FollowButton({
  className,
  userId,
  initialState,
}: TFollowButtonProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data } = useFollowQuery(userId, initialState);
  const queryKey: QueryKey = ["follower-info", userId];
  const { mutate } = useMutation({
    mutationFn: () =>
      !data.isFollowedByUser
        ? kyInstance
            .post(`/api/users/${userId}/followers`)
            .json<TFollowersData>()
        : kyInstance
            .delete(`/api/users/${userId}/followers`)
            .json<TFollowersData>(),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData<TFollowersData>(queryKey);
      queryClient.setQueryData<TFollowersData>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : +1),
        isFollowedByUser: !previousState?.isFollowedByUser,
      }));
      return { previousState };
    },

    onSuccess: () => {},
    onError(error, variables, context) {
      queryClient.setQueryData<TFollowersData>(
        queryKey,
        context?.previousState,
      );
      toast({
        variant: "default",
        description: "Something went wrong! Please try again.",
      });
    },
  });
  // console.log("data", userId, data);
  return (
    <Button
      className={className}
      onClick={() => mutate()}
      variant={data.isFollowedByUser ? "destructive" : "default"}
    >
      {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
}
