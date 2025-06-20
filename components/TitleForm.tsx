import React from "react";

interface Props {
  title: string;
  setTitle: (title: string) => void;
}

const TitleForm = ({ title, setTitle }: Props) => {
  return (
    <>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-muted-foreground text-4xl font-bold outline-none  py-2  px-1.5 rounded-lg focus:border-b-1 focus:border focus:border-black"
      />
    </>
  );
};

export default TitleForm;
