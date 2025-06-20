"use client";
import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useAuth, useUser } from "@clerk/nextjs";
import { createPost } from "@/actions/actions";
import { useSummarize } from "@/hooks/useActions";
import { toast } from "sonner";
import PublishNow from "@/components/PublishNow";
import SummarizingButton from "@/components/SummarizingButton";
import ImageForm from "@/components/ImageForm";
import TitleForm from "@/components/TitleForm";
import WriteStory from "@/components/WriteStory";

const Edit = () => {
  const { userId } = useAuth();
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const { mutate: summarize, isPending, data: summary } = useSummarize();
  useEffect(() => {
    if (summary) {
      setContent(summary);
    }
  }, [summary]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/ /g, "-");
    toast.success("Post created successfully");
    setTitle("");
    setContent("");
    setPreview(null);
    createPost(userId as string, title, content, slug, preview || "");
  };

  return (
    <div>
      <Header />
      <div className="max-w-3xl mt-20 mx-auto  h-screen flex flex-col ">
        <WriteStory authorPic={user?.imageUrl || ""} />

        <section className="mt-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <TitleForm title={title} setTitle={setTitle} />

            <ImageForm preview={preview} setPreview={setPreview} />

            <RichTextEditor content={content} onChange={(e) => setContent(e)} />
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

export default Edit;
