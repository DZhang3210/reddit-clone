import React from "react";
import { Skeleton } from "../ui/skeleton";
import PostCardGhost from "./post-card-ghost";

const PostsFeedSkeleton = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-8 gap-2 mx-auto w-screen max-w-5xl mt-10">
        <div className="col-span-5">
          <PostCardGhost />
          <PostCardGhost />
          <PostCardGhost />
          <PostCardGhost />
        </div>
        <Skeleton className="col-span-3 w-full h-screen bg-gray-600" />
      </div>
    </div>
  );
};

export default PostsFeedSkeleton;
