"use client";

import AloneRedditComment from "@/components/alone-reddit-comment";
import { useGetUserLikedComments } from "@/features/profile/api/use-get-user-liked-comments";
import { Cat } from "lucide-react";
import React from "react";

const LikedCommentsProfile = () => {
  const { data: comments, isLoading } = useGetUserLikedComments();
  if (!comments || isLoading) return <div>Loading...</div>;
  console.log(comments);
  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id}>
            <AloneRedditComment comment={comment} />
          </div>
        ))
      ) : (
        <div className="text-2xl font-bold text-black capitalize flex flex-col items-center">
          No comments found
          <Cat className="w-20 h-20" />
        </div>
      )}
    </div>
  );
};

export default LikedCommentsProfile;
