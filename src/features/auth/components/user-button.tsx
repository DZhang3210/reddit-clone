"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Loader, LogOut, Users } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const UserButton = () => {
  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();
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
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage alt={name} src={image} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black text-white">
        <DropdownMenuItem
          className="cursor-pointer text-lg flex items-center"
          onClick={() => {
            signOut();
          }}
        >
          <LogOut className="size-6 mr-2" />
          Log out
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-lg flex items-center"
          asChild
        >
          <Link href="/create/thread" className="flex">
            <Users className="size-6 mr-2" />
            Create Thread
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-lg flex items-center"
          asChild
        >
          <Link href={`/profile/${data._id}/overview`} className="flex">
            <Bell className="size-6 mr-2" />
            User Profile
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
