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
        const thread = await ctx.db.get(post.thread);
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

          const thread = await ctx.db.get(post.thread);
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

          const thread = await ctx.db.get(post.thread);
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

export const getUserThreads = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return [];
    }

    const user = await ctx.db.get(userId);

    if (!user) {
      return [];
    }

    const threadIds = user.followingThreads;

    if (!threadIds) {
      return [];
    }

    const threads = (
      await Promise.all(
        threadIds.map(async (threadId) => {
          const thread = await ctx.db.get(threadId);
          if (!thread) return null;

          const [bannerImage, logoImage] = await Promise.all([
            ctx.storage.getUrl(thread.bannerImage),
            ctx.storage.getUrl(thread.logoImage),
          ]);
          return {
            ...thread,
            following: true,
            bannerImage,
            logoImage,
          };
        })
      )
    ).filter((thread) => thread !== null);

    return threads;
  },
});

export const getUserStats = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (!user) {
      return null;
    }
    const followingThreadsLength = user.followingThreads
      ? user.followingThreads.length
      : 0;
    const savedPostsLength = user.savedPosts ? user.savedPosts.length : 0;
    const upvotedPostsLength = user.likedPosts ? user.likedPosts.length : 0;
    const posts = await ctx.db
      .query("posts")
      .withIndex("author", (q) => q.eq("author", user._id))
      .collect();
    const createdPostsLength = posts.length;
    return {
      followingThreadsLength,
      savedPostsLength,
      upvotedPostsLength,
      createdPostsLength,
    };
  },
});

export const getUserComments = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (!user) return null;

    const comments = await ctx.db
      .query("comments")
      .withIndex("authorId", (q) => q.eq("authorId", user._id))
      .collect();

    const populatedComments = (
      await Promise.all(
        comments.map(async (comment) => {
          const author = await ctx.db.get(comment.authorId);
          if (!author) return null;
          const post = await ctx.db.get(comment.postId);
          if (!post) return null;
          const thread = await ctx.db.get(post.thread);
          if (!thread) return null;
          return {
            ...comment,
            author,
            post,
            thread,
            isLiked: user.likedComments?.includes(comment._id) ?? false,
          };
        })
      )
    ).filter((comment) => comment !== null);

    return populatedComments;
  },
});
