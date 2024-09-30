"use client";

import AloneRedditComment from "@/components/alone-reddit-comment";
import RedditComment from "@/components/reddit-comment";
import { useGetUserComments } from "@/features/profile/api/use-get-user-comments";
import React from "react";

const CommentsProfile = () => {
  const { data: comments, isLoading } = useGetUserComments();
  if (!comments || isLoading) return <div>Loading...</div>;
  console.log(comments);
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id}>
          <AloneRedditComment comment={comment} />
        </div>
      ))}
    </div>
  );
};

export default CommentsProfile;
