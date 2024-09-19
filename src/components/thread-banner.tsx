"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RedditThreadBannerProps {
  backgroundImage?: string;
  threadImage?: string;
  threadName?: string;
  memberCount?: number;
}

export default function RedditThreadBanner({
  backgroundImage = "/placeholder.svg?height=192&width=1024",
  threadImage = "/placeholder.svg?height=80&width=80",
  threadName = "DefaultSubreddit",
  memberCount = 1000,
}: RedditThreadBannerProps) {
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinClick = () => {
    setIsJoined(!isJoined);
  };

  const getAvatarFallback = (name: string) => {
    return name && name.length > 0 ? name.slice(0, 2).toUpperCase() : "TH";
  };

  return (
    <div className="relative w-full h-48 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end p-4">
        <div className="flex items-center space-x-4">
          {/* Thread Image */}
          <Avatar className="w-20 h-20 border-4 border-white">
            <AvatarImage src={threadImage} alt={threadName} />
            <AvatarFallback>{getAvatarFallback(threadName)}</AvatarFallback>
          </Avatar>

          {/* Thread Info */}
          <div className="text-white">
            <h1 className="text-2xl font-bold">r/{threadName}</h1>
            <p className="text-sm">{memberCount.toLocaleString()} members</p>
          </div>

          {/* Join Button */}
          <Button
            variant={isJoined ? "secondary" : "default"}
            onClick={handleJoinClick}
            className="ml-auto"
          >
            {isJoined ? "Joined" : "Join"}
          </Button>
        </div>
      </div>
    </div>
  );
}
