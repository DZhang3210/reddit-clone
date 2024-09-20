import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  threads: defineTable({
    title: v.string(),
    description: v.string(),
    bannerImage: v.id("_storage"),
    logoImage: v.id("_storage"),
    totalMembers: v.number(),
    users: v.array(v.id("users")),
    createdAt: v.number(),
    updatedAt: v.number(),
    moderators: v.array(v.id("users")),
  })
    .index("title", ["title"])
    .index("users", ["users"])
    .index("createdAt", ["createdAt"]),
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    author: v.id("users"),
    thread: v.id("threads"),
  })
    .index("createdAt", ["createdAt"])
    .index("updatedAt", ["updatedAt"])
    .index("author", ["author"])
    .index("thread", ["thread"]),
});

export default schema;
