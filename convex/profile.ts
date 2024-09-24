import { paginationOptsValidator } from "convex/server";
import { query } from "./_generated/server";
import { auth } from "./auth";

export const getUserPosts = query({
  args: {
    // paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return [];
    }

    const user = await ctx.db.get(userId);

    if (!user) {
      return [];
    }

    const authorPosts = await ctx.db
      .query("posts")
      .withIndex("author", (q) => q.eq("author", user._id))
      .collect();

    const finalAuthorPosts = await Promise.all(
      authorPosts.map(async (post) => {
        const thread = await ctx.db
          .query("threads")
          .filter((q) => q.eq(q.field("_id"), post.thread))
          .unique();
        const liked = user?.likedPosts?.includes(post?._id);
        const saved = user?.savedPosts?.includes(post?._id);
        const image = post?.image ? await ctx.storage.getUrl(post?.image) : "";
        return {
          ...post,
          thread,
          liked,
          saved,
          image,
          user: user,
        };
      })
    );

    return finalAuthorPosts;
  },
});

export const getUserSaved = query({
  args: {
    // paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return [];
    }

    const user = await ctx.db.get(userId);

    if (!user) {
      return [];
    }

    const savedPostIds = user.savedPosts;

    if (!savedPostIds) {
      return [];
    }

    const likedPosts = (
      await Promise.all(
        savedPostIds.map(async (postId) => {
          const post = await ctx.db.get(postId);
          if (!post) return null;

          const thread = await ctx.db
            .query("threads")
            .filter((q) => q.eq(q.field("_id"), post.thread))
            .unique();
          const liked = user?.likedPosts?.includes(post?._id);
          const saved = user?.savedPosts?.includes(post?._id);
          const image = post?.image
            ? await ctx.storage.getUrl(post?.image)
            : "";
          return {
            ...post,
            liked,
            saved,
            image: image,
            user: user,
            thread: thread,
          };
        })
      )
    ).filter((post) => post !== null);

    return likedPosts;
  },
});

export const getUserUpvoted = query({
  args: {
    // paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return [];
    }

    const user = await ctx.db.get(userId);

    if (!user) {
      return [];
    }

    const savedPostIds = user.likedPosts;

    if (!savedPostIds) {
      return [];
    }

    const likedPosts = (
      await Promise.all(
        savedPostIds.map(async (postId) => {
          const post = await ctx.db.get(postId);
          if (!post) return null;

          const thread = await ctx.db
            .query("threads")
            .filter((q) => q.eq(q.field("_id"), post.thread))
            .unique();
          const liked = user?.likedPosts?.includes(post?._id);
          const saved = user?.savedPosts?.includes(post?._id);
          const image = post?.image
            ? await ctx.storage.getUrl(post?.image)
            : "";
          return {
            ...post,
            liked,
            saved,
            image: image,
            user: user,
            thread: thread,
          };
        })
      )
    ).filter((post) => post !== null);

    return likedPosts;
  },
});
