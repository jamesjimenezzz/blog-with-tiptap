"use client";

import { Post, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface StoryProps {
  post: Post & { author: User };
}

const Story = ({ post }: StoryProps) => {
  let content = post.content;
  if (content.length > 300) {
    content = content.slice(0, 300) + "...";
  }

  return (
    <>
      <div className="">
        <div className="">
          <main className="px-5">
            <header className="flex items-center mt-5 gap-2">
              {post.author.profileImage ? (
                <Image
                  src={post.author.profileImage}
                  alt={post.author.firstName || ""}
                  className="rounded-full"
                  width={20}
                  height={20}
                />
              ) : (
                <p>P</p>
              )}

              <div className="flex items-center gap-2">
                <p className="font-semibold">
                  {post.author.firstName} {post.author.lastName}
                </p>
                <p>•</p>
                <p className="text-muted-foreground">
                  {post.createdAt.toLocaleDateString()}
                </p>
              </div>
            </header>
            <Link href={`/${post.slug}/${post.id}`}>
              <section className="mt-2.5">
                <div className="w-full flex  gap-10">
                  <div className="w-lg flex flex-col gap-3">
                    <header className="text-2xl font-bold">{post.title}</header>

                    <div
                      className="text-sm  text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>

                  <Image
                    className="rounded-lg w-40 h-40 object-cover flex items-center justify-center overflow-hidden"
                    src={post.picture || "https://placehold.co/600x400"}
                    alt={post.title}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="bg-gray-300"></div>
              </section>
            </Link>
          </main>
        </div>
      </div>
    </>
  );
};

export default Story;
