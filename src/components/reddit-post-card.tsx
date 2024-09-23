import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  MessageSquare,
  Share2,
  BookmarkIcon,
} from "lucide-react";
import { format } from "date-fns";
import ReadOnly from "./text-editor/read-only";
import Link from "next/link";
import { Id } from "../../convex/_generated/dataModel";

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
}: RedditPostCardProps) {
  const [voteCount, setVoteCount] = useState(upvotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleVote = (voteType: "up" | "down") => {
    if (userVote === voteType) {
      setVoteCount(upvotes);
      setUserVote(null);
    } else {
      setVoteCount(upvotes + (voteType === "up" ? 1 : -1));
      setUserVote(voteType);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center space-x-4 p-4">
        <Link href={`/user/${userId}`}>
          <Avatar>
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
          <Link href={`/user/${userId}`}>
            <p className="text-xs text-muted-foreground hover:underline cursor-pointer">
              Posted by u/{username} • {format(timePosted, "MMM d, yyyy")}
            </p>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm mb-4 tiptap">
          <ReadOnly content={content} />
        </p>
        {image && (
          <div className="w-full aspect-[16/4] relative overflow-hidden rounded-md border-4 border-black">
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
      <CardFooter className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 ${userVote === "up" ? "text-orange-500" : ""}`}
            onClick={() => handleVote("up")}
          >
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">{voteCount}</span>
            <ArrowDownIcon
              className={`h-4 w-4 ml-1 ${
                userVote === "down" ? "text-blue-500" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleVote("down");
              }}
            />
          </Button>
          <Button variant="ghost" size="sm" className="px-2">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">{comments} Comments</span>
          </Button>
          <Button variant="ghost" size="sm" className="px-2">
            <Share2 className="h-4 w-4 mr-1" />
            <span className="text-xs">Share</span>
          </Button>
          <Button variant="ghost" size="sm" className="px-2">
            <BookmarkIcon className="h-4 w-4 mr-1" />
            <span className="text-xs">Save</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
