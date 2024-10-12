"use client";
import React from "react";
import PostsFeed from "@/components/posts-feed";
import PostsFeedSkeleton from "@/components/skeletons/posts-feed-skeleton";
import { useSearchParams } from "next/navigation";
import { useGetPopularPosts } from "@/features/posts/api/use-get-popular-posts";

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

const PopularPostsPage = () => {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "Best";
  const { results: posts, status, loadMore } = useGetPopularPosts();
  // const posts = await fetchQuery(api.posts.get, {
  //   name: "",
  //   paginationOpts: { numItems: 10, cursor: null },
  // });

  // if (posts.page.length === 0) {
  //   console.log("POSTS", posts.page);
  //   return <div>Loading...</div>;
  // }

  if (status === "LoadingFirstPage") {
    return <PostsFeedSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4 mt-4 mx-4 ">
      <h3 className="text-5xl mt-5 pb-2 font-bold text-black w-full border-b-[2px] border-gray-600 ">
        Popular Posts
      </h3>
      <PostsFeed
        posts={posts}
        currentFilter={currentFilter}
        isLoadingMore={status === "LoadingMore"}
        loadMore={loadMore}
        canLoadMore={status === "CanLoadMore"}
      />
    </div>
  );
};

export default PopularPostsPage;
