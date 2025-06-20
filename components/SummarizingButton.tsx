import React, { useCallback } from "react";
import { Button } from "./ui/button";

interface Props {
  content: string;
  summarize: (content: string) => void;
  isPending: boolean;
}

const SummarizingButton = ({ content, summarize, isPending }: Props) => {
  const handleClick = useCallback(() => {
    summarize(content);
  }, [content, summarize]);

  return (
    <Button
      disabled={content.trim().length < 9}
      type="button"
      variant={"outline"}
      onClick={handleClick}
      className={` cursor-pointer transition-all duration-400  text-sm ${
        content.trim().length > 7 ? "text-black   " : ""
      }`}
    >
      {isPending ? "Summarizing..." : "Summarize"}
    </Button>
  );
};

export default SummarizingButton;
