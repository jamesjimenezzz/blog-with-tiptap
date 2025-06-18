import React from "react";
import Header from "@/components/Header";

const Stories = () => {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto  ">
        <div className="">
          <div className="">
            <main className="px-5">
              <header className="flex items-center mt-5 gap-2">
                <div className="rounded-full bg-green-500 px-2.5 py-0.5 w-fit">
                  P
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Blog Admin</p>
                  <p>•</p>
                  <p className="text-muted-foreground">Jan 15</p>
                </div>
              </header>
              <section className="mt-5">
                <div className="w-full flex  gap-10">
                  <div className="w-lg flex flex-col gap-3">
                    <header className="text-2xl font-bold">
                      Welcome to Our Blog
                    </header>

                    <p className="text-sm  text-muted-foreground">
                      This is the first blog post on our amazing blogging
                      platform. Here you can share your thoughts, ideas, and
                      stories with the world. Writing is a powerful medium for
                      expression, and this platform aims to provide you with all
                      the tools you need to craft compelling narratives that
                      resonate with your audience.
                    </p>
                  </div>
                  <div className="bg-gray-200 rounded-xl p-15">📝</div>
                </div>
                <div className="bg-gray-300"></div>
              </section>
            </main>
          </div>
        </div>
      </main>
    </>
  );
};

export default Stories;
