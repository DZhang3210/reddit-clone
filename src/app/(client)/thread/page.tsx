"use client";
import { useGetThreads } from "@/features/threads/api/use-get-threads";
import React from "react";
import RedditThreadBanner from "@/components/thread-banner";
import { ThreadBannerSkeleton } from "@/components/skeletons/thread-banner-skeleton";

const ThreadsPage = () => {
  const { results: threads, status, loadMore } = useGetThreads({ name: "" });

  if (status === "LoadingFirstPage" || !threads) {
    return (
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-full grid grid-cols-2 gap-4 px-6">
          <ThreadBannerSkeleton />
          <ThreadBannerSkeleton />
          <ThreadBannerSkeleton />
          <ThreadBannerSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <h3 className="text-5xl mt-5 mx-5 pb-2 font-bold text-black w-full border-b-[2px] border-gray-600">
        Explore Threads
      </h3>
      <div className="ml-8 my-5 font-semibold text-gray-700 text-2xl">
        Recommended for you
      </div>
      <div className="w-full grid grid-cols-5 gap-4 px-12">
        {threads?.map((thread: any) => (
          <RedditThreadBanner
            key={thread._id}
            threadId={thread._id}
            backgroundImage={thread.bannerImage}
            threadImage={thread.logoImage}
            threadName={thread.title}
            threadDesc={thread.description}
            memberCount={thread.totalMembers}
            isFollowing={thread.isFollowing}
          />
        ))}
      </div>
    </div>
  );
};

export default ThreadsPage;
