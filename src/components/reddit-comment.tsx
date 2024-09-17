import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  MessageSquare,
  Gift,
  Share2,
  MoreHorizontal,
} from "lucide-react";

interface RedditCommentProps {
  username?: string;
  userAvatar?: string;
  timePosted?: string;
  content?: string;
  upvotes?: number;
  replies?: number;
}

export default function RedditComment({
  username = "anonymous",
  userAvatar = "/placeholder.svg?height=32&width=32",
  timePosted = "30 minutes ago",
  content = "This is a default comment. It can contain multiple sentences and express an opinion or add to the discussion.",
  upvotes = 1,
  replies = 0,
}: RedditCommentProps) {
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
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={userAvatar} alt={username} />
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">u/{username}</p>
              <p className="text-xs text-muted-foreground">• {timePosted}</p>
            </div>
            <p className="text-sm mt-1">{content}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-2 flex items-center space-x-4">
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
          <span className="text-xs">Reply</span>
        </Button>
        <Button variant="ghost" size="sm" className="px-2">
          <Gift className="h-4 w-4 mr-1" />
          <span className="text-xs">Give Award</span>
        </Button>
        <Button variant="ghost" size="sm" className="px-2">
          <Share2 className="h-4 w-4 mr-1" />
          <span className="text-xs">Share</span>
        </Button>
        <Button variant="ghost" size="sm" className="px-2">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
        {replies > 0 && (
          <span className="text-xs text-muted-foreground">
            {replies} replies
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
