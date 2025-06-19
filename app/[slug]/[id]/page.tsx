"use server";

import React from "react";
import { getPostById } from "@/actions/actions";
import Header from "@/components/Header";
import Image from "next/image";
import { BookmarkPlus } from "lucide-react";
import { CirclePlay } from "lucide-react";
import { ExternalLink } from "lucide-react";

const StoryById = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = await getPostById(id);

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto">
        <section className="mt-20">
          <div>
            <h1 className="text-5xl text-center uppercase font-bold ">
              {post?.title}
            </h1>
          </div>
          <div className="flex items-center mt-7 gap-2">
            {post?.author.profileImage && (
              <Image
                src={post?.author.profileImage}
                alt="author"
                height={30}
                width={30}
                className="rounded-full"
              />
            )}
            <span className="flex gap-1">
              <p>{post?.author.firstName}</p>
              <p>{post?.author.lastName}</p>
            </span>

            <p className="text-sm text-muted-foreground font-light">
              6 min read
            </p>

            <p>•</p>

            <p className="text-sm text-muted-foreground font-light">
              {post?.createdAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex gap-3 text-muted-foreground mt-5 border-y py-4">
            <BookmarkPlus className="w-5 h-5" />
            <CirclePlay className="w-5 h-5" />
            <ExternalLink className="w-5 h-5" />
          </div>

          <div className="my-15">
            <Image
              src={post?.picture || ""}
              alt="post"
              width={1000}
              height={1000}
              className="rounded-none "
            />
          </div>

          <div
            className="text-lg  text-black/80 leading-relaxed font-light mt-5 pb-20"
            dangerouslySetInnerHTML={{ __html: post?.content || "" }}
          />
        </section>
      </div>
    </>
  );
};

export default StoryById;
