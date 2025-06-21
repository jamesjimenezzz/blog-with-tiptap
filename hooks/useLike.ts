import { likePost, unlikePost, getLikeCount } from "@/actions/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLikePost = (userId: string, postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => likePost(userId, postId),
    onMutate: () => {
      queryClient.setQueryData(["likeCount", postId], (old: number = 0) => {
        return old + 1;
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["likeCount", postId] });
    },
  });
};

export const useUnlikePost = (userId: string, postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => unlikePost(userId, postId),
    onMutate: () => {
      queryClient.setQueryData(["likeCount", postId], (old: number = 0) => {
        return old - 1;
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["likeCount", postId] });
    },
  });
};

export const useGetLikeCount = (postId: string) => {
  return useQuery({
    queryKey: ["likeCount", postId],
    queryFn: () => getLikeCount(postId),
    enabled: !!postId,
  });
};
