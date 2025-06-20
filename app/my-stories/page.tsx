"use client";
import React from "react";
import Header from "@/components/Header";
import { useAuth } from "@clerk/nextjs";
import Story from "./Story";
import { useGetPostsByUserId } from "@/hooks/useActions";
import Loader from "@/components/Loader";

const Stories = () => {
  const { userId } = useAuth();
  const {
    data: posts,
    isLoading,
    isError,
  } = useGetPostsByUserId(userId as string);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl flex pb-20 flex-col gap-20 mx-auto  ">
        {posts?.map((post) => {
          return <Story key={post.id} post={post} />;
        })}
      </main>
    </>
  );
};

export default Stories;
