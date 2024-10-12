import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Flag,
  ArrowUpIcon,
  ArrowDownIcon,
  MessageSquare,
  Share2,
} from "lucide-react";

interface RedditPostThumbnailProps {
  // thread_id: string;
  thread_name?: string;
  thread_image?: string;
  title?: string;
  thumbnail_image?: string;
  likes?: number;
  comments?: number;
}

export default function RedditPostThumbnail({
  // thread_id,
  thread_name = "defaultsubreddit",
  thread_image = "/placeholder.svg?height=24&width=24",
  title = "Default post title that might be quite long and need truncation after two lines",
  thumbnail_image = "/placeholder.svg?height=200&width=400",
  likes = 0,
  comments = 0,
}: RedditPostThumbnailProps) {
  const [joined, setJoined] = useState(false);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [likeCount, setLikeCount] = useState(likes);

  const handleVote = (voteType: "up" | "down") => {
    if (userVote === voteType) {
      setLikeCount(likes);
      setUserVote(null);
    } else {
      setLikeCount(likes + (voteType === "up" ? 1 : -1));
      setUserVote(voteType);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Image
            src={thread_image}
            alt={thread_name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-sm font-medium">r/{thread_name}</span>
        </div>
        <div className="flex items-center space-x-2">
          {!joined ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setJoined(true)}
              className="text-xs"
              aria-label="join button"
            >
              Join
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setJoined(false)}
              className="text-xs"
              aria-label="joined button"
            >
              Joined
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="more options"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Flag className="mr-2 h-4 w-4" />
                <span>Report</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h2>
        <Image
          src={thumbnail_image}
          alt={title}
          width={400}
          height={200}
          layout="responsive"
          className="rounded-md"
        />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 ${userVote === "up" ? "text-orange-500" : ""}`}
            onClick={() => handleVote("up")}
            aria-label="upvote button"
          >
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">{likeCount}</span>
            <ArrowDownIcon
              className={`h-4 w-4 ml-1 ${
                userVote === "down" ? "text-blue-500" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleVote("down");
              }}
              aria-label="downvote button"
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-2"
            aria-label="comments button"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">{comments}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-2"
            aria-label="share button"
          >
            <Share2 className="h-4 w-4 mr-1" />
            <span className="text-xs">Share</span>
          </Button>
        </div>
        <span className="text-xs text-muted-foreground">
          Posted in r/{thread_name}
        </span>
      </CardFooter>
    </Card>
  );
}
