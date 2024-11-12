"use client";

import React, { useState } from "react";
import Comment from "./comment";
import { Comment as CommentType } from "@/lib/types";

type CommentChainProps = {
  comments: CommentType[];
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
            <Comment
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
