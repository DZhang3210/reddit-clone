import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ArrowUpIcon,
  MessageSquare,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import ReadOnly from "./text-editor/read-only";
import Link from "next/link";
import CommentEditor from "./text-editor/comment-editor";
import { useCreateComment } from "@/features/comments/api/use-create-comment";
import { Comment } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { useLikeComment } from "@/features/comments/api/use-like-comment";

interface RedditCommentProps {
  comment: Comment;
  editor: string;
  setEditor: (editor: string) => void;
  showComments: boolean;
  setShowComments: (showComments: boolean) => void;
}

export default function RedditComment({
  comment,
  editor,
  setEditor,
  showComments,
  setShowComments,
}: RedditCommentProps) {
  const [replyContent, setReplyContent] = useState("");
  const { mutate: createComment } = useCreateComment();
  const { mutate: likeComment } = useLikeComment();

  const handleVote = () => {
    likeComment(
      { commentId: comment._id },
      {
        onSuccess: () => {
          toast.success("Comment liked successfully");
        },
      }
    );
  };

  const handleSubmit = () => {
    if (replyContent.trim() === "") return;
    createComment(
      {
        content: replyContent,
        postId: comment.postId,
        authorId: comment.author._id,
        parentCommentId: comment._id || null,
      },
      {
        onSuccess: () => {
          setReplyContent("");
          toast.success("Comment created successfully");
        },
      }
    );
  };

  return (
    <>
      <Card className="max-w-sm border-none">
        <CardContent className="p-4">
          <div className="flex items-start space-x-1">
            <Link href={`/profile/${comment.author._id}`}>
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={comment.author.image}
                  alt={comment.author.name}
                />
                <AvatarFallback>
                  {comment.author?.name?.[0].toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>

            <div className="flex-1 ">
              <Link href={`/profile/${comment.author._id}`}>
                <div className="flex items-center space-x-1 hover:underline">
                  <p className="text-sm font-medium ">
                    u/{comment.author.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    • {formatDistanceToNow(comment.createdAt)}
                  </p>
                </div>
              </Link>
              <ReadOnly content={comment.content} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-1 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 ${comment.isLiked ? "text-orange-500" : ""}`}
            onClick={() => handleVote()}
          >
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">{comment.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-2"
            onClick={() => setEditor(editor === comment._id ? "" : comment._id)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">Reply</span>
          </Button>
          <Button variant="ghost" size="sm" className="px-2">
            <Share2 className="h-4 w-4 mr-1" />
            <span className="text-xs">Share</span>
          </Button>
          <Button variant="ghost" size="sm" className="px-2">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          {comment.replies.length > 0 && (
            <span
              className="text-xs text-muted-foreground hover:underline cursor-pointer"
              onClick={() => setShowComments(!showComments)}
            >
              {comment.replies.length} replies
            </span>
          )}
        </CardFooter>
      </Card>
      {editor === comment._id && (
        <CommentEditor
          content={replyContent}
          setContent={setReplyContent}
          onSubmit={() => handleSubmit()}
          onCancel={() => setEditor("")}
        />
      )}
    </>
  );
}
