import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Post } from "./post-results";
import { useRouter } from "next/navigation";
import useSearchPost from "@/hooks/search-post-hook";
import Link from "next/link";

const ResultItem = ({ post }: { post: Post }) => {
  const router = useRouter();
  const searchPost = useSearchPost();

  const handleClick = () => {
    router.push(`/post/${post._id}`);
    searchPost.setOff();
  };

  return (
    <button onClick={handleClick} aria-label="post-result">
      <Card className="overflow-hidden">
        <CardContent className="px-2 py-1 bg-gray-200 rounded-md">
          <div className="flex items-center space-x-2 justify-start rounded-md p-0">
            {post.image ? (
              <Link
                href={`/post/${post?.thread?._id}`}
                className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 group"
              >
                <Image
                  src={post.image || ""}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </Link>
            ) : (
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-300"></div>
            )}
            <div className="flex-grow min-w-0 w-full flex flex-col items-start">
              <Link
                href={`/post/${post._id}`}
                className="text-lg font-semibold truncate hover:underline"
              >
                {post.title}
              </Link>
              <div className="text-sm text-gray-500 text-left">
                Posted by
                <Link
                  href={`/user/${post.user?._id}`}
                  className="font-semibold hover:underline"
                >
                  u/{post.user?.name}
                </Link>{" "}
                on{" "}
                <Link
                  href={`/thread/${post?.thread?._id}`}
                  className="font-semibold hover:underline"
                >
                  r/{post.thread?.title}
                </Link>
              </div>
              {/* <div className="text-sm text-gray-500 truncate">
                <ReadOnly content={post.content} />
              </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
};

export default ResultItem;
