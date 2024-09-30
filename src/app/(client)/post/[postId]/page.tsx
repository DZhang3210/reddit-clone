"use client";

import { useGetPost } from "@/features/posts/api/use-get-post";
import React, { useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import RedditPostCard from "@/components/reddit-post-card";
import RedditPostCardGhost from "@/components/skeletons/reddit-post-card-ghost";
import { useCreateComment } from "@/features/comments/api/use-create-comment";
import { toast } from "sonner";
import CommentEditor from "@/components/text-editor/comment-editor";
import { useGetCommentsByPostId } from "@/features/comments/api/use-get-comments";
import CommentChain from "@/components/comment-chain";
import { Button } from "@/components/ui/button";

interface PostPageProps {
  params: {
    postId: string;
  };
}

const PostPage = ({ params: { postId } }: PostPageProps) => {
  // const { data: post, isLoading } = useGetPost({ id: postId as Id<"posts"> });
  // const { data: comments } = useGetCommentsByPostId({
  //   postId: postId as Id<"posts">,
  // });
  // const { mutate: createComment } = useCreateComment();
  // const [content, setContent] = useState("");
  // const [editor, setEditor] = useState("");

  // console.log("COMMENTS");
  // console.log(comments);

  // if (isLoading || !post || !comments)
  //   return (
  //     <div className="flex flex-col items-center gap-4 mt-4 mx-4">
  //       <RedditPostCardGhost />
  //     </div>
  //   );
  // if (!post.thread || !post.user) return null;

  // const handleSubmit = (parentCommentId?: Id<"comments"> | null) => {
  //   if (content.trim() === "") return;
  //   createComment(
  //     {
  //       content,
  //       postId: post._id,
  //       authorId: post.user._id,
  //       parentCommentId: parentCommentId || null,
  //     },
  //     {
  //       onSuccess: () => {
  //         setContent("");
  //         toast.success("Comment created successfully");
  //       },
  //       onError: (error) => {
  //         toast.error("Error creating comment");
  //         console.error(error);
  //       },
  //     }
  //   );
  // };

  return (
    <div className="flex flex-col items-center mx-4 mt-4 gap-2 mb-20">
      {/* <RedditPostCard
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
      {editor === "reply" ? (
        <div className="w-full max-w-2xl">
          <CommentEditor
            content={content}
            setContent={setContent}
            onSubmit={() => handleSubmit()}
            onCancel={() => setEditor("")}
          />
        </div>
      ) : (
        <div onClick={() => setEditor("reply")} className="w-full max-w-2xl">
          <Button className="w-full">Reply</Button>
        </div>
      )}
      <CommentChain comments={comments} editor={editor} setEditor={setEditor} /> */}
    </div>
  );
};

export default PostPage;
