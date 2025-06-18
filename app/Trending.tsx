import React from "react";

const Trending = () => {
  return (
    <div className="flex gap-20">
      <main className="w-4xl ">
        <div className="uppercase text-sm font-bold flex mx-auto justify-center mt-5 items-center ">
          <div className="flex-1 h-0.5 bg-black "></div>
          <p className="mx-5"> Trending on Medium</p>
          <div className="flex-1 h-0.5 bg-black "></div>
        </div>
        <div className="">
          <div className="flex justify-between">
            <main className="px-5">
              <header className="flex items-center mt-5 gap-2">
                <div className="rounded-full bg-green-500 px-3 py-1 w-fit">
                  P
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Blog Admin</p>
                  <p>•</p>
                  <p className="text-muted-foreground">Jan 15</p>
                </div>
              </header>
              <section className="mt-5">
                <div className="w-lg flex flex-col gap-5">
                  <header className="text-2xl font-bold">
                    Welcome to Our Blog
                  </header>
                  <p className="text-sm text-muted-foreground">
                    This is the first blog post on our amazing blogging
                    platform. Here you can share your thoughts, ideas, and
                    stories with the world. Writing is a powerful medium for
                    expression, and this platform aims to provide you with all
                    the tools you need to craft compelling narratives that
                    resonate with your audience.
                  </p>
                </div>
                <div className="bg-gray-300"></div>
              </section>
            </main>
          </div>
        </div>
      </main>

      <main className="mt-15 p-5 bg-gray-100 flex-1">
        <header>
          <h1 className="text-2xl font-semibold">Staff Picks</h1>
        </header>
        <div className="flex flex-col gap-3 mt-5">
          <p className="text-bold text-2xl text-muted-foreground">01</p>
          <p className="text-bold text-2xl text-muted-foreground">02</p>
          <p className="text-bold text-2xl text-muted-foreground">03</p>
        </div>
      </main>
    </div>
  );
};

export default Trending;
