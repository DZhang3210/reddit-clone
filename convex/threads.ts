import { v } from "convex/values";
import { query } from "./_generated/server";

export const getAllThreads = query({
  args: {
    title: v.optional(v.string()),
    author: v.optional(v.id("members")),
    sortOrder: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
  },
  handler: async (ctx, args) => {
    const userId = ctx.auth.getUserIdentity()?.tokenIdentifier;
    if (!userId) {
      return [];
    }
    let threadsQuery = ctx.db.query("threads").order("createdAt", "desc");

    if (args.title) {
      threadsQuery = threadsQuery.filter((q) =>
        q.eq(q.field("title"), args.title)
      );
    }

    if (args.author) {
      threadsQuery = threadsQuery.filter((q) =>
        q.eq(q.field("author"), args.author)
      );
    }

    return threadsQuery;
  },
});
