import React from "react";
import ThreadResultSkeleton from "./thread-result-skeleton";

const ThreadResultsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 px-4">
      <ThreadResultSkeleton />
      <ThreadResultSkeleton />
      <ThreadResultSkeleton />
    </div>
  );
};

export default ThreadResultsSkeleton;
