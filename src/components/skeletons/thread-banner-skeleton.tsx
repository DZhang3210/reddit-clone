import { Skeleton } from "@/components/ui/skeleton";

export function ThreadBannerSkeleton() {
  return (
    <div className="w-full cursor-pointer bg-gray-600">
      <div className="relative">
        <Skeleton className="w-full h-40" />
        <div className="absolute -bottom-4 left-4">
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>
      </div>
      <div className="p-4 bg-background">
        <div className="flex justify-between">
          <div>
            <Skeleton className="h-9 w-40 mb-2" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>
      </div>
    </div>
  );
}
