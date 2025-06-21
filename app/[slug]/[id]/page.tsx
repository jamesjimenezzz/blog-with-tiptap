"use client";

import React, { useEffect, useState } from "react";
import { getPostById } from "@/actions/actions";
import Header from "@/components/Header";
import Image from "next/image";
import { BookmarkPlus } from "lucide-react";
import { CirclePlay } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDeletePost, useGetPostById } from "@/hooks/useActions";
import Loader from "@/components/Loader";
import LikeButton from "@/components/LikeButton";
import { useLikePost, useUnlikePost, useGetLikeCount } from "@/hooks/useLike";
import { useUser } from "@clerk/nextjs";

const StoryById = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const { data: post, isLoading, isError } = useGetPostById(id);
  const { mutate: deletePost } = useDeletePost();
  const router = useRouter();
  const { mutate: likePost } = useLikePost(user?.id || "", post?.id!);
  const { mutate: unlikePost } = useUnlikePost(user?.id || "", post?.id!);
  const { data: likeCount } = useGetLikeCount(post?.id!);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (post && user) {
      setIsLiked(post?.likedBy.some((u) => u.id === user.id) ?? false);
    }
  }, [post, user]);

  const handleLike = () => {
    if (!user) return;

    setIsLiked(!isLiked);

    if (isLiked) {
      unlikePost();
    } else {
      likePost();
    }
  };

  const handleDelete = () => {
    deletePost(id, {
      onSuccess: () => {
        router.push("/my-stories");
      },
    });
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;

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

          <div className="flex justify-between items-center mt-5 border-y py-4">
            <div className="flex gap-3 text-muted-foreground ">
              <LikeButton
                onClick={handleLike}
                isLiked={isLiked}
                className="w-5 h-5"
                likeCount={likeCount ?? 0}
              />
              <CirclePlay className="w-5 h-5" />
              <ExternalLink className="w-5 h-5" />
            </div>
            <div className="flex gap-3 items-center">
              <Link href={`/edit/${post?.id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button onClick={() => handleDelete()}>Delete</Button>
            </div>
          </div>

          <div className="my-15">
            <Image
              src={post?.picture! || ""}
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
