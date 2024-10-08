import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "../ui/card";

const ThreadResultSkeleton = () => {
  return (
    <button className="w-full">
      <Card className="overflow-hidden">
        <CardContent className="px-4 py-1 bg-gray-200 rounded-md">
          <div className="flex items-center space-x-2 justify-start rounded-md p-0">
            <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
            <div className="flex-grow min-w-0 w-full flex justify-between items-center">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
};

export default ThreadResultSkeleton;
