"use client";
import React from "react";
import PostsFeed from "@/components/posts-feed";
import PostsFeedSkeleton from "@/components/skeletons/posts-feed-skeleton";
import { useGetPopularPosts } from "@/features/posts/api/use-get-popular-posts";
import RecentPostCard from "@/components/recent-post-card";

const PopularPostsPage = () => {
  const { results: posts, status, loadMore } = useGetPopularPosts();

  if (status === "LoadingFirstPage") {
    return <PostsFeedSkeleton />;
  }

  return (
    <>
      {/* <h1 className="text-5xl mt-5 pb-2 font-bold text-black w-full border-b-[2px] border-gray-600 ">
        Home Feed
      </h1> */}
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-8 gap-2 mx-auto w-screen max-w-5xl mt-10">
          <div className="col-span-6">
            <PostsFeed
              posts={posts}
              isLoadingMore={status === "LoadingMore"}
              loadMore={loadMore}
              canLoadMore={status === "CanLoadMore"}
            />
          </div>
          <div className="col-span-2 w-full bg-black">
            <div className="flex justify-between items-center gap-4 px-6 py-4">
              <h1 className="text-xs font-bold uppercase text-gray-400/80">
                Recent Posts
              </h1>
              <button className="text-xs text-blue-500">Clear</button>
            </div>
            <div className="flex flex-col gap-6 px-6">
              {posts.map((post) => (
                <RecentPostCard post={post} key={post._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularPostsPage;
