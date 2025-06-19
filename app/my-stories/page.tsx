import React from "react";
import Header from "@/components/Header";
import { useAuth } from "@clerk/nextjs";
import { getPostsByUserId } from "@/actions/actions";
import Story from "./Story";
import { auth } from "@clerk/nextjs/server";

const Stories = async () => {
  const { userId } = await auth();
  const posts = await getPostsByUserId(userId as string);

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto  ">
        {posts.map((post) => {
          return <Story key={post.id} post={post} />;
        })}
      </main>
    </>
  );
};

export default Stories;
