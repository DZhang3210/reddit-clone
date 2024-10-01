"use client";

import AloneRedditComment from "@/components/alone-reddit-comment";
import { useGetUserComments } from "@/features/profile/api/use-get-user-comments";
import React from "react";

const CommentsProfile = () => {
  const { data: comments, isLoading } = useGetUserComments();
  if (!comments || isLoading) return <div>Loading...</div>;
  console.log(comments);
  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <div key={comment._id}>
          <AloneRedditComment comment={comment} />
        </div>
      ))}
    </div>
  );
};

export default CommentsProfile;
