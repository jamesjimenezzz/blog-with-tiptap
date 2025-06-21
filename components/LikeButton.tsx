import { Heart } from "lucide-react";
import React from "react";

interface Props {
  onClick: () => void;
  isLiked: boolean;
  className?: string;
  likeCount: number;
}

const LikeButton = ({ onClick, isLiked, className, likeCount }: Props) => {
  return (
    <>
      <Heart
        onClick={onClick}
        className={`${
          isLiked ? "fill-pink-500 text-pink-500" : ""
        } w-5 h-5 cursor-pointer ${className}`}
      />
      <span className="text-sm">{likeCount}</span>
    </>
  );
};

export default LikeButton;
