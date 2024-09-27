"use client";
import RedditPostCard from "@/components/reddit-post-card";
import { useGetPosts } from "@/features/posts/api/use-get-posts";
import React from "react";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import RedditPostCardGhost from "@/components/reddit-post-card-ghost";
import { Skeleton } from "@/components/ui/skeleton";
import PostsFeed from "@/components/posts-feed";

type Post = {
  image: string | null;
  _id: Id<"posts">;
  _creationTime: number;
  title: string;
  createdAt: number;
  updatedAt: number;
  content: string;
  imageTitle: string;
  likes: number;
  user: Doc<"users"> | null;
  thread: Doc<"threads"> | null;
  liked: boolean | undefined;
  saved: boolean | undefined;
};

const PostsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentFilter = searchParams.get("filter") || "Best";

  const { results: posts, status, loadMore } = useGetPosts({ name: "" });

  // const posts = await fetchQuery(api.posts.get, {
  //   name: "",
  //   paginationOpts: { numItems: 10, cursor: null },
  // });

  // if (posts.page.length === 0) {
  //   console.log("POSTS", posts.page);
  //   return <div>Loading...</div>;
  // }
  const handleFilterChange = (filter: string) => {
    router.push(`?filter=${filter}`);
  };

  if (status === "LoadingFirstPage") {
    return (
      <div className="flex flex-col gap-4 mt-4 mx-4 ">
        <div className="max-w-2xl w-full mx-auto text-4xl flex-col justify-center space-y-4 items-center">
          <Skeleton className="w-14 h-5" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <RedditPostCardGhost />
          <RedditPostCardGhost />
          <RedditPostCardGhost />
          <RedditPostCardGhost />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-4 mx-4 ">
      <PostsFeed posts={posts} />
    </div>
  );
};

export default PostsPage;
