import React from "react";
import { Skeleton } from "../ui/skeleton";

const MiniThreadBannerSkeleton = () => {
  return (
    <div className="bg-gray-600">
      <div className="flex items-center justify-between gap-2 my-2 ">
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20 mt-1" />
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
      <div className="my-3 mx-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </div>
    </div>
  );
};

export default MiniThreadBannerSkeleton;
