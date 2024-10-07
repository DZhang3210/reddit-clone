"use client";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import Link from "next/link";
import { useToggleFollow } from "@/features/threads/api/use-toggle-follow";
import { MouseEvent } from "react";
import Image from "next/image";

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
              <Image
                src={backgroundImage}
                alt="Banner preview"
                className="object-cover object-center"
                fill
                sizes="100vw"
              />
            )}
          </div>
          <div className="absolute -bottom-4 left-4">
            <div className="w-20 h-20 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center overflow-hidden ">
              {!threadImage ? (
                <User className="text-gray-500 w-10 h-10" />
              ) : (
                <Image
                  src={threadImage}
                  alt="Thread image"
                  className="object-cover rounded-full"
                  fill
                  sizes="80px"
                />
              )}
            </div>
          </div>
        </div>
        <div className=" p-4 bg-teal-800">
          <div className="flex justify-between">
            <div>
              <h4 className="text-xl font-bold text-white truncate">
                {threadName || "Community Name"}
              </h4>
              <p className="text-sm text-gray-400 mt-2 truncate">
                r/
                {threadName
                  ? threadName.toLowerCase().replace(/\s+/g, "")
                  : "communityname"}
              </p>
              <p className="text-gray-300 text-xs">{memberCount} members</p>
            </div>
            {isFollowing ? (
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
          <p className="text-sm text-gray-300 mt-4 truncate">
            {threadDesc || "Community description will appear here."}
          </p>
        </div>
      </div>
    </Link>
  );
}
