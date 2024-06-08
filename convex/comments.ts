import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createComment = mutation({
  args: {
    postId: v.id("posts"),
    text: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return [];
    }
    const commentId = await ctx.db.insert("comments", {
      postId: args.postId,
      text: args.text,
      tokenIdentifier: userId,
    });
    return commentId;
  },
});

export const getCommentsByPostId = query({
  args: {
    postId: v.id("posts"),
  },
  async handler(ctx, args) {
    return await ctx.db
      .query("comments")
      .withIndex("by_postId", (q) => q.eq("postId", args.postId))
      .collect();
  },
});
