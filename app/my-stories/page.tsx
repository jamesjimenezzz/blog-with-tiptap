"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@clerk/nextjs";
import Story from "./Story";
import { useGetPostsByUserId } from "@/hooks/useActions";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const Stories = () => {
  const [query, setQuery] = useState("");

  const [sort, setSort] = useState("asc");
  const { userId } = useAuth();
  const {
    data: posts,
    isLoading,
    isError,
  } = useGetPostsByUserId(userId as string, sort as "asc" | "desc");

  if (isLoading) {
    return <Loader />;
  }
  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="items-center border-b pb-5 pl-5 mb-5 mt-7 max-w-4xl flex mx-auto  gap-15">
        <div className="w-fit">
          <h1 className="text-4xl p-0 m-0 font-bold">
            Stories{" "}
            <span className="text-muted-foreground">({posts?.length})</span>
          </h1>
        </div>
        <div>
          <Input
            className="w-[300px]"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
              <DropdownMenuRadioItem value="asc">Oldest</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="desc">Newest</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <main className="max-w-4xl flex pb-20 flex-col gap-20 mx-auto  ">
        {filteredPosts?.map((post) => {
          return <Story key={post.id} post={post} />;
        })}
      </main>
    </>
  );
};

export default Stories;
