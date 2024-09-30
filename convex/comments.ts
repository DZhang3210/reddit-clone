import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { auth } from "./auth";

export const create = mutation({
  args: {
    content: v.string(),
    postId: v.id("posts"),
    authorId: v.id("users"),
    parentCommentId: v.optional(v.union(v.id("comments"), v.null())),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new Error("Post not found");
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const comment = await ctx.db.insert("comments", {
      content: args.content,
      postId: args.postId,
      authorId: userId,
      parentCommentId: args.parentCommentId ?? null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      likes: 0,
      replies: [],
    });
    return comment;
  },
});
