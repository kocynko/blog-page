import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    text: v.string(),
    storageId: v.id("_storage"),
    user_id: v.id("users"),
  }),

  comments: defineTable({
    postId: v.id("posts"),
    text: v.string(),
    userId: v.id("users"),
  }).index("by_postId", ["postId"]),

  answers: defineTable({
    commentId: v.id("comments"),
    userId: v.id("users"),
    text: v.string(),
  }).index("by_commentId", ["commentId"]),
  postLikes: defineTable({
    postId: v.id("posts"),
    userId: v.id("users"),
  }).index("by_Post_Token", ["postId", "userId"]),
  commentLikes: defineTable({
    commentId: v.id("comments"),
    userId: v.id("users"),
  }).index("by_Post_Token", ["commentId", "userId"]),
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    profilePicture: v.string(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
