"use client";
import React from "react";
import { useGetUserSaved } from "@/features/profile/api/use-get-user-saved";
import PostsFeed from "@/components/posts-feed";

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

const DownvotedProfile = () => {
  const { results: posts, status, loadMore } = useGetUserSaved();
  if (status === "LoadingFirstPage") return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <PostsFeed
        posts={posts}
        currentFilter="saved"
        isLoadingMore={status === "LoadingMore"}
        loadMore={loadMore}
        canLoadMore={status === "CanLoadMore"}
      />
    </div>
  );
};

export default DownvotedProfile;
