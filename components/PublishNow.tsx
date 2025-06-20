import React from "react";
import { Button } from "./ui/button";

interface Props {
  onClick: () => void;
  className: string;
}

const PublishNow = ({ onClick, className }: Props) => {
  return (
    <>
      <Button
        onClick={onClick}
        type={"submit"}
        className={`${className} bg-green-600 w-fit rounded-full text-white`}
      >
        Publish Now
      </Button>
    </>
  );
};

export default PublishNow;
