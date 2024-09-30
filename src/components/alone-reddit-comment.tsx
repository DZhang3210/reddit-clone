import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ReadOnly from "./text-editor/read-only";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
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
        </CardFooter>
      </Card>
    </>
  );
}
