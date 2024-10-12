import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ReadOnly from "./text-editor/read-only";
import Link from "next/link";
import { toast } from "sonner";
import { useLikeComment } from "@/features/comments/api/use-like-comment";
import { Doc } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import { ArrowUpIcon } from "lucide-react";

interface AloneRedditCommentProps {
  comment: Doc<"comments"> & {
    author: Doc<"users">;
    post: Doc<"posts">;
    thread: Doc<"threads">;
    isLiked: boolean;
    image: string | null;
  };
}

export default function AloneRedditComment({
  comment,
}: AloneRedditCommentProps) {
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

  return (
    <>
      <Card className="shadow-none border-0 border-l-4 border-l-black rounded-none">
        <CardContent className="p-4">
          <div className="flex items-start space-x-1">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Link href={`/thread/${comment.thread._id}`}>
                  <Avatar>
                    <AvatarImage
                      src={comment.image || ""}
                      alt="comment image"
                    />
                    <AvatarFallback>
                      {comment.thread?.title?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col">
                  <Link
                    className="text-sm font-bold text-black hover:underline"
                    href={`/thread/${comment.thread._id}`}
                  >
                    r/{comment.thread?.title}
                  </Link>
                  <p className="text-sm text-gray-500">
                    <Link
                      href={`/profile/${comment.authorId}/overview`}
                      className="hover:underline"
                    >
                      u/{comment.author?.name}
                    </Link>{" "}
                    commented on this post
                  </p>
                </div>
              </div>
              <ReadOnly content={comment.content} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-1 flex items-center space-x-4">
          <Button
            aria-label="vote button"
            variant="ghost"
            size="sm"
            className={`px-2 ${comment.isLiked ? "text-orange-500" : ""}`}
            onClick={() => handleVote()}
          >
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">{comment.likes}</span>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
