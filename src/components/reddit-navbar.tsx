import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Plus, Search } from "lucide-react";
import RedditSearch from "./reddit-search";
import { FaReddit } from "react-icons/fa";
import Link from "next/link";
import UserButton from "@/features/auth/components/user-button";

export default function RedditNavbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <Link href="/">
        <div className="flex items-center space-x-1 text-orange-500">
          {/* Reddit Logo */}
          <FaReddit size={40} />
          <h1 className="text-xl font-bold">reddit</h1>
        </div>
      </Link>

      <RedditSearch />

      {/* Right side buttons */}
      <div className="flex items-center space-x-4">
        <Link href="/create">
          <Button variant="outline" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
        </Link>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="@username"
                />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">username</p>
                <p className="text-xs leading-none text-muted-foreground">
                  u/user_id
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href ="/profile/1/overview">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <UserButton />
      </div>
    </nav>
  );
}
