"use client";
import React, { useEffect, useState } from "react";
import { useGetPostById, useSummarize } from "@/hooks/useActions";
import { useParams, useRouter } from "next/navigation";
import RichTextEditor from "@/components/rich-text-editor";
import Header from "@/components/Header";
import { useUpdatePost } from "@/hooks/useActions";
import { toast } from "sonner";
import PublishNow from "@/components/PublishNow";
import SummarizingButton from "@/components/SummarizingButton";
import ImageForm from "@/components/ImageForm";
import WriteStory from "@/components/WriteStory";
import TitleForm from "@/components/TitleForm";
import { useUser } from "@clerk/nextjs";

const EditPage = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const { user } = useUser();
  const { data: post, isLoading, isError } = useGetPostById(storyId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: summarize, isPending, data: summary } = useSummarize();
  const router = useRouter();
  console.log(summary);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setPreview(post.picture);
    }
  }, [post]);

  useEffect(() => {
    if (summary) {
      setContent(summary);
    }
  }, [summary]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content || !preview) {
      return;
    }

    updatePost(
      {
        id: storyId,
        title: title,
        content: content,
        slug: title,
        picture: preview,
      },
      {
        onSuccess: () => {
          router.push(`/${post?.slug}/${storyId}`);
          toast.success("Post updated successfully");
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <Header />
      <div className="max-w-3xl mt-20 mx-auto  h-screen flex flex-col ">
        <WriteStory authorPic={user?.imageUrl || ""} />

        <section className="mt-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <TitleForm title={title} setTitle={setTitle} />

            <ImageForm preview={preview} setPreview={setPreview} />
            <RichTextEditor content={content} onChange={setContent} />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SummarizingButton
                  content={content}
                  summarize={summarize}
                  isPending={isPending}
                />
              </div>
              <PublishNow
                className=""
                onClick={() => {
                  if (content.trim().length < 9) {
                    return toast.error("Please fill in all fields");
                  }
                }}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditPage;
