"use client";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import Link from "next/link";
import { useToggleFollow } from "@/features/threads/api/use-toggle-follow";
import { MouseEvent } from "react";
import Image from "next/image";
import useToggleThread from "@/hooks/create-thread-hook";
import useFocusImage from "@/hooks/focus-image-hook";

interface RedditThreadBannerProps {
  backgroundImage?: string | null;
  threadId: Id<"threads">;
  threadImage?: string | null;
  threadName?: string;
  threadDesc: string | undefined;
  memberCount?: number;
  isFollowing?: boolean | null;
  bannerColor: string;
  isAdmin?: boolean;
}

export default function RedditThreadBanner({
  threadId,
  backgroundImage = "/placeholder.svg?height=192&width=1024",
  threadImage = "/placeholder.svg?height=80&width=80",
  threadName = "DefaultSubreddit",
  threadDesc,
  bannerColor,
  memberCount = 1000,
  isFollowing = false,
  isAdmin = false,
}: RedditThreadBannerProps) {
  const { mutate: toggleFollow, isPending: isLoading } = useToggleFollow();
  const { setMany, setOn } = useToggleThread();
  const focusImage = useFocusImage();

  const handleFocusImageBackground = () => {
    focusImage.setImageLink(backgroundImage || "");
  };
  const handleFocusImageLogo = () => {
    focusImage.setImageLink(threadImage || "");
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFollow({ threadId });
  };

  const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setMany({
      title: threadName,
      editMode: true,
      description: threadDesc || "",
      logoImage: threadImage || "",
      bannerImage: backgroundImage || "",
      bannerColor,
      id: threadId,
    });
    setOn();
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
              <button onClick={handleFocusImageBackground}>
                <Image
                  src={backgroundImage}
                  alt="Banner preview"
                  className="object-cover object-center"
                  fill
                  sizes="100vw"
                />
              </button>
            )}
          </div>
          <div className="absolute -bottom-4 left-4">
            <div className="w-20 h-20 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center overflow-hidden ">
              {!threadImage ? (
                <User className="text-gray-500 w-10 h-10" />
              ) : (
                <button onClick={handleFocusImageLogo}>
                  <Image
                    src={threadImage}
                    alt="Thread image"
                    className="object-cover rounded-full"
                    fill
                    sizes="80px"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className=" p-4" style={{ backgroundColor: bannerColor }}>
          <div className="flex justify-between">
            <div>
              <h4 className="text-xl font-bold text-white truncate">
                {threadName || "Community Name"}
              </h4>

              {isAdmin && (
                <button
                  className="text-sm text-white mt-2 rounded-full px-4 py-1 bg-blue-800 hover:bg-blue-900 transition"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}
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
