"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader, LogOut, Plus, Users } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import useToggleThread from "@/hooks/create-thread-hook";
import useTogglePost from "@/hooks/create-post-hook";

const UserButton = () => {
  const router = useRouter();
  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();
  const threadOn = useToggleThread((state) => state.setOn);
  const postOn = useTogglePost((state) => state.setOn);
  // console.log("USER", data?.image);
  if (isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }
  if (!data) {
    return null;
  }

  const { name, image } = data;
  const avatarFallback = name!.charAt(0).toUpperCase();

  // const router = useRouter();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-[45px] hover:opacity-75 transition">
          <AvatarImage alt={name} src={image} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-52 bg-black text-white *:p-3 border-none overflow-hidden"
        align="end"
        sideOffset={5}
      >
        <div className="cursor-pointer text-lg flex items-center group ">
          <div
            className="items-center grid grid-cols-5 w-full h-full"
            onClick={() => router.push(`/profile/${data._id}/posts`)}
          >
            <div className="flex items-center h-full w-full justify-center col-span-1 -translate-x-2">
              <Avatar className="size-[40px] hover:opacity-75 transition">
                <AvatarImage alt={name} src={image} />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col w-full col-span-4 ">
              <p className="text-base font-semibold text-gray-300  truncate group-hover:text-white transition">
                View profile
              </p>
              <p className="text-xs text-gray-400 truncate">r/{name}</p>
            </div>
          </div>
        </div>

        <div
          className="cursor-pointer text-base  items-center text-gray-300 grid grid-cols-5 hover:text-white transition group"
          onClick={threadOn}
        >
          <Users className="size-5 col-span-1" />
          <span className="col-span-4">Create Thread</span>
        </div>

        <div
          className="cursor-pointer text-base grid grid-cols-5 items-center text-gray-300 hover:text-white transition group"
          onClick={postOn}
        >
          <Plus className="size-5 col-span-1" />
          <span className="col-span-4">Create Post</span>
        </div>
        <div
          className="cursor-pointer text-base grid grid-cols-5  items-center text-gray-300 hover:text-white transition group"
          onClick={() => {
            signOut();
          }}
        >
          <LogOut className="size-5 col-span-1" />
          <span className="col-span-4">Log out</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
