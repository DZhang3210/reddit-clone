import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowUpIcon, MessageSquare, Share2, BookmarkIcon } from "lucide-react";
import { format } from "date-fns";
import ReadOnly from "./text-editor/read-only";
import Link from "next/link";
import { Id } from "../../convex/_generated/dataModel";
import { useLikePost } from "@/features/posts/api/use-like-post";
import { toast } from "sonner";
import { useSavePost } from "@/features/posts/api/use-save-post";

interface RedditPostCardProps {
  username: string;
  userAvatar: string;
  subreddit: string;
  timePosted: number;
  title: string;
  content: string;
  image?: string;
  upvotes: number;
  comments?: number;
  threadId: Id<"threads">;
  userId: Id<"users">;
  postId: Id<"posts">;
  liked: boolean;
  saved: boolean;
}

export default function RedditPostCard({
  username,
  userAvatar,
  subreddit,
  timePosted,
  title,
  content,
  image,
  upvotes,
  comments = 0,
  threadId,
  userId,
  postId,
  liked,
  saved,
}: RedditPostCardProps) {
  const { mutate: likePost, isPending: isLikePending } = useLikePost();
  const { mutate: savePost, isPending: isSavePending } = useSavePost();

  const handleSave = () => {
    savePost(
      { postId },
      {
        onSuccess: () => {
          toast.success("Post Saved");
        },
        onError: () => {
          toast.error("Error saving post");
        },
      }
    );
  };

  const handleVote = () => {
    likePost(
      { postId },
      {
        onSuccess: () => {
          toast.success("Post Liked");
        },
        onError: () => {
          toast.error("Error liking post");
        },
      }
    );
  };

  return (
    <Card className="w-full max-w-2xl border-2 border-gray-400">
      <CardHeader className="flex flex-row items-center space-x-4 p-2">
        <Link href={`/profile/${userId}`}>
          <Avatar className="transition-all duration-300 hover:scale-110">
            <AvatarImage src={userAvatar} alt={username} />
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href={`/thread/${threadId}`}>
            <p className="text-sm font-medium hover:underline cursor-pointer">
              r/{subreddit}
            </p>
          </Link>
          <Link href={`/profile/${userId}/overview`}>
            <p className="text-xs text-muted-foreground hover:underline cursor-pointer">
              Posted by u/{username} • {format(timePosted, "MMM d, yyyy")}
            </p>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <Link href={`/post/${postId}`}>
          <h2 className="text-xl font-bold mb-2 hover:underline">{title}</h2>
        </Link>
        <div className="mb-4">
          <ReadOnly content={content} />
        </div>
        {image && (
          <div className="w-full aspect-[16/4] relative overflow-hidden rounded-md border-4 border-black mb-2">
            <Image
              src={image}
              alt="Post content"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 border-2 border-gray-400 rounded-full ${liked ? "text-orange-500" : ""}`}
            onClick={handleVote}
            disabled={isLikePending}
          >
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">{upvotes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 border-2 border-gray-400 rounded-full"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">{comments} Comments</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 border-2 border-gray-400 rounded-full"
          >
            <Share2 className="h-4 w-4 mr-1" />
            <span className="text-xs">Share</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 border-2 border-gray-400 rounded-full ${saved ? "text-orange-500" : ""}`}
            onClick={handleSave}
            disabled={isSavePending}
          >
            <BookmarkIcon
              className={`h-4 w-4 mr-1 ${saved ? "fill-orange-500" : ""}`}
            />
            <span className="text-xs">{saved ? "Saved" : "Save"}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
