import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { paginationOptsValidator } from "convex/server";

export const likePost = mutation({
  args: {
    postId: v.id("posts"),
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

    if (!user.likedPosts) {
      const [_user, _post] = await Promise.all([
        await ctx.db.patch(user._id, {
          likedPosts: [post._id],
        }),
        await ctx.db.patch(post._id, {
          likes: post.likes + 1,
        }),
      ]);
      return post._id;
    }

    if (user.likedPosts?.includes(post._id)) {
      const newLikePosts = user.likedPosts.filter((id) => id !== post._id);
      const [_user, _post] = await Promise.all([
        await ctx.db.patch(user._id, {
          likedPosts: newLikePosts,
        }),
        await ctx.db.patch(post._id, {
          likes: post.likes - 1,
        }),
      ]);
    } else {
      const newLikedPosts = [...user.likedPosts, post._id];

      const [_user, _post] = await Promise.all([
        await ctx.db.patch(user._id, {
          likedPosts: newLikedPosts,
        }),
        await ctx.db.patch(post._id, {
          likes: post.likes + 1,
        }),
      ]);
    }
    return post._id;
  },
});

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
      numComments: 0,
    });

    return postId;
  },
});

export const get = query({
  args: {
    name: v.optional(v.string()),
    threadId: v.optional(v.id("threads")),
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
      .withIndex("thread", (q) =>
        args.threadId ? q.eq("thread", args.threadId) : q
      )
      .order("desc")
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
          const isAdmin = thread.moderators.includes(userId);
          const isFollowing = user.followingThreads?.includes(thread?._id);
          const isCreator = post?.author === userId;
          if (post?.image) {
            return {
              ...post,
              image: await ctx.storage.getUrl(post?.image),
              user: user,
              thread: { ...thread, image: threadImage, isFollowing },
              liked: liked,
              saved: saved,
              firstComment: firstComment,
              isAdmin,
              isCreator,
            };
          } else {
            return {
              ...post,
              image: "",
              user: user,
              thread: { ...thread, image: threadImage, isFollowing },
              liked: liked,
              saved: saved,
              firstComment: firstComment,
              isAdmin,
              isCreator,
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

export const getById = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return null;
    }
    const post = await ctx.db.get(args.postId);

    if (!post) {
      return null;
    }

    const currentUser = await ctx.db.get(userId);
    const [user, thread] = await Promise.all([
      await ctx.db.get(post?.author),
      await ctx.db.get(post?.thread),
    ]);

    if (!user || !thread) {
      return null;
    }

    const liked = currentUser?.likedPosts?.includes(post?._id);
    const saved = currentUser?.savedPosts?.includes(post?._id);
    const isCreator = post?.author === userId;
    const isAdmin = thread.moderators.includes(userId);
    const isFollowing = user.followingThreads?.includes(thread?._id);
    const threadImage = await ctx.storage.getUrl(thread?.logoImage);
    if (post?.image) {
      const image = await ctx.storage.getUrl(post?.image);
      return {
        ...post,
        user,
        thread: { ...thread, image: threadImage, isFollowing },
        liked,
        saved,
        image,
        isCreator,
        isAdmin,
      };
    } else {
      return {
        ...post,
        user,
        thread: { ...thread, image: threadImage, isFollowing },
        liked,
        saved,
        isCreator,
        isAdmin,
      };
    }
  },
});

export const savePost = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db.get(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.savedPosts) {
      if (user.savedPosts.includes(args.postId)) {
        const savedPosts = user.savedPosts.filter((id) => id !== args.postId);
        await ctx.db.patch(userId, {
          savedPosts,
        });
      } else {
        const savedPosts = [...user.savedPosts, args.postId];
        await ctx.db.patch(userId, {
          savedPosts,
        });
      }
    } else {
      await ctx.db.patch(userId, {
        savedPosts: [args.postId],
      });
    }
    return args.postId;
  },
});

export const removePost = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new Error("Post not found");
    }

    const thread = await ctx.db.get(post.thread);
    if (!thread) {
      throw new Error("Thread not found");
    }

    // const isAdmin = thread.moderators.includes(userId);

    // if (!isAdmin) {
    //   throw new Error("User is not an admin");
    // }

    await ctx.db.delete(args.postId);
    return args.postId;
  },
});

export const editPost = mutation({
  args: {
    postId: v.id("posts"),
    title: v.string(),
    content: v.string(),
    imageTitle: v.string(),
    threadId: v.id("threads"),
    image: v.union(v.id("_storage"), v.null()),
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

    const isCreator = post.author === userId;

    if (!isCreator) {
      throw new Error("User is not an admin");
    }

    await ctx.db.patch(args.postId, {
      title: args.title,
      content: args.content,
      imageTitle: args.imageTitle,
      image: args.image ? args.image : post.image,
      thread: args.threadId,
      updatedAt: Date.now(),
    });
    return args.postId;
  },
});

export const getPopularPosts = query({
  args: {
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
      .withIndex("likes")
      .order("desc")
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
          const isAdmin = thread.moderators.includes(userId);
          const isFollowing = user.followingThreads?.includes(thread?._id);
          const isCreator = post?.author === userId;
          if (post?.image) {
            return {
              ...post,
              image: await ctx.storage.getUrl(post?.image),
              user: user,
              thread: { ...thread, image: threadImage, isFollowing },
              liked: liked,
              saved: saved,
              firstComment: firstComment,
              isAdmin,
              isCreator,
            };
          } else {
            return {
              ...post,
              image: "",
              user: user,
              thread: { ...thread, image: threadImage, isFollowing },
              liked: liked,
              saved: saved,
              firstComment: firstComment,
              isAdmin,
              isCreator,
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
