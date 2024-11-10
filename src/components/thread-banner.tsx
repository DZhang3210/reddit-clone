"use client";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Pencil, ShieldCheck, User } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import Link from "next/link";
import { useToggleFollow } from "@/features/threads/api/use-toggle-follow";
import { MouseEvent } from "react";
import Image from "next/image";
import useToggleThread from "@/hooks/create-thread-hook";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

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
  isMini?: boolean;
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
  isMini = false,
}: RedditThreadBannerProps) {
  const { mutate: toggleFollow, isPending: isLoading } = useToggleFollow();
  const { setMany, setOn } = useToggleThread();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFollow({ threadId });
  };

  const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(false);
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
    <Link href={`/thread/${threadId}`} className="transition w-full">
      <div className="w-full cursor-pointer">
        <div className="relative">
          <div className="w-full h-[10rem] bg-gray-700 overflow-hidden">
            {!backgroundImage ? (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500">Banner Image</span>
              </div>
            ) : (
              <div>
                <Image
                  src={backgroundImage}
                  alt="Banner preview"
                  className="object-cover object-center"
                  fill
                  sizes="100vw"
                />
              </div>
            )}
          </div>
          <div className="absolute -bottom-4 left-4">
            <div className="w-20 h-20 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center overflow-hidden ">
              {!threadImage ? (
                <User className="text-gray-500 w-10 h-10" />
              ) : (
                <div>
                  <Image
                    src={threadImage}
                    alt="Thread image"
                    className="object-cover rounded-full"
                    fill
                    sizes="80px"
                  />
                </div>
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

              <p className="text-sm text-gray-400 mt-2 truncate">
                r/
                {threadName
                  ? threadName.toLowerCase().replace(/\s+/g, "")
                  : "communityname"}
              </p>
              <p className="text-gray-300 text-xs">{memberCount} members</p>
            </div>
            <div className="flex gap-2 items-center">
              {isFollowing ? (
                <Button
                  className="py-2 px-4 text-black bg-white border-[2px] border-black hover:text-white hover:border-white rounded-full"
                  onClick={handleButtonClick}
                  disabled={isLoading}
                  aria-label="following button"
                >
                  Following
                </Button>
              ) : (
                <Button
                  className="py-2 px-4 bg-blue-600 border-2 border-white rounded-xl hover:bg-blue-800"
                  onClick={handleButtonClick}
                  disabled={isLoading}
                  aria-label="follow button"
                >
                  Follow
                </Button>
              )}
              {!isMini && (
                <DropdownMenu
                  open={isDropdownOpen}
                  onOpenChange={setIsDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label="dropdown-trigger"
                      className="px-2 py-2 border-2 border-black rounded-full hover:bg-gray-200 transition bg-white text-black"
                    >
                      <EllipsisVertical className="h-5 w-5 mr-0 sm:h-4 sm:w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    alignOffset={0}
                    className=" space-y-2"
                  >
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <button
                          onClick={handleEditClick}
                          aria-label="edit-trigger"
                          className="text-black w-full hover:bg-gray-200 transition  cursor-pointer text-sm flex justify-between"
                        >
                          Edit
                          <Pencil className="h-4 w-4 ml-2" />
                        </button>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem asChild>
                      <Link
                        href={`/admin/${threadId}`}
                        aria-label="admins-trigger"
                        className="bg-blue-200 w-full hover:bg-gray-200 transition  cursor-pointer text-sm flex justify-between"
                      >
                        Admins
                        <ShieldCheck className="h-4 w-4 ml-2" />
                      </Link>
                    </DropdownMenuItem>

                    {/* Add more dropdown items as needed */}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-300 mt-4 truncate">
            {threadDesc || "Community description will appear here."}
          </p>
        </div>
      </div>
    </Link>
  );
}
