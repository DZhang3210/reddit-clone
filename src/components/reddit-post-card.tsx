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

interface RedditPostCardProps {
  username?: string;
  userAvatar?: string;
  subreddit?: string;
  timePosted?: string;
  title?: string;
  content?: string;
  image?: string;
  upvotes?: number;
  comments?: number;
}

export default function RedditPostCard({
  username = "anonymous",
  userAvatar = "/placeholder.svg?height=40&width=40",
  subreddit = "all",
  timePosted = "1 hour ago",
  title = "Default post title",
  content = "This is a default post content. It can be quite long and contain multiple sentences.",
  image = "/placeholder.svg?height=300&width=600",
  upvotes = 0,
  comments = 0,
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
        <Avatar>
          <AvatarImage src={userAvatar} alt={username} />
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">r/{subreddit}</p>
          <p className="text-xs text-muted-foreground">
            Posted by u/{username} • {timePosted}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm mb-4">{content}</p>
        {image && (
          <Image
            src={image}
            alt="Post content"
            width={600}
            height={300}
            layout="responsive"
            className="rounded-md"
          />
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
