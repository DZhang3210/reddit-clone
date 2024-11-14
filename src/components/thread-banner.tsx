"use client";
import {
  EllipsisVertical,
  Pencil,
  Plus,
  ShieldCheck,
  User,
} from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import Link from "next/link";
import { useToggleFollow } from "@/features/threads/api/use-toggle-follow";
import { MouseEvent } from "react";
import Image from "next/image";
import useToggleThread from "@/hooks/create-thread-hook";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import useTogglePost from "@/hooks/create-post-hook";

interface ThreadBannerProps {
  backgroundImage?: string | null;
  threadId: Id<"threads">;
  threadImage?: string | null;
  threadName?: string;
  threadDesc: string | undefined;
  isFollowing?: boolean | null;
  bannerColor: string;
  isAdmin?: boolean;
  isMini?: boolean;
}

export default function ThreadBanner({
  threadId,
  backgroundImage = "/placeholder.svg?height=192&width=1024",
  threadImage = "/placeholder.svg?height=80&width=80",
  threadName = "DefaultSubreddit",
  threadDesc,
  bannerColor,
  isFollowing = false,
  isAdmin = false,
  isMini = false,
}: ThreadBannerProps) {
  const postModal = useTogglePost();
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
    <div className="w-full">
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
        <div className=" p-4">
          <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between px-6">
            <Link href={`/thread/${threadId}`}>
              <h4 className="text-2xl md:text-4xl font-bold text-white truncate">
                r/{threadName || "Community Name"}
              </h4>
            </Link>
            <div className="flex gap-2 md:gap-4 items-center">
              <button
                className="py-[0.4rem] px-2 text-white border border-gray-300 rounded-full flex items-center gap-1 hover:border-white transition text-xs md:text-sm md:px-4 md:py-2"
                onClick={() => {
                  postModal.setMany({
                    threadId,
                    editMode: false,
                  });
                  postModal.setOn();
                }}
              >
                <Plus className="h-4 w-4 " />
                Create
              </button>
              {isFollowing ? (
                <button
                  className="py-[0.4rem] px-4 text-black bg-white border-[2px] border-black hover:text-white hover:border-white rounded-full text-xs md:text-sm md:px-6 md:py-2"
                  onClick={handleButtonClick}
                  disabled={isLoading}
                  aria-label="following button"
                >
                  Joined
                </button>
              ) : (
                <button
                  className="py-[0.4rem] px-6 bg-blue-600 rounded-full hover:bg-blue-800 text-xs md:text-sm md:px-6 md:py-2"
                  onClick={handleButtonClick}
                  disabled={isLoading}
                  aria-label="follow button"
                >
                  Join
                </button>
              )}
              {!isMini && (
                <DropdownMenu
                  open={isDropdownOpen}
                  onOpenChange={setIsDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <button
                      aria-label="dropdown-trigger"
                      className="p-2 aspect-square border-2 border-gray-300 rounded-full hover:border-white transition"
                    >
                      <EllipsisVertical className="h-2 w-2 md:h-4 md:w-4 mr-0 text-white" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={5}
                    className=" space-y-2 *:px-1 *:py-2 w-[160px] bg-black border-0"
                  >
                    {isAdmin && (
                      <div>
                        <button
                          onClick={handleEditClick}
                          aria-label="edit-trigger"
                          className="hover:text-white transition  cursor-pointer text-sm grid grid-cols-5 w-full h-full items-center text-gray-300 gap-9"
                        >
                          <Pencil className="h-4 w-4 ml-2" />
                          <span className="flex items-center col-span-4 text-sm">
                            Edit
                          </span>
                        </button>
                      </div>
                    )}

                    <div>
                      <Link
                        href={`/admin/${threadId}`}
                        aria-label="admins-trigger"
                        className="hover:text-white transition  cursor-pointer text-sm grid grid-cols-5 w-full h-full items-center text-gray-300 gap-9"
                      >
                        <ShieldCheck className="h-4 w-4 ml-2" />
                        <span className="flex items-center col-span-4 text-sm">
                          Admins
                        </span>
                      </Link>
                    </div>

                    {/* Add more dropdown items as needed */}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
