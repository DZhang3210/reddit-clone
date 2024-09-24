import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { paginationOptsValidator } from "convex/server";
import { threadId } from "worker_threads";

export const toggleFollow = mutation({
  args: { threadId: v.id("threads") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const thread = await ctx.db.get(args.threadId);
    if (!thread) {
      throw new Error("Thread not found");
    }

    const isFollowing = user.followingThreads?.includes(thread._id);
    if (isFollowing) {
      user.followingThreads = user.followingThreads?.filter(
        (id) => id !== thread._id
      );
    } else {
      user.followingThreads = user.followingThreads
        ? [...user.followingThreads, thread._id]
        : [thread._id];
    }

    await ctx.db.patch(userId, {
      followingThreads: user.followingThreads,
    });

    return isFollowing;
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx, args) => {
    const results = await ctx.db.query("threads").collect();
    return results;
  },
});

export const getById = query({
  args: { id: v.id("threads") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }

    const results = await ctx.db
      .query("threads")
      .withIndex("by_id", (q) => q.eq("_id", args.id))
      .unique();

    if (!results?.bannerImage || !results?.logoImage) {
      return null;
    }
    const bannerImage = await ctx.storage.getUrl(results?.bannerImage);
    const logoImage = await ctx.storage.getUrl(results?.logoImage);
    const user = await ctx.db.get(userId);
    if (!user)
      return {
        page: [],
        isDone: true,
        continueCursor: "",
      };
    const isFollowing = user?.followingThreads?.includes(args.id);
    return {
      ...results,
      bannerImage,
      logoImage,
      isFollowing,
    };
  },
});

export const get = query({
  args: {
    name: v.optional(v.string()),
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
      .query("threads")
      .order("desc")
      .paginate(args.paginationOpts);

    const page = await Promise.all(
      results.page.map(async (thread) => {
        const bannerImage = await ctx.storage.getUrl(thread.bannerImage);
        const logoImage = await ctx.storage.getUrl(thread.logoImage);
        const user = await ctx.db.get(userId);
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

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    bannerImage: v.id("_storage"),
    logoImage: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existingThread = await ctx.db
      .query("threads")
      .filter((q) => q.eq(q.field("title"), args.title))
      .unique();

    console.log("TITLE", args.title, "EXISTING", existingThread);

    if (existingThread) {
      throw new Error("Name already taken");
    }

    const newThread = await ctx.db.insert("threads", {
      title: args.title,
      description: args.description,
      bannerImage: args.bannerImage,
      logoImage: args.logoImage,
      totalMembers: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      moderators: [userId],
    });

    const author = await ctx.db.get(userId);

    await ctx.db.insert("users", {
      followingThreads: author?.followingThreads
        ? [...author.followingThreads, newThread]
        : [newThread],
    });

    return newThread;
  },
});
