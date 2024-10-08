"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

  const { name, image, email } = data;
  const avatarFallback = name!.charAt(0).toUpperCase();

  // const router = useRouter();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-[70px] hover:opacity-75 transition">
          <AvatarImage alt={name} src={image} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-black text-white *:p-6">
        <DropdownMenuItem
          className="cursor-pointer text-lg flex items-center group hover:bg-white"
          asChild
        >
          <div
            className="flex items-center space-x-4"
            onClick={() => router.push(`/profile/${data._id}/overview`)}
          >
            <Avatar className="size-[50px] hover:opacity-75 transition">
              <AvatarImage alt={name} src={image} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-lg font-bold text-gray-100 group-hover:text-black transition">
                {name}
              </p>
              <p className="text-sm text-gray-400">{email}</p>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer text-xl flex items-center"
          asChild
        >
          <div
            // href="/create/thread"
            onClick={threadOn}
            className="flex"
          >
            <Users className="size-8 mr-2" />
            Create Thread
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer text-xl flex items-center"
          asChild
        >
          <div
            onClick={postOn}
            // href="/create/post"
            className="flex"
          >
            <Plus className="size-8 mr-2" />
            Create Post
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-xl flex items-center"
          onClick={() => {
            signOut();
          }}
        >
          <LogOut className="size-8 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
