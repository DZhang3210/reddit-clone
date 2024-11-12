"use client";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { useToggleFollow } from "@/features/threads/api/use-toggle-follow";
import { MouseEvent } from "react";
import { UseGetThreadsReturnType } from "@/features/threads/api/use-get-threads";
import Link from "next/link";

export default function MiniThreadBanner({
  thread,
}: {
  thread: UseGetThreadsReturnType[number];
}) {
  const { mutate: toggleFollow, isPending: isLoading } = useToggleFollow();
  if (thread.page) return null;

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFollow({ threadId: thread!._id });
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-2 my-2">
        <div className="flex items-center gap-2">
          <Link
            href={`/thread/${thread._id}`}
            className="flex items-center gap-2"
          >
            <Avatar className="w-10 h-10 rounded-full overflow-hidden">
              <AvatarImage src={thread?.logoImage || ""} alt={""} />
              <AvatarFallback>
                {thread?.title?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-bold text-white">r/{thread?.title}</p>
              <p className="text-xs text-gray-white">XXX members</p>
            </div>
          </Link>
        </div>
        <div>
          {thread?.isFollowing ? (
            <Button
              className="py-1 px-4 text-black bg-white border-[2px] border-black hover:text-white hover:border-white rounded-full text-xs"
              onClick={() => toggleFollow({ threadId: thread._id })}
              disabled={isLoading}
              aria-label="following button"
            >
              Following
            </Button>
          ) : (
            <Button
              className="py-1 px-4 bg-blue-600 rounded-full hover:bg-blue-700 text-xs"
              onClick={handleButtonClick}
              disabled={isLoading}
              aria-label="follow button"
            >
              Follow
            </Button>
          )}
        </div>
      </div>
      <div className="my-3 text-sm text-gray-300 mx-1">
        {thread?.description}
      </div>
    </div>
  );
}
