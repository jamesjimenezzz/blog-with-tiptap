import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPostsByUserId,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from "@/actions/actions";

export const useGetPostsByUserId = (id: string, sort: "asc" | "desc") => {
  return useQuery({
    queryKey: ["posts", id, sort],
    queryFn: () => getPostsByUserId(id, sort),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      id: string;
      title: string;
      content: string;
      slug: string;
      picture: string;
    }) =>
      createPost(
        data.id,
        data.title,
        data.content,
        data.slug,
        data.picture || ""
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts", data?.id] });
    },
  });
};

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      id: string;
      title: string;
      content: string;
      slug: string;
      picture: string;
    }) =>
      updatePost(data.id, data.title, data.content, data.slug, data.picture),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["post", data?.id] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

const summarize = async (text: string) => {
  const res = await fetch("/api/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const { summary } = await res.json();
  return summary;
};

export const useSummarize = () => {
  return useMutation({
    mutationFn: (text: string) => summarize(text),
  });
};
