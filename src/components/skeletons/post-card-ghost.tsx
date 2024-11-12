import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostCardGhost() {
  return (
    <Card className="w-full max-w-4xl border-2 border-gray-900 bg-gray-600">
      <CardHeader className="flex flex-row items-center space-x-4 p-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="w-full aspect-[16/4] rounded-md" />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
      </CardFooter>
    </Card>
  );
}
