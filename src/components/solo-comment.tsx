import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ReadOnly from "./text-editor/read-only";
import Link from "next/link";
import { toast } from "sonner";
import { useLikeComment } from "@/features/comments/api/use-like-comment";
import { Doc } from "../../convex/_generated/dataModel";
import { ArrowUpIcon } from "lucide-react";

interface SoloCommentProps {
  comment: Doc<"comments"> & {
    author: Doc<"users">;
    post: Doc<"posts">;
    thread: Doc<"threads">;
    isLiked: boolean;
    image: string | null;
  };
}

export default function SoloComment({ comment }: SoloCommentProps) {
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
      <Card className="shadow-none border-0 border-l-4 border-l-black rounded-none bg-black">
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
                    className="text-sm font-bold text-gray-200 hover:underline"
                    href={`/thread/${comment.thread._id}`}
                  >
                    r/{comment.thread?.title}
                  </Link>
                  <p className="text-sm text-gray-400">
                    <Link
                      href={`/profile/${comment.authorId}/posts`}
                      className="hover:underline"
                    >
                      u/{comment.author?.name}
                    </Link>{" "}
                    commented on this post
                  </p>
                </div>
              </div>
              <div className="text-gray-200 ml-10">
                <ReadOnly content={comment.content} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-1 flex items-center space-x-4">
          <button
            className={`p-2 text-gray-100 flex items-center gap-0 ${comment.isLiked ? "text-orange-500 hover:text-orange-600" : "hover:text-white"}`}
            onClick={() => handleVote()}
          >
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">{comment.likes}</span>
          </button>
        </CardFooter>
      </Card>
    </>
  );
}
