"use client";

import React, { useState } from "react";
import RedditComment from "./reddit-comment";
import { Comment } from "@/lib/types";

type CommentChainProps = {
  comments: Comment[];
  editor: string;
  setEditor: (editor: string) => void;
};

const CommentChain = ({ comments, editor, setEditor }: CommentChainProps) => {
  const [showComments, setShowComments] = useState(true);
  return (
    <div className="flex flex-col space-y-4 ">
      {comments.map((comment) => {
        return (
          <div
            key={comment._id}
            className="border-l-2 border-gray-500 rounded-sm"
          >
            <RedditComment
              key={comment._id}
              comment={comment}
              editor={editor}
              setEditor={setEditor}
              showComments={showComments}
              setShowComments={setShowComments}
            />
            {showComments && (
              <div className="ml-10 my-2">
                {comment.replies.length > 0 && (
                  <CommentChain
                    comments={comment.replies}
                    editor={editor}
                    setEditor={setEditor}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommentChain;
