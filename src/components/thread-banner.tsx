"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import Link from "next/link";
import { useToggleFollow } from "@/features/threads/api/use-toggle-follow";
import { MouseEvent } from "react";

interface RedditThreadBannerProps {
  backgroundImage?: string | null;
  threadId: Id<"threads">;
  threadImage?: string | null;
  threadName?: string;
  threadDesc: string | undefined;
  memberCount?: number;
  isFollowing?: boolean | null;
}

export default function RedditThreadBanner({
  threadId,
  backgroundImage = "/placeholder.svg?height=192&width=1024",
  threadImage = "/placeholder.svg?height=80&width=80",
  threadName = "DefaultSubreddit",
  threadDesc,
  memberCount = 1000,
  isFollowing = false,
}: RedditThreadBannerProps) {
  const { mutate: toggleFollow, isPending: isLoading } = useToggleFollow();

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFollow({ threadId });
  };

  return (
    <Link
      href={`/thread/${threadId}`}
      className="transition hover:scale-[101%] container"
    >
      <div className="w-full cursor-pointer">
        <div className="relative">
          <div className="w-full h-[10rem] bg-gray-700 overflow-hidden">
            {!backgroundImage ? (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500">Banner Image</span>
              </div>
            ) : (
              <img
                src={backgroundImage}
                alt="Banner preview"
                className="w-full h-full object-cover object-center"
              />
            )}
          </div>
          <div className="absolute -bottom-4 left-4">
            <div className="w-20 h-20 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center overflow-hidden ">
              {!threadImage ? (
                <User className="text-gray-500 w-10 h-10" />
              ) : (
                <img
                  src={threadImage}
                  alt="Thread image"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
        <div className=" p-4 bg-teal-800">
          <div className="flex justify-between">
            <div>
              <h4 className="text-xl font-bold text-white">
                {threadName || "Community Name"}
              </h4>
              <p className="text-sm text-gray-400 mt-2">
                r/
                {threadName
                  ? threadName.toLowerCase().replace(/\s+/g, "")
                  : "communityname"}
              </p>
              <p className="text-gray-300 text-xs">{memberCount} members</p>
            </div>
            {isFollowing ? (
              <Button
                className="py-1 px-4 bg-blue-600 hover:bg-blue-800"
                onClick={handleButtonClick}
                disabled={isLoading}
              >
                Following
              </Button>
            ) : (
              <Button
                className="py-1 px-4 bg-blue-600 hover:bg-blue-800"
                onClick={handleButtonClick}
                disabled={isLoading}
              >
                Follow
              </Button>
            )}
          </div>
          <p className="text-sm text-gray-300 mt-4">
            {threadDesc || "Community description will appear here."}
          </p>
        </div>
      </div>
    </Link>
  );
}
