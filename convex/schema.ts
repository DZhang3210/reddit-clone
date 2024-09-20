import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  // Override the default users table
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    likedPosts: v.optional(v.array(v.id("posts"))),
    followingThreads: v.optional(v.array(v.id("threads"))),
    savedPosts: v.optional(v.array(v.id("posts"))),
    // other "users" fields...
  }).index("email", ["email"]),
  threads: defineTable({
    title: v.string(),
    description: v.string(),
    bannerImage: v.id("_storage"),
    logoImage: v.id("_storage"),
    totalMembers: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
    moderators: v.array(v.id("users")),
  })
    .index("title", ["title"])
    .index("createdAt", ["createdAt"]),
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    author: v.id("users"),
    thread: v.id("threads"),
    imageTitle: v.string(),
    image: v.optional(v.id("_storage")),
    likes: v.number(),
  })
    .index("createdAt", ["createdAt"])
    .index("updatedAt", ["updatedAt"])
    .index("author", ["author"])
    .index("thread", ["thread"]),
});

export default schema;
