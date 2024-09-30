"use client";

import { useGetPost } from "@/features/posts/api/use-get-post";
import React, { useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import RedditPostCard from "@/components/reddit-post-card";
import RedditPostCardGhost from "@/components/skeletons/reddit-post-card-ghost";
import CreateComment from "@/components/create-comment";
import { useCreateComment } from "@/features/comments/api/use-create-comment";
import RichTextEditor from "@/components/text-editor/rich-text-editor";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PostPageProps {
  params: {
    postId: string;
  };
}

const PostPage = ({ params: { postId } }: PostPageProps) => {
  const { data: post, isLoading } = useGetPost({ id: postId as Id<"posts"> });
  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateComment();
  const [content, setContent] = useState("");

  if (isLoading || !post)
    return (
      <div className="flex flex-col items-center gap-4 mt-4 mx-4">
        <RedditPostCardGhost />
      </div>
    );
  if (!post.thread || !post.user) return null;

  const handleSubmit = () => {
    if (content.trim() === "") return;
    createComment(
      {
        content,
        postId: post._id,
        authorId: post.user._id,
        parentCommentId: null,
      },
      {
        onSuccess: () => {
          setContent("");
          toast.success("Comment created successfully");
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center mx-4 mt-4 gap-2 mb-20">
      <RedditPostCard
        key={post._id}
        username={post.user?.name || "anonymous"}
        userAvatar={post.user?.image || "/placeholder.svg?height=40&width=40"}
        subreddit={post.thread.title}
        timePosted={post._creationTime || 0}
        title={post.title || ""}
        content={post.content || ""}
        image={post.image || ""}
        upvotes={post.likes || 0}
        threadId={post.thread._id}
        userId={post.user._id}
        postId={post._id || ("" as Id<"posts">)}
        liked={post.liked || false}
        saved={post.saved || false}
      />
      <CreateComment />
      <div className="w-full max-w-2xl">
        <RichTextEditor content={content} setContent={setContent} />
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default PostPage;
