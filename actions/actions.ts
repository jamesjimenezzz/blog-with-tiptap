"use server";
import prisma from "@/lib/db";

export const getPostsByUserId = async (id: string) => {
  return await prisma.post.findMany({
    where: {
      authorId: id,
    },
    include: {
      author: true,
    },
  });
};

export const createPost = async (
  id: string,
  title: string,
  content: string,
  picture: string
) => {
  return await prisma.post.create({
    data: {
      authorId: id,
      title,
      content,
      picture,
    },
  });
};
