"use client";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProfileLayoutProps {
  children: ReactNode;
  //   params: {
  //     overview: string | null;
  //     upvoted: string | null;
  //     downvoted: string | null;
  //     posts: string | null;
  //     comments: string | null;
  //   };
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
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
          <Link href="/profile/overview" passHref>
            <TabsTrigger value="overview" asChild>
              <a
                className={
                  currentTab === "overview"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                Overview
              </a>
            </TabsTrigger>
          </Link>
          <Link href="/profile/comments" passHref>
            <TabsTrigger value="comments" asChild>
              <a
                className={
                  currentTab === "comments"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                Comments
              </a>
            </TabsTrigger>
          </Link>
          <Link href="/profile/posts" passHref>
            <TabsTrigger value="posts" asChild>
              <a
                className={
                  currentTab === "posts"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                Posts
              </a>
            </TabsTrigger>
          </Link>
          <Link href="/profile/upvoted" passHref>
            <TabsTrigger value="upvoted" asChild>
              <a
                className={
                  currentTab === "upvoted"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                Upvoted
              </a>
            </TabsTrigger>
          </Link>
          <Link href="/profile/downvoted" passHref>
            <TabsTrigger value="downvoted" asChild>
              <a
                className={
                  currentTab === "downvoted"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                Downvoted
              </a>
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>

      {children}
    </div>
  );
}
