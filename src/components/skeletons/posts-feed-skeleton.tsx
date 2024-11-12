import React from "react";
import { Skeleton } from "../ui/skeleton";
import PostCardGhost from "./post-card-ghost";

const PostsFeedSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mt-4 mx-4 ">
      <div className="max-w-4xl w-full mx-auto text-4xl flex-col justify-center space-y-4 items-center pt-4">
        <Skeleton className="w-14 h-5 ml-4" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <PostCardGhost />
        <PostCardGhost />
        <PostCardGhost />
        <PostCardGhost />
      </div>
    </div>
  );
};

export default PostsFeedSkeleton;
