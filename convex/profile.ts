import { paginationOptsValidator } from "convex/server";
import { query } from "./_generated/server";
import { auth } from "./auth";

export const getUserPosts = query({
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

    const user = await ctx.db.get(userId);

    if (!user) {
      return {
        page: [],
        isDone: true,
        continueCursor: "",
      };
    }

    const authorPosts = await ctx.db
      .query("posts")
      .withIndex("author", (q) => q.eq("author", user._id))
      .order("desc")
      .paginate(args.paginationOpts);

    const finalAuthorPosts = (
      await Promise.all(
        authorPosts.page.map(async (post) => {
          const thread = await ctx.db.get(post.thread);
          const liked = user?.likedPosts?.includes(post?._id);
          const saved = user?.savedPosts?.includes(post?._id);
          const image = post?.image
            ? await ctx.storage.getUrl(post?.image)
            : "";
          if (!thread) {
            return null;
          }
          const threadImage = await ctx.storage.getUrl(thread?.logoImage);
          const isAdmin = thread.moderators.includes(user?._id);
          const isFollowing = user.followingThreads?.includes(thread?._id);
          const isCreator = post.author === user?._id;
          return {
            ...post,
            thread: { ...thread, image: threadImage, isFollowing },
            liked,
            saved,
            image,
            user: user,
            isAdmin,
            isCreator,
          };
        })
      )
    ).filter((post) => post !== null);

    return { ...authorPosts, page: finalAuthorPosts };
  },
});

export const getUserSaved = query({
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

    const user = await ctx.db.get(userId);

    if (!user) {
      return {
        page: [],
        isDone: true,
        continueCursor: "",
      };
    }

    const savedPostIds = user.savedPosts;

    if (!savedPostIds) {
      return {
        page: [],
        isDone: true,
        continueCursor: "",
      };
    }

    const savedPosts = (
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
          if (!thread) {
            return null;
          }
          const threadImage = await ctx.storage.getUrl(thread?.logoImage);
          const isAdmin = thread.moderators.includes(user?._id);
          const isCreator = post.author === user?._id;
          const isFollowing = user.followingThreads?.includes(thread?._id);
          return {
            ...post,
            liked,
            saved,
            image: image,
            user: user,
            thread: { ...thread, image: threadImage, isFollowing },
            isAdmin,
            isCreator,
          };
        })
      )
    ).filter((post) => post !== null);

    return { page: savedPosts, isDone: true, continueCursor: "" };
  },
});

export const getUserUpvoted = query({
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

    const user = await ctx.db.get(userId);

    if (!user) {
      return {
        page: [],
        isDone: true,
        continueCursor: "",
      };
    }

    const savedPostIds = user.likedPosts;

    if (!savedPostIds) {
      return {
        page: [],
        isDone: true,
        continueCursor: "",
      };
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
          if (!thread) {
            return null;
          }
          const threadImage = await ctx.storage.getUrl(thread?.logoImage);
          const isAdmin = thread.moderators.includes(user?._id);
          const isCreator = post.author === user?._id;
          const isFollowing = user.followingThreads?.includes(thread?._id);
          return {
            ...post,
            liked,
            saved,
            image: image,
            user: user,
            thread: { ...thread, image: threadImage, isFollowing },
            isAdmin,
            isCreator,
          };
        })
      )
    ).filter((post) => post !== null);

    return { page: likedPosts, isDone: true, continueCursor: "" };
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
    const commentsLength = user.comments ? user.comments.length : 0;
    const likedCommentsLength = user.likedComments
      ? user.likedComments.length
      : 0;

    const createdPostsLength = posts.length;
    return {
      followingThreadsLength,
      savedPostsLength,
      upvotedPostsLength,
      createdPostsLength,
      commentsLength,
      likedCommentsLength,
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
          const image = thread?.logoImage
            ? await ctx.storage.getUrl(thread?.logoImage)
            : "";
          return {
            ...comment,
            author,
            post,
            thread,
            image,
            isLiked: user.likedComments?.includes(comment._id) ?? false,
          };
        })
      )
    ).filter((comment) => comment !== null);

    return populatedComments;
  },
});

export const getUserLikedComments = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (!user) return null;

    const likedCommentsIds = user.likedComments || [];

    const likedComments = (
      await Promise.all(
        likedCommentsIds.map(async (commentId) => {
          const comment = await ctx.db.get(commentId);
          if (!comment) return null;
          const [author, post] = await Promise.all([
            ctx.db.get(comment.authorId),
            ctx.db.get(comment.postId),
          ]);
          if (!author || !post) return null;
          const thread = await ctx.db.get(post.thread);
          if (!thread) return null;
          const image = thread?.logoImage
            ? await ctx.storage.getUrl(thread?.logoImage)
            : "";
          return {
            ...comment,
            author,
            post,
            thread,
            image,
            isLiked: user.likedComments?.includes(comment._id) ?? false,
          };
        })
      )
    ).filter((comment) => comment !== null);

    return likedComments;
  },
});
