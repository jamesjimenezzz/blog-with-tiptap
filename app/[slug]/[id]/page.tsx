"use server";

import React from "react";
import { getPostById } from "@/actions/actions";

const StoryById = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = await getPostById(id);

  return <div>{post?.title}</div>;
};

export default StoryById;
