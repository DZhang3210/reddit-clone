import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Thread } from "./thread-results";
import useSearchPost from "@/hooks/search-post-hook";

const ThreadResult = ({
  thread,
  setSearchQuery,
}: {
  thread: Thread;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();
  const searchPost = useSearchPost();

  const handleClick = () => {
    router.push(`/thread/${thread._id}`);
    searchPost.setOff();
    if (setSearchQuery) {
      setSearchQuery("");
    }
  };

  return (
    <button onClick={handleClick} aria-label="thread-result" className="w-full">
      <Card className="overflow-hidden bg-transparent border-none w-full">
        <CardContent className="px-2 py-1 rounded-md">
          <div className="flex items-center space-x-2 justify-start rounded-md p-0 w-full">
            {thread.logoImage ? (
              <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 group">
                <Image
                  src={thread.logoImage || ""}
                  alt={thread.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
            ) : (
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"></div>
            )}
            <div className="flex-grow w-full flex justify-start items-center">
              <div className="flex flex-col gap-0 justify-start items-start">
                <h1
                  className="text-sm font-semibold truncate hover:underline text-gray-400"
                  aria-label="thread-result-title"
                >
                  r/{thread.title}
                </h1>
                <h2 className="text-gray-400 text-xs">
                  {thread.totalMembers} members
                </h2>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
};

export default ThreadResult;
