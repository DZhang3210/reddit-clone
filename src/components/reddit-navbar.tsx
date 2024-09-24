import { Button } from "@/components/ui/button";
import { Bell, Plus } from "lucide-react";
import RedditSearch from "./reddit-search";
import { FaReddit } from "react-icons/fa";
import Link from "next/link";
import UserButton from "@/features/auth/components/user-button";

export default function RedditNavbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
      <Link href="/">
        <div className="flex items-center space-x-1 text-orange-500">
          {/* Reddit Logo */}
          <FaReddit size={40} />
          <h1 className="text-xl font-bold text-white">reddit</h1>
        </div>
      </Link>

      <RedditSearch />

      {/* Right side buttons */}
      <div className="flex items-center space-x-4">
        <Link href="/create/post">
          <Button
            variant="outline"
            className="flex items-center bg-gray-800 text-gray-200 hover:bg-gray-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-200 hover:bg-gray-800"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <UserButton />
      </div>
    </nav>
  );
}
