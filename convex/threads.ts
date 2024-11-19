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

    const [user, thread] = await Promise.all([
      await ctx.db.get(userId),
      await ctx.db.get(args.threadId),
    ]);

    if (!user || !thread) {
      throw new Error("User or thread not found");
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
    if (!isFollowing) {
      await ctx.db.patch(thread._id, {
        totalMembers: thread.totalMembers + 1,
      });
    } else {
      await ctx.db.patch(thread._id, {
        totalMembers: thread.totalMembers - 1,
      });
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
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return [];
    }
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

    const results = await ctx.db.get(args.id);

    if (!results?.bannerImage || !results?.logoImage) {
      return null;
    }
    const [bannerImage, logoImage, user] = await Promise.all([
      await ctx.storage.getUrl(results?.bannerImage),
      await ctx.storage.getUrl(results?.logoImage),
      await ctx.db.get(userId),
    ]);
    if (!user) return null;
    const isFollowing = user?.followingThreads?.includes(args.id);
    const isAdmin = results.moderators
      ? results.moderators.includes(userId)
      : false;
    return {
      ...results,
      bannerImage,
      logoImage,
      isFollowing,
      isAdmin,
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
        const isAdmin = thread.moderators
          ? thread.moderators.includes(userId)
          : false;
        return {
          ...thread,
          bannerImage,
          logoImage,
          isFollowing,
          isAdmin,
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
    bannerColor: v.string(),
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

    if (existingThread) {
      throw new Error("Name already taken");
    }

    const generateModeratorCode = () => {
      const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return Array.from(
        { length: 6 },
        () => symbols[Math.floor(Math.random() * symbols.length)]
      ).join("");
    };

    const moderatorCode = generateModeratorCode();
    const newThread = await ctx.db.insert("threads", {
      title: args.title,
      description: args.description,
      bannerImage: args.bannerImage,
      logoImage: args.logoImage,
      bannerColor: args.bannerColor,
      totalMembers: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      moderators: [userId],
      moderatorCode: moderatorCode, // Use the generated code
    });

    const author = await ctx.db.get(userId);

    if (!author) {
      throw new Error("User not found");
    }

    await ctx.db.patch(author._id, {
      followingThreads: author?.followingThreads
        ? [...author.followingThreads, newThread]
        : [newThread],
    });

    return newThread;
  },
});

export const update = mutation({
  args: {
    id: v.id("threads"),
    title: v.string(),
    description: v.string(),
    bannerColor: v.string(),
    bannerImage: v.union(v.id("_storage"), v.null()),
    logoImage: v.union(v.id("_storage"), v.null()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const thread = await ctx.db.get(args.id);
    if (!thread) {
      throw new Error("Thread not found");
    }

    const updatedThread = await ctx.db.patch(args.id, {
      title: args.title,
      description: args.description,
      bannerColor: args.bannerColor,
      bannerImage: args.bannerImage ? args.bannerImage : thread.bannerImage,
      logoImage: args.logoImage ? args.logoImage : thread.logoImage,
    });

    return updatedThread;
  },
});

export const getAdmins = query({
  args: { id: v.union(v.id("threads"), v.null()) },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId || !args.id) {
      return null;
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      return null;
    }

    const isFollowing = user.followingThreads?.includes(args.id);

    const thread = await ctx.db.get(args.id);
    if (!thread) {
      return null;
    }

    const isAdmin = thread.moderators
      ? thread.moderators.includes(userId)
      : false;

    const admins = thread.moderators;
    const [threadImage, logoImage] = await Promise.all([
      await ctx.storage.getUrl(thread.bannerImage),
      await ctx.storage.getUrl(thread.logoImage),
    ]);
    const adminsData = await Promise.all(
      admins.map(async (adminId) => {
        return await ctx.db.get(adminId);
      })
    );
    return {
      ...thread,
      moderators: adminsData,
      threadImage,
      logoImage,
      isFollowing,
      isAdmin,
    };
  },
});

const generateModeratorCode = () => {
  const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from(
    { length: 6 },
    () => symbols[Math.floor(Math.random() * symbols.length)]
  ).join("");
};

export const changeInviteCode = mutation({
  args: { id: v.id("threads") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }
    const thread = await ctx.db.get(args.id);
    if (!thread) {
      throw new Error("Thread not found");
    }
    const newCode = generateModeratorCode();
    await ctx.db.patch(args.id, {
      moderatorCode: newCode,
    });
    return newCode;
  },
});

export const addModerator = mutation({
  args: { id: v.id("threads"), code: v.string() },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const thread = await ctx.db.get(args.id);
    if (!thread) {
      throw new Error("Thread not found");
    }
    if (args.code !== thread.moderatorCode) {
      throw new Error("Invalid code");
    }

    const isMember = user.followingThreads?.includes(args.id);
    if (!isMember) {
      await Promise.all([
        ctx.db.patch(args.id, {
          totalMembers: thread.totalMembers + 1,
        }),
        ctx.db.patch(userId, {
          followingThreads: user.followingThreads
            ? [...user.followingThreads, args.id]
            : [args.id],
        }),
      ]);
    }

    await ctx.db.patch(args.id, {
      updatedAt: Date.now(),
      moderators: [...thread.moderators, userId],
    });
  },
});
