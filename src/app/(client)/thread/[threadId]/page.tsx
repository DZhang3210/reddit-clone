"use client";
import { useGetThread } from "@/features/threads/api/use-get-thread";
import React from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { ThreadBannerSkeleton } from "@/components/skeletons/thread-banner-skeleton";
import PostsFeed from "@/components/posts-feed";
import { useGetPosts } from "@/features/posts/api/use-get-posts";
import ThreadBanner from "@/components/thread-banner";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Shell } from "lucide-react";
import AccordianItem from "@/components/accordian-item";
import { threadQandA } from "@/lib/thread-qanda";
import PostsFeedSkeleton from "@/components/skeletons/posts-feed-skeleton";

interface ThreadPageProps {
  params: {
    threadId: string;
  };
}

const ThreadPage = ({ params: { threadId } }: ThreadPageProps) => {
  const { data: thread, isLoading: threadLoading } = useGetThread({
    id: threadId as Id<"threads">,
  });

  const {
    results: posts,
    status,
    loadMore,
  } = useGetPosts({
    threadId: threadId as Id<"threads">,
  });
  if (threadLoading) {
    return (
      <div className="w-full">
        <ThreadBannerSkeleton />
        <PostsFeedSkeleton />
      </div>
    );
  }
  if (!thread) {
    return <div>Data not found</div>;
  }
  return (
    <div>
      <ThreadBanner
        backgroundImage={thread.bannerImage}
        threadId={thread._id}
        threadImage={thread.logoImage}
        threadDesc={thread.description}
        isFollowing={thread.isFollowing}
        threadName={thread.title}
        bannerColor={thread.bannerColor}
        isAdmin={thread.isAdmin}
      />
      <div className="flex justify-center items-center w-full">
        <div className="grid grid-cols-8 gap-2 mx-auto w-screen max-w-5xl mt-10">
          <div className="col-span-5">
            <PostsFeed
              posts={posts}
              isLoadingMore={status === "LoadingMore"}
              loadMore={loadMore}
              canLoadMore={status === "CanLoadMore"}
            />
          </div>
          <div className="col-span-3 w-full h-full bg-black px-6 py-4 row-span-4">
            <p className="text-lg text-gray-300 font-bold">/r/{thread.title}</p>
            <p className="text-sm text-gray-400">{thread.description}</p>
            <div className="my-5 space-y-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <p className="text-xs text-gray-400">
                  Created {formatDistanceToNow(thread.createdAt)} ago
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Shell className="w-4 h-4 text-gray-400" />
                <p className="text-xs text-gray-400">Public</p>
              </div>
            </div>

            <div className="grid grid-cols-3">
              <p className="text-base text-gray-100 flex flex-col">
                <span className="font-bold">{thread.totalMembers}</span>
                <span className="text-gray-400 text-xs"> Members</span>
              </p>
            </div>
            <div className="text-xs text-gray-400/80 mt-4 uppercase">Rules</div>
            <div className="space-y-1">
              {threadQandA.map((item) => (
                <AccordianItem
                  key={item.index}
                  index={item.index}
                  title={item.title}
                  content={item.content}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;
