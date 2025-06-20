import Image from "next/image";
import React from "react";

interface Props {
  authorPic: string;
}

const WriteStory = ({ authorPic }: Props) => {
  return (
    <>
      <main className="flex justify-between items-center border-b  pb-8">
        <header className="flex items-center gap-5">
          {authorPic ? (
            <Image
              className="rounded-full"
              alt="atuhor"
              src={authorPic}
              width={30}
              height={30}
            />
          ) : (
            <div className="rounded-full bg-green-500 px-4 py-2 w-fit">P</div>
          )}
          <div>
            <h1 className="text-2xl font-bold">Write your story</h1>
            <p className="text-muted-foreground">
              Write your story and share it with the world.
            </p>
          </div>
        </header>
      </main>
    </>
  );
};

export default WriteStory;
