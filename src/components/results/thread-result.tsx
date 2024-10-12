import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import { Thread } from "./thread-results";
import useSearchPost from "@/hooks/search-post-hook";
import { useToggleFollow } from "@/features/threads/api/use-toggle-follow";
import { MouseEvent } from "react";

const ThreadResult = ({ thread }: { thread: Thread }) => {
  const router = useRouter();
  const searchPost = useSearchPost();
  const { mutate: toggleFollow, isPending: isLoading } = useToggleFollow();

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFollow({ threadId: thread._id });
  };
  const handleClick = () => {
    router.push(`/thread/${thread._id}`);
    searchPost.setOff();
  };
  return (
    <button onClick={handleClick}>
      <Card className="overflow-hidden">
        <CardContent className="px-2 py-1 bg-gray-200 rounded-md">
          <div className="flex items-center space-x-2 justify-start rounded-md p-0">
            {thread.logoImage ? (
              <Link
                href={`/thread/${thread._id}`}
                className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 group"
              >
                <Image
                  src={thread.logoImage || ""}
                  alt={thread.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </Link>
            ) : (
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-300"></div>
            )}
            <div className="flex-grow min-w-0 w-full flex justify-between items-center">
              <button
                onClick={handleClick}
                className="text-xl font-semibold truncate hover:underline"
              >
                {thread.title}
              </button>

              {thread.isFollowing ? (
                <Button
                  className="py-2 px-4 text-black bg-white border-[2px] border-black hover:text-white hover:border-white rounded-full"
                  onClick={handleButtonClick}
                  disabled={isLoading}
                >
                  Following
                </Button>
              ) : (
                <Button
                  className="py-2 px-4 bg-blue-600 border-2 border-white rounded-xl hover:bg-blue-800"
                  onClick={handleButtonClick}
                  disabled={isLoading}
                >
                  Follow
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
};

export default ThreadResult;
