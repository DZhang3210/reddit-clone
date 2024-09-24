"use client";
import { useGetThreads } from "@/features/threads/api/use-get-threads";
import React from "react";
import RedditThreadBanner from "@/components/thread-banner";
import { Doc, Id } from "../../../../convex/_generated/dataModel";

const ThreadsPage = () => {
  const { results: threads, status, loadMore } = useGetThreads({ name: "" });

  if (status === "LoadingFirstPage" || !threads) {
    return <div>Loading...</div>;
  }

  // type ThreadProps = Doc<"threads"> & {
  //   bannerImage: string;
  //   logoImage: string;
  //   isFollowing: boolean;
  // };
  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <h3 className="text-6xl">Threads</h3>
      <div className="w-full flex justify-center">
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
