"use client";

import { useGetPost } from "@/features/posts/api/use-get-post";
import React, { useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useCreateComment } from "@/features/comments/api/use-create-comment";
import { toast } from "sonner";
import CommentEditor from "@/components/text-editor/comment-editor";
import { useGetCommentsByPostId } from "@/features/comments/api/use-get-comments";
import CommentChain from "@/components/comment-chain";
import { Cat } from "lucide-react";
import PostCard from "@/components/post-card";
import PostCardGhost from "@/components/skeletons/post-card-ghost";

interface PostPageProps {
  params: {
    postId: string;
  };
}

const PostPage = ({ params: { postId } }: PostPageProps) => {
  const { data: post, isLoading } = useGetPost({ id: postId as Id<"posts"> });
  const { data: comments } = useGetCommentsByPostId({
    postId: postId as Id<"posts">,
  });
  const { mutate: createComment } = useCreateComment();
  const [content, setContent] = useState("");
  const [editor, setEditor] = useState("");

  if (isLoading || !post || !comments)
    return (
      <div className="flex flex-col items-center gap-4 mt-4 mx-4">
        <PostCardGhost />
      </div>
    );
  if (!post.thread || !post.user) return null;

  const handleSubmit = (parentCommentId?: Id<"comments"> | null) => {
    if (content.trim() === "") return;
    // console.log("submit content", JSON.stringify(content));
    createComment(
      {
        content,
        postId: post._id,
        authorId: post.user._id,
        parentCommentId: parentCommentId || null,
      },
      {
        onSuccess: () => {
          setContent("");
          setEditor("");
          toast.success("Comment created successfully");
        },
        onError: (error) => {
          toast.error("Error creating comment");
          console.error(error);
        },
      }
    );
  };

  const handleCancel = () => {
    setContent("");
    setEditor("");
  };

  return (
    <div className="flex flex-col items-center mt-4 gap-2 mb-20 w-full">
      <div className="w-full max-w-3xl p-8">
        <PostCard
          key={post._id}
          username={post.user?.name || "anonymous"}
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
          comments={post.numComments || 0}
          threadImage={post.thread.image || ""}
          isAdmin={post.isAdmin}
          isOwner={post.isCreator}
        />
        <div className="w-full">
          <CommentEditor
            content={content}
            setContent={setContent}
            onSubmit={() => handleSubmit()}
            onCancel={handleCancel}
            mainEditor={true}
          />
        </div>

        <div className="w-full mt-4">
          {comments.length > 0 ? (
            <CommentChain
              comments={comments}
              editor={editor}
              setEditor={setEditor}
            />
          ) : (
            <div className="text-2xl font-bold text-black capitalize flex flex-col items-center">
              No comments found
              <Cat className="w-20 h-20" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
