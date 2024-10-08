"use client";
import { Button } from "@/components/ui/button";
import { Bell, Plus } from "lucide-react";
import RedditSearch from "./reddit-search";
import { FaReddit } from "react-icons/fa";
import Link from "next/link";
import UserButton from "@/features/auth/components/user-button";
import useTogglePost from "@/hooks/create-post-hook";
import MobileSidebar from "./mobile-sidebar";

export default function RedditNavbar() {
  const postModal = useTogglePost();
  return (
    <nav className="bg-gray-900 border-b-4 h-[120px] flex items-center justify-between sticky top-0 z-50 border-orange-500 px-5">
      <Link href="/" className="hidden md:block">
        <div className="flex items-center space-x-1 text-orange-500">
          {/* Reddit Logo */}
          <FaReddit size={50} />
          <h1 className="text-3xl font-bold text-white hidden md:block">
            reddit
          </h1>
        </div>
      </Link>
      <div className="block md:hidden">
        <MobileSidebar />
      </div>
      <RedditSearch />

      {/* Right side buttons */}
      <div className="flex items-center space-x-8">
        <Button
          onClick={() => postModal.setOn()}
          className="items-center bg-gray-800 text-gray-200 rounded-full hover:bg-gray-700 text-xl py-3 px-3 cursor-pointer hidden lg:flex"
          aria-label="Create Post"
        >
          <Plus className="h-6 w-6 mr-1" />
          Create
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:block text-gray-200 hover:bg-gray-800"
          aria-label="Notifications"
        >
          <Bell className="h-8 w-8" />
        </Button>
        <UserButton />
      </div>
    </nav>
  );
}
