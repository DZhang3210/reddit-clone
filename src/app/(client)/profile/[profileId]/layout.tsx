"use client";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/features/auth/api/use-current-user";

interface ProfileLayoutProps {
  children: ReactNode;
  params: {
    profileId: string;
  };
}

function ProfileHeaderSkeleton() {
  return (
    <div className="flex items-center space-x-4 animate-pulse">
      <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
      <div className="space-y-2">
        <div className="h-8 bg-gray-300 rounded w-48"></div>
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </div>
    </div>
  );
}

export default function ProfileLayout({
  params: { profileId },
  children,
}: ProfileLayoutProps) {
  const pathname = usePathname();
  const currentTab = pathname.split("/").pop() || "overview";
  const { data: user, isLoading } = useCurrentUser();

  return (
    <div className="container mx-auto p-4 space-y-6 ">
      {isLoading ? (
        <ProfileHeaderSkeleton />
      ) : user ? (
        <div className="flex items-center space-x-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={user.image || "/placeholder.svg?height=96&width=96"}
              alt="User"
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl text-gray-800 font-bold">
              {user.name || "User Name"}
            </h1>
            <p className="text-gray-800">u/{user.name || "user_id"}</p>
          </div>
        </div>
      ) : (
        <div>Error loading user data</div>
      )}

      <div className="flex items-center justify-center space-x-4 w-full">
        {["overview", "upvoted", "comments", "posts", "saved"].map((tab) => (
          <Link key={tab} href={`/profile/${profileId}/${tab}`}>
            <div className="text-xl font-bold text-gray-700 capitalize">
              {tab}
            </div>
            {tab === currentTab && <div className="h-1 w-full bg-blue-500" />}
          </Link>
        ))}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
