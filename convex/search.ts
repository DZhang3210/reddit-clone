import { paginationOptsValidator } from "convex/server";
import { query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

export const searchPosts = query({
  args: {
    query: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return {
        page: [],
        isDone: true,
        continueCursor: "",
      };
    }

    const results = await ctx.db
      .query("posts")
      .withSearchIndex("search", (q) => q.search("title", args.query))
      .paginate(args.paginationOpts);
    const currentUser = await ctx.db.get(userId);
    const page = (
      await Promise.all(
        results.page.map(async (post) => {
          const [user, thread, firstComment] = await Promise.all([
            await ctx.db.get(post?.author),
            await ctx.db.get(post?.thread),
            await ctx.db
              .query("comments")
              .withIndex("postId", (q) => q.eq("postId", post?._id))
              .first(),
          ]);
          if (!thread || !user) {
            return null;
          }
          const threadImage = await ctx.storage.getUrl(thread?.logoImage);
          const liked = currentUser?.likedPosts?.includes(post?._id);
          const saved = currentUser?.savedPosts?.includes(post?._id);
          if (post?.image) {
            return {
              ...post,
              image: await ctx.storage.getUrl(post?.image),
              user: user,
              thread: { ...thread, image: threadImage },
              liked: liked,
              saved: saved,
              firstComment: firstComment,
            };
          } else {
            return {
              ...post,
              image: "",
              user: user,
              thread: { ...thread, image: threadImage },
              liked: liked,
              saved: saved,
              firstComment: firstComment,
            };
          }
        })
      )
    ).filter((res) => res !== null);
    return {
      ...results,
      page,
    };
  },
});

export const searchThreads = query({
  args: { query: v.string(), paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return {
        page: [],
        isDone: true,
        continueCursor: "",
      };
    }

    const results = await ctx.db
      .query("threads")
      .withSearchIndex("search", (q) => q.search("title", args.query))
      .paginate(args.paginationOpts);

    const page = await Promise.all(
      results.page.map(async (thread) => {
        const [bannerImage, logoImage, user] = await Promise.all([
          await ctx.storage.getUrl(thread.bannerImage),
          await ctx.storage.getUrl(thread.logoImage),
          await ctx.db.get(userId),
        ]);
        if (!user)
          return {
            page: [],
            isDone: true,
            continueCursor: null,
          };
        const isFollowing = user?.followingThreads?.includes(thread._id);
        return {
          ...thread,
          bannerImage,
          logoImage,
          isFollowing,
        };
      })
    );
    return {
      ...results,
      page,
    };
  },
});
