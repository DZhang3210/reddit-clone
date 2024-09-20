"use client";
import { useGetPosts } from "@/features/posts/api/use-get-posts";
import React from "react";

const PostsPage = () => {
  const { results: posts, status, loadMore } = useGetPosts({ name: "" });
  console.log("RESULTS", posts);
  return <div></div>;
};

export default PostsPage;
