import { Button } from "@/components/ui/button";
import { Bell, Plus } from "lucide-react";
import RedditSearch from "./reddit-search";
import { FaReddit } from "react-icons/fa";
import Link from "next/link";
import UserButton from "@/features/auth/components/user-button";

export default function RedditNavbar() {
  return (
    <nav className="bg-gray-900 border-b-4 px-4 py-5 flex items-center justify-between sticky top-0 z-50 border-orange-500">
      <Link href="/">
        <div className="flex items-center space-x-1 text-orange-500">
          {/* Reddit Logo */}
          <FaReddit size={50} />
          <h1 className="text-3xl font-bold text-white">reddit</h1>
        </div>
      </Link>

      <RedditSearch />

      {/* Right side buttons */}
      <div className="flex items-center space-x-8">
        <Link href="/create/post" className="flex items-center">
          <div className="flex items-center bg-gray-800 text-gray-200 rounded-full hover:bg-gray-700 text-2xl py-4 px-3">
            <Plus className="h-8 w-8 mr-1" />
            Create
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-200 hover:bg-gray-800"
        >
          <Bell className="h-8 w-8" />
        </Button>
        <UserButton />
      </div>
    </nav>
  );
}
