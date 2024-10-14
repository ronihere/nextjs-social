import updateProfileAction from '@/actions/updateProfileAction';
import { useToast } from '@/components/ui/use-toast';
import { PostsPage } from '@/lib/types';
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';


export default function useUpdateprofileMutation() {
    const queryClient = useQueryClient();
    const {toast} = useToast();
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: updateProfileAction,
        onSuccess: async (updatedUserDetails) => {
            const queryFilter: QueryFilters = {
                queryKey: ['post-feed', 'for-you']
            }

            await queryClient.cancelQueries(queryFilter);

            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                queryFilter,
                (oldData) => {
                    if (!oldData) return;
                    return {
                        pageParams: oldData.pageParams,
                        pages: oldData.pages.map((page) => {
                            return {
                                nextCursor: page.nextCursor,
                                posts: page.posts.map((post) => {
                                    if (post.user.id === updatedUserDetails.id) {
                                        return {
                                            ...post,
                                            user: {
                                                ...updatedUserDetails
                                            }
                                        }
                                    }
                                    return post
                                })
                            }
                        })
                    }
                }
            );

            router.refresh();
            toast({
                description:'Profile updated'
            })
        
        },
        onError:(error)=>{
            console.log(error)
            toast({
                description:'Something went wrong, Please try again!',
                variant:'destructive'
            })
        }
    })
    return mutation
}
