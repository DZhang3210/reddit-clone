import React from "react";
import PostResultSkeleton from "./post-result-skeleton";

const PostResultsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 px-4">
      <PostResultSkeleton />
      <PostResultSkeleton />
      <PostResultSkeleton />
    </div>
  );
};

export default PostResultsSkeleton;
