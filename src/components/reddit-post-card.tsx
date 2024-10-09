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
import useToggleSharePost from "@/hooks/share-post-hook";
import { useRemovePost } from "@/features/posts/api/use-remove-post";
import useTogglePost from "@/hooks/create-post-hook";
import { useConfirm } from "@/hooks/use-confirm";
import useFocusImage from "@/hooks/focus-image-hook";

interface RedditPostCardProps {
  username: string;
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
  threadImage: string;
  isAdmin?: boolean;
  isOwner?: boolean;
}

export default function RedditPostCard({
  username,
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
  threadImage,
  isAdmin,
  isOwner,
}: RedditPostCardProps) {
  const { mutate: likePost, isPending: isLikePending } = useLikePost();
  const { mutate: savePost, isPending: isSavePending } = useSavePost();
  const sharePostModal = useToggleSharePost();
  const editPost = useTogglePost();
  const { mutate: removePost, isPending: isRemovePending } = useRemovePost();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This will permanently remove the post."
  );
  const focusImage = useFocusImage();

  const handleFocusImage = () => {
    if (image) {
      focusImage.setImageLink(image);
    }
  };
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
  const handleRemove = async () => {
    const ok = await confirm();
    if (!ok) return;

    removePost(
      { postId },
      {
        onSuccess: () => {
          toast.success("Post Removed");
        },
        onError: () => {
          toast.error("Error removing post");
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
  const handleEdit = () => {
    editPost.setMany({
      isOn: true,
      editMode: true,
      id: postId as string,
      title,
      content,
      threadId,
      image,
    });
  };

  return (
    <>
      <ConfirmDialog />
      <Card className="w-full max-w-3xl rounded-sm border-0 border-l-8 border-gray-600 hover:bg-gray-100 transition">
        <CardHeader className="flex flex-row items-center space-x-4 p-2">
          <Link href={`/thread/${threadId}`}>
            <Avatar className="size-[50px] transition-all duration-300 hover:scale-110">
              <AvatarImage src={threadImage} alt={subreddit} sizes="" />
              <AvatarFallback>{subreddit[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex w-full justify-between items-center">
            <div>
              <Link href={`/thread/${threadId}`}>
                <p className="text-lg font-medium hover:underline cursor-pointer">
                  r/{subreddit}
                </p>
              </Link>
              <Link href={`/profile/${userId}/overview`}>
                <p className="text-base text-muted-foreground hover:underline cursor-pointer">
                  Posted by u/{username} • {format(timePosted, "MMM d, yyyy")}
                </p>
              </Link>
            </div>
            <div className="flex gap-2 flex-col">
              {isOwner && (
                <Button
                  variant="outline"
                  size="sm"
                  className="px-4 py-3 border-2 border-gray-400 rounded-full hover:bg-gray-200 transition"
                  onClick={handleEdit}
                  disabled={isRemovePending}
                >
                  Edit
                </Button>
              )}
              {(isAdmin || isOwner) && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="px-4 py-3 border-2 border-gray-400 rounded-full hover:bg-gray-200 transition"
                  onClick={handleRemove}
                  disabled={isRemovePending}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-2">
          <Link href={`/post/${postId}`}>
            <h2 className="text-2xl font-bold mb-2 hover:underline">{title}</h2>
          </Link>

          {image && (
            <button
              className="w-full aspect-square relative overflow-hidden rounded-md border-2 border-black mb-2"
              onClick={handleFocusImage}
            >
              <Image
                src={image}
                alt="Post content"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                priority
                className="rounded-md"
              />
            </button>
          )}
          <div className="mb-4">
            <ReadOnly content={content} />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="z-10">
              <Button
                variant="ghost"
                size="sm"
                className={`px-2 border-2 py-2 border-gray-400 rounded-full hover:bg-gray-200 transition ${
                  liked ? "text-orange-500" : ""
                }`}
                onClick={handleVote}
                disabled={isLikePending}
              >
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                <span className="text-lg font-medium">{upvotes}</span>
              </Button>
            </div>
            <Link href={`/post/${postId}`} className="z-10">
              <Button
                variant="ghost"
                size="sm"
                className="px-2 py-2 border-2 border-gray-400 rounded-full hover:bg-gray-200 transition"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                <span className="text-lg flex gap-1">
                  {comments}
                  <span className="hidden md:block">
                    {comments === 1 ? "Comment" : "Comments"}
                  </span>
                </span>
              </Button>
            </Link>
            <div className="z-10">
              <Button
                variant="ghost"
                size="sm"
                className="px-2 py-2 border-2 border-gray-400 rounded-full hover:bg-gray-200 transition"
                onClick={() => sharePostModal.setPostLink(postId.toString())}
              >
                <Share2 className="h-5 w-5 mr-0 sm:mr-1 sm:h-4 sm:w-4" />
                <span className="text-lg hidden md:block">Share</span>
              </Button>
            </div>
            <div className="z-10">
              <Button
                variant="ghost"
                size="sm"
                className={`px-2 py-2 border-2 border-gray-400 rounded-full hover:bg-gray-200 transition flex items-center justify-center ${
                  saved ? "text-orange-500" : ""
                }`}
                onClick={handleSave}
                disabled={isSavePending}
              >
                <BookmarkIcon
                  className={`h-5 w-5 mr-0 sm:mr-1 sm:h-4 sm:w-4 ${saved ? "fill-orange-500" : ""}`}
                />
                <span className="text-lg hidden md:block">
                  {saved ? "Saved" : "Save"}
                </span>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
