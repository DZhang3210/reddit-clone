import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { paginationOptsValidator } from "convex/server";

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    threadId: v.id("threads"),
    imageTitle: v.string(),
    image: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { title, content, threadId, imageTitle, image } = args;

    const postId = await ctx.db.insert("posts", {
      title,
      content,
      author: userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      thread: threadId,
      imageTitle,
      image,
      likes: 0,
    });

    return postId;
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
      .query("posts")
      .order("desc")
      .paginate(args.paginationOpts);

    const page = await Promise.all(
      results.page.map(async (post) => {
        if (post?.image) {
          return {
            ...post,
            image: await ctx.storage.getUrl(post?.image),
          };
        } else {
          return post;
        }
      })
    );
    return {
      ...results,
      page,
    };
  },
});
