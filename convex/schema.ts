import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { tokenToString } from "typescript";

export default defineSchema({
  posts: defineTable({
    text: v.string(),
    tokenIdentifier: v.string(),
  }),

  comments: defineTable({
    postId: v.id("posts"),
    text: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_postId", ["postId"]),

  answers: defineTable({
    commentId: v.id("comments"),
    text: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_commentId", ["commentId"]),
  likes: defineTable({
    postId: v.id("posts"),
    tokenIdentifier: v.string(),
  }).index("by_Post_Token", ["postId", "tokenIdentifier"]),
});
