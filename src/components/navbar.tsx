"use client";
import { Button } from "@/components/ui/button";
import { Bell, Plus } from "lucide-react";
import { FaReddit } from "react-icons/fa";
import Link from "next/link";
import UserButton from "@/features/auth/components/user-button";
import useTogglePost from "@/hooks/create-post-hook";
import MobileSidebar from "./mobile-sidebar";
import Search from "./search";

export default function Navbar() {
  const postModal = useTogglePost();
  return (
    <nav className="bg-dark h-[80px] flex items-center justify-between sticky top-0 z-50 px-4 border-b-[1px] border-gray-500">
      <div className="flex items-center space-x-3">
        <div className="flex lg:hidden items-center">
          <MobileSidebar />
        </div>
        <Link href="/" className="hidden md:block">
          <div className="flex items-center space-x-2 text-orange-500">
            {/* Reddit Logo */}
            <FaReddit size={35} />
            <h1 className="text-2xl font-bold text-white hidden md:block">
              reddit
            </h1>
          </div>
        </Link>
      </div>

      <Search />

      {/* Right side buttons */}
      <div className="flex items-center space-x-3">
        <Button
          onClick={() => postModal.setOn()}
          className="items-center bg-transparent text-gray-400 rounded-full hover:text-gray-200 hover:bg-gray-500/20 text-base py-3 px-3 cursor-pointer hidden lg:flex"
          aria-label="Create Post"
        >
          <Plus className="h-6 w-6 mr-1 " />
          Create
        </Button>
        <button
          className="hidden lg:block text-gray-400 hover:text-gray-200"
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6" />
        </button>
        <UserButton />
      </div>
    </nav>
  );
}
