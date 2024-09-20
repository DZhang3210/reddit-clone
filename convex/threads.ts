import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { paginationOptsValidator } from "convex/server";

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
    const isFollowing = await results.users.includes(userId);
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
        const isFollowing = await thread.users.includes(userId);
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

    const newThread = await ctx.db.insert("threads", {
      title: args.title,
      description: args.description,
      bannerImage: args.bannerImage,
      logoImage: args.logoImage,
      totalMembers: 1,
      users: [userId],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      moderators: [userId],
    });

    return newThread;
  },
});
