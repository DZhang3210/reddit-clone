"use client";

import SoloComment from "@/components/solo-comment";
import { useGetUserComments } from "@/features/profile/api/use-get-user-comments";
import { Cat } from "lucide-react";
import React from "react";

const CommentsProfile = () => {
  const { data: comments, isLoading } = useGetUserComments();
  if (!comments || isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-4">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id}>
            <SoloComment comment={comment} />
          </div>
        ))
      ) : (
        <div className="text-base text-gray-600 capitalize flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 rounded-full bg-gray-400/10 p-4">
            <Cat className="w-12 h-12" />
          </div>
          I&apos;m empty
        </div>
      )}
    </div>
  );
};

export default CommentsProfile;
