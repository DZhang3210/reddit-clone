"use client";
import { useGetUserPosts } from "@/features/profile/api/use-get-user-posts";
import React from "react";
// import { Doc, Id } from "../../../../../../convex/_generated/dataModel";
import PostsFeed from "@/components/posts-feed";
import PostsFeedSkeleton from "@/components/skeletons/posts-feed-skeleton";

// type Post = {
//   image: string | null;
//   _id: Id<"posts">;
//   _creationTime: number;
//   title: string;
//   createdAt: number;
//   updatedAt: number;
//   content: string;
//   imageTitle: string;
//   likes: number;
//   user: Doc<"users"> | null;
//   thread: Doc<"threads"> | null;
//   liked: boolean | undefined;
//   saved: boolean | undefined;
// };

const PostsProfile = () => {
  const { data: posts, isLoading: postsLoading } = useGetUserPosts();

  if (postsLoading || !posts) {
    return <PostsFeedSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4">
      <PostsFeed posts={posts} currentFilter="saved" />
    </div>
  );
};

export default PostsProfile;
