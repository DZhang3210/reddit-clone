"use client";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { cn } from "@/lib/utils";
import useFocusImage from "@/hooks/focus-image-hook";
import { useGetUserStats } from "@/features/profile/api/use-get-user-stats";
import PostsFeedSkeleton from "@/components/skeletons/posts-feed-skeleton";
import Image from "next/image";

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
  const focusImage = useFocusImage();
  const focusImageProfile = () => {
    focusImage.setImageLink(user?.image || "");
  };
  const { data: stats, isLoading: statsLoading } = useGetUserStats();

  if (statsLoading || !stats) {
    return <PostsFeedSkeleton />;
  }
  const {
    followingThreadsLength,
    savedPostsLength,
    upvotedPostsLength,
    createdPostsLength,
    commentsLength,
    likedCommentsLength,
  } = stats;

  return (
    <div className="container mx-auto p-4 space-y-6 ">
      <div className="flex justify-center items-center w-full">
        <div className="grid grid-cols-8 gap-2 mx-auto w-screen max-w-5xl mt-10">
          {isLoading ? (
            <ProfileHeaderSkeleton />
          ) : user ? (
            <div className="flex items-center space-x-4 col-span-5">
              <button onClick={focusImageProfile} aria-label="profile image">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={user.image || "/placeholder.svg?height=96&width=96"}
                    alt="User"
                  />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              </button>
              <div>
                <h1 className="text-2xl text-gray-100 font-bold">
                  {user.name || "User Name"}
                </h1>
                <p className="text-gray-200">u/{user.name || "user_id"}</p>
              </div>
            </div>
          ) : (
            <div>Error loading user data</div>
          )}
          <div className="col-span-3 w-full border col-start-7 row-span-6 bg-gray-900/50 rounded-xl border-none">
            <div className="relative w-full h-32 mb-4 overflow-hidden rounded-lg">
              <Image
                src={"/login-background.jpg"}
                alt="Profile banner"
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>

            <div className="flex flex-col gap-4 px-6 py-4">
              <div className="flex justify-between items-center gap-4 col-span-3 font-bold">
                {user?.name}
              </div>
              <div className="grid grid-cols-3 gap-1 mt-4">
                <div className="text-sm font-bold text-gray-100 col-span-3">
                  Threads
                </div>
                <div>
                  <h1 className="text-sm font-bold uppercase text-white">
                    {followingThreadsLength}
                  </h1>
                  <span className="text-xs text-gray-400 ">Following</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-sm font-bold text-gray-100 col-span-3">
                  Posts
                </div>
                <div>
                  <h1 className="text-sm font-bold uppercase text-white">
                    {createdPostsLength}
                  </h1>
                  <span className="text-xs text-gray-400">Created</span>
                </div>
                <div>
                  <h1 className="text-sm font-bold uppercase text-white">
                    {upvotedPostsLength}
                  </h1>
                  <span className="text-xs text-gray-400">Upvotes</span>
                </div>
                <div>
                  <h1 className="text-sm font-bold uppercase text-white">
                    {savedPostsLength}
                  </h1>
                  <span className="text-xs text-gray-400">Saved</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-sm font-bold text-gray-100 col-span-3">
                  Comments
                </div>
                <div>
                  <h1 className="text-sm font-bold uppercase text-white">
                    {commentsLength}
                  </h1>
                  <span className="text-xs text-gray-400">Created</span>
                </div>
                <div>
                  <h1 className="text-sm font-bold uppercase text-white">
                    {likedCommentsLength}
                  </h1>
                  <span className="text-xs text-gray-400">Liked</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-x-4 w-full col-span-6 my-8">
            {["upvoted", "comments", "posts", "saved", "liked-comments"].map(
              (tab) => (
                <Link key={tab} href={`/profile/${profileId}/${tab}`}>
                  <div
                    className={cn(
                      "text-xl font-bold text-gray-400 capitalize inline-block border-b-4 border-transparent",
                      tab === currentTab && "text-blue-500 border-blue-500"
                    )}
                  >
                    {tab}
                  </div>
                </Link>
              )
            )}
          </div>
          <div className="w-full flex items-center justify-center col-span-6">
            <div className="max-w-3xl w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
