import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const PostResultSkeleton = () => {
  return (
    <button className="w-full">
      <Card className="overflow-hidden">
        <CardContent className="px-4 py-1 bg-gray-200 rounded-md">
          <div className="flex items-center space-x-2 justify-start rounded-md p-0">
            <Skeleton className="w-16 h-16 rounded-xl flex-shrink-0" />
            <div className="flex-grow min-w-0 w-full flex flex-col items-start space-y-2">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
};

export default PostResultSkeleton;
