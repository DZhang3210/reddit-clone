import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  members: defineTable({
    userId: v.string(),
    communityId: v.string(),
    role: v.string(),
  }),
  threads: defineTable({
    title: v.string(),
    description: v.string(),
    profile: v.string(),
    bannerImage: v.string(),
    totalMembers: v.number(),
    members: v.array(v.id("members")),
    createdAt: v.number(),
    updatedAt: v.number(),
    author: v.id("members"),
  })
    .index("title", ["title"])
    .index("author", ["author"])
    .index("createdAt", ["createdAt"]),
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    author: v.id("members"),
    thread: v.id("threads"),
  })
    .index("createdAt", ["createdAt"])
    .index("updatedAt", ["updatedAt"])
    .index("author", ["author"])
    .index("thread", ["thread"]),
});

export default schema;
