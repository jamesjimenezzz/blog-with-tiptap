"use client";
import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="max-w-3xl mt-20 mx-auto  h-screen flex flex-col ">
      <main className="flex justify-between items-center border-b  pb-8">
        <header className="flex items-center gap-5">
          <div className="rounded-full bg-green-500 px-4 py-2 w-fit">P</div>
          <div>
            <h1 className="text-2xl font-bold">Write your story</h1>
            <p className="text-muted-foreground">
              Write your story and share it with the world.
            </p>
          </div>
        </header>

        <header>
          <Button className="bg-green-600 rounded-full text-white">
            Publish Now
          </Button>
        </header>
      </main>

      <section className="mt-5">
        <form className="flex flex-col gap-10">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="w-full border-b-1 border-gray-300 text-2xl font-semibold outline-none  py-3 px-1.5  focus:border-b-1 focus:border focus:border-black"
          />
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-muted-foreground text-4xl font-bold outline-none  py-2  px-1.5 rounded-lg focus:border-b-1 focus:border focus:border-black"
          />

          <label htmlFor="image">
            <div className="cursor-pointer flex flex-col w-lg mx-auto  items-center justify-center border-2 border-dashed border-gray-300 rounded-lg py-20 ">
              <span className="text-4xl text-gray-400">+</span>

              <span className="text-sm font-medium text-gray-700 mt-5">
                Add an image
              </span>
              <span className="text-xs text-gray-500">
                Upload an image to make your story stand out
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="image"
              />
            </div>
          </label>
          <RichTextEditor content={content} onChange={setContent} />
        </form>
      </section>
    </div>
  );
};

export default Edit;
