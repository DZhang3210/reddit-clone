"use client";
import RedditThreadBanner from "@/components/thread-banner";
import { useGetThread } from "@/features/threads/api/use-get-thread";
import React from "react";
import { Id } from "../../../../../convex/_generated/dataModel";

interface ThreadPageProps {
  params: {
    threadId: string;
  };
}

const ThreadPage = ({ params: { threadId } }: ThreadPageProps) => {
  const { data: thread, isLoading: threadLoading } = useGetThread({
    id: threadId as Id<"threads">,
  });
  console.log("DATA", thread);
  if (threadLoading) {
    return <div>Loading...</div>;
  }

  if (!thread) {
    return <div>Data not found</div>;
  }
  return (
    <div>
      <RedditThreadBanner
        backgroundImage={thread.bannerImage}
        threadId={thread._id}
        threadImage={thread.logoImage}
        threadDesc={thread.description}
        memberCount={thread.totalMembers}
        isFollowing={thread.isFollowing}
      />
      <div>Thread</div>
    </div>
  );
};
// interface RedditThreadBannerProps {
//   backgroundImage?: string | null;
//   threadId: Id<"threads">;
//   threadImage?: string | null;
//   threadName?: string;
//   threadDesc: string;
//   memberCount?: number;
//   isFollowing?: boolean | null;
// }

export default ThreadPage;
