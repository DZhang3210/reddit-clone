import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Post } from "./post-results";
import { useRouter } from "next/navigation";
import useSearchPost from "@/hooks/search-post-hook";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";

const ResultItem = ({ post }: { post: Post }) => {
  const router = useRouter();
  const searchPost = useSearchPost();

  const handleClick = () => {
    router.push(`/post/${post._id}`);
    searchPost.setOff();
  };

  const handleThreadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/thread/${post?.thread?._id}`);
    searchPost.setOff();
  };

  return (
    <button
      onClick={handleClick}
      aria-label="post-result"
      className="w-full hover:bg-gray-600/20 transition-colors duration-200 ease-in-out p-2 rounded-sm "
    >
      <Card className="overflow-hidden bg-transparent border-none">
        <CardContent className="px-2 py-1 rounded-md">
          <div className="flex items-center space-x-2 justify-between rounded-md p-0">
            <div className="flex-grow min-w-0 w-full flex flex-col items-start gap-1">
              <button
                onClick={handleThreadClick}
                className="flex items-center space-x-1"
              >
                <Avatar className="w-7 h-7">
                  <AvatarImage src={post.thread?.image || ""} />
                  <AvatarFallback>{post.user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="text-xs text-gray-400">
                  <span className="font-bold hover:underline">
                    r/{post.thread?.title}{" "}
                  </span>
                  &middot; {formatDistanceToNow(new Date(post.createdAt))}
                </div>
              </button>
              <Link
                href={`/post/${post._id}`}
                className="text-xl font-semibold text-white"
              >
                {post.title}
              </Link>
              <div className="text-sm text-gray-500 text-left">
                <div className="flex text-xs text-gray-400">
                  {post.likes} votes &middot; {post.numComments} comments
                </div>
              </div>
              {/* <div className="text-sm text-gray-500 truncate">
                <ReadOnly content={post.content} />
              </div> */}
            </div>
            {post.image && (
              <div className="relative w-32 h-16 rounded-xl overflow-hidden flex-shrink-0 group">
                <Image
                  src={post.image || ""}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </button>
  );
};

export default ResultItem;
