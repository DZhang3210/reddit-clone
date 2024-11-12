import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GetPostsReturnType } from "@/features/posts/api/use-get-posts";
import Link from "next/link";

// interface RecentPostCardProps {
//   post: Doc<"posts"> & {
//     thread: Doc<"threads"> & { logoImage: string };
//   };
// }

const RecentPostCard = ({ post }: { post: GetPostsReturnType[number] }) => {
  return (
    <div>
      <Link href={`/thread/${post.thread._id}`}>
        <div className="flex items-center gap-1 group">
          <Avatar className="w-7 h-7">
            <AvatarImage src={post?.thread?.image || ""} />
            <AvatarFallback>{post.thread.title}</AvatarFallback>
          </Avatar>
          <div className="text-xs text-gray-400 group-hover:underline">
            r/{post.thread.title}
          </div>
        </div>
      </Link>
      <Link href={`/post/${post._id}`}>
        <div className="text-base mb-2 text-gray-300 hover:underline">
          {post.title}
        </div>
      </Link>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <div>{post.likes} Upvotes</div>
        <div>{post.numComments} Comments</div>
      </div>
    </div>
  );
};

export default RecentPostCard;
