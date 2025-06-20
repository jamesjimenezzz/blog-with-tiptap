"use client";
import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@clerk/nextjs";
import { createPost } from "@/actions/actions";
import { useSummarize } from "@/hooks/useActions";
import { toast } from "sonner";

const Edit = () => {
  const { userId } = useAuth();

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
    createPost(userId as string, title, content, preview || "", slug);
  };

  return (
    <div>
      <Header />
      <div className="max-w-3xl mt-20 mx-auto  h-screen flex flex-col ">
        <main className="flex justify-between items-center border-b  pb-8">
          <header className="flex items-center gap-5">
            <div className="rounded-full bg-green-500 px-4 py-2 w-fit">P</div>
            <div>
              <h1 className="text-2xl font-bold">Write your story</h1>
              <p className="text-muted-foreground">
                Write your story and share it with the world.
              </p>
            </div>
          </header>

          <header>
            <Button className="bg-green-600 rounded-full text-white">
              Publish Now
            </Button>
          </header>
        </main>

        <section className="mt-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-muted-foreground text-4xl font-bold outline-none  py-2  px-1.5 rounded-lg focus:border-b-1 focus:border focus:border-black"
            />

            <label htmlFor={`${preview === null ? "image" : ""}`}>
              <div className="cursor-pointer flex flex-col w-lg mx-auto  items-center justify-center border-2 border-dashed border-gray-300 rounded-lg py-20 ">
                {preview ? (
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src={preview}
                      alt="preview"
                      className=" w-full h-auto rounded-md object-cover"
                    />
                  </div>
                ) : (
                  <>
                    <span className="text-4xl text-gray-400">+</span>

                    <span className="text-sm font-medium text-gray-700 mt-5">
                      Add an image
                    </span>
                    <span className="text-xs text-gray-500">
                      Upload an image to make your story stand out
                    </span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                  id="image"
                />
              </div>
            </label>
            <div className="items-center flex justify-center">
              <Button
                onClick={() => setPreview(null)}
                className="w-fit items-center"
              >
                Remove
              </Button>
            </div>
            <RichTextEditor content={content} onChange={(e) => setContent(e)} />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  disabled={content.trim().length < 9}
                  type="button"
                  variant={"outline"}
                  onClick={() => summarize(content)}
                  className={` cursor-pointer transition-all duration-400  text-sm ${
                    content.trim().length > 7 ? "text-black   " : ""
                  }`}
                >
                  {isPending ? "Summarizing..." : "Summarize"}
                </Button>
              </div>
              <Button
                onClick={() => {
                  if (content.trim().length < 9 || title.trim().length < 3) {
                    return toast.error("Please fill in all fields");
                  }
                }}
                type="submit"
                className="bg-green-600 w-fit rounded-full text-white"
              >
                Publish Now
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Edit;
