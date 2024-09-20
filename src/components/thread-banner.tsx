"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import Link from "next/link";

interface RedditThreadBannerProps {
  backgroundImage?: string | null;
  threadId: Id<"threads"> | undefined;
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
  const [follow, setFollowing] = useState(isFollowing);
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinClick = () => {
    setIsJoined(!isJoined);
  };

  const getAvatarFallback = (name: string) => {
    return name && name.length > 0 ? name.slice(0, 2).toUpperCase() : "TH";
  };

  return (
    <Link href={`/thread/${threadId}`} className="transition hover:scale-105">
      <div className="w-full cursor-pointer">
        <div className="relative">
          <div className="w-full h-32 bg-gray-700 flex items-center justify-center rounded-t-lg">
            {!backgroundImage ? (
              <span className="text-gray-500">Banner Image</span>
            ) : (
              <img
                src={backgroundImage}
                alt="Banner preview"
                className="mt-2 max-h-32 w-full object-cover rounded"
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
                  alt="Banner preview"
                  className="mt-2 max-h-32 w-full object-cover rounded"
                />
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 p-4 bg-gray-900 rounded-b-lg">
          <div className="flex justify-between">
            <div>
              <h4 className="text-xl font-bold">
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
              <Button className="py-1 px-4 bg-blue-800 hover:bg-blue-900">
                Following
              </Button>
            ) : (
              <Button className="py-1 px-4 bg-blue-600 hover:bg-blue-800">
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
