import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Thread } from "./thread-results";
import useSearchPost from "@/hooks/search-post-hook";

const ThreadResultPage = ({ thread }: { thread: Thread }) => {
  const router = useRouter();
  const searchPost = useSearchPost();

  const handleClick = () => {
    router.push(`/thread/${thread._id}`);
    searchPost.setOff();
  };
  return (
    <Link href={`/thread/${thread._id}`} aria-label="thread-result">
      <button
        onClick={handleClick}
        aria-label="thread-result"
        className="w-full"
      >
        <Card className="overflow-hidden bg-transparent border-none hover:bg-gray-600/20 transition-colors duration-200 ease-in-out p-2 rounded-sm">
          <CardContent className="px-2 py-1 rounded-md">
            <div className="flex items-center space-x-4 justify-start rounded-md p-0 w-full">
              {thread.logoImage ? (
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 group">
                  <Image
                    src={thread.logoImage || ""}
                    alt={thread.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ) : (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"></div>
              )}
              <div className="flex-grow w-full flex justify-start items-center">
                <div className="flex flex-col gap-0 justify-start items-start">
                  <h1
                    className="text-xl font-semibold truncate text-white"
                    aria-label="thread-result-title"
                  >
                    r/{thread.title}
                  </h1>
                  <div className="flex flex-col gap-0 justify-start items-start">
                    <h2 className="text-gray-400 text-xs">
                      {thread.totalMembers} members
                    </h2>
                    <p className="text-gray-300 text-sm">
                      {thread.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </button>
    </Link>
  );
};

export default ThreadResultPage;
