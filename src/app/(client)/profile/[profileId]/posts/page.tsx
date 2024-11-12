"use client";
import React from "react";
// import { Doc, Id } from "../../../../../../convex/_generated/dataModel";
import PostsFeed from "@/components/posts-feed";
import PostsFeedSkeleton from "@/components/skeletons/posts-feed-skeleton";
import { useGetUserPosts } from "@/features/profile/api/use-get-user-posts";

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
  const { results: posts, status, loadMore } = useGetUserPosts();

  if (status === "LoadingFirstPage") {
    return <PostsFeedSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4">
      <PostsFeed
        posts={posts}
        loadMore={loadMore}
        canLoadMore={status === "CanLoadMore"}
        isLoadingMore={status === "LoadingMore"}
      />
    </div>
  );
};

export default PostsProfile;
