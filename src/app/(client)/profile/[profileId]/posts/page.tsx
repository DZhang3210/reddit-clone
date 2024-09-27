"use client";
import { useGetUserPosts } from "@/features/profile/api/use-get-user-posts";
import React from "react";
import { Doc, Id } from "../../../../../../convex/_generated/dataModel";
import RedditPostCard from "@/components/reddit-post-card";
import RedditPostCardGhost from "@/components/reddit-post-card-ghost";
import PostsFeed from "@/components/posts-feed";
import PostsFeedSkeleton from "@/components/posts-feed-skeleton";

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

const PostsProfile = () => {
  const { data: posts, isLoading: postsLoading } = useGetUserPosts();

  if (postsLoading || !posts) {
    return <PostsFeedSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4">
      <PostsFeed posts={posts} />
    </div>
  );
};

export default PostsProfile;
