"use client";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/features/auth/api/use-current-user";

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
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={user.image || "/placeholder.svg?height=96&width=96"}
            alt="User"
          />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user.name || "User Name"}</h1>
          <p className="text-gray-500">u/{user.name || "user_id"}</p>
        </div>
      </div>

      <Tabs value={currentTab} className="w-full p-1">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="overview" className="px-4 py-3" asChild>
            <Link
              href={`/profile/${profileId}/overview`}
              className={cn(
                "py-2",
                currentTab === "overview"
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-300"
              )}
            >
              Overview
            </Link>
          </TabsTrigger>
          <TabsTrigger value="threads" className="px-4" asChild>
            <Link
              href={`/profile/${profileId}/threads`}
              className={cn(
                "py-2",
                currentTab === "threads"
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-300"
              )}
            >
              Threads
            </Link>
          </TabsTrigger>
          <TabsTrigger value="comments" className="px-4 py-3" asChild>
            <Link
              href={`/profile/${profileId}/comments`}
              className={cn(
                "py-2",
                currentTab === "comments"
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-300"
              )}
            >
              Comments
            </Link>
          </TabsTrigger>
          <TabsTrigger value="posts" className="px-4 py-3" asChild>
            <Link
              href={`/profile/${profileId}/posts`}
              className={cn(
                "py-2",
                currentTab === "posts"
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-300"
              )}
            >
              Posts
            </Link>
          </TabsTrigger>
          <TabsTrigger value="upvoted" className="px-4 py-3" asChild>
            <Link
              href={`/profile/${profileId}/upvoted`}
              className={cn(
                "py-2",
                currentTab === "upvoted"
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-300"
              )}
            >
              Upvoted
            </Link>
          </TabsTrigger>
          <TabsTrigger value="saved" className="px-4" asChild>
            <Link
              href={`/profile/${profileId}/saved`}
              className={cn(
                "py-2",
                currentTab === "saved"
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-300"
              )}
            >
              Saved
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="w-full">{children}</div>
    </div>
  );
}
