"use client";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProfileLayoutProps {
  children: ReactNode;
  params: {
    profileId: string;
  };
  //   params: {
  //     overview: string | null;
  //     upvoted: string | null;
  //     downvoted: string | null;
  //     posts: string | null;
  //     comments: string | null;
  //   };
}

export default function ProfileLayout({
  params: { profileId },
  children,
}: ProfileLayoutProps) {
  const pathname = usePathname();
  const currentTab = pathname.split("/").pop() || "overview";

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">User Name</h1>
          <p className="text-gray-500">u/user_id</p>
        </div>
      </div>

      <Tabs value={currentTab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview" asChild>
            <Link
              href={`/profile/${profileId}/overview`}
              className={
                currentTab === "overview"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              Overview
            </Link>
          </TabsTrigger>
          <TabsTrigger value="comments" asChild>
            <Link
              href={`/profile/${profileId}/comments`}
              className={
                currentTab === "comments"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              Comments
            </Link>
          </TabsTrigger>
          <TabsTrigger value="posts" asChild>
            <Link
              href={`/profile/${profileId}/posts`}
              className={
                currentTab === "posts"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              Posts
            </Link>
          </TabsTrigger>
          <TabsTrigger value="upvoted" asChild>
            <Link
              href={`/profile/${profileId}/upvoted`}
              className={
                currentTab === "upvoted"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              Upvoted
            </Link>
          </TabsTrigger>
          <TabsTrigger value="downvoted" asChild>
            <Link
              href={`/profile/${profileId}/downvoted`}
              className={
                currentTab === "downvoted"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              Downvoted
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="w-full">{children}</div>
    </div>
  );
}
