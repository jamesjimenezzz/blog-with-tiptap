"use server";
import prisma from "@/lib/db";

export const getPostsByUserId = async (id: string) => {
  try {
    return await prisma.post.findMany({
      where: {
        authorId: id,
      },
      include: {
        author: true,
      },
    });
  } catch (error) {
    console.error("Error: Failed to get posts by user id:", error);
    return [];
  }
};

export const createPost = async (
  id: string,
  title: string,
  content: string,
  picture: string,
  slug: string
) => {
  try {
    return await prisma.post.create({
      data: {
        authorId: id,
        title,
        content,
        slug,
        picture,
      },
    });
  } catch (error) {
    console.error("Error: Failed to create post:", error);
    return null;
  }
};

export const getPostById = async (id: string) => {
  try {
    return await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
      },
    });
  } catch (error) {
    console.error("Error: Failed to get post by id:", error);
    return null;
  }
};
