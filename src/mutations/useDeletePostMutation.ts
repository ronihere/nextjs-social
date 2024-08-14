import { useToast } from "@/components/ui/use-toast";
import { PostsPage } from "@/lib/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePostAction } from "./deletePostAction";

export default function useDeletePostMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: deletePostAction,
    onSuccess: async (deletedPost) => {
      const queryFilters: QueryFilters = {
        queryKey: ["post-feed", "for-you"],
        exact: true,
      };
      await queryClient.cancelQueries(queryFilters); //cancelling all the onGoing queries

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilters,
        (oldData) => {
          if (!oldData) return;
          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter((post) => post.id !== deletedPost?.id),
            })),
          };
        },
      );
      toast({
        variant: "default",
        description: "Congratulations! Post deleted successfully!",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to delete the post, Please try again!",
      });
    },
  });
  return mutation;
}
