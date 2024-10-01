"use client";

import AloneRedditComment from "@/components/alone-reddit-comment";
import RedditComment from "@/components/reddit-comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUserComments } from "@/features/profile/api/use-get-user-comments";
import { useGetUserLikedComments } from "@/features/profile/api/use-get-user-liked-comments";
import React from "react";

const LikedCommentsProfile = () => {
  const { data: comments, isLoading } = useGetUserLikedComments();
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

export default LikedCommentsProfile;
