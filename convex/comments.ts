// import { v } from "convex/values";
// import { mutation, query, QueryCtx } from "./_generated/server";
// import { auth } from "./auth";
// import { Id } from "./_generated/dataModel";
// import { Comment } from "../src/lib/types";

// export const create = mutation({
//   args: {
//     content: v.string(),
//     postId: v.id("posts"),
//     authorId: v.id("users"),
//     parentCommentId: v.optional(v.union(v.id("comments"), v.null())),
//   },
//   handler: async (ctx, args) => {
//     const userId = await auth.getUserId(ctx);
//     if (!userId) {
//       throw new Error("Unauthorized");
//     }
//     const post = await ctx.db.get(args.postId);
//     if (!post) {
//       throw new Error("Post not found");
//     }
//     const user = await ctx.db.get(userId);
//     if (!user) {
//       throw new Error("User not found");
//     }
//     const commentId = await ctx.db.insert("comments", {
//       content: args.content,
//       postId: args.postId,
//       authorId: userId,
//       parentCommentId: args.parentCommentId ?? null,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       likes: 0,
//       replies: [],
//     });

//     if (args.parentCommentId) {
//       const parentComment = await ctx.db.get(args.parentCommentId);
//       if (!parentComment) {
//         throw new Error("Parent comment not found");
//       }
//       await ctx.db.patch(args.parentCommentId, {
//         replies: [...parentComment.replies, commentId],
//       });
//     }

//     if (!user.comments) {
//       await ctx.db.patch(userId, {
//         comments: [commentId],
//       });
//     } else {
//       await ctx.db.patch(userId, {
//         comments: [...user.comments, commentId],
//       });
//     }

//     return commentId;
//   },
// });

// const getReplyByCommentId = async (
//   ctx: QueryCtx,
//   commentId: Id<"comments">
// ): Promise<Comment | null> => {
//   const userId = await auth.getUserId(ctx);
//   if (!userId) {
//     return null;
//   }
//   const user = await ctx.db.get(userId);
//   if (!user) {
//     return null;
//   }
//   const currentComment = await ctx.db.get(commentId);
//   if (!currentComment) {
//     return null;
//   }

//   const currentAuthor = await ctx.db.get(currentComment.authorId);
//   if (!currentAuthor) {
//     return null;
//   }

//   console.log(currentComment.replies);
//   const replies: Comment[] = (
//     await Promise.all(
//       currentComment.replies.map(async (replyId: Id<"comments">) => {
//         const reply: Comment | null = await getReplyByCommentId(ctx, replyId);
//         if (!reply) {
//           return null;
//         }
//         return reply;
//       })
//     )
//   ).filter((reply) => reply !== null);

//   return {
//     ...currentComment,
//     author: currentAuthor,
//     isLiked: user.likedComments?.includes(currentComment._id) ?? false,
//     replies: replies as (Id<"comments"> & Comment)[],
//   };
// };

// export const getCommentsByPostId = query({
//   args: {
//     postId: v.id("posts"),
//   },
//   handler: async (ctx, args) => {
//     const userId = await auth.getUserId(ctx);
//     if (!userId) {
//       return [];
//     }
//     // Fetch all comments for the post
//     const allComments = await ctx.db
//       .query("comments")
//       .withIndex("post_id_parent_id", (q) =>
//         q.eq("postId", args.postId).eq("parentCommentId", null)
//       )
//       .collect();

//     const populatedComments = (
//       await Promise.all(
//         allComments.map((comment) => {
//           return getReplyByCommentId(ctx, comment._id);
//         })
//       )
//     ).filter((comment) => comment !== null);

//     return populatedComments;
//   },
// });

// export const likeComment = mutation({
//   args: {
//     commentId: v.id("comments"),
//   },
//   handler: async (ctx, args) => {
//     const userId = await auth.getUserId(ctx);
//     if (!userId) {
//       throw new Error("Unauthorized");
//     }

//     const [user, comment] = await Promise.all([
//       ctx.db.get(userId),
//       ctx.db.get(args.commentId),
//     ]);

//     if (!comment) {
//       throw new Error("Comment not found");
//     }
//     if (!user) {
//       throw new Error("User not found");
//     }

//     if (!user.likedComments) {
//       user.likedComments = [comment._id];
//       await ctx.db.patch(comment._id, {
//         likes: comment.likes + 1,
//       });
//       await ctx.db.patch(userId, {
//         likedComments: user.likedComments,
//       });
//     } else {
//       if (!user.likedComments.includes(comment._id)) {
//         user.likedComments = [...user.likedComments, comment._id];
//         await ctx.db.patch(comment._id, {
//           likes: comment.likes + 1,
//         });
//       } else {
//         user.likedComments = user.likedComments.filter(
//           (id) => id !== comment._id
//         );
//         await ctx.db.patch(comment._id, {
//           likes: comment.likes - 1,
//         });
//       }
//       await ctx.db.patch(userId, {
//         likedComments: user.likedComments,
//       });
//     }
//     return comment._id;
//   },
// });
