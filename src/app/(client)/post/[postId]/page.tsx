"use client";

import { useGetPost } from "@/features/posts/api/use-get-post";
import React, { MouseEvent, useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useCreateComment } from "@/features/comments/api/use-create-comment";
import { toast } from "sonner";
import CommentEditor from "@/components/text-editor/comment-editor";
import { useGetCommentsByPostId } from "@/features/comments/api/use-get-comments";
import CommentChain from "@/components/comment-chain";
import { Calendar, Cat, Shell } from "lucide-react";
import PostCard from "@/components/post-card";
import PostCardGhost from "@/components/skeletons/post-card-ghost";
import AccordianItem from "@/components/accordian-item";
import { threadQandA } from "@/lib/thread-qanda";
import Link from "next/link";
import { useToggleFollow } from "@/features/threads/api/use-toggle-follow";
import { formatDistanceToNow } from "date-fns";

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
  const { mutate: toggleFollow } = useToggleFollow();
  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFollow({ threadId: post?.thread._id as Id<"threads"> });
  };
  const [content, setContent] = useState("");
  const [editor, setEditor] = useState("");

  if (isLoading || !post || !comments)
    return (
      <div className="flex flex-col items-center gap-4 mt-4 mx-4">
        <PostCardGhost />
      </div>
    );
  if (!post.thread || !post.user) return null;

  const thread = post?.thread;
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
    <div className="flex justify-center items-center w-full">
      <div className="grid grid-cols-8 gap-2 mx-auto w-screen max-w-5xl mt-10">
        <div className="col-span-8 md:col-span-5">
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
              <div className="text-base text-gray-600 capitalize flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 rounded-full bg-gray-400/10 p-4">
                  <Cat className="w-12 h-12" />
                </div>
                I&apos;m empty
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:block col-span-3 w-full border h-full bg-gray-900/50 rounded-xl px-6 py-4 row-span-4 border-none">
          <div className="flex justify-between items-center gap-4 mb-2">
            <Link href={`/thread/${thread?._id}`}>
              <h1 className="text-xl font-bold">r/{thread?.title}</h1>
            </Link>
            {thread.isFollowing ? (
              <button
                className="py-1 px-4 bg-black text-white border-[1px] border-white  rounded-full text-xs hover:bg-gray-600"
                onClick={handleButtonClick}
                disabled={isLoading}
                aria-label="following button"
              >
                Joined
              </button>
            ) : (
              <button
                className="py-1 px-5 bg-blue-600 rounded-full hover:bg-blue-800 text-xs border-[1px] border-transparent"
                onClick={handleButtonClick}
                disabled={isLoading}
                aria-label="follow button"
              >
                Join
              </button>
            )}
          </div>
          <p className="text-base text-gray-300">/r/{thread.title}</p>
          <p className="text-sm text-gray-400">{thread.description}</p>
          <div className="my-5 space-y-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <p className="text-xs text-gray-400">
                Created {formatDistanceToNow(thread.createdAt)} ago
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Shell className="w-4 h-4 text-gray-400" />
              <p className="text-xs text-gray-400">Public</p>
            </div>
          </div>

          <div className="grid grid-cols-3">
            <p className="text-base text-gray-100 flex flex-col">
              <span className="font-bold">{thread.totalMembers}</span>
              <span className="text-gray-400 text-xs"> Members</span>
            </p>
          </div>
          <div className="text-xs text-gray-400/80 mt-4 uppercase">Rules</div>
          <div className="space-y-1">
            {threadQandA.map((item) => (
              <AccordianItem
                key={item.index}
                index={item.index}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
