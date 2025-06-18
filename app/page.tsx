import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Trending from "./Trending";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Home = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Header />
      <div className="bg-gray-100  border-b border-black rounded-xs px-5 py-20   flex items-center ">
        <div className="flex flex-col gap-5 max-w-sm px-4">
          <h1 className="text-7xl font-bold">Human stories & ideas</h1>
          <p className="text-lg text-muted-foreground">
            A place to read, write, and deepen your understanding of the world
          </p>

          <Button className="mt-4 w-fit">Get started</Button>
        </div>
      </div>
      <Trending />
    </div>
  );
};

export default Home;
