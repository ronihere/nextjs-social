import { CreatePostAction } from "@/components/cUi/createPost/actions";
import { useToast } from "@/components/ui/use-toast";
import { PostsPage } from "@/lib/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export default function usePostPageMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: CreatePostAction,
    onSuccess: async (newPost) => {
      const queryFilters: QueryFilters = {
        queryKey: ["post-feed", "for-you"],
        exact: true,
      };
      await queryClient.cancelQueries(queryFilters); //cancelling all the onGoing queries

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilters,
        (oldData) => {
          const firstPage = oldData?.pages[0];
          if (firstPage) {
            return {
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
              pageParams: oldData.pageParams,
            };
          }
        },
      );
      toast({
        variant:'default',
        description: 'Congratulations! Posted successfully!'
      })
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to create a post, Please try again!",
      });
    },
  });
  return mutation;
}
