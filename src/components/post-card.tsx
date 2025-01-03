import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ArrowUpIcon,
  MessageSquare,
  Share2,
  BookmarkIcon,
  Pencil,
  Trash,
  Ellipsis,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface PostCardProps {
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
  smaller?: boolean;
}

export default function PostCard({
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
  smaller,
}: PostCardProps) {
  const router = useRouter();
  const { mutate: likePost, isPending: isLikePending } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const sharePostModal = useToggleSharePost();
  const editPost = useTogglePost();
  const { mutate: removePost, isPending: isRemovePending } = useRemovePost();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This will permanently remove the post."
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          toast.success("Save Toggled");
        },
        onError: () => {
          toast.error("Error saving post");
        },
      }
    );
  };
  const handleRemove = async () => {
    setIsDropdownOpen(false);
    const ok = await confirm();
    if (!ok) return;

    removePost(
      { postId },
      {
        onSuccess: () => {
          router.push(`/thread/${threadId}`);
          toast.success("Post Removed");
        },
        onError: (error) => {
          toast.error(`Error removing post: ${error.message}`);
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
    setIsDropdownOpen(false);
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
      <Card className="w-full max-w-3xl rounded-sm border-0  hover:bg-gray-700/10 transition bg-transparent">
        <CardHeader className="flex flex-row items-center space-x-4 p-2 text-white">
          <Link href={`/thread/${threadId}`}>
            <Avatar className="size-[50px] transition-all duration-300 hover:scale-110">
              <AvatarImage src={threadImage} alt={subreddit} sizes="" />
              <AvatarFallback>{subreddit[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex w-full justify-between items-center">
            <div>
              <Link href={`/thread/${threadId}`}>
                <p className="text-sm font-medium  cursor-pointer text-gray-300">
                  <span className="hover:underline">r/{subreddit} </span>
                  <span className="text-gray-400/80 text-sm">
                    &middot; {format(timePosted, "MMM d, yyyy")}
                  </span>
                </p>
              </Link>
              <Link href={`/profile/${userId}/posts`}>
                <p className="text-xs text-gray-400 hover:underline cursor-pointer">
                  Posted by u/{username}
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <div className="z-10">
                {(isOwner || isAdmin) && (
                  <DropdownMenu
                    open={isDropdownOpen}
                    onOpenChange={setIsDropdownOpen}
                  >
                    <DropdownMenuTrigger asChild>
                      <button
                        aria-label="dropdown-trigger"
                        className="p-3 rounded-full hover:bg-gray-400/50 transition text-white"
                      >
                        <Ellipsis className="h-5 w-5 mr-0 sm:h-4 sm:w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      sideOffset={5}
                      className="px-2 *:py-2 w-[130px] bg-black border-none"
                    >
                      {isOwner && (
                        <button
                          onClick={handleEdit}
                          disabled={editPost.isOn}
                          className="hover:text-white transition  cursor-pointer text-sm grid grid-cols-5 w-full h-full items-center text-gray-300 gap-7"
                        >
                          <Pencil className="h-4 w-4 col-span-1" />
                          <span className="flex items-center col-span-4 text-sm">
                            Edit
                          </span>
                        </button>
                      )}
                      {(isAdmin || isOwner) && (
                        <button
                          onClick={handleRemove}
                          disabled={isRemovePending}
                          className="w-full text-left hover:text-white transition py-2 cursor-pointer text-sm  text-gray-300  rounded-md focus:bg-red-70 focus:text-white grid grid-cols-5 h-full items-center gap-7"
                        >
                          <Trash className="h-4 w-4 col-span-1" />
                          <span className="flex items-center col-span-4 text-sm">
                            Delete
                          </span>
                        </button>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-2">
          <Link href={`/post/${postId}`}>
            <h2 className="text-lg font-bold mb-0 hover:underline text-gray-100">
              {title}
            </h2>
          </Link>
          <div className="mb-0">
            <ReadOnly
              content={content}
              className={(smaller && "line-clamp-4") || ""}
            />
          </div>
          {image && (
            <button
              className={cn(
                "w-full relative overflow-hidden rounded-md border-2 border-black mb-2",
                smaller ? "max-h-[300px] aspect-video" : "aspect-square"
              )}
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
        </CardContent>
        <CardFooter className="flex items-center p-0 pl-4">
          <div className="flex items-center space-x-2">
            <div className="z-10">
              <button
                className={`px-2 py-2  rounded-full transition text-gray-200 flex items-center justify-center bg-gray-400/20 hover:bg-gray-400/40${
                  liked ? "text-orange-500" : ""
                }`}
                onClick={handleVote}
                disabled={isLikePending}
                aria-label="upvote button"
              >
                <ArrowUpIcon
                  className={cn(
                    "h-4 w-4 mr-1",
                    liked && "fill-orange-500 text-orange-500"
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium",
                    liked && "text-orange-500"
                  )}
                >
                  {upvotes}
                </span>
              </button>
            </div>
            <Link href={`/post/${postId}`} className="z-10">
              <button
                className="px-2 py-2  rounded-full transition text-gray-200 flex items-center justify-center bg-gray-400/20 hover:bg-gray-400/40"
                aria-label="comment button"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                <span className="text-xs flex gap-1 p-0 m-0">{comments}</span>
              </button>
            </Link>
            <div className="z-10">
              <button
                className="px-2 py-2 rounded-full transition text-gray-200 flex items-center justify-center bg-gray-400/20 hover:bg-gray-400/40"
                onClick={() => sharePostModal.setPostLink(postId.toString())}
                aria-label="share button"
              >
                <Share2 className="h-4 w-4 mr-0 lg:mr-1" />
                <span className="text-xs hidden lg:block">Share</span>
              </button>
            </div>
            <div className="z-10">
              <button
                className={`px-2 py-2 rounded-full transition flex items-center justify-center text-gray-200 bg-gray-400/20 hover:bg-gray-400/40   ${
                  saved ? "text-orange-500" : ""
                }`}
                onClick={handleSave}
                aria-label="save button"
              >
                <BookmarkIcon
                  className={`h-4 w-4 mr-0 lg:mr-1 border-0 ${saved ? "fill-orange-500 text-orange-500" : ""}`}
                />
                <span className="text-xs hidden lg:block">
                  {saved ? "Saved" : "Save"}
                </span>
              </button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
